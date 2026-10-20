import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { StoryAudio } from '../src/audio.js';
import { landmarks, simulation } from '../src/landmarks.js';

// Exercise the real app event handlers with a minimal DOM and fictional GPS.
// Audio hardware/rendering are covered separately by audio tests and browser QA.
class Element {
  constructor() {
    this.listeners = new Map();
    this.attributes = new Map();
    this.style = {};
    this.children = [];
    this.hidden = false;
    this.textContent = '';
  }
  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  getAttribute(name) {
    return this.attributes.get(name);
  }
  append(...children) {
    this.children.push(...children);
  }
  replaceChildren(...children) {
    this.children = children;
  }
  focus() {}
  async fire(type, extra = {}) {
    await this.listeners.get(type)?.({ target: this, ...extra });
  }
}

let sequence = 0;
async function setup(t, { failedStop, prepareGate, unlockGate } = {}) {
  const nodes = new Map();
  const get = (id) => {
    if (!nodes.has(id)) nodes.set(id, new Element());
    return nodes.get(id);
  };
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)) {
    const node = get(match[1]);
    node.hidden = /\bhidden\b/.test(match[0]);
    for (const attribute of match[0].matchAll(/(aria-[\w-]+)="([^"]+)"/g))
      node.setAttribute(attribute[1], attribute[2]);
  }
  const permission = { state: 'granted', onchange: null };
  let watchSuccess;
  const position = {
    coords: { latitude: 47.6, longitude: -122.3, accuracy: 8 },
    timestamp: Date.now(),
  };
  const globals = {
    document: Object.assign(new Element(), {
      hidden: false,
      getElementById: get,
      createElement: () => new Element(),
      querySelector: get,
    }),
    window: { isSecureContext: true, scrollTo() {}, addEventListener() {} },
    navigator: {
      permissions: { query: async () => permission },
      geolocation: {
        getCurrentPosition: (success) => success(position),
        watchPosition: (success) => {
          watchSuccess = success;
          success(position);
          return 1;
        },
        clearWatch() {},
      },
    },
  };
  for (const [key, value] of Object.entries(globals)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    t.after(() => {
      if (original) Object.defineProperty(globalThis, key, original);
      else delete globalThis[key];
    });
  }
  t.mock.method(globalThis, 'setInterval', () => 1);
  t.mock.method(globalThis, 'clearInterval', () => {});
  t.mock.method(StoryAudio.prototype, 'unlock', async function () {
    this.context = { currentTime: 0, state: 'running' };
    await unlockGate;
  });
  t.mock.method(StoryAudio.prototype, 'suspend', async function () {
    this.pause();
  });
  const preparation = t.mock.method(StoryAudio.prototype, 'prepare', async function (stops) {
    await prepareGate;
    for (const stop of stops)
      if (stop.id !== failedStop) this.buffers.set(stop.id, { duration: 30 });
    if (stops.some((stop) => stop.id === failedStop)) throw new Error('Audio request failed');
  });
  const playback = t.mock.method(StoryAudio.prototype, 'play', async function (stop) {
    this.stopId = stop.id;
    this.pending = true;
    this.onChange();
  });
  await import(`../src/app.js?session-test=${sequence++}`);
  return { get, permission, preparation, playback, move: (coordinates, accuracy = 8) => watchSuccess({
    coords: { latitude: coordinates[0], longitude: coordinates[1], accuracy }, timestamp: Date.now(),
  }) };
}

for (const ending of ['end', 'revoke']) {
  test(`${ending} clears mode, mute and consent before the next walk`, async (t) => {
    const { get, permission } = await setup(t);
    await get('consent-button').fire('click');
    await get('start-button').fire('click');
    await get('switch-mode').fire('click');
    await get('mute-button').fire('click');
    assert.equal(get('mode-label').textContent, 'Simulated campus walk');
    assert.equal(get('mute-button').getAttribute('aria-pressed'), 'true');
    if (ending === 'end') await get('end-button').fire('click');
    else {
      permission.state = 'denied';
      permission.onchange();
    }
    assert.equal(get('explorer').hidden, true);
    assert.equal(get('ready-panel').hidden, true);
    assert.equal(get('choose-live').getAttribute('aria-pressed'), 'true');
    assert.equal(get('choose-demo').getAttribute('aria-pressed'), 'false');
    assert.equal(get('mute-button').getAttribute('aria-pressed'), 'false');
    await get('start-button').fire('click');
    assert.equal(get('explorer').hidden, true, 'start cannot bypass fresh consent');
    permission.state = 'granted';
    await get('consent-button').fire('click');
    await get('start-button').fire('click');
    assert.equal(get('mode-label').textContent, 'Live campus walk');
  });
}

test('seeking backward from completion offers Continue movement', async (t) => {
  const { get } = await setup(t);
  await get('consent-button').fire('click');
  await get('choose-demo').fire('click');
  await get('start-button').fire('click');
  get('simulation-seek').value = String(simulation.at(-1).seconds);
  await get('simulation-seek').fire('input');
  assert.equal(get('simulation-toggle').textContent, 'Restart walk');
  await get('simulation-buttons')
    .children.find((node) => node.textContent === 'Go to Penrose Library')
    .fire('click');
  assert.equal(get('simulation-toggle').textContent, 'Continue movement');
  assert.equal(get('simulation-time').textContent, '2:20 / 12:50');
  await get('simulation-toggle').fire('click');
  assert.equal(get('simulation-toggle').textContent, 'Pause movement');
});

test('a missing recording does not block another story on arrival or manual play', async (t) => {
  const { get, preparation, playback } = await setup(t, { failedStop: 'cleveland' });
  await get('consent-button').fire('click');
  await get('choose-demo').fire('click');
  await get('start-button').fire('click');
  await get('simulation-buttons')
    .children.find((node) => node.textContent === 'Go to Penrose Library')
    .fire('click');
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'penrose');
  await get('play-button').fire('click'); // pause arrival
  await get('play-button').fire('click'); // manual play
  assert.deepEqual(preparation.mock.calls.at(-1).arguments[0], [
    landmarks.find((stop) => stop.id === 'penrose'),
  ]);
  assert.equal(playback.mock.callCount(), 2);
  assert.equal(get('audio-status').textContent, 'You’ve arrived…');
});

const flush = () => new Promise((resolve) => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; };

test('start immediately opens the explorer without waiting for audio unlock or downloading all stories', async (t) => {
  const unlock = deferred();
  const { get, preparation } = await setup(t, { unlockGate: unlock.promise });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  assert.equal(get('explorer').hidden, false);
  assert.equal(get('stop-list').children.length, landmarks.length);
  assert.equal(preparation.mock.callCount(), 0);
  unlock.resolve();
  await flush();
  assert.equal(preparation.mock.callCount(), 0, 'off-campus start does not fetch unused stories');
});

for (const action of ['cancel', 'select', 'hide', 'end', 'revoke', 'mode', 'seek', 'leave', 'poor GPS']) {
  test(`late audio does not play after ${action}`, async (t) => {
    const gate = deferred();
    const { get, permission, playback, move } = await setup(t, { prepareGate: gate.promise });
    await get('consent-button').fire('click');
    if (!['leave', 'poor GPS'].includes(action)) await get('choose-demo').fire('click');
    await get('start-button').fire('click');
    const jump = get('simulation-buttons').children.find((node) => node.textContent === 'Go to Penrose Library');
    if (['leave', 'poor GPS'].includes(action)) move(landmarks.find((stop) => stop.id === 'penrose').coordinates);
    else await jump.fire('click');
    await flush();
    assert.equal(get('audio-status').textContent, 'Loading story…');
    assert.equal(get('play-button').getAttribute('aria-label'), 'Cancel loading story');
    if (action === 'cancel') await get('play-button').fire('click');
    if (action === 'select') await get('stop-list').children.find((node) => node.id === 'stop-reid').fire('click');
    if (action === 'hide') { document.hidden = true; await document.fire('visibilitychange'); }
    if (action === 'end') await get('end-button').fire('click');
    if (action === 'revoke') { permission.state = 'denied'; permission.onchange(); }
    if (action === 'mode') await get('switch-mode').fire('click');
    if (action === 'seek') { get('simulation-seek').value = '0'; await get('simulation-seek').fire('input'); }
    if (action === 'leave') {
      move([46.0705, -118.32912]);
    }
    if (action === 'poor GPS') move(landmarks[2].coordinates, 500);
    gate.resolve();
    await flush();
    assert.equal(playback.mock.callCount(), 0);
    assert.notEqual(get('audio-status').textContent, 'Loading story…');
    await get('end-button').fire('click');
  });
}

test('slow stories remain readable, show waiting feedback, and play only the selected stop when ready', async (t) => {
  const gate = deferred();
  const { get, preparation, playback } = await setup(t, { prepareGate: gate.promise });
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  await get('stop-list').children.find((node) => node.id === 'stop-reid').fire('click');
  const playing = get('play-button').fire('click');
  await flush();
  assert.match(get('story-transcript').textContent, /Reid Campus Center/);
  t.mock.timers.tick(4000);
  assert.equal(get('audio-status').textContent, 'Still loading… You can read the story below.');
  assert.deepEqual(preparation.mock.calls[0].arguments[0].map((stop) => stop.id), ['reid']);
  gate.resolve();
  await playing;
  assert.equal(playback.mock.calls[0].arguments[0].id, 'reid');
  await get('end-button').fire('click');
});

test('a failed arrival offers retry while another story remains playable', async (t) => {
  const { get, playback } = await setup(t, { failedStop: 'cleveland' });
  await get('consent-button').fire('click');
  await get('choose-demo').fire('click');
  await get('start-button').fire('click');
  await get('simulation-buttons').children.find((node) => node.textContent === 'Go to Cleveland Commons').fire('click');
  await flush();
  assert.equal(get('play-button').getAttribute('aria-label'), 'Retry story audio');
  assert.match(get('story-transcript').textContent, /Cleveland Commons/);
  await get('stop-list').children.find((node) => node.id === 'stop-reid').fire('click');
  await get('play-button').fire('click');
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'reid');
  await get('end-button').fire('click');
});

test('successful manual unlock recovery also restores later automatic arrivals', async (t) => {
  const { get, playback } = await setup(t);
  let broken = true;
  t.mock.method(StoryAudio.prototype, 'unlock', async function () {
    this.context = { currentTime: 0, state: 'running' };
    if (broken) throw new Error('Sound could not start');
  });
  await get('consent-button').fire('click');
  await get('choose-demo').fire('click');
  await get('start-button').fire('click');
  const jumps = get('simulation-buttons').children;
  await jumps.find((node) => node.textContent === 'Go to Penrose Library').fire('click');
  await flush();
  assert.match(get('audio-status').textContent, /Sound could not start/);
  broken = false;
  await get('play-button').fire('click');
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'penrose');
  await jumps.find((node) => node.textContent === 'Go to Memorial Building').fire('click');
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'memorial');
  assert.equal(get('audio-status').textContent, 'You’ve arrived…');
  await get('end-button').fire('click');
});
