import test from 'node:test';
import assert from 'node:assert/strict';
import { StoryAudio } from '../src/audio.js';

class FakeSource {
  connect() {}
  disconnect() {}
  stop() {
    this.stopped = true;
  }
  start(...args) {
    this.started = args;
  }
}
class FakeContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 0;
    this.sources = [];
  }
  createGain() {
    return {
      gain: {
        value: 1,
        setValueAtTime() {},
        linearRampToValueAtTime() {},
        exponentialRampToValueAtTime() {},
      },
      connect() {},
      disconnect() {},
    };
  }
  createBuffer() {
    return {};
  }
  createBufferSource() {
    const source = new FakeSource();
    this.sources.push(source);
    return source;
  }
  addEventListener() {}
  async resume() {
    this.state = 'running';
  }
  async suspend() {
    this.state = 'suspended';
  }
  async decodeAudioData() {
    return { duration: 30 };
  }
}
globalThis.window = { AudioContext: FakeContext };
globalThis.document = { hidden: false };
const stop = { id: 'test', ambience: 'chime' };
async function ready() {
  const player = new StoryAudio(() => {});
  await player.unlock();
  player.buffers.set('test', { duration: 30 });
  return player;
}

test('pausing saves the playback offset and resuming uses it', async () => {
  const player = await ready();
  await player.play(stop);
  player.context.currentTime = 8;
  player.pause();
  assert.equal(player.offset, 8);
  assert.equal(player.playing, false);
  await player.play(stop);
  assert.deepEqual(player.source.started, [0, 8]);
  player.stop();
});
test('suspending during the arrival sound cancels the queued narration', async () => {
  const player = await ready();
  player.arrival = () => {};
  await player.play(stop, true);
  assert.ok(player.pending);
  const sourcesBefore = player.context.sources.length;
  await player.suspend();
  assert.equal(player.pending, false);
  assert.equal(player.timers.length, 0);
  assert.equal(player.playing, false);
  assert.equal(player.context.state, 'suspended');
  assert.equal(player.context.sources.length, sourcesBefore);
});
test('a hidden page cannot start narration', async () => {
  const player = await ready();
  document.hidden = true;
  try {
    await assert.rejects(player.play(stop), /enable sound again/);
  } finally {
    document.hidden = false;
  }
  assert.equal(player.playing, false);
});
test('mute applies to the shared output gain and can be reversed', async () => {
  const player = await ready();
  player.setMuted(true);
  assert.equal(player.gain.gain.value, 0);
  player.setMuted(false);
  assert.equal(player.gain.gain.value, 0.85);
});
test('a finished story can be replayed from the beginning', async () => {
  const player = await ready();
  await player.play(stop);
  player.source.onended();
  assert.equal(player.offset, 30);
  await player.play(stop);
  assert.deepEqual(player.source.started, [0, 0]);
  player.stop();
});

test('completion is emitted only when narration ends naturally, never for pause or cancellation', async () => {
  const completed = [];
  const player = new StoryAudio(() => {}, (id) => completed.push(id));
  await player.unlock();
  player.buffers.set(stop.id, { duration: 30 });
  await player.play(stop);
  const canceledEnd = player.source.onended;
  player.pause();
  canceledEnd();
  assert.deepEqual(completed, []);
  await player.play(stop);
  player.source.onended();
  assert.deepEqual(completed, ['test']);
  await player.play(stop);
  const previousEnd = player.source.onended;
  player.stop();
  previousEnd();
  assert.deepEqual(completed, ['test']);
});

test('loading a later selection fetches it even after another story was prepared', async (t) => {
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    requests.push(url);
    return { ok: true, arrayBuffer: async () => new ArrayBuffer(8) };
  });
  const player = await ready();
  await player.prepare([{ id: 'first', audio: 'first.wav' }]);
  await player.prepare([{ id: 'second', audio: 'second.wav' }]);
  assert.deepEqual(requests, ['first.wav', 'second.wav']);
  assert.ok(player.buffers.has('second'));
});

test('a failed story can retry without blocking a cached story or refetching it', async (t) => {
  let offline = true;
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    requests.push(url);
    return { ok: url !== 'broken.wav' || !offline, arrayBuffer: async () => new ArrayBuffer(8) };
  });
  const player = await ready();
  const good = { id: 'good', audio: 'good.wav' };
  const broken = { id: 'broken', audio: 'broken.wav' };
  await player.prepare([good]);
  await assert.rejects(player.prepare([good, broken]), /could not load/);
  await player.prepare([good]);
  await player.play(good);
  assert.ok(player.playing);
  player.stop();
  offline = false;
  await player.prepare([broken]);
  assert.ok(player.buffers.has('broken'));
  assert.deepEqual(requests, ['good.wav', 'broken.wav', 'broken.wav']);
});

test('overlapping preparations share each in-flight story request', async (t) => {
  const finish = [];
  let requests = 0;
  t.mock.method(globalThis, 'fetch', () => {
    requests++;
    return new Promise((resolve) => {
      finish.push(resolve);
    });
  });
  const player = await ready();
  const selected = { id: 'shared', audio: 'shared.wav' };
  const first = player.prepare([selected]);
  const second = player.prepare([selected, { id: 'other', audio: 'other.wav' }]);
  for (const resolve of finish) resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
  await Promise.all([first, second]);
  assert.equal(requests, 2, 'shared audio is fetched once while the new selection also loads');
  assert.ok(player.buffers.has('shared'));
  assert.ok(player.buffers.has('other'));
});

test('a timed-out audio download reports a retryable error and clears the in-flight request', async (t) => {
  const player = await ready();
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(globalThis, 'fetch', (_, { signal }) => new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  }));
  const selected = { id: 'slow', audio: 'slow.wav' };
  const loading = player.prepare([selected]);
  const rejected = assert.rejects(loading, /taking too long.*retry/);
  t.mock.timers.tick(15000);
  await rejected;
  assert.equal(player.loading.has('slow'), false);
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) }));
  await player.prepare([selected]);
  assert.ok(player.buffers.has('slow'));
});
