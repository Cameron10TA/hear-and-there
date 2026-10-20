import { landmarks, campus, simulation } from './landmarks.js';
import {
  locate,
  validFix,
  distanceMeters,
  simulationPosition,
  formatDistance,
} from './proximity.js';
import { StoryAudio } from './audio.js';

const $ = (id) => document.getElementById(id);
const state = {
  consent: false,
  mode: 'live',
  running: false,
  paused: false,
  requesting: false,
  fix: null,
  watcher: null,
  activeId: null,
  selectedId: null,
  visited: new Set(),
  elapsed: 0,
  demoMoving: true,
  lastTick: 0,
  tick: null,
  permission: null,
  requestGeneration: 0,
  audioError: '',
  positionError: '',
};
const audio = new StoryAudio(renderAudio);
let map,
  userMarker,
  accuracyCircle,
  stopMarkers = new Map(),
  lastLocationRender = 0;
const time = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const announce = (message) => {
  $('announcement').textContent = message;
};
const message = (value) => {
  $('location-message').textContent = value;
};

function selectMode(mode) {
  state.mode = mode;
  $('choose-live').setAttribute('aria-pressed', String(mode === 'live'));
  $('choose-demo').setAttribute('aria-pressed', String(mode === 'demo'));
}
$('choose-live').addEventListener('click', () => selectMode('live'));
$('choose-demo').addEventListener('click', () => selectMode('demo'));

function positionFrom(result) {
  return {
    latitude: result.coords.latitude,
    longitude: result.coords.longitude,
    accuracy: result.coords.accuracy,
    timestamp: result.timestamp,
  };
}

async function monitorPermission() {
  if (!navigator.permissions?.query) return;
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    state.permission = permission;
    permission.onchange = () => {
      if (permission.state !== 'granted' && state.consent)
        blockLocation('Location access changed. Allow location again to continue.');
    };
    if (permission.state === 'denied')
      blockLocation(
        'Location access is blocked. Allow it in your browser’s website settings, then try again.'
      );
  } catch {
    /* Safari versions without a permissions query still enforce get/watchPosition. */
  }
}

function stopWatching() {
  if (state.watcher !== null) navigator.geolocation.clearWatch(state.watcher);
  state.watcher = null;
}

function resetSession() {
  state.running = false;
  state.paused = false;
  selectMode('live');
  state.activeId = null;
  state.selectedId = null;
  state.audioError = '';
  state.positionError = '';
  state.visited.clear();
  state.elapsed = 0;
  state.demoMoving = true;
  state.fix = null;
  stopWatching();
  clearInterval(state.tick);
  state.tick = null;
  audio.stop();
  audio.stopId = null;
  audio.setMuted(false);
  void audio.suspend();
  if (map) {
    map.remove();
    map = null;
    stopMarkers.clear();
    userMarker = null;
    accuracyCircle = null;
  }
  $('story-card').hidden = true;
  $('between-stops').hidden = false;
  $('resume-panel').hidden = true;
  $('explorer').hidden = true;
  $('welcome').hidden = false;
  $('start-button').disabled = false;
  $('start-button').innerHTML = 'Start exploring <span aria-hidden="true">→</span>';
}

function blockLocation(reason) {
  state.requestGeneration++;
  state.consent = false;
  state.requesting = false;
  resetSession();
  $('ready-panel').hidden = true;
  $('consent-button').hidden = false;
  $('consent-button').disabled = false;
  $('consent-button').innerHTML =
    '<span class="button-icon" aria-hidden="true">⌖</span> Try location again <span aria-hidden="true">→</span>';
  message(reason);
  announce(reason);
  window.scrollTo({ top: 0 });
}

function errorText(error) {
  if (error.code === 1)
    return 'Location access is required, including for the simulated walk. On iPhone, allow location for this website in Safari’s website settings and make sure Location Services is enabled, then try again.';
  if (error.code === 2)
    return 'Your location is unavailable. Check that Location Services is enabled and try again, ideally outdoors.';
  return 'Finding your location took too long. Check Location Services and your connection, then try again.';
}

$('consent-button').addEventListener('click', () => {
  if (state.requesting) return;
  if (!window.isSecureContext) {
    message('Location needs a secure connection. Open the HTTPS version of this website.');
    return;
  }
  if (!navigator.geolocation) {
    message('This browser cannot provide location. Open this website in Safari on your iPhone.');
    return;
  }
  state.requesting = true;
  const request = ++state.requestGeneration;
  $('consent-button').disabled = true;
  message('Choose Allow when your browser asks for location access.');
  navigator.geolocation.getCurrentPosition(
    (result) => {
      if (request !== state.requestGeneration) return;
      state.requesting = false;
      state.consent = true;
      state.fix = positionFrom(result);
      $('consent-button').hidden = true;
      $('consent-button').disabled = false;
      $('ready-panel').hidden = false;
      message('Choose a live walk or try the simulated walk, then tap Start exploring.');
      void monitorPermission();
      $('start-button').focus({ preventScroll: true });
    },
    (error) => {
      if (request !== state.requestGeneration) return;
      state.requesting = false;
      $('consent-button').disabled = false;
      blockLocation(errorText(error));
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
  );
});

function createMap() {
  if (!window.L) {
    $('map-error').hidden = false;
    $('map-error').textContent =
      'The map could not load. Landmark distances and stories still work.';
    return;
  }
  map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false,
    minZoom: 15,
    maxZoom: 19,
    maxBounds: campus.bounds,
    maxBoundsViscosity: 0.8,
    attributionControl: true,
  });
  L.control.zoom({ position: 'topright' }).addTo(map);
  map.fitBounds(campus.bounds, { padding: [18, 18], maxZoom: 17 });
  const tiles = L.tileLayer(campus.tileUrl, {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',
    updateWhenIdle: true,
    keepBuffer: 1,
  }).addTo(map);
  let tileFailures = 0;
  tiles.on('tileerror', () => {
    if (++tileFailures >= 2) $('map-error').hidden = false;
  });
  tiles.on('tileload', () => {
    tileFailures = 0;
    $('map-error').hidden = true;
  });
  landmarks.forEach((stop, index) => {
    L.circle(stop.coordinates, {
      radius: stop.radius,
      color: '#002868',
      weight: 1,
      dashArray: '4 5',
      fillColor: '#ffc627',
      fillOpacity: 0.12,
      interactive: false,
    }).addTo(map);
    const marker = L.marker(stop.coordinates, {
      icon: landmarkIcon(index, false),
      title: `Open ${stop.name} story`,
      alt: `Open ${stop.name} story`,
      keyboard: true,
    }).addTo(map);
    marker.getElement().setAttribute('aria-label', `Open ${stop.name} story`);
    marker.getElement().addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopPropagation();
      marker.fire('click');
    });
    marker.bindTooltip(stop.name, {
      permanent: false,
      direction: 'bottom',
      offset: [0, 20],
      className: 'landmark-tooltip',
    });
    marker.on('click', () => {
      selectStop(stop);
      if (window.innerWidth < 760)
        $('story-card').scrollIntoView({
          behavior: reducedMotion() ? 'instant' : 'smooth',
          block: 'start',
        });
    });
    stopMarkers.set(stop.id, marker);
  });
  requestAnimationFrame(() => map.invalidateSize());
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function landmarkIcon(index, active) {
  return L.divIcon({
    className: 'landmark-marker',
    html: `<span class="marker-inner${active ? ' active' : ''}">${String(index + 1).padStart(2, '0')}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function buildStopList() {
  $('stop-list').replaceChildren();
  for (const stop of landmarks) {
    const button = document.createElement('button');
    button.className = 'stop-button';
    button.id = `stop-${stop.id}`;
    button.setAttribute('aria-pressed', 'false');
    const img = document.createElement('img');
    img.src = stop.image;
    img.alt = '';
    const info = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = stop.name;
    const distance = document.createElement('small');
    distance.id = `distance-${stop.id}`;
    distance.textContent = 'Locating…';
    info.append(title, distance);
    const arrow = document.createElement('span');
    arrow.className = 'stop-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(img, info, arrow);
    button.addEventListener('click', () => selectStop(stop));
    $('stop-list').append(button);
  }
}

function buildSimulationButtons() {
  const container = $('simulation-buttons');
  const toggle = $('simulation-toggle');
  container.replaceChildren(toggle);
  for (const stop of landmarks) {
    const arrival = simulation.find((frame) => frame.stopId === stop.id);
    if (!arrival) continue;
    const button = document.createElement('button');
    button.textContent = `Go to ${stop.name}`;
    button.addEventListener('click', () => seekDemo(arrival.seconds));
    container.append(button);
  }
}

function selectStop(stop) {
  if (!state.running || !state.consent) return;
  if (state.selectedId !== stop.id) {
    audio.stop();
    audio.stopId = stop.id;
    state.audioError = '';
    $('transcript').open = false;
  }
  state.selectedId = stop.id;
  $('story-image').src = stop.image;
  $('story-image').alt = stop.imageAlt;
  $('story-category').textContent = stop.category;
  $('story-title').textContent = stop.name;
  $('story-description').textContent = stop.description;
  $('story-transcript').textContent = stop.transcript;
  $('story-source').href = stop.source;
  $('story-card').hidden = false;
  $('between-stops').hidden = true;
  for (const landmark of landmarks)
    $(`stop-${landmark.id}`).setAttribute('aria-pressed', String(landmark.id === stop.id));
  renderAudio();
}

function renderAudio() {
  const playing = audio.playing || audio.pending;
  $('play-button').textContent = playing ? 'Ⅱ' : '▶';
  $('play-button').setAttribute(
    'aria-label',
    playing
      ? 'Pause story'
      : audio.offset > 0 && audio.offset < audio.duration
        ? 'Resume story'
        : 'Play story'
  );
  $('play-button').disabled = state.paused;
  $('audio-status').textContent =
    state.audioError ||
    (state.paused
      ? 'Walk paused'
      : audio.pending
        ? 'You’ve arrived…'
        : audio.playing
          ? audio.muted
            ? 'Playing · muted'
            : 'Now playing'
          : audio.offset >= audio.duration && audio.duration
            ? 'Listen again'
            : audio.offset > 0
              ? 'Paused · tap to resume'
              : 'Sample narration');
  $('elapsed-time').textContent = time(audio.elapsed);
  $('total-time').textContent = time(audio.duration);
  const percent = audio.duration ? Math.min(100, (audio.elapsed / audio.duration) * 100) : 0;
  $('audio-progress').style.width = `${percent}%`;
  document
    .querySelector('.progress-track')
    .setAttribute('aria-valuenow', String(Math.round(percent)));
  $('mute-button').setAttribute('aria-pressed', String(audio.muted));
  $('mute-button').setAttribute('aria-label', audio.muted ? 'Unmute audio' : 'Mute audio');
}

function showMode() {
  $('mode-label').textContent =
    state.mode === 'demo' ? 'Simulated campus walk' : 'Live campus walk';
  $('simulation-panel').hidden = state.mode !== 'demo';
  $('switch-mode').textContent =
    state.mode === 'demo' ? 'Return to live location ↗' : 'Try simulated walking ↗';
  $('simulation-toggle').textContent = state.demoMoving
    ? 'Pause movement'
    : state.elapsed >= simulation.at(-1).seconds
      ? 'Restart walk'
      : 'Continue movement';
}

function watchLocation() {
  stopWatching();
  state.watcher = navigator.geolocation.watchPosition(
    (result) => {
      if (!state.running || !state.consent || state.paused) return;
      state.fix = positionFrom(result);
      state.positionError = '';
      if (state.mode === 'live') updateLocation();
    },
    (error) => {
      if (!state.running || state.paused) return;
      if (error.code === 1) {
        blockLocation(errorText(error));
        return;
      }
      if (state.mode === 'live') {
        state.fix = null;
        state.positionError =
          error.code === 2
            ? 'Location unavailable · check Location Services'
            : 'Waiting for a fresh location…';
        updateLocation();
      }
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
  );
}

$('start-button').addEventListener('click', async () => {
  if (!state.consent || state.permission?.state === 'denied') return;
  // Unlock synchronously inside the user gesture; no awaits before this call.
  const unlocking = audio.unlock();
  const request = state.requestGeneration;
  $('start-button').disabled = true;
  $('start-button').textContent = 'Getting your walk ready…';
  try {
    await unlocking;
    await audio.prepare(landmarks);
  } catch (error) {
    state.audioError = error.message;
  }
  if (!state.consent || request !== state.requestGeneration) return;
  state.running = true;
  state.paused = false;
  state.lastTick = performance.now();
  $('welcome').hidden = true;
  $('explorer').hidden = false;
  buildStopList();
  buildSimulationButtons();
  showMode();
  createMap();
  watchLocation();
  state.tick = setInterval(tick, 250);
  window.scrollTo({ top: 0 });
  if (document.hidden) pauseSession();
  else updateLocation();
  announce(
    state.mode === 'demo'
      ? 'Simulated walk started. Location on the map is simulated.'
      : 'Your walk has started.'
  );
});

function renderMapPosition(coordinates, accuracy) {
  if (!map) return;
  // Keep tile requests campus-bound, including when testing from far away.
  if (distanceMeters(coordinates, campus.center) > 650) {
    if (userMarker) {
      map.removeLayer(userMarker);
      userMarker = null;
    }
    if (accuracyCircle) {
      map.removeLayer(accuracyCircle);
      accuracyCircle = null;
    }
    return;
  }
  if (!userMarker)
    userMarker = L.marker(coordinates, {
      icon: L.divIcon({
        className: 'user-marker',
        html: '<span></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
      title: state.mode === 'demo' ? 'Simulated position' : 'Your position',
      interactive: false,
      zIndexOffset: 500,
    }).addTo(map);
  else userMarker.setLatLng(coordinates);
  if (!accuracyCircle)
    accuracyCircle = L.circle(coordinates, {
      radius: accuracy,
      color: '#276eb6',
      weight: 1,
      fillColor: '#276eb6',
      fillOpacity: 0.07,
      interactive: false,
    }).addTo(map);
  else accuracyCircle.setLatLng(coordinates).setRadius(accuracy);
}

function updateLocation() {
  if (!state.running || state.paused || !state.consent) return;
  let coordinates, accuracy;
  if (state.mode === 'demo') {
    const point = simulationPosition(simulation, state.elapsed);
    coordinates = point.coordinates;
    accuracy = 5;
    $('gps-status').textContent = 'Demo position · no real movement needed';
    $('simulation-label').textContent = point.complete
      ? 'Walk complete. Replay a stop or explore again.'
      : point.label;
    $('simulation-seek').value = String(state.elapsed);
    $('simulation-time').textContent =
      `${time(state.elapsed)} / ${time(simulation.at(-1).seconds)}`;
    if (point.complete && state.demoMoving) {
      state.demoMoving = false;
      showMode();
    }
  } else {
    if (!validFix(state.fix, Date.now(), campus)) {
      $('gps-status').textContent =
        state.positionError ||
        (state.fix?.accuracy > campus.maximumAccuracy
          ? 'Location is too approximate'
          : 'Waiting for a fresh location…');
      $('nearby-title').textContent = 'Finding your place.';
      $('nearby-eyebrow').textContent = 'LOCATION SIGNAL';
      $('nearby-message').textContent =
        state.fix?.accuracy > campus.maximumAccuracy
          ? 'Try stepping outdoors and enabling Precise Location. Automatic stories wait for a clearer signal.'
          : 'Automatic audio is paused until your location updates. You can still read a story or try simulated walking.';
      if (audio.playing || audio.pending) audio.pause();
      if (userMarker && map) {
        map.removeLayer(userMarker);
        userMarker = null;
      }
      if (accuracyCircle && map) {
        map.removeLayer(accuracyCircle);
        accuracyCircle = null;
      }
      for (const stop of landmarks) $(`distance-${stop.id}`).textContent = 'Waiting for location';
      return;
    }
    coordinates = [state.fix.latitude, state.fix.longitude];
    accuracy = state.fix.accuracy;
    $('gps-status').textContent = `Location connected · ±${Math.round(accuracy)} m`;
  }
  renderMapPosition(coordinates, accuracy);
  const result = locate(coordinates, landmarks, state.activeId);
  for (const { stop, distance } of result.distances)
    $(`distance-${stop.id}`).textContent =
      stop.id === result.active?.id ? 'You’re in listening range' : formatDistance(distance);
  const changed = state.activeId !== (result.active?.id || null);
  state.activeId = result.active?.id || null;
  if (changed) {
    landmarks.forEach((stop, index) =>
      stopMarkers.get(stop.id)?.setIcon(landmarkIcon(index, state.activeId === stop.id))
    );
  }
  if (result.active) {
    $('nearby-eyebrow').textContent = 'YOU’VE FOUND A STORY';
    $('nearby-title').textContent = 'You’re here.';
    $('nearby-message').textContent =
      `You’re near ${result.active.name}. Take a moment to listen and look around.`;
    if (changed && !state.visited.has(result.active.id)) {
      state.visited.add(result.active.id);
      selectStop(result.active);
      announce(`You’re near ${result.active.name}. A story is ready.`);
      if (audio.buffers.has(result.active.id)) {
        audio.offset = 0;
        audio.play(result.active, true).catch((error) => {
          state.audioError = error.message;
          renderAudio();
        });
      } else {
        state.audioError = 'Tap play to load the story';
        renderAudio();
      }
    }
  } else {
    const offCampus = distanceMeters(coordinates, campus.center) > 650;
    $('nearby-eyebrow').textContent = offCampus ? 'WHITMAN IS WAITING' : 'LISTEN TO WHAT’S NEARBY';
    $('nearby-title').textContent = offCampus ? 'Explore from anywhere.' : 'A little closer.';
    $('nearby-message').textContent = offCampus
      ? 'You’re away from campus. Try the simulated walk to experience all nine landmarks, or come back when you’re at Whitman.'
      : `${result.nearest.stop.name} is ${formatDistance(result.nearest.distance).toLowerCase()}. A story starts when you enter its listening area.`;
  }
}

function tick() {
  const now = performance.now();
  const dt = Math.min(1, (now - state.lastTick) / 1000);
  state.lastTick = now;
  if (!state.running || state.paused || document.hidden) return;
  if (state.mode === 'demo' && state.demoMoving)
    state.elapsed = Math.min(simulation.at(-1).seconds, state.elapsed + dt);
  if (now - lastLocationRender >= 750) {
    updateLocation();
    lastLocationRender = now;
  }
  renderAudio();
}

function pauseSession() {
  if (!state.running) return;
  state.paused = true;
  stopWatching();
  void audio.suspend();
  $('resume-panel').hidden = false;
  $('gps-status').textContent = 'Paused while you’re away';
  renderAudio();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseSession();
});
window.addEventListener('pagehide', pauseSession);
window.addEventListener('pageshow', (event) => {
  if (event.persisted && state.running) pauseSession();
});

$('resume-button').addEventListener('click', async () => {
  if (!state.consent || !state.running) return;
  const unlocking = audio.unlock();
  $('resume-button').disabled = true;
  // A fresh native permission check also protects Safari without Permissions API support.
  try {
    await unlocking;
    await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (result) => {
          state.fix = positionFrom(result);
          resolve();
        },
        reject,
        { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
      )
    );
    if (!state.running || !state.consent || document.hidden) return;
    state.paused = false;
    state.lastTick = performance.now();
    $('resume-panel').hidden = true;
    watchLocation();
    updateLocation();
    renderAudio();
    // Previously playing stories remain paused; the listener chooses whether to resume them.
  } catch (error) {
    if (error.code === 1) blockLocation(errorText(error));
    else {
      $('gps-status').textContent = 'Could not resume. Check Location Services and try again.';
      announce('Could not resume. Check Location Services and try again.');
    }
  } finally {
    $('resume-button').disabled = false;
  }
});

$('play-button').addEventListener('click', async () => {
  if (!state.running || state.paused || !state.consent) return;
  if (audio.playing || audio.pending) {
    audio.pause();
    return;
  }
  const stop = landmarks.find((item) => item.id === state.selectedId);
  if (!stop) return;
  const generation = state.requestGeneration;
  try {
    await audio.unlock();
    await audio.prepare([stop]);
    if (
      !state.running ||
      state.paused ||
      !state.consent ||
      generation !== state.requestGeneration ||
      state.selectedId !== stop.id
    )
      return;
    state.audioError = '';
    await audio.play(stop);
  } catch (error) {
    state.audioError = error.message;
    renderAudio();
  }
});
$('mute-button').addEventListener('click', () => audio.setMuted(!audio.muted));

function changeMode() {
  if (!state.running || !state.consent || state.paused) return;
  audio.stop();
  state.mode = state.mode === 'demo' ? 'live' : 'demo';
  state.activeId = null;
  state.visited.clear();
  state.elapsed = 0;
  state.demoMoving = true;
  state.lastTick = performance.now();
  showMode();
  updateLocation();
  recenter();
  announce(state.mode === 'demo' ? 'Simulated walking enabled.' : 'Using your live location.');
}
$('switch-mode').addEventListener('click', changeMode);
function seekDemo(value) {
  if (state.mode !== 'demo' || !state.running || state.paused || !state.consent) return;
  audio.stop();
  state.elapsed = Number(value);
  state.activeId = null;
  state.visited.clear();
  state.lastTick = performance.now();
  updateLocation();
  showMode();
}
$('simulation-seek').addEventListener('input', (event) => seekDemo(event.target.value));
$('simulation-toggle').addEventListener('click', () => {
  if (state.paused) return;
  if (state.elapsed >= simulation.at(-1).seconds) {
    seekDemo(0);
    state.demoMoving = true;
  } else state.demoMoving = !state.demoMoving;
  state.lastTick = performance.now();
  showMode();
});
function recenter() {
  if (map)
    map.fitBounds(campus.bounds, {
      padding: [18, 18],
      maxZoom: 17,
      animate: !reducedMotion(),
    });
}
$('recenter-button').addEventListener('click', recenter);
$('end-button').addEventListener('click', () => {
  state.requestGeneration++;
  resetSession();
  state.consent = false;
  $('ready-panel').hidden = true;
  $('consent-button').hidden = false;
  message('Walk ended. Your session location and progress have been cleared.');
  window.scrollTo({ top: 0 });
  $('consent-button').focus({ preventScroll: true });
});
for (const id of ['how-button', 'about-button'])
  $(id).addEventListener('click', () => $('about-dialog').showModal());
$('close-dialog').addEventListener('click', () => $('about-dialog').close());
$('about-dialog').addEventListener('click', (event) => {
  if (event.target === $('about-dialog')) {
    const rect = event.target.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      event.target.close();
  }
});
