// Local QA fixture: mock only the Geolocation and Permissions APIs, leaving real
// DOM rendering, audio loading/decoding, map, timers, and event handlers intact.
import { landmarks } from '../src/landmarks.js';
let position = [...landmarks[0].coordinates];
let accuracy = 8;
let age = 0;
let denied = false;
let failedAudio = false;
let holdAudio = false;
let failedTiles = false;
const pendingAudio = new Set();
let watcher = null;
const permission = { state: 'granted', onchange: null };
const result = () => ({
  coords: { latitude: position[0], longitude: position[1], accuracy },
  timestamp: Date.now() - age,
});
const realFetch = window.fetch.bind(window);
window.fetch = async (input, options) => {
  const url = new URL(typeof input === 'string' ? input : input.url, document.baseURI);
  const blocked = new URL(
    landmarks.find((stop) => stop.id === 'cleveland').audio,
    document.baseURI
  );
  if (failedAudio && url.href === blocked.href)
    return Promise.resolve(new Response('Local QA audio failure', { status: 503 }));
  if (holdAudio && url.pathname.includes('/assets/audio/')) {
    await new Promise((resolve, reject) => {
      const release = () => { cleanup(); resolve(); };
      const abort = () => { cleanup(); reject(new DOMException('Aborted', 'AbortError')); };
      const cleanup = () => { pendingAudio.delete(release); options?.signal?.removeEventListener('abort', abort); };
      if (options?.signal?.aborted) { abort(); return; }
      pendingAudio.add(release);
      options?.signal?.addEventListener('abort', abort, { once: true });
    });
  }
  return realFetch(input, options);
};
if (window.L) {
  const tileUrl = L.TileLayer.prototype.getTileUrl;
  L.TileLayer.prototype.getTileUrl = function (coordinates) {
    return failedTiles ? 'tests/missing-qa-tile.png' : tileUrl.call(this, coordinates);
  };
}
Object.defineProperty(navigator, 'geolocation', {
  configurable: true,
  value: {
    getCurrentPosition(success, failure) {
      setTimeout(() => (denied ? failure({ code: 1 }) : success(result())), 20);
    },
    watchPosition(success, failure) {
      watcher = { success, failure };
      setTimeout(() => (denied ? failure({ code: 1 }) : success(result())), 20);
      return 1;
    },
    clearWatch() {
      watcher = null;
    },
  },
});
Object.defineProperty(navigator, 'permissions', {
  configurable: true,
  value: {
    async query() {
      return permission;
    },
  },
});
const bar = document.createElement('details');
bar.style.cssText =
  'position:relative;z-index:2000;padding:8px;background:#ffe4e4;display:flex;gap:6px;flex-wrap:wrap;font:11px Arial';
bar.setAttribute('aria-label', 'LOCAL TEST CONTROLS');
const label = document.createElement('summary');
label.textContent = 'LOCAL QA ONLY · mocked GPS';
bar.append(label);
function control(text, action) {
  const button = document.createElement('button');
  button.textContent = text;
  button.style.cssText = 'background:white;padding:8px;border:1px solid #900';
  button.onclick = action;
  bar.append(button);
}
function emit() {
  watcher?.success(result());
}
control('QA: grant location', () => {
  denied = false;
  permission.state = 'granted';
  permission.onchange?.();
});
control('QA: deny location', () => {
  denied = true;
  permission.state = 'denied';
  permission.onchange?.();
  watcher?.failure({ code: 1 });
});
for (const stop of landmarks) {
  control(`QA: ${stop.name}`, () => {
    position = [...stop.coordinates];
    accuracy = 8;
    age = 0;
    emit();
  });
  if (stop.listeningPosition) control(`QA: ${stop.name} path`, () => {
    position = [...stop.listeningPosition];
    accuracy = 8;
    age = 0;
    emit();
  });
}
control('QA: off campus', () => {
  position = [47.6, -122.3];
  accuracy = 8;
  age = 0;
  emit();
});
control('QA: poor GPS', () => {
  accuracy = 500;
  emit();
});
control('QA: location unavailable', () => watcher?.failure({ code: 2 }));
control('QA: stale GPS', () => {
  age = 60000;
  emit();
});
control('QA: fail Cleveland audio', () => {
  failedAudio = true;
});
control('QA: restore audio', () => {
  failedAudio = false;
});
control('QA: hold audio downloads', () => { holdAudio = true; });
control('QA: release audio downloads', () => {
  holdAudio = false;
  for (const release of pendingAudio) release();
});
control('QA: fail map tiles', () => { failedTiles = true; });
control('QA: restore map tiles', () => { failedTiles = false; });
control('QA: hide page', () => {
  Object.defineProperty(document, 'hidden', { configurable: true, value: true });
  document.dispatchEvent(new Event('visibilitychange'));
});
control('QA: show page', () => {
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  document.dispatchEvent(new Event('visibilitychange'));
});
document.body.prepend(bar);
await import('../src/app.js');
