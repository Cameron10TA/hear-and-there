// Existing stories grouped by theme and ordered for a compact walk from a named start.
// Ordering uses mapped outdoor approaches; this is not turn-by-turn navigation.
export const tours = [
  {
    id: 'first-visit',
    name: 'First time at Whitman',
    description: 'Begin at Penrose House, then cross central campus through academics, art, the library, and college history. Finish at Reid Campus Center.',
    stopIds: ['penrose-house', 'maxey', 'styx', 'penrose', 'memorial', 'reid'],
    stopNotes: {
      'penrose-house': 'Admission and a place to begin',
      maxey: 'Academics and the campus museum',
      styx: 'A landmark beside Ankeny Field',
      penrose: 'Library and study life',
      memorial: 'Campus history and the clock tower',
      reid: 'The student hub',
    },
  },
  {
    id: 'arts',
    name: 'Arts & performance',
    description: 'Start at Olin Hall and its Sheehan Gallery, then follow sculpture, theater, film, music, and visual art south to Fouts Center for Visual Arts.',
    stopIds: ['olin', 'styx', 'harper-joy', 'hunter', 'hall-of-music', 'fouts'],
    stopNotes: {
      olin: 'Sheehan Gallery',
      styx: 'Outdoor sculpture',
      'harper-joy': 'Theater and dance',
      hunter: 'Film and Kimball Theatre',
      'hall-of-music': 'Music and Chism Recital Hall',
      fouts: 'Visual art and studio spaces',
    },
  },
  {
    id: 'student-life',
    name: 'Student life',
    description: 'The longer walk: start at Jewett Hall, visit all ten residence-hall and apartment buildings in this collection, plus dining and student activities, and finish at College House.',
    stopIds: ['jewett', 'lyman', 'douglas', 'prentiss', 'anderson', 'stanton', 'cleveland', 'robart', 'stegner', 'reid', 'harvey', 'college-house'],
    stopNotes: {
      jewett: 'Residence life beside Ankeny Field',
      lyman: 'The neighboring residential community',
      douglas: 'Suites and courtyard living',
      prentiss: 'Residence life and sorority wings',
      anderson: 'Residence life near Stanton Field',
      stanton: 'Residence life beside Cleveland Commons',
      cleveland: 'Dining and gathering',
      robart: 'Nancy Serrurier Village apartments',
      stegner: 'Nancy Serrurier Village apartments',
      reid: 'Student activities and everyday services',
      harvey: 'Nancy Serrurier Village apartments',
      'college-house': 'Apartment-style residence',
    },
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
