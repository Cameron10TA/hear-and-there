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
