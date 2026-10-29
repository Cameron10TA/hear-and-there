// Group nearby projected pins at overview zooms, without changing listening zones.
// Connected groups also catch overlaps across arbitrary grid-cell boundaries.
export function groupMapStops(stops, project, zoom, pinned = new Set()) {
  const points = stops.map((stop) => ({ stop, point: project(stop.coordinates) }));
  const remaining = new Set(points);
  const groups = [];
  for (const seed of points) {
    if (!remaining.delete(seed)) continue;
    const members = [seed];
    if (zoom < 19 && !pinned.has(seed.stop.id)) {
      for (let index = 0; index < members.length; index++) {
        const point = members[index].point;
        for (const candidate of remaining) {
          if (!pinned.has(candidate.stop.id) &&
              Math.hypot(point.x - candidate.point.x, point.y - candidate.point.y) < 52) {
            remaining.delete(candidate);
            members.push(candidate);
          }
        }
      }
    }
    const included = members.map(({ stop }) => stop);
    groups.push({
      key: included.map((stop) => stop.id).sort().join(','),
      stops: included,
      coordinates: [0, 1].map((axis) => included.reduce((sum, stop) => sum + stop.coordinates[axis], 0) / included.length),
    });
  }
  return groups;
}
