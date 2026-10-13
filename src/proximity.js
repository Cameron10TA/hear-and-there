const radians = degrees => degrees * Math.PI / 180;

export function distanceMeters(a, b) {
  const dLat = radians(b[0] - a[0]);
  const dLon = radians(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a[0])) * Math.cos(radians(b[0])) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}

export function validFix(fix, now, { maximumAccuracy, maximumFixAge }) {
  return Boolean(fix && Number.isFinite(fix.latitude) && Math.abs(fix.latitude) <= 90 &&
    Number.isFinite(fix.longitude) && Math.abs(fix.longitude) <= 180 &&
    Number.isFinite(fix.accuracy) && fix.accuracy >= 0 && fix.accuracy <= maximumAccuracy &&
    Number.isFinite(fix.timestamp) && now - fix.timestamp <= maximumFixAge && now >= fix.timestamp - 1000);
}

// Separate enter/exit radii prevent GPS jitter from repeatedly starting a story.
export function locate(position, stops, currentId = null) {
  const distances = stops.map(stop => ({ stop, distance: distanceMeters(position, stop.coordinates) })).sort((a, b) => a.distance - b.distance);
  const current = distances.find(item => item.stop.id === currentId);
  const active = current && current.distance <= current.stop.exitRadius ? current.stop :
    distances.find(item => item.distance <= item.stop.radius)?.stop ?? null;
  return { active, nearest: distances[0], distances };
}

export function simulationPosition(frames, elapsed) {
  const last = frames.at(-1);
  if (elapsed >= last.seconds) return { coordinates: last.coordinates, label: last.label, complete: true };
  const nextIndex = frames.findIndex(frame => frame.seconds > elapsed);
  const a = frames[Math.max(0, nextIndex - 1)];
  const b = frames[nextIndex];
  const fraction = Math.max(0, (elapsed - a.seconds) / (b.seconds - a.seconds));
  return { coordinates: a.coordinates.map((value, i) => value + (b.coordinates[i] - value) * fraction), label: a.label, complete: false };
}

export function formatDistance(meters) {
  if (meters < 10) return 'Right here';
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km away`;
  return `${Math.round(meters / 5) * 5} m away`;
}
