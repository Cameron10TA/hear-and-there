// Local QA fixture: mock only the Geolocation and Permissions APIs, leaving real
// DOM rendering, audio loading/decoding, map, timers, and event handlers intact.
import { landmarks } from '../src/landmarks.js';
let position = [...landmarks[0].coordinates];
let accuracy = 8;
let denied = false;
let watcher = null;
const permission = { state: 'granted', onchange: null };
const result = () => ({ coords: { latitude: position[0], longitude: position[1], accuracy }, timestamp: Date.now() });
Object.defineProperty(navigator, 'geolocation', { configurable: true, value: {
  getCurrentPosition(success, failure) { setTimeout(() => denied ? failure({ code: 1 }) : success(result()), 20); },
  watchPosition(success, failure) { watcher = { success, failure }; setTimeout(() => denied ? failure({ code: 1 }) : success(result()), 20); return 1; },
  clearWatch() { watcher = null; }
} });
Object.defineProperty(navigator, 'permissions', { configurable: true, value: { async query() { return permission; } } });
const bar = document.createElement('div');
bar.style.cssText = 'position:relative;z-index:2000;padding:8px;background:#ffe4e4;display:flex;gap:6px;flex-wrap:wrap;font:11px Arial';
bar.setAttribute('aria-label', 'LOCAL TEST CONTROLS');
const label = document.createElement('strong'); label.textContent = 'LOCAL QA ONLY · mocked GPS'; bar.append(label);
function control(text, action) { const button = document.createElement('button'); button.textContent = text; button.style.cssText = 'background:white;padding:8px;border:1px solid #900'; button.onclick = action; bar.append(button); }
function emit() { watcher?.success(result()); }
control('QA: grant location', () => { denied = false; permission.state = 'granted'; permission.onchange?.(); });
control('QA: deny location', () => { denied = true; permission.state = 'denied'; permission.onchange?.(); watcher?.failure({ code: 1 }); });
control('QA: Styx', () => { position = [...landmarks[0].coordinates]; accuracy = 8; emit(); });
control('QA: courts', () => { position = [...landmarks[1].coordinates]; accuracy = 8; emit(); });
control('QA: off campus', () => { position = [47.6, -122.3]; accuracy = 8; emit(); });
control('QA: poor GPS', () => { accuracy = 500; emit(); });
control('QA: location unavailable', () => watcher?.failure({ code: 2 }));
control('QA: hide page', () => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
control('QA: show page', () => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }); document.dispatchEvent(new Event('visibilitychange')); });
document.body.prepend(bar);
await import('../src/app.js');
