import { landmarks, campus, simulation } from './landmarks.js';
import {
  locate,
  validFix,
  distanceMeters,
  simulationPosition,
  formatDistance,
  zoneBufferPixels,
} from './proximity.js';
import { StoryAudio } from './audio.js';
import { matchesFilters, placeCategories } from './catalog.js';
import { ListeningProgress, bonusTrail } from './progress.js';
import { tours, findTour, tourSummary } from './tours.js';
import { groupMapStops } from './map-pins.js';

const $ = (id) => document.getElementById(id);
$('stop-count').textContent = String(landmarks.length);
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
  manualStory: false,
  placeQuery: '',
  placeCategory: 'all',
  tourId: '',
  unlistenedOnly: false,
  visited: new Set(),
  elapsed: 0,
  demoMoving: true,
  lastTick: 0,
  tick: null,
  permission: null,
  requestGeneration: 0,
  audioError: '',
  audioRequest: 0,
  audioLoading: false,
  audioSlow: false,
  audioArrival: false,
  audioWaitTimer: null,
  unlocking: null,
  positionError: '',
};
const progress = new ListeningProgress();
const audio = new StoryAudio(renderAudio, completeStory);
const stopButtons = new Map();
const tourButtons = new Map();
let map,
  tileLayer,
  userMarker,
  accuracyCircle,
  stopMarkers = new Map(),
  stopAreas = new Map(),
  groupMarkers = new Map(),
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
  cancelStoryRequest();
  state.running = false;
  state.paused = false;
  selectMode('live');
  state.activeId = null;
  state.selectedId = null;
  state.manualStory = false;
  state.tourId = '';
  $('tour-select').value = '';
  buildTourStops();
  resetPlaceFilters();
  state.audioError = '';
  state.positionError = '';
  state.visited.clear();
  progress.reset();
  renderProgress();
  $('trail-details').open = false;
  $('simulation-jumps').open = false;
  $('tour-stops').open = false;
  state.elapsed = 0;
  state.demoMoving = true;
  state.fix = null;
  state.unlocking = null;
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
    tileLayer = null;
    stopMarkers.clear();
    stopAreas.clear();
    groupMarkers.clear();
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
  $('map-error').hidden = true;
  $('map-retry').hidden = false;
  if (!window.L) {
    $('map-error').hidden = false;
    $('map-retry').hidden = true;
    $('map-error-message').textContent =
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
  });
  tileLayer = tiles;
  let tileFailures = 0;
  let tileTimer;
  tiles.on('loading', () => {
    tileFailures = 0;
    clearTimeout(tileTimer);
    tileTimer = setTimeout(() => {
      $('map-error-message').textContent = 'The map is taking longer to load. You can still explore the stories below.';
      $('map-error').hidden = false;
    }, 8000);
  });
  tiles.on('tileerror', () => {
    tileFailures++;
    $('map-error-message').textContent = 'Some map tiles could not load. Stories and distances still work.';
    $('map-error').hidden = false;
  });
  tiles.on('load', () => {
    clearTimeout(tileTimer);
    if (!tileFailures) $('map-error').hidden = true;
  });
  map.on('unload', () => clearTimeout(tileTimer));
  tiles.addTo(map);
  landmarks.forEach((stop, index) => {
    const zoneStyle = {
      color: '#002868',
      weight: 1,
      dashArray: '4 5',
      fillColor: '#ffc627',
      fillOpacity: 0.12,
      interactive: false,
    };
    if (stop.zone) {
      const outline = stop.zone.walkingOutline ?? stop.zone.outline;
      const area = L.polygon(outline, {
        ...zoneStyle,
        color: '#ffc627',
        opacity: 0.2,
        dashArray: null,
        lineJoin: 'round',
        weight: zoneBufferPixels(stop, map.getZoom()) * 2,
      });
      const edge = L.polygon(outline, { ...zoneStyle, fill: false });
      stopAreas.set(stop.id, [area, edge]);
      map.on('zoomend', () => area.setStyle({ weight: zoneBufferPixels(stop, map.getZoom()) * 2 }));
    } else stopAreas.set(stop.id, [L.circle(stop.coordinates, { ...zoneStyle, radius: stop.radius })]);
    const marker = L.marker(stop.coordinates, {
      icon: landmarkIcon(index, false),
      title: `Listen to ${stop.name}`,
      alt: `Listen to ${stop.name}`,
      keyboard: true,
    });
    marker.on('add', () => labelMarker(marker, `Listen to ${stop.name}`));
    marker.bindTooltip(stop.name, {
      permanent: false,
      direction: 'bottom',
      offset: [0, 20],
      className: 'landmark-tooltip',
    });
    marker.on('click', () => {
      listenToStop(stop);
    });
    stopMarkers.set(stop.id, marker);
  });
  map.on('zoomend', renderMarkers);
  renderMarkers();
  requestAnimationFrame(() => map.invalidateSize());
}

function labelMarker(marker, label) {
  const element = marker.getElement();
  if (!element) return;
  element.setAttribute('aria-label', label);
  element.setAttribute('title', label);
  // Re-adding a filtered marker can create a new element. Assign one handler.
  element.onkeydown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    marker.fire('click');
  };
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function landmarkIcon(index, active) {
  const stop = landmarks[index];
  const listened = progress.completed.has(stop.id);
  const tour = findTour(state.tourId);
  const order = tour?.stopIds.indexOf(stop.id);
  const label = tour ? (order >= 0 ? String(order + 1).padStart(2, '0') : '•') : String(index + 1).padStart(2, '0');
  return L.divIcon({
    className: 'landmark-marker',
    html: `<span class="marker-inner${active ? ' active' : ''}${listened ? ' listened' : ''}">${label}${listened ? '<i aria-hidden="true">✓</i>' : ''}</span>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function buildStopList() {
  $('stop-list').replaceChildren();
  stopButtons.clear();
  for (const stop of landmarks) {
    const button = document.createElement('button');
    button.className = 'stop-button';
    button.id = `stop-${stop.id}`;
    button.setAttribute('aria-pressed', 'false');
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = stop.image;
    img.alt = '';
    const info = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = stop.name;
    const distance = document.createElement('small');
    distance.id = `distance-${stop.id}`;
    distance.textContent = 'Locating…';
    const badge = document.createElement('span');
    badge.id = `listened-${stop.id}`;
    badge.className = 'listened-badge';
    badge.textContent = '✓ Listened';
    badge.hidden = !progress.completed.has(stop.id);
    info.append(title, distance, badge);
    const arrow = document.createElement('span');
    arrow.className = 'stop-arrow';
    arrow.textContent = '▶';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(img, info, arrow);
    button.setAttribute('aria-label', `Listen to ${stop.name}`);
    button.addEventListener('click', () => listenToStop(stop));
    $('stop-list').append(button);
    stopButtons.set(stop.id, button);
  }
  filterPlaces();
  renderProgress();
}

function renderMarkers() {
  const matching = landmarks.filter(visiblePlace);
  if (!map || !state.running) {
    $('map-results').textContent = `${matching.length} matching places`;
    return;
  }
  const pinned = new Set([state.activeId, state.selectedId].filter(Boolean));
  const visible = landmarks.filter((stop) => visiblePlace(stop) || pinned.has(stop.id));
  const groups = groupMapStops(visible, (coordinates) => map.project(coordinates), map.getZoom(), pinned);
  const singleIds = new Set(groups.filter((group) => group.stops.length === 1).map((group) => group.stops[0].id));
  const clusters = groups.filter((group) => group.stops.length > 1);
  const keys = new Set(clusters.map((group) => group.key));
  for (const [key, marker] of groupMarkers) {
    if (!keys.has(key)) {
      map.removeLayer(marker);
      groupMarkers.delete(key);
    }
  }
  landmarks.forEach((stop, index) => {
    const marker = stopMarkers.get(stop.id);
    if (!marker) return;
    const shown = singleIds.has(stop.id);
    setLayerVisible(marker, shown);
    for (const area of stopAreas.get(stop.id) || []) setLayerVisible(area, shown);
    if (shown) {
      marker.setIcon(landmarkIcon(index, state.activeId === stop.id));
      marker.setZIndexOffset(pinned.has(stop.id) ? 1000 : 0);
      labelMarker(marker, `Listen to ${stop.name}${progress.completed.has(stop.id) ? ' · Listened' : ''}`);
    }
  });
  for (const group of clusters) {
    if (groupMarkers.has(group.key)) continue;
    const count = group.stops.length;
    const label = `Zoom into ${count} places: ${group.stops.slice(0, 3).map((stop) => stop.name).join(', ')}${count > 3 ? ', and more' : ''}`;
    const marker = L.marker(group.coordinates, {
      icon: L.divIcon({
        className: 'landmark-cluster', html: `<span class="cluster-inner">${count}</span>`,
        iconSize: [44, 44], iconAnchor: [22, 22],
      }),
      title: label, keyboard: true,
    });
    marker.on('add', () => labelMarker(marker, label));
    marker.on('click', () => {
      map.setView(group.coordinates, Math.min(19, map.getZoom() + 2), { animate: !reducedMotion() });
      $('map').focus({ preventScroll: true });
    });
    marker.bindTooltip(`${count} places · zoom in`, { direction: 'top', className: 'landmark-tooltip' });
    marker.addTo(map);
    groupMarkers.set(group.key, marker);
  }
  const kept = visible.length - matching.length;
  $('map-results').textContent = `${matching.length} matching places${clusters.length ? ' · Numbered groups zoom in' : ''}${kept ? ' · Current story/location kept visible' : ''}`;
}

function setLayerVisible(layer, visible) {
  if (visible && !map.hasLayer(layer)) layer.addTo(map);
  else if (!visible && map.hasLayer(layer)) map.removeLayer(layer);
}

function renderProgress() {
  const count = progress.completed.size;
  $('listening-progress').textContent = `${count} of ${landmarks.length} stories completed`;
  $('collection-complete').hidden = count !== landmarks.length;
  $('bonus-reveal').hidden = !progress.bonusUnlocked;
  $('trail-status').textContent = progress.bonusUnlocked
    ? 'Hidden thread complete. Your bonus is revealed below.'
    : `${progress.trailStep} of ${bonusTrail.length} clues completed in order`;
  for (const stop of landmarks) {
    const completed = progress.completed.has(stop.id);
    const button = stopButtons.get(stop.id);
    if (button) {
      $(`listened-${stop.id}`).hidden = !completed;
      button.setAttribute('aria-label', `Listen to ${stop.name}${completed ? ' · Listened' : ''}`);
    }
  }
  $('story-listened').hidden = !progress.completed.has(state.selectedId);
  renderTour();
  filterPlaces();
}

function completeStory(id) {
  if (!state.running || !state.consent || state.paused) return;
  const wasUnlocked = progress.bonusUnlocked;
  progress.finish(id);
  renderProgress();
  if (!wasUnlocked && progress.bonusUnlocked) {
    $('trail-details').open = true;
    announce('You found the hidden thread. Open the bonus below the place list.');
  }
}

function filterPlaces() {
  const tour = findTour(state.tourId);
  const scope = tour ? tourSummary(tour, landmarks).stops : landmarks;
  const ordered = [...scope, ...landmarks.filter((stop) => !scope.includes(stop))];
  if (stopButtons.size) {
    const list = $('stop-list');
    const buttons = ordered.map((stop) => stopButtons.get(stop.id));
    // Keep focused buttons attached when only visibility or completion changes.
    if (buttons.some((button, index) => button !== list.children[index])) list.replaceChildren(...buttons);
  }
  let count = 0;
  for (const stop of landmarks) {
    const matches = visiblePlace(stop);
    const button = stopButtons.get(stop.id);
    if (button) {
      if (!matches && document.activeElement === button) $('play-button').focus({ preventScroll: true });
      button.hidden = !matches;
    }
    if (matches) count++;
  }
  $('place-results').textContent = `${count} of ${scope.length} places`;
  $('no-place-results').hidden = count !== 0;
  $('no-place-results').textContent = state.unlistenedOnly
    ? 'No unlistened places match. Turn off Not listened to yet, reset filters, or choose another collection.'
    : 'No places match. Try another name, category, or collection.';
  $('reset-place-filters').disabled = !state.placeQuery && state.placeCategory === 'all' && !state.unlistenedOnly;
  renderMarkers();
}

function visiblePlace(stop) {
  return matchesFilters(stop, {
    query: state.placeQuery, category: state.placeCategory, tour: findTour(state.tourId),
    unlistenedOnly: state.unlistenedOnly, completed: progress.completed,
  });
}

function resetPlaceFilters() {
  state.placeQuery = '';
  state.placeCategory = 'all';
  state.unlistenedOnly = false;
  $('place-search').value = '';
  $('place-category').value = 'all';
  $('map-category').value = 'all';
  $('place-unlistened').checked = false;
  $('map-unlistened').checked = false;
  filterPlaces();
}

for (const id of ['place-category', 'map-category']) {
  $(id).replaceChildren();
  for (const category of placeCategories) {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.label;
    $(id).append(option);
  }
  $(id).value = 'all';
  $(id).addEventListener('change', () => {
    state.placeCategory = $(id).value;
    $('place-category').value = state.placeCategory;
    $('map-category').value = state.placeCategory;
    filterPlaces();
  });
}
for (const id of ['place-unlistened', 'map-unlistened']) {
  $(id).addEventListener('change', () => {
    state.unlistenedOnly = $(id).checked;
    $('place-unlistened').checked = state.unlistenedOnly;
    $('map-unlistened').checked = state.unlistenedOnly;
    filterPlaces();
  });
}
$('place-search').addEventListener('input', () => {
  state.placeQuery = $('place-search').value;
  filterPlaces();
});
$('reset-place-filters').addEventListener('click', () => {
  resetPlaceFilters();
  $('place-search').focus();
});

for (const tour of tours) {
  const option = document.createElement('option');
  option.value = tour.id;
  option.textContent = `${tour.name} · ${tour.stopIds.length} stops`;
  $('tour-select').append(option);
}
$('tour-select').addEventListener('change', () => {
  state.tourId = findTour($('tour-select').value)?.id || '';
  buildTourStops();
  renderTour();
  resetPlaceFilters();
});

function buildTourStops() {
  tourButtons.clear();
  $('tour-stop-list').replaceChildren();
  const tour = findTour(state.tourId);
  if (!tour) return;
  for (const stop of tourSummary(tour, landmarks).stops) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'tour-stop-button';
    button.addEventListener('click', () => listenToStop(stop));
    item.append(button);
    $('tour-stop-list').append(item);
    tourButtons.set(stop.id, button);
  }
}

function renderTour() {
  const tour = findTour(state.tourId);
  $('tour-details').hidden = !tour;
  if (!tour) return;
  const summary = tourSummary(tour, landmarks, progress.completed);
  $('tour-description').textContent = tour.description;
  $('tour-duration').textContent = `${summary.stops.length} stops · About ${summary.minutes} min of narration`;
  $('tour-progress').textContent = `${summary.completed} of ${summary.stops.length} stories completed`;
  $('tour-complete').hidden = Boolean(summary.next);
  $('tour-next').textContent = summary.next ? `Listen next: ${summary.next.name}` : 'Collection completed';
  $('tour-next').disabled = !summary.next || state.paused;
  for (const stop of summary.stops) {
    const button = tourButtons.get(stop.id);
    if (!button) continue;
    const label = `${stop.name}${progress.completed.has(stop.id) ? ' · Listened' : ''}`;
    button.textContent = label;
    button.setAttribute('aria-label', `Listen to ${label}`);
  }
}
$('tour-next').addEventListener('click', () => {
  const tour = findTour(state.tourId);
  const stop = tour && tourSummary(tour, landmarks, progress.completed).next;
  if (stop) listenToStop(stop);
});

function buildSimulationButtons() {
  $('simulation-seek').max = String(simulation.at(-1).seconds);
  const container = $('simulation-buttons');
  container.replaceChildren();
  for (const stop of landmarks) {
    const arrival = simulation.find((frame) => frame.stopId === stop.id);
    if (!arrival) continue;
    const button = document.createElement('button');
    button.textContent = `Go to ${stop.name}`;
    button.addEventListener('click', () => {
      if (state.paused) return;
      seekDemo(arrival.seconds);
      $('simulation-jumps').open = false;
      $('play-button').scrollIntoView({
        behavior: reducedMotion() ? 'instant' : 'smooth',
        block: 'nearest',
      });
    });
    container.append(button);
  }
}

function listenToStop(stop) {
  if (!state.running || !state.consent || state.paused || document.hidden) return;
  // Unlock inside the click, before any download or other asynchronous work.
  state.unlocking = audio.unlock();
  state.manualStory = true;
  if (state.mode === 'demo') state.demoMoving = false;
  selectStop(stop);
  audio.pause();
  showMode();
  void loadAndPlayStory(stop, false, state.unlocking);
  $('story-card').scrollIntoView({
    behavior: reducedMotion() ? 'instant' : 'smooth',
    block: 'nearest',
  });
}

function selectStop(stop) {
  if (!state.running || !state.consent) return;
  if (state.selectedId !== stop.id) {
    cancelStoryRequest();
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
  $('story-listened').hidden = !progress.completed.has(stop.id);
  $('between-stops').hidden = true;
  for (const landmark of landmarks)
    $(`stop-${landmark.id}`).setAttribute('aria-pressed', String(landmark.id === stop.id));
  renderMarkers();
  renderAudio();
}

function renderAudio() {
  const tour = findTour(state.tourId);
  $('tour-next').disabled = state.paused || !tour || !tourSummary(tour, landmarks, progress.completed).next;
  $('manual-playback').hidden = !state.manualStory;
  const playing = audio.playing || audio.pending;
  $('play-button').textContent = state.audioLoading ? '×' : playing ? 'Ⅱ' : state.audioError ? '↻' : '▶';
  $('play-button').setAttribute(
    'aria-label',
    state.audioLoading
      ? 'Cancel loading story'
      : state.audioError
        ? 'Retry story audio'
        : playing
          ? 'Pause story'
          : audio.offset > 0 && audio.offset < audio.duration
            ? 'Resume story'
            : 'Play story'
  );
  $('play-button').disabled = state.paused;
  let status = 'Sample narration';
  if (state.paused) status = 'Walk paused';
  else if (state.audioError) status = state.audioError;
  else if (state.audioLoading)
    status = state.audioSlow ? 'Still loading… You can read the story below.' : 'Loading story…';
  else if (audio.pending) status = 'You’ve arrived…';
  else if (audio.playing) status = audio.muted ? 'Playing · muted' : 'Now playing';
  else if (audio.duration && audio.offset >= audio.duration) status = 'Listen again';
  else if (audio.offset > 0) status = 'Paused · tap to resume';
  // The player ticks frequently; announce only actual status changes.
  if ($('audio-status').textContent !== status) $('audio-status').textContent = status;
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
    state.mode === 'demo' ? 'Return to live location' : 'Try simulated walking';
  $('follow-walk').textContent = state.mode === 'demo' ? 'Follow simulated walk' : 'Follow nearby stories';
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

$('start-button').addEventListener('click', () => {
  if (state.running || !state.consent || state.permission?.state === 'denied') return;
  // Unlock synchronously inside the user gesture; no awaits before this call.
  const unlocking = audio.unlock();
  state.unlocking = unlocking;
  const request = state.requestGeneration;
  $('start-button').disabled = true;
  $('start-button').textContent = 'Getting your walk ready…';
  void unlocking.then(() => {
    if (!state.running || state.paused || document.hidden)
      void audio.suspend();
  }).catch((error) => {
    if (request !== state.requestGeneration || state.unlocking !== unlocking || !state.running) return;
    state.audioError = error.message;
    renderAudio();
  });
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
      $('nearby-message').textContent =
        state.fix?.accuracy > campus.maximumAccuracy
          ? 'Try stepping outdoors and enabling Precise Location. Automatic stories wait for a clearer signal.'
          : 'Automatic audio waits for a fresh location. Choose any story to listen, or try simulated walking.';
      if (!state.manualStory && (audio.playing || audio.pending)) audio.pause();
      if (state.audioLoading && state.audioArrival) cancelStoryRequest();
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
  if (changed && state.audioLoading && state.audioArrival) cancelStoryRequest();
  state.activeId = result.active?.id || null;
  if (changed) renderMarkers();
  if (result.active) {
    $('nearby-message').textContent =
      `Nearby: ${result.active.name}. You’re in listening range.`;
    if (changed && !state.manualStory && !state.visited.has(result.active.id)) {
      state.visited.add(result.active.id);
      selectStop(result.active);
      announce(`You’re near ${result.active.name}. A story is ready.`);
      audio.offset = 0;
      void loadAndPlayStory(result.active, true, state.unlocking);
    }
  } else {
    const offCampus = distanceMeters(coordinates, campus.center) > 650;
    $('nearby-message').textContent = offCampus
      ? 'You’re away from campus. Try the simulated walk to experience all the landmarks, or come back when you’re at Whitman.'
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
  cancelStoryRequest();
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
  if (!state.consent || !state.running || !state.paused) return;
  const request = state.requestGeneration;
  const unlocking = audio.unlock();
  state.unlocking = unlocking;
  $('resume-button').disabled = true;
  // A fresh native permission check also protects Safari without Permissions API support.
  try {
    await unlocking;
    if (request !== state.requestGeneration || !state.running || !state.consent || document.hidden) return;
    await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (result) => {
          if (request !== state.requestGeneration) {
            resolve();
            return;
          }
          state.fix = positionFrom(result);
          resolve();
        },
        reject,
        { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
      )
    );
    if (request !== state.requestGeneration || !state.running || !state.consent || document.hidden) return;
    state.paused = false;
    state.lastTick = performance.now();
    $('resume-panel').hidden = true;
    watchLocation();
    updateLocation();
    renderAudio();
    // Previously playing stories remain paused; the listener chooses whether to resume them.
  } catch (error) {
    if (request !== state.requestGeneration || !state.running) return;
    if (error.code === 1) blockLocation(errorText(error));
    else {
      $('gps-status').textContent = 'Could not resume. Check Location Services and try again.';
      announce('Could not resume. Check Location Services and try again.');
    }
  } finally {
    $('resume-button').disabled = false;
  }
});

function cancelStoryRequest() {
  const wasLoading = state.audioLoading;
  state.audioRequest++;
  clearTimeout(state.audioWaitTimer);
  state.audioLoading = false;
  state.audioSlow = false;
  state.audioArrival = false;
  if (wasLoading) renderAudio();
}

async function loadAndPlayStory(stop, arrival, unlocking) {
  cancelStoryRequest();
  const token = state.audioRequest;
  const generation = state.requestGeneration;
  const current = () => token === state.audioRequest && generation === state.requestGeneration &&
    state.running && state.consent && !state.paused && !document.hidden && state.selectedId === stop.id;
  state.audioLoading = true;
  state.audioArrival = arrival;
  state.audioError = '';
  renderAudio();
  state.audioWaitTimer = setTimeout(() => {
    if (!current()) return;
    state.audioSlow = true;
    renderAudio();
  }, 4000);
  try {
    await unlocking;
    if (!current()) return;
    await audio.prepare([stop]);
    if (!current()) return;
    clearTimeout(state.audioWaitTimer);
    state.audioLoading = false;
    await audio.play(stop, arrival);
  } catch (error) {
    if (current()) state.audioError = error.message;
  } finally {
    if (token === state.audioRequest) {
      clearTimeout(state.audioWaitTimer);
      state.audioLoading = false;
      state.audioSlow = false;
      renderAudio();
    }
  }
}

$('play-button').addEventListener('click', async () => {
  if (!state.running || state.paused || !state.consent) return;
  if (state.audioLoading) {
    cancelStoryRequest();
    renderAudio();
    return;
  }
  if (audio.playing || audio.pending) {
    audio.pause();
    return;
  }
  const stop = landmarks.find((item) => item.id === state.selectedId);
  if (!stop) return;
  state.manualStory = true;
  if (state.mode === 'demo') state.demoMoving = false;
  showMode();
  state.unlocking = audio.unlock();
  await loadAndPlayStory(stop, false, state.unlocking);
});
$('mute-button').addEventListener('click', () => audio.setMuted(!audio.muted));

function followWalk() {
  if (!state.running || !state.consent || state.paused) return;
  cancelStoryRequest();
  audio.stop();
  state.manualStory = false;
  if (state.activeId) state.visited.delete(state.activeId);
  state.activeId = null;
  if (state.mode === 'demo') state.demoMoving = true;
  state.lastTick = performance.now();
  showMode();
  updateLocation();
  renderAudio();
}
$('follow-walk').addEventListener('click', followWalk);

function changeMode() {
  if (!state.running || !state.consent || state.paused) return;
  cancelStoryRequest();
  audio.stop();
  state.manualStory = false;
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
  cancelStoryRequest();
  audio.stop();
  state.manualStory = false;
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
  if (state.manualStory) {
    followWalk();
    return;
  }
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
$('map-retry').addEventListener('click', () => {
  if (!state.running || state.paused || !state.consent || !tileLayer) return;
  $('map-error').hidden = true;
  tileLayer.redraw();
});
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
