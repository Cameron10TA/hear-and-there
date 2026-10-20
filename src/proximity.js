const radians = (degrees) => (degrees * Math.PI) / 180;

export function distanceMeters(a, b) {
  const dLat = radians(b[0] - a[0]);
  const dLon = radians(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(a[0])) * Math.cos(radians(b[0])) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}

export function validFix(fix, now, { maximumAccuracy, maximumFixAge }) {
  return Boolean(
    fix &&
      Number.isFinite(fix.latitude) &&
      Math.abs(fix.latitude) <= 90 &&
      Number.isFinite(fix.longitude) &&
      Math.abs(fix.longitude) <= 180 &&
      Number.isFinite(fix.accuracy) &&
      fix.accuracy >= 0 &&
      fix.accuracy <= maximumAccuracy &&
      Number.isFinite(fix.timestamp) &&
      now - fix.timestamp <= maximumFixAge &&
      now >= fix.timestamp - 1000
  );
}

// Campus-sized polygons: project each edge into meters relative to the visitor.
// Inside the footprint is distance zero; outside uses the closest edge/corner.
export function footprintDistance(position, outline) {
  const scale = 6371000 * Math.PI / 180;
  const longitudeScale = scale * Math.cos(radians(position[0]));
  const points = outline.map(([lat, lon]) => [
    (lon - position[1]) * longitudeScale,
    (lat - position[0]) * scale,
  ]);
  let inside = false;
  let nearest = Infinity;
  let nearestPoint = outline[0];
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [ax, ay] = points[j];
    const [bx, by] = points[i];
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    const t = lengthSquared ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / lengthSquared)) : 0;
    const distance = Math.hypot(ax + t * dx, ay + t * dy);
    if (distance < nearest) {
      nearest = distance;
      nearestPoint = outline[j].map((value, axis) => value + t * (outline[i][axis] - value));
    }
    if ((ay > 0) !== (by > 0) && 0 < ax - ay * dx / dy) inside = !inside;
  }
  // Preserve useful kilometer distances for off-campus visitors too.
  return inside ? 0 : distanceMeters(position, nearestPoint);
}

export function zoneBufferPixels(stop, zoom) {
  const metersPerPixel = 2 * Math.PI * 6378137 * Math.cos(radians(stop.coordinates[0])) / (256 * 2 ** zoom);
  return stop.zone.buffer / metersPerPixel;
}

// Separate enter/exit boundaries prevent jitter. A neighboring entry can take
// over once the visitor leaves the current entry, rather than being held back
// by its larger exit buffer. An actual footprint wins over an overlapping buffer.
export function locate(position, stops, currentId = null) {
  const distances = stops
    .map((stop) => {
      const distance = stop.zone
        ? footprintDistance(position, stop.zone.outline)
        : distanceMeters(position, stop.coordinates);
      return {
        stop,
        distance,
        zoneDistance: stop.zone?.walkingOutline
          ? footprintDistance(position, stop.zone.walkingOutline)
          : distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);
  const current = distances.find((item) => item.stop.id === currentId);
  const entry = (item) => item.stop.zone?.buffer ?? item.stop.radius;
  const candidate = distances.find((item) => item.zoneDistance <= entry(item));
  const insideFootprint = distances.find((item) => item.stop.zone && item.distance === 0);
  let active = candidate?.stop ?? null;
  if (current && current.zoneDistance <= (current.stop.zone?.exitBuffer ?? current.stop.exitRadius)) {
    active = current.stop;
    if (insideFootprint && current.distance > 0) active = insideFootprint.stop;
    else if (candidate && current.zoneDistance > entry(current)) active = candidate.stop;
  }
  return { active, nearest: distances[0], distances };
}

export function simulationPosition(frames, elapsed) {
  const last = frames.at(-1);
  if (elapsed >= last.seconds)
    return { coordinates: last.coordinates, label: last.label, complete: true };
  const nextIndex = frames.findIndex((frame) => frame.seconds > elapsed);
  const a = frames[Math.max(0, nextIndex - 1)];
  const b = frames[nextIndex];
  const fraction = Math.max(0, (elapsed - a.seconds) / (b.seconds - a.seconds));
  return {
    coordinates: a.coordinates.map((value, i) => value + (b.coordinates[i] - value) * fraction),
    label: a.label,
    complete: false,
  };
}

export function formatDistance(meters) {
  if (meters < 10) return 'Right here';
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km away`;
  return `${Math.round(meters / 5) * 5} m away`;
}
