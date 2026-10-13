// Edit the stops here. Coordinates are latitude, longitude, in that order.
// Keep audio files, transcripts, and source credits in sync.
export const landmarks = [
  {
    id: 'styx',
    name: 'Styx',
    subtitle: 'A familiar face on Ankeny Field',
    category: 'Art & campus life',
    coordinates: [46.0720452, -118.3290799],
    radius: 30,
    exitRadius: 48,
    image: 'assets/styx.jpg',
    imageAlt: 'Styx, the horse sculpture, beside Ankeny Field in autumn.',
    audio: 'assets/audio/styx.wav',
    ambience: 'chime',
    durationLabel: 'About 30 seconds',
    description: 'A bronze horse. A field full of stories. Meet one of Whitman’s most recognizable neighbors.',
    transcript: 'Welcome to Styx, on the edge of Ankeny Field. Look closely at this horse. What seems to be weathered driftwood is actually bronze. Artist Deborah Butterfield created Styx in 2002, using wood gathered from the Snake and Columbia rivers as the starting point for the casting. The sculpture was made at the Walla Walla Foundry. Take a moment to notice the spaces between its branches, and the way the field becomes part of the sculpture. Sometimes, getting to know a campus starts with standing still.',
    source: 'https://www.whitman.edu/documents/global/Campus-Tours/Whitman-Sculpture-Tour.pdf',
    coordinateNote: 'OpenStreetMap artwork node 12023094079, checked against the Whitman sculpture-tour location. Field-test the trigger on campus.',
    coordinateSource: 'https://www.openstreetmap.org/node/12023094079'
  },
  {
    id: 'tennis',
    name: 'Outdoor Tennis Courts',
    subtitle: 'Find the rhythm of campus',
    category: 'Sport & everyday sounds',
    coordinates: [46.07137, -118.32851],
    radius: 42,
    exitRadius: 60,
    image: 'assets/tennis.jpg',
    imageAlt: 'Blue and green outdoor tennis courts surrounded by trees at Whitman College.',
    audio: 'assets/audio/tennis.wav',
    ambience: 'rally',
    durationLabel: 'About 25 seconds',
    description: 'The bounce of a ball. The pause before a serve. A different kind of campus conversation.',
    transcript: 'You’re near Whitman’s outdoor tennis courts, between Memorial Building and Maxey Hall. This is one of the places where campus has its own rhythm. When a game is underway, listen for the bounce of a ball, the sound of a racket, and the little pauses in between. These courts are part of Whitman’s athletic life, with priority for team practices, tennis classes, and students. Whether the courts are busy or quiet today, take a breath and notice the sounds around you.',
    source: 'https://www.whitman.edu/campus-map?plc=x37212',
    coordinateNote: 'Center of the outdoor courts from Whitman’s official interactive-map polygon; field-test the boundary.'
  }
];

export const campus = {
  center: [46.07185, -118.328],
  bounds: [[46.0703, -118.3303], [46.07335, -118.3256]],
  // Normal browser caching is retained. No tile prefetching or offline downloads.
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maximumAccuracy: 65,
  maximumFixAge: 25000
};

// A presentation-only movement sequence, not walking directions or a suggested route.
export const simulation = [
  { label: 'Approaching Ankeny Field', coordinates: [46.07265, -118.3287], seconds: 0 },
  { label: 'Near Styx', coordinates: landmarks[0].coordinates, seconds: 12 },
  { label: 'Listening at Styx', coordinates: landmarks[0].coordinates, seconds: 53 },
  { label: 'Between the landmarks', coordinates: [46.07177, -118.32888], seconds: 64 },
  { label: 'At the outdoor courts', coordinates: landmarks[1].coordinates, seconds: 76 },
  { label: 'Listening at the courts', coordinates: landmarks[1].coordinates, seconds: 116 }
];
