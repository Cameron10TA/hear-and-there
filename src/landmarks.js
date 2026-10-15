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
    description:
      'A bronze horse. A field full of stories. Meet one of Whitman’s most recognizable neighbors.',
    transcript:
      'Welcome to Styx, on the edge of Ankeny Field. Look closely at this horse. What seems to be weathered driftwood is actually bronze. Artist Deborah Butterfield created Styx in 2002, using wood gathered from the Snake and Columbia rivers as the starting point for the casting. The sculpture was made at the Walla Walla Foundry. Take a moment to notice the spaces between its branches, and the way the field becomes part of the sculpture. Sometimes, getting to know a campus starts with standing still.',
    source: 'https://www.whitman.edu/documents/global/Campus-Tours/Whitman-Sculpture-Tour.pdf',
    coordinateNote:
      'OpenStreetMap artwork node 12023094079, checked against the Whitman sculpture-tour location. Field-test the trigger on campus.',
    coordinateSource: 'https://www.openstreetmap.org/node/12023094079',
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
    description:
      'The bounce of a ball. The pause before a serve. A different kind of campus conversation.',
    transcript:
      'You’re near Whitman’s outdoor tennis courts, between Memorial Building and Maxey Hall. This is one of the places where campus has its own rhythm. When a game is underway, listen for the bounce of a ball, the sound of a racket, and the little pauses in between. These courts are part of Whitman’s athletic life, with priority for team practices, tennis classes, and students. Whether the courts are busy or quiet today, take a breath and notice the sounds around you.',
    source: 'https://www.whitman.edu/campus-map?plc=x37212',
    coordinateNote:
      'Center of the outdoor courts from Whitman’s official interactive-map polygon; field-test the boundary.',
  },
  {
    id: 'penrose',
    name: 'Penrose Library',
    subtitle: 'A place to follow a question',
    category: 'Learning & discovery',
    coordinates: [46.0715561, -118.3295078],
    radius: 25,
    exitRadius: 40,
    image: 'assets/penrose-library.png',
    imageAlt: 'Penrose Library at Whitman College, beside Ankeny Field.',
    audio: 'assets/audio/penrose.wav',
    ambience: 'chime',
    durationLabel: 'About 30 seconds',
    description:
      'Four floors of books, archives, study spaces, and windows looking out toward Ankeny Field.',
    transcript:
      'Welcome to Penrose Library, just west of Ankeny Field. A library can be a collection of answers, but it is also a place to learn how to ask better questions. Penrose brings together books, journals, digital collections, and the Whitman College and Northwest Archives, where materials preserve stories from the college and the region. Across four floors, you can find quiet corners, shared tables, and views back toward the field. Pause here for a moment. What question would you bring inside?',
    source: 'https://library.whitman.edu/about_the_library/',
    coordinateNote:
      'Center of the Penrose Library polygon on Whitman’s official interactive campus map; field-test the boundary.',
    coordinateSource: 'https://www.whitman.edu/campus-map?plc=x37199',
  },
  {
    id: 'cleveland',
    name: 'Cleveland Commons',
    subtitle: 'Where campus gathers around a meal',
    category: 'Food & campus life',
    coordinates: [46.0688099, -118.3285184],
    radius: 35,
    exitRadius: 52,
    image: 'assets/cleveland-commons.jpg',
    imageAlt: 'Cleveland Commons, Whitman College’s campus dining hall.',
    audio: 'assets/audio/cleveland.wav',
    ambience: 'chime',
    durationLabel: 'About 30 seconds',
    description:
      'A busy dining hall, a daily changing menu, and a gathering place named for a longtime dean.',
    transcript:
      'You’re near Cleveland Commons, a place where the campus day often meets around food. The 500-seat dining hall serves the Whitman community and welcomes the public. Its marketplace-style stations change with the day, from pizza and noodles to soup, salads, and coffee. The building is named for Chuck Cleveland, a longtime dean of students, and was designed with sustainability in mind, including solar panels and reclaimed wood from fallen campus trees. Take a breath before heading on. What sounds tell you that people have gathered here?',
    source: 'https://www.whitman.edu/campus-map?plc=x46558',
    coordinateNote:
      'Center of the Cleveland Commons polygon on Whitman’s official interactive campus map; field-test the boundary.',
    coordinateSource: 'https://www.whitman.edu/campus-map?plc=x46558',
  },
];

export const campus = {
  center: [46.07055, -118.32885],
  bounds: [
    [46.0679, -118.3305],
    [46.073, -118.3255],
  ],
  // Normal browser caching is retained. No tile prefetching or offline downloads.
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maximumAccuracy: 65,
  maximumFixAge: 25000,
};

// A presentation-only movement sequence, not walking directions or a suggested route.
export const simulation = [
  { label: 'Approaching Ankeny Field', coordinates: [46.07265, -118.3287], seconds: 0 },
  { label: 'Near Styx', coordinates: landmarks[0].coordinates, seconds: 12, stopId: 'styx' },
  { label: 'Listening at Styx', coordinates: landmarks[0].coordinates, seconds: 53 },
  { label: 'Between the landmarks', coordinates: [46.07177, -118.32888], seconds: 64 },
  {
    label: 'At the outdoor courts',
    coordinates: landmarks[1].coordinates,
    seconds: 76,
    stopId: 'tennis',
  },
  { label: 'Listening at the courts', coordinates: landmarks[1].coordinates, seconds: 116 },
  {
    label: 'At Penrose Library',
    coordinates: landmarks[2].coordinates,
    seconds: 140,
    stopId: 'penrose',
  },
  { label: 'Listening at Penrose', coordinates: landmarks[2].coordinates, seconds: 176 },
  {
    label: 'At Cleveland Commons',
    coordinates: landmarks[3].coordinates,
    seconds: 206,
    stopId: 'cleveland',
  },
  { label: 'Listening at Cleveland Commons', coordinates: landmarks[3].coordinates, seconds: 246 },
];
