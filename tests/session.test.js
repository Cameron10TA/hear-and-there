import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { StoryAudio } from '../src/audio.js';
import { landmarks, simulation } from '../src/landmarks.js';
import { tours } from '../src/tours.js';

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
    if (this.children.includes(globalThis.document?.activeElement)) document.activeElement = null;
    this.children = children;
  }
  focus() { document.activeElement = this; }
  scrollIntoView() {}
  async fire(type, extra = {}) {
    await this.listeners.get(type)?.({ target: this, ...extra });
  }
}

let sequence = 0;
async function setup(t, { failedStop, prepareGate, unlockGate, withMap = false, mapZoom = 19 } = {}) {
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
    window: { isSecureContext: true, scrollTo() {}, addEventListener() {}, matchMedia: () => ({ matches: true }) },
    requestAnimationFrame: (callback) => callback(),
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
  const markers = [];
  let createdMap;
  if (withMap) {
    const layer = () => Object.assign(new Element(), {
      layers: new Set(), zoom: mapZoom,
      addTo(map) { map.layers.add(this); this.listeners.get('add')?.(); return this; },
      on(type, callback) { this.addEventListener(type, callback); },
      getElement() { return this; },
      setIcon(icon) { this.icon = icon; },
      bindTooltip() {}, setStyle() {}, setLatLng() {}, setRadius() {}, setZIndexOffset() {},
      fitBounds() {}, getZoom() { return this.zoom; }, invalidateSize() {}, remove() { this.layers.clear(); },
      hasLayer(item) { return this.layers.has(item); },
      removeLayer(item) { this.layers.delete(item); },
      setView(coordinates, zoom) { this.zoom = zoom; this.listeners.get('zoomend')?.(); },
      project([lat, lng]) {
        const scale = 256 * 2 ** this.zoom;
        const sine = Math.sin(lat * Math.PI / 180);
        return { x: (lng + 180) / 360 * scale, y: (0.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI)) * scale };
      },
    });
    globals.L = {
      map: () => (createdMap = layer()), tileLayer: layer, polygon: layer, circle: layer,
      divIcon: (options) => options,
      control: { zoom: layer },
      marker: (coordinates, options) => {
        const marker = layer();
        marker.options = options;
        marker.icon = options.icon;
        marker.fire = (type) => marker.listeners.get(type)?.();
        markers.push(marker);
        return marker;
      },
    };
    globals.window.L = globals.L;
  }
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
  let player;
  const playback = t.mock.method(StoryAudio.prototype, 'play', async function (stop) {
    player = this;
    this.stopId = stop.id;
    this.pending = true;
    this.onChange();
  });
  await import(`../src/app.js?session-test=${sequence++}`);
  return { get, permission, preparation, playback, markers, map: () => createdMap,
    finish: () => {
      player.pending = false;
      player.playing = false;
      player.offset = player.duration;
      player.onComplete(player.stopId);
      player.onChange();
    },
    move: (coordinates, accuracy = 8) => watchSuccess({
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
  get('simulation-jumps').open = true;
  await get('simulation-buttons')
    .children.find((node) => node.textContent === 'Go to Penrose Library')
    .fire('click');
  assert.equal(get('simulation-toggle').textContent, 'Continue movement');
  assert.equal(get('simulation-jumps').open, false, 'choosing a jump exposes the player again');
  const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  assert.equal(get('simulation-time').textContent, `${clock(simulation.find((frame) => frame.stopId === 'penrose').seconds)} / ${clock(simulation.at(-1).seconds)}`);
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

test('collections scope and order the list, reuse completion, and keep progress across modes', async (t) => {
  const { get, playback, finish } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  get('place-search').value = 'no match';
  await get('place-search').fire('input');
  get('tour-select').value = 'first-visit';
  await get('tour-select').fire('change');
  assert.equal(get('place-search').value, '');
  assert.equal(get('place-results').textContent, '6 of 6 places');
  assert.deepEqual(get('stop-list').children.filter((node) => !node.hidden).map((node) => node.id), tours[0].stopIds.map((id) => `stop-${id}`));
  assert.match(get('tour-duration').textContent, /6 stops · About 3 min/);
  assert.equal(playback.mock.callCount(), 0, 'choosing a collection alone never starts audio');
  await get('tour-next').fire('click');
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'styx');
  assert.equal(get('tour-progress').textContent, '0 of 6 stories completed');
  finish();
  assert.equal(get('tour-progress').textContent, '1 of 6 stories completed');
  assert.equal(get('tour-next').textContent, 'Listen next: Penrose Library');
  get('tour-select').value = 'arts';
  await get('tour-select').fire('change');
  assert.equal(get('tour-progress').textContent, '1 of 7 stories completed');
  assert.equal(get('tour-next').textContent, 'Listen next: Fouts Center for Visual Arts');
  await get('switch-mode').fire('click');
  assert.equal(get('tour-select').value, 'arts');
  assert.equal(get('tour-progress').textContent, '1 of 7 stories completed');
  await get('end-button').fire('click');
});

test('finishing a themed collection shows its own completion goal without completing the full campus', async (t) => {
  const { get, finish } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  get('tour-select').value = 'first-visit';
  await get('tour-select').fire('change');
  for (const id of tours[0].stopIds) {
    await get('tour-next').fire('click');
    await flush();
    assert.equal(get('story-title').textContent, landmarks.find((stop) => stop.id === id).name);
    finish();
  }
  assert.equal(get('tour-progress').textContent, '6 of 6 stories completed');
  assert.equal(get('tour-complete').hidden, false);
  assert.equal(get('tour-next').disabled, true);
  assert.equal(get('collection-complete').hidden, true);
  get('place-unlistened').checked = true;
  await get('place-unlistened').fire('change');
  assert.equal(get('place-results').textContent, '0 of 6 places');
  assert.match(get('no-place-results').textContent, /Turn off Not listened/);
  get('tour-select').value = 'student-life';
  await get('tour-select').fire('change');
  assert.equal(get('tour-progress').textContent, '2 of 7 stories completed');
  assert.equal(get('tour-next').disabled, false);
  assert.equal(get('place-unlistened').checked, false);
  await get('end-button').fire('click');
});

test('map and list share category/search/unlistened filters while keeping a current story visible', async (t) => {
  const { get, markers, map, finish } = await setup(t, { withMap: true });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  const shown = () => markers.filter((marker) => map().hasLayer(marker));
  get('map-category').value = 'arts';
  await get('map-category').fire('change');
  assert.equal(get('place-category').value, 'arts');
  assert.equal(get('place-results').textContent, '7 of 56 places');
  assert.equal(shown().length, 7);
  get('place-search').value = 'penrose';
  await get('place-search').fire('input');
  assert.equal(shown().length, 0);
  await get('reset-place-filters').fire('click');
  assert.equal(get('map-category').value, 'all');
  await get('stop-list').children.find((node) => node.id === 'stop-penrose').fire('click');
  await flush();
  const selectedButton = get('stop-list').children.find((node) => node.id === 'stop-penrose');
  selectedButton.focus();
  finish();
  assert.equal(document.activeElement, selectedButton, 'completion keeps keyboard focus on a still-visible card');
  get('map-unlistened').checked = true;
  await get('map-unlistened').fire('change');
  assert.equal(get('place-unlistened').checked, true);
  assert.equal(get('place-results').textContent, '55 of 56 places');
  assert.equal(get('stop-list').children.find((node) => node.id === 'stop-penrose').hidden, true);
  assert.equal(document.activeElement, get('play-button'), 'hiding a focused completed card moves focus to its available player');
  assert.ok(shown().some((marker) => marker.options.title === 'Listen to Penrose Library'));
  assert.match(get('map-results').textContent, /Current story\/location kept visible/);
  get('place-category').value = 'housing';
  await get('place-category').fire('change');
  assert.equal(get('map-category').value, 'housing');
  assert.equal(get('place-results').textContent, '28 of 56 places');
  assert.equal(shown().length, 29, 'the selected library is kept alongside the matching housing pins');
  assert.equal(get('story-title').textContent, 'Penrose Library');
  get('tour-select').value = 'first-visit';
  await get('tour-select').fire('change');
  assert.match(markers.find((marker) => marker.options.title === 'Listen to Memorial Building').icon.html, />03</);
  get('tour-select').value = 'arts';
  await get('tour-select').fire('change');
  assert.match(markers.find((marker) => marker.options.title === 'Listen to Penrose Library').icon.html, />•</, 'a current place outside the tour does not duplicate a tour pin number');
  await get('end-button').fire('click');
});

test('a nearby arrival outside the selected collection and visibility filters still plays and stays visible', async (t) => {
  const { get, move, markers, map, playback } = await setup(t, { withMap: true });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  get('tour-select').value = 'arts';
  await get('tour-select').fire('change');
  get('place-search').value = 'no matches';
  await get('place-search').fire('input');
  move(landmarks.find((stop) => stop.id === 'cleveland').listeningPosition);
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'cleveland');
  assert.equal(get('place-results').textContent, '0 of 7 places');
  assert.equal(get('story-title').textContent, 'Cleveland Commons');
  assert.equal(markers.filter((marker) => map().hasLayer(marker)).length, 2, 'the current story pin and visitor position remain');
  await get('end-button').fire('click');
});

test('a numbered map group zooms in by keyboard and never starts narration', async (t) => {
  const { get, markers, map, playback } = await setup(t, { withMap: true, mapZoom: 17 });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  const cluster = markers.find((marker) => marker.options.icon.className === 'landmark-cluster' && map().hasLayer(marker));
  assert.ok(cluster);
  assert.match(cluster.getAttribute('aria-label'), /Zoom into \d+ places/);
  cluster.onkeydown({ key: 'Enter', preventDefault() {}, stopPropagation() {} });
  assert.equal(map().getZoom(), 19);
  assert.equal(markers.filter((marker) => marker.options.icon.className === 'landmark-cluster' && map().hasLayer(marker)).length, 0);
  assert.equal(markers.filter((marker) => map().hasLayer(marker)).length, landmarks.length);
  assert.equal(playback.mock.callCount(), 0);
  await get('end-button').fire('click');
});

for (const ending of ['end', 'revoke']) {
  test(`${ending} clears the collection and both map/list filter controls`, async (t) => {
    const { get, permission } = await setup(t);
    await get('consent-button').fire('click');
    await get('start-button').fire('click');
    get('tour-select').value = 'arts';
    await get('tour-select').fire('change');
    get('map-category').value = 'arts';
    await get('map-category').fire('change');
    get('map-unlistened').checked = true;
    await get('map-unlistened').fire('change');
    if (ending === 'end') await get('end-button').fire('click');
    else { permission.state = 'denied'; permission.onchange(); }
    assert.equal(get('tour-select').value, '');
    assert.equal(get('tour-details').hidden, true);
    assert.equal(get('map-category').value, 'all');
    assert.equal(get('place-category').value, 'all');
    assert.equal(get('map-unlistened').checked, false);
    assert.equal(get('place-unlistened').checked, false);
    assert.equal(get('place-results').textContent, '56 of 56 places');
  });
}

test('a place card starts narration, keeps the manual choice through GPS changes, and can return to arrivals', async (t) => {
  const { get, playback, move } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  await get('stop-list').children.find((node) => node.id === 'stop-reid').fire('click');
  await flush();
  assert.equal(playback.mock.callCount(), 1);
  assert.equal(playback.mock.calls[0].arguments[0].id, 'reid');
  assert.equal(get('manual-playback').hidden, false);
  move(landmarks.find((stop) => stop.id === 'penrose').listeningPosition);
  move(landmarks[0].coordinates, 500);
  await flush();
  assert.equal(get('story-title').textContent, 'Reid Campus Center');
  assert.equal(get('play-button').getAttribute('aria-label'), 'Pause story');
  assert.equal(playback.mock.callCount(), 1);
  move(landmarks.find((stop) => stop.id === 'penrose').listeningPosition);
  await get('follow-walk').fire('click');
  await flush();
  assert.equal(get('manual-playback').hidden, true);
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'penrose');
  await get('end-button').fire('click');
});

test('map click and keyboard activation play the matching story, with accessible completion labels', async (t) => {
  const { get, markers, playback, finish } = await setup(t, { withMap: true });
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  const reid = markers.find((marker) => marker.options.title === 'Listen to Reid Campus Center');
  reid.fire('click');
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'reid');
  finish();
  assert.match(reid.icon.html, /listened/);
  assert.match(reid.getAttribute('aria-label'), /Listened/);
  const penrose = markers.find((marker) => marker.options.title === 'Listen to Penrose Library');
  await penrose.onkeydown({ key: 'Enter', preventDefault() {}, stopPropagation() {} });
  await flush();
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'penrose');
  await get('end-button').fire('click');
});

test('rapid selections cancel earlier downloads and play only the last chosen story', async (t) => {
  const gate = deferred();
  const { get, playback } = await setup(t, { prepareGate: gate.promise });
  await get('consent-button').fire('click');
  await get('choose-demo').fire('click');
  await get('start-button').fire('click');
  await get('simulation-buttons').children.find((node) => node.textContent === 'Go to Penrose Library').fire('click');
  await flush();
  for (const id of ['cleveland', 'memorial', 'reid']) {
    await get('stop-list').children.find((node) => node.id === `stop-${id}`).fire('click');
    await flush();
  }
  gate.resolve();
  await flush();
  assert.deepEqual(playback.mock.calls.map((call) => call.arguments[0].id), ['reid']);
  assert.equal(get('simulation-toggle').textContent, 'Continue movement');
  await get('end-button').fire('click');
});

for (const ending of ['end', 'revoke']) {
  test(`completed stories and the hidden thread survive jumps and modes, then clear on ${ending}`, async (t) => {
    const { get, permission, finish } = await setup(t);
    await get('consent-button').fire('click');
    await get('choose-demo').fire('click');
    await get('start-button').fire('click');
    const choose = async (id) => {
      await get('stop-list').children.find((node) => node.id === `stop-${id}`).fire('click');
      await flush();
    };
    await choose('styx');
    assert.equal(get('listening-progress').textContent, '0 of 56 stories completed');
    assert.equal(get('story-listened').hidden, true);
    finish();
    assert.equal(get('listened-styx').hidden, false);
    assert.equal(get('story-listened').hidden, false);
    await get('simulation-buttons').children.find((node) => node.textContent === 'Go to Penrose Library').fire('click');
    await flush();
    assert.equal(get('listening-progress').textContent, '1 of 56 stories completed');
    finish();
    await get('switch-mode').fire('click');
    assert.equal(get('listening-progress').textContent, '2 of 56 stories completed');
    await choose('memorial');
    finish();
    assert.equal(get('bonus-reveal').hidden, false);
    assert.equal(get('trail-details').open, true);
    await choose('memorial');
    finish();
    assert.equal(get('listening-progress').textContent, '3 of 56 stories completed');
    if (ending === 'end') await get('end-button').fire('click');
    else { permission.state = 'denied'; permission.onchange(); }
    assert.equal(get('listening-progress').textContent, '0 of 56 stories completed');
    assert.equal(get('bonus-reveal').hidden, true);
    assert.equal(get('trail-details').open, false);
    assert.equal(get('listened-styx').hidden, true);
  });
}

test('finishing all stories displays collection completion, while paused choices cannot resume audio', async (t) => {
  const { get, finish, playback } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  for (const stop of landmarks) {
    await get('stop-list').children.find((node) => node.id === `stop-${stop.id}`).fire('click');
    await flush();
    finish();
  }
  assert.equal(get('listening-progress').textContent, '56 of 56 stories completed');
  assert.equal(get('collection-complete').hidden, false);
  const count = playback.mock.callCount();
  document.hidden = true;
  await document.fire('visibilitychange');
  document.hidden = false;
  await get('stop-list').children[0].fire('click');
  await get('follow-walk').fire('click');
  assert.equal(playback.mock.callCount(), count);
  assert.equal(get('play-button').disabled, true);
  await get('end-button').fire('click');
});

test('search and category update the existing list, show no matches, and reset together', async (t) => {
  const { get } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  const buttons = [...get('stop-list').children];
  const visible = () => buttons.filter((b) => !b.hidden).map((b) => b.id);
  assert.equal(get('place-results').textContent, '56 of 56 places');
  get('place-search').value = 'Penrose';
  await get('place-search').fire('input');
  assert.deepEqual(visible(), ['stop-penrose', 'stop-penrose-house']);
  get('place-category').value = 'academics';
  await get('place-category').fire('change');
  assert.deepEqual(visible(), ['stop-penrose']);
  assert.equal(get('place-results').textContent, '1 of 56 places');
  get('place-category').value = 'housing';
  await get('place-category').fire('change');
  assert.equal(visible().length, 0);
  assert.equal(get('no-place-results').hidden, false);
  await get('reset-place-filters').fire('click');
  assert.equal(visible().length, landmarks.length);
  assert.equal(get('place-search').value, '');
  assert.equal(get('place-category').value, 'all');
  assert.equal(get('reset-place-filters').disabled, true);
  assert.equal(get('no-place-results').hidden, true);
  assert.deepEqual(get('stop-list').children, buttons, 'filtering preserves distance and selection nodes');
});

test('filtering does not interrupt playback or block an automatic arrival outside the results', async (t) => {
  const { get, move, playback } = await setup(t);
  await get('consent-button').fire('click');
  await get('start-button').fire('click');
  move(landmarks.find((s) => s.id === 'penrose').listeningPosition);
  await flush();
  assert.equal(playback.mock.callCount(), 1);
  get('place-search').value = 'nothing-matches-this';
  await get('place-search').fire('input');
  assert.equal(get('story-title').textContent, 'Penrose Library');
  assert.equal(get('play-button').getAttribute('aria-label'), 'Pause story');
  assert.equal(playback.mock.callCount(), 1);
  move(landmarks.find((s) => s.id === 'reid').listeningPosition);
  await flush();
  assert.equal(get('story-title').textContent, 'Reid Campus Center');
  assert.equal(playback.mock.calls.at(-1).arguments[0].id, 'reid');
  assert.equal(get('place-results').textContent, '0 of 56 places');
});

for (const ending of ['end', 'revoke']) {
  test(`${ending} clears search and category before the next session`, async (t) => {
    const { get, permission } = await setup(t);
    await get('consent-button').fire('click');
    await get('start-button').fire('click');
    get('place-search').value = 'Maxey';
    await get('place-search').fire('input');
    get('place-category').value = 'academics';
    await get('place-category').fire('change');
    if (ending === 'end') await get('end-button').fire('click');
    else { permission.state = 'denied'; permission.onchange(); }
    assert.equal(get('place-search').value, '');
    assert.equal(get('place-category').value, 'all');
    assert.equal(get('place-results').textContent, '56 of 56 places');
  });
}

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

for (const action of ['cancel', 'hide', 'end', 'revoke', 'mode', 'seek', 'leave', 'poor GPS']) {
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
  await flush();
  assert.match(get('story-transcript').textContent, /Reid Campus Center/);
  t.mock.timers.tick(4000);
  assert.equal(get('audio-status').textContent, 'Still loading… You can read the story below.');
  assert.deepEqual(preparation.mock.calls[0].arguments[0].map((stop) => stop.id), ['reid']);
  gate.resolve();
  await flush();
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
  await flush();
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
