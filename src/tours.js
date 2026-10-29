// Collections reuse existing stories. Their order is for listening, not navigation.
export const tours = [
  {
    id: 'first-visit',
    name: 'First time at Whitman',
    description: 'A first listen to campus art, learning, gathering places, and everyday life.',
    stopIds: ['styx', 'penrose', 'memorial', 'reid', 'cleveland', 'tennis'],
  },
  {
    id: 'arts',
    name: 'Art around campus',
    description: 'Meet the places where sculpture, visual art, music, and performance come together.',
    stopIds: ['styx', 'fouts', 'hall-of-music', 'harper-joy', 'hunter', 'cordiner', 'dance-studio'],
  },
  {
    id: 'student-life',
    name: 'Student life',
    description: 'Discover spaces for meals, community, living, movement, and getting involved.',
    stopIds: ['reid', 'cleveland', 'jewett', 'anderson', 'glover-alston', 'baker-ferguson', 'community-service-house'],
  },
];

export const findTour = (id) => tours.find((tour) => tour.id === id);

export function tourSummary(tour, landmarks, completed = new Set()) {
  const stops = tour.stopIds.map((id) => landmarks.find((stop) => stop.id === id));
  // Use the existing estimates without downloading recordings to measure them.
  const seconds = stops.reduce((total, stop) => {
    const amounts = [...stop.durationLabel.matchAll(/(\d+)\s+(seconds?|minutes?)/g)];
    if (!amounts.length) throw new Error(`Missing narration estimate for ${stop.id}`);
    return total + amounts.reduce((sum, [, value, unit]) => sum + Number(value) * (unit.startsWith('minute') ? 60 : 1), 0);
  }, 0);
  return {
    stops,
    minutes: Math.max(1, Math.round(seconds / 60)),
    completed: stops.filter((stop) => completed.has(stop.id)).length,
    next: stops.find((stop) => !completed.has(stop.id)),
  };
}
