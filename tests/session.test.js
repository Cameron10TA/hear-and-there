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
async function setup(t, { failedStop } = {}) {
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
  const position = {
    coords: { latitude: 47.6, longitude: -122.3, accuracy: 8 },
    timestamp: Date.now(),
  };
  const globals = {
    document: {
      hidden: false,
      getElementById: get,
      createElement: () => new Element(),
      querySelector: get,
      addEventListener() {},
    },
    window: { isSecureContext: true, scrollTo() {}, addEventListener() {} },
    navigator: {
      permissions: { query: async () => permission },
      geolocation: {
        getCurrentPosition: (success) => success(position),
        watchPosition: (success) => {
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
  });
  t.mock.method(StoryAudio.prototype, 'suspend', async function () {
    this.pause();
  });
  const preparation = t.mock.method(StoryAudio.prototype, 'prepare', async function (stops) {
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
  return { get, permission, preparation, playback };
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
  assert.equal(get('simulation-time').textContent, '2:20 / 9:30');
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
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'penrose');
  await get('play-button').fire('click'); // pause arrival
  await get('play-button').fire('click'); // manual play
  assert.deepEqual(preparation.mock.calls.at(-1).arguments[0], [
    landmarks.find((stop) => stop.id === 'penrose'),
  ]);
  assert.equal(playback.mock.callCount(), 2);
  assert.equal(get('audio-status').textContent, 'You’ve arrived…');
});
