// Edit the stops here. Coordinates are latitude, longitude, in that order.
// Keep audio files, transcripts, and source credits in sync.
// Physical outlines follow Whitman’s campus map; walkingOutline includes nearby
// outdoor paths. The 8 m entry / 14 m exit buffers apply around the walking area.
// These are starting boundaries for an on-campus iPhone check.
export const landmarks = [
  {
    "id": "styx",
    "name": "Styx",
    "subtitle": "A familiar face on Ankeny Field",
    "category": "Art & campus life",
    "coordinates": [
      46.0720452,
      -118.3290799
    ],
    "radius": 30,
    "exitRadius": 48,
    "image": "assets/styx.jpg",
    "imageAlt": "Styx, the horse sculpture, beside Ankeny Field in autumn.",
    "audio": "assets/audio/styx.wav",
    "ambience": "chime",
    "durationLabel": "About 35 seconds",
    "description": "A bronze horse. A field full of stories. Meet one of Whitman’s most recognizable neighbors.",
    "transcript": "Welcome to Styx, on the edge of Ankeny Field. Look closely at this horse. What seems to be weathered driftwood is actually bronze. Artist Deborah Butterfield created Styx in 2002, using wood gathered from the Snake and Columbia rivers as the starting point for the casting. The sculpture was made at the Walla Walla Foundry. Take a moment to notice the spaces between its branches, and the way the field becomes part of the sculpture. Sometimes, getting to know a campus starts with standing still.",
    "source": "https://www.whitman.edu/documents/global/Campus-Tours/Whitman-Sculpture-Tour.pdf",
    "coordinateNote": "OpenStreetMap artwork node 12023094079, checked against the Whitman sculpture-tour location. Field-test the trigger on campus.",
    "coordinateSource": "https://www.openstreetmap.org/node/12023094079"
  },
  {
    "id": "tennis",
    "name": "Outdoor Tennis Courts",
    "subtitle": "Find the rhythm of campus",
    "category": "Sport & everyday sounds",
    "coordinates": [
      46.07137,
      -118.32851
    ],
    "listeningPosition": [
      46.0708577,
      -118.3286126
    ],
    "zone": {
      "walkingOutline": [
        [
          46.07165,
          -118.3291858
        ],
        [
          46.07165,
          -118.3279343
        ],
        [
          46.0710039,
          -118.3279415
        ],
        [
          46.0709612,
          -118.3280641
        ],
        [
          46.0708639,
          -118.3284677
        ],
        [
          46.0708457,
          -118.3288975
        ],
        [
          46.0709,
          -118.32908
        ],
        [
          46.0712276,
          -118.3291928
        ]
      ],
      "outline": [
        [
          46.0715783,
          -118.3280857
        ],
        [
          46.0712476,
          -118.3280873
        ],
        [
          46.0712443,
          -118.3284857
        ],
        [
          46.0709083,
          -118.3284888
        ],
        [
          46.0709083,
          -118.3289396
        ],
        [
          46.0715765,
          -118.3289496
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/tennis.jpg",
    "imageAlt": "Blue and green outdoor tennis courts surrounded by trees at Whitman College.",
    "audio": "assets/audio/tennis.wav",
    "ambience": "rally",
    "durationLabel": "About 30 seconds",
    "description": "The bounce of a ball. The pause before a serve. A different kind of campus conversation.",
    "transcript": "You’re near Whitman’s outdoor tennis courts, between Memorial Building and Maxey Hall. This is one of the places where campus has its own rhythm. When a game is underway, listen for the bounce of a ball, the sound of a racket, and the little pauses in between. These courts are part of Whitman’s athletic life, with priority for team practices, tennis classes, and students. Whether the courts are busy or quiet today, take a breath and notice the sounds around you.",
    "source": "https://www.whitman.edu/campus-map?plc=x37212",
    "coordinateNote": "Physical footprint from Whitman’s campus map; outdoor listening outline fitted to nearby OSM footpaths. Field-test the paths."
  },
  {
    id: 'penrose',
    name: 'Penrose Library',
    subtitle: 'A place to follow a question',
    category: 'Learning & discovery',
    coordinates: [46.0715561, -118.3295078],
    listeningPosition: [46.0712926,-118.3294756],
    zone: {
      // Outdoor walking area fitted to the adjacent OSM footpaths.
      walkingOutline: [
        [46.0719874, -118.3292503],
        [46.0719793, -118.3300345],
        [46.0719006, -118.3300129],
        [46.0718429, -118.3300729],
        [46.0716174, -118.3302624],
        [46.0714966, -118.3302424],
        [46.071235, -118.3301202],
        [46.07118, -118.3299],
        [46.0712121, -118.3296158],
        [46.0712868, -118.3294976],
        [46.0713277, -118.3293433],
        [46.0713381, -118.3291906],
        [46.0715861, -118.3291858],
      ],
      outline: [
        [46.0719277, -118.3297358],
        [46.0719268, -118.3292931],
        [46.0716339, -118.3292956],
        [46.0713841, -118.3293015],
        [46.071382, -118.3293862],
        [46.0713836, -118.3294737],
        [46.0714241, -118.3294715],
        [46.0714237, -118.3296169],
        [46.0712582, -118.3296218],
        [46.0712583, -118.3299614],
        [46.0717722, -118.3299534],
        [46.0717745, -118.3297427]
      ],
      buffer: 8,
      exitBuffer: 14
    },
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
      'Physical footprint from Whitman’s campus map; outdoor listening outline fitted to nearby OSM footpaths. Field-test the paths.',
    coordinateSource: 'https://www.whitman.edu/campus-map?plc=x37199',
  },
  {
    "id": "cleveland",
    "name": "Cleveland Commons",
    "subtitle": "Where campus gathers around a meal",
    "category": "Food & campus life",
    "coordinates": [
      46.0688099,
      -118.3285184
    ],
    "listeningPosition": [
      46.0683301,
      -118.3285186
    ],
    "zone": {
      "walkingOutline": [
        [
          46.0692411,
          -118.3292138
        ],
        [
          46.0692411,
          -118.3281914
        ],
        [
          46.0691491,
          -118.3279093
        ],
        [
          46.0688378,
          -118.3279106
        ],
        [
          46.0685486,
          -118.3279188
        ],
        [
          46.0684898,
          -118.3279448
        ],
        [
          46.0683758,
          -118.3286843
        ],
        [
          46.0684782,
          -118.3288156
        ],
        [
          46.0684809,
          -118.3289469
        ],
        [
          46.0687495,
          -118.32914
        ],
        [
          46.0689226,
          -118.3291232
        ]
      ],
      "outline": [
        [
          46.0689896,
          -118.3282069
        ],
        [
          46.0687424,
          -118.3282046
        ],
        [
          46.0687061,
          -118.3283171
        ],
        [
          46.0686098,
          -118.3283144
        ],
        [
          46.0685747,
          -118.3284391
        ],
        [
          46.0684771,
          -118.3283834
        ],
        [
          46.0684274,
          -118.3285634
        ],
        [
          46.0685207,
          -118.3286145
        ],
        [
          46.0685539,
          -118.3285844
        ],
        [
          46.0685835,
          -118.3286347
        ],
        [
          46.068557,
          -118.3286977
        ],
        [
          46.0687682,
          -118.3288184
        ],
        [
          46.0688371,
          -118.3287326
        ],
        [
          46.0689116,
          -118.3287756
        ],
        [
          46.0689787,
          -118.3288883
        ],
        [
          46.0690956,
          -118.3289481
        ],
        [
          46.0690673,
          -118.3286941
        ],
        [
          46.0690851,
          -118.3284544
        ],
        [
          46.0690687,
          -118.3284308
        ],
        [
          46.0690693,
          -118.3283676
        ],
        [
          46.0689736,
          -118.328308
        ],
        [
          46.0689839,
          -118.3282671
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/cleveland-commons.jpg",
    "imageAlt": "Cleveland Commons, Whitman College’s campus dining hall.",
    "audio": "assets/audio/cleveland.wav",
    "ambience": "chime",
    "durationLabel": "About 35 seconds",
    "description": "A busy dining hall, a daily changing menu, and a gathering place named for a longtime dean.",
    "transcript": "You’re near Cleveland Commons, a place where the campus day often meets around food. The 500-seat dining hall serves the Whitman community and welcomes the public. Its marketplace-style stations change with the day, from pizza and noodles to soup, salads, and coffee. The building is named for Chuck Cleveland, a longtime dean of students, and was designed with sustainability in mind, including solar panels and reclaimed wood from fallen campus trees. Take a breath before heading on. What sounds tell you that people have gathered here?",
    "source": "https://www.whitman.edu/campus-map?plc=x46558",
    "coordinateNote": "Physical footprint from Whitman’s campus map; outdoor listening outline fitted to nearby OSM footpaths. Field-test the paths.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x46558"
  },
  {
    "id": "memorial",
    "name": "Memorial Building",
    "subtitle": "Look up, and listen to the passing day",
    "category": "History & campus life",
    "coordinates": [
      46.07088,
      -118.32958
    ],
    "listeningPosition": [
      46.0709279,
      -118.3300362
    ],
    "zone": {
      "walkingOutline": [
        [
          46.0711,
          -118.33041
        ],
        [
          46.0711,
          -118.32955
        ],
        [
          46.07114,
          -118.3291928
        ],
        [
          46.070772,
          -118.3291594
        ],
        [
          46.0707196,
          -118.3294536
        ],
        [
          46.0706993,
          -118.3298989
        ],
        [
          46.0706437,
          -118.3300945
        ],
        [
          46.0707071,
          -118.3302086
        ],
        [
          46.0708126,
          -118.3303266
        ]
      ],
      "outline": [
        [
          46.0710045,
          -118.3299192
        ],
        [
          46.0710064,
          -118.3297584
        ],
        [
          46.0709891,
          -118.3297548
        ],
        [
          46.0709891,
          -118.329651
        ],
        [
          46.0710116,
          -118.3296429
        ],
        [
          46.0710126,
          -118.3295154
        ],
        [
          46.0709845,
          -118.3295171
        ],
        [
          46.0709825,
          -118.3294075
        ],
        [
          46.0710148,
          -118.3294112
        ],
        [
          46.0710101,
          -118.3292464
        ],
        [
          46.0707634,
          -118.3292552
        ],
        [
          46.0707671,
          -118.3294216
        ],
        [
          46.07079,
          -118.3294243
        ],
        [
          46.07079,
          -118.3295204
        ],
        [
          46.0707473,
          -118.3295248
        ],
        [
          46.0707492,
          -118.3296557
        ],
        [
          46.070791,
          -118.3296503
        ],
        [
          46.070791,
          -118.3297518
        ],
        [
          46.07077,
          -118.3297571
        ],
        [
          46.0707719,
          -118.3299199
        ],
        [
          46.0709301,
          -118.3299219
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/memorial.jpg",
    "imageAlt": "Memorial Building and its clock tower at Whitman College.",
    "audio": "assets/audio/memorial.wav",
    "ambience": "chime",
    "durationLabel": "About 40 seconds",
    "description": "A clock tower, red brick, and more than a century of campus life.",
    "transcript": "You’re near Memorial Building, the oldest building on Whitman’s campus. Built in 1899, it has watched generations of students cross the grounds around it. Look up toward the clock tower, which rises 111 feet above the ground. Today, the building houses college administrative offices. From any side, notice how the roofline changes as you move, and how the tower helps you find your bearings. Pause for a moment outside. What sounds mark the passing of time on campus today?",
    "source": "https://www.whitman.edu/alumni/be-connected/whitman-traditions/memorial-building",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37192",
    "coordinateNote": "Physical footprint from Whitman’s campus map; outdoor listening outline fitted to nearby OSM footpaths, plus 8 m entry and 14 m exit margins. Field-test the paths."
  },
  {
    "id": "reid",
    "name": "Reid Campus Center",
    "subtitle": "Where campus paths cross",
    "category": "Community & everyday life",
    "coordinates": [
      46.0698,
      -118.33156
    ],
    "listeningPosition": [
      46.0700777,
      -118.3312783
    ],
    "zone": {
      "walkingOutline": [
        [
          46.0700777,
          -118.3312783
        ],
        [
          46.069948,
          -118.332178
        ],
        [
          46.06952,
          -118.33195
        ],
        [
          46.069473,
          -118.3310898
        ],
        [
          46.0695389,
          -118.3308767
        ],
        [
          46.0696395,
          -118.3308904
        ],
        [
          46.0697083,
          -118.3309038
        ],
        [
          46.0699763,
          -118.3309819
        ]
      ],
      "outline": [
        [
          46.0699138,
          -118.3319284
        ],
        [
          46.0700062,
          -118.3312394
        ],
        [
          46.0698709,
          -118.3312028
        ],
        [
          46.0698584,
          -118.3312462
        ],
        [
          46.0697136,
          -118.3312135
        ],
        [
          46.0696952,
          -118.3313614
        ],
        [
          46.0696443,
          -118.3313528
        ],
        [
          46.0696102,
          -118.3316101
        ],
        [
          46.0695821,
          -118.3316041
        ],
        [
          46.0695501,
          -118.3318452
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/reid-campus-center.png",
    "imageAlt": "Reid Campus Center at Whitman College.",
    "audio": "assets/audio/reid.wav",
    "ambience": "chime",
    "durationLabel": "About 35 seconds",
    "description": "Student voices, everyday errands, and a place to come together.",
    "transcript": "Welcome to Reid Campus Center, a gathering place for Whitman’s campus community. The building brings together many parts of student life, including student government, the campus post office, and KWCW, the college radio station. It is a place where an everyday errand can turn into a conversation, or a conversation can become a new idea. As you pause outside, notice the paths leading toward the building and the people moving between them. What makes a place feel like a meeting point?",
    "source": "https://www.whitman.edu/campus-map?plc=x37205",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37205",
    "coordinateNote": "Physical footprint from Whitman’s campus map; outdoor listening outline fitted to nearby OSM footpaths, plus 8 m entry and 14 m exit margins. Field-test the paths."
  },
  {
    "id": "jewett",
    "name": "Jewett Hall",
    "subtitle": "A first-year hall beside Ankeny Field",
    "category": "Campus life",
    "coordinates": [
      46.07298,
      -118.3269
    ],
    "image": "assets/jewett-hall.jpg",
    "imageAlt": "Exterior of Jewett Hall at Whitman College.",
    "audio": "assets/audio/jewett.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "A first-year residence hall near Ankeny Field, with Jewett Café just steps away.",
    "transcript": "Welcome to Jewett Hall, one of Whitman’s first-year residence halls. The building sits beside Ankeny Field, with Jewett Café nearby. Inside are shared lounges and places to study, but this story is for the public path outside. Pause here and notice how quickly the campus shifts from open field to the everyday places where students gather, recharge, and make a home.",
    "source": "https://www.whitman.edu/life-at-whitman/residence-life/residence-halls",
    "coordinateNote": "Physical footprint from Whitman campus-map x37184; outdoor listening area fitted to mapped OSM paths. Field-check every approach and shared boundary; mapped paths do not establish public access.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37184",
    "listeningPosition": [
      46.0728285,
      -118.3268509
    ],
    "zone": {
      "outline": [
        [
          46.0727245,
          -118.3272749
        ],
        [
          46.0727412,
          -118.3270966
        ],
        [
          46.0728659,
          -118.327112
        ],
        [
          46.0728845,
          -118.326881
        ],
        [
          46.0728492,
          -118.3268741
        ],
        [
          46.0728603,
          -118.3267653
        ],
        [
          46.0726147,
          -118.3267197
        ],
        [
          46.0726352,
          -118.3264837
        ],
        [
          46.0729273,
          -118.32654
        ],
        [
          46.0729376,
          -118.3264582
        ],
        [
          46.073065,
          -118.3264837
        ],
        [
          46.0729831,
          -118.3273232
        ]
      ],
      "walkingOutline": [
        [
          46.0730829,
          -118.3274321
        ],
        [
          46.0729345,
          -118.3274029
        ],
        [
          46.0726742,
          -118.3273122
        ],
        [
          46.0726147,
          -118.3267197
        ],
        [
          46.0726352,
          -118.3264837
        ],
        [
          46.0729376,
          -118.3264582
        ],
        [
          46.0731768,
          -118.3264824
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    }
  },
  {
    "id": "lyman",
    "name": "Lyman House",
    "subtitle": "A close-knit hall connected to campus life",
    "category": "Campus life",
    "coordinates": [
      46.07225,
      -118.3265
    ],
    "image": "assets/lyman-house.jpg",
    "imageAlt": "Exterior of Lyman House at Whitman College.",
    "audio": "assets/audio/lyman.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "A first-year community with a shared café connection to neighboring Jewett Hall.",
    "transcript": "You’re near Lyman House, a Whitman residence hall with a close connection to neighboring Jewett Hall and Jewett Café. The hall looks toward Ankeny Field, where the open campus meets the routines of home. From this public path, take a moment to notice that transition: a place to come together, then the wider campus just beyond it. Please leave the private living spaces to residents.",
    "source": "https://www.whitman.edu/life-at-whitman/residence-life/residence-halls",
    "coordinateNote": "Physical footprint from Whitman campus-map x37188; outdoor listening area fitted to mapped OSM paths. Field-check every approach and shared boundary; mapped paths do not establish public access.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37188",
    "listeningPosition": [
      46.0723041,
      -118.326654
    ],
    "zone": {
      "outline": [
        [
          46.0726164,
          -118.3266382
        ],
        [
          46.0726276,
          -118.3265108
        ],
        [
          46.0718757,
          -118.3263439
        ],
        [
          46.0718635,
          -118.3264836
        ]
      ],
      "walkingOutline": [
        [
          46.0725757,
          -118.3267989
        ],
        [
          46.0718165,
          -118.326536
        ],
        [
          46.0718265,
          -118.3262033
        ],
        [
          46.0726276,
          -118.3265108
        ],
        [
          46.0726164,
          -118.3266382
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    }
  },
  {
    "id": "anderson",
    "name": "Anderson Hall",
    "subtitle": "A first-year hall near Stanton Field",
    "category": "Campus life",
    "coordinates": [
      46.0689,
      -118.3296
    ],
    "image": "assets/anderson-hall.jpg",
    "imageAlt": "Exterior of Anderson Hall at Whitman College.",
    "audio": "assets/audio/anderson.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "A traditional first-year residence hall close to Stanton Field and Cleveland Commons.",
    "transcript": "Welcome to Anderson Hall, a traditional first-year residence hall near Stanton Field. Cleveland Commons is just a short walk away, and the field gives this part of campus a wide-open feel. From the public path, notice how the lawn and nearby gathering places make room for both quiet pauses and campus activity. This is a home for students, so let’s keep the story outside and give residents their privacy.",
    "source": "https://www.whitman.edu/life-at-whitman/residence-life/residence-halls",
    "coordinateNote": "Physical footprint from Whitman campus-map x37158; outdoor listening area fitted to mapped OSM paths. Field-check every approach and shared boundary; mapped paths do not establish public access.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37158",
    "listeningPosition": [
      46.0690033,
      -118.3296454
    ],
    "zone": {
      "outline": [
        [
          46.0690194,
          -118.3291916
        ],
        [
          46.0688354,
          -118.3291916
        ],
        [
          46.0688373,
          -118.3300252
        ],
        [
          46.0690228,
          -118.3300306
        ],
        [
          46.0690229,
          -118.3298627
        ],
        [
          46.0689671,
          -118.329853
        ],
        [
          46.0689653,
          -118.3293482
        ],
        [
          46.0690156,
          -118.3293504
        ]
      ],
      "walkingOutline": [
        [
          46.0687882,
          -118.3301585
        ],
        [
          46.0687506,
          -118.3299415
        ],
        [
          46.0687611,
          -118.3293957
        ],
        [
          46.0688354,
          -118.3291916
        ],
        [
          46.0689226,
          -118.3291232
        ],
        [
          46.0690077,
          -118.3291621
        ],
        [
          46.0691065,
          -118.3292897
        ],
        [
          46.0691018,
          -118.3301536
        ],
        [
          46.068993,
          -118.3301565
        ],
        [
          46.0688467,
          -118.3301581
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    }
  },
  {
    "id": "stanton",
    "name": "Stanton Hall",
    "subtitle": "A sophomore hall built around community",
    "category": "Campus life",
    "coordinates": [46.0685, -118.3299],
    "image": "assets/stanton-hall.jpg",
    "imageAlt": "Stanton Hall with a volleyball court on the lawn in front.",
    "audio": "assets/audio/stanton.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "A modern hall for mostly sophomores, with a broad lawn and Cleveland Commons nearby.",
    "transcript": "You’re near Stanton Hall, a modern Whitman residence hall built for mostly sophomore students. Its broad lawn, volleyball court, and outdoor gathering spaces open toward Cleveland Commons, just across the way. The building is designed around shared places as well as room to find a quieter moment. From this exterior path, take in the green space and the movement between home and the rest of campus. Please leave the residence spaces to the people who live here.",
    "source": "https://www.whitman.edu/life-at-whitman/residence-life/residence-halls",
    "coordinateNote": "Physical footprint from Whitman campus-map x46557; outdoor listening area fitted to mapped OSM paths. Field-check every approach and shared boundary; mapped paths do not establish public access.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x46557",
    "listeningPosition": [46.0685363, -118.3301833],
    "zone": {
      "outline": [
        [46.0684518, -118.3298055],
        [46.068449, -118.3297761],
        [46.0683028, -118.3296769],
        [46.0683027, -118.3292666],
        [46.0682075, -118.3292641],
        [46.068207, -118.3292967],
        [46.0681613, -118.3292921],
        [46.0681629, -118.3296477],
        [46.0682034, -118.3296507],
        [46.0682026, -118.3298231],
        [46.0681227, -118.3298193],
        [46.0681245, -118.3302428],
        [46.0682071, -118.3302493],
        [46.0682617, -118.3302317],
        [46.068262, -118.330155],
        [46.0682604, -118.3300782],
        [46.0682653, -118.3300376],
        [46.0682888, -118.3300239],
        [46.0682967, -118.3298874],
        [46.0683698, -118.329885],
        [46.0683707, -118.330025],
        [46.0686592, -118.3300261],
        [46.0686593, -118.3299371],
        [46.0686892, -118.3299366],
        [46.0686856, -118.3298074]
      ],
      "walkingOutline": [
        [46.0682071, -118.3302493],
        [46.0681245, -118.3302428],
        [46.0680722, -118.33013],
        [46.0680083, -118.329658],
        [46.0680424, -118.329432],
        [46.0681265, -118.3292238],
        [46.0683027, -118.3292666],
        [46.0683749, -118.3293041],
        [46.0686996, -118.3297306],
        [46.0687532, -118.329867],
        [46.0687402, -118.3300986],
        [46.0686524, -118.3301675]
      ],
      "buffer": 8,
      "exitBuffer": 14
    }
  },
  {
    "id": "douglas",
    "name": "Douglas Hall",
    "subtitle": "A residence hall centered on a courtyard",
    "category": "Campus life",
    "coordinates": [46.0698, -118.329],
    "image": "assets/douglas-hall.jpg",
    "imageAlt": "Exterior of Douglas Hall at Whitman College.",
    "audio": "assets/audio/douglas.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "A residence hall north of Cleveland Commons, with suites arranged around a central courtyard.",
    "transcript": "Welcome to Douglas Hall, just north of Cleveland Commons. Its suites are arranged around a central courtyard, a shared outdoor space at the heart of the building. The hall is named for William O. Douglas, Whitman Class of 1920, who later served on the U.S. Supreme Court. From the public path, notice how the courtyard design creates a quieter center within the larger campus. We’ll keep this story outside and respect the privacy of the people who live here.",
    "source": "https://www.whitman.edu/campus-map?plc=x37174",
    "coordinateNote": "Physical footprint from Whitman campus-map x37174; outdoor listening area fitted to mapped OSM paths. Field-check every approach and shared boundary; mapped paths do not establish public access.",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37174",
    "listeningPosition": [46.0698311, -118.3291847],
    "zone": {
      "outline": [
        [46.0699485, -118.3291025],
        [46.0699485, -118.3288905],
        [46.0698815, -118.3288905],
        [46.0698815, -118.3286405],
        [46.0697919, -118.3286385],
        [46.0697909, -118.3287419],
        [46.0696594, -118.3287409],
        [46.0696584, -118.3289175],
        [46.0696788, -118.3289175],
        [46.0696778, -118.3290998]
      ],
      "walkingOutline": [
        [46.069632, -118.3292147],
        [46.0696, -118.32874],
        [46.06979, -118.32855],
        [46.0698793, -118.3286039],
        [46.0700051, -118.3290122],
        [46.0700154, -118.3291816]
      ],
      "buffer": 8,
      "exitBuffer": 14
    }
  },
  {
    "id": "baker-center",
    "name": "Baker Center",
    "subtitle": "A home that became a campus connection",
    "category": "Administration",
    "coordinates": [
      46.0700388,
      -118.3286652
    ],
    "listeningPosition": [
      46.0703429,
      -118.3286867
    ],
    "zone": {
      "outline": [
        [
          46.0701418,
          -118.3287512
        ],
        [
          46.0700688,
          -118.3287512
        ],
        [
          46.0700675,
          -118.3288023
        ],
        [
          46.0699965,
          -118.3288046
        ],
        [
          46.0699965,
          -118.3287595
        ],
        [
          46.0699596,
          -118.3287539
        ],
        [
          46.0699609,
          -118.3286495
        ],
        [
          46.0700079,
          -118.3286445
        ],
        [
          46.0700101,
          -118.3285283
        ],
        [
          46.0701398,
          -118.3285232
        ]
      ],
      "walkingOutline": [
        [
          46.0699506,
          -118.3282027
        ],
        [
          46.0699596,
          -118.3287539
        ],
        [
          46.070055,
          -118.3289493
        ],
        [
          46.0703751,
          -118.328688
        ],
        [
          46.070222,
          -118.3282079
        ],
        [
          46.0701832,
          -118.3282071
        ],
        [
          46.0701057,
          -118.3282056
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/baker-center.jpg",
    "imageAlt": "Exterior of Baker Center at Whitman College.",
    "audio": "assets/audio/baker-center.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Built in 1904 for Mabel Baker Anderson and professor Louis F. Anderson, Baker Center began as a family home. Today it houses Alumni Relations and Annual Giving.",
    "transcript": "You’re near Baker Center. Built in 1904 for Mabel Baker Anderson and professor Louis F. Anderson, Baker Center began as a family home. Today it houses Alumni Relations and Annual Giving. From the path outside, notice the scale of this former house. How does a small building connect the people here today with generations who have moved on?",
    "source": "https://www.whitman.edu/campus-map?plc=x37162",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37162",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "baker-ferguson",
    "name": "Baker Ferguson Fitness Center",
    "subtitle": "Movement, water, and a daily rhythm",
    "category": "Athletics",
    "coordinates": [
      46.0717151,
      -118.3326202
    ],
    "listeningPosition": [
      46.0720684,
      -118.3326536
    ],
    "zone": {
      "outline": [
        [
          46.0720032,
          -118.3326952
        ],
        [
          46.071809,
          -118.3323158
        ],
        [
          46.0717679,
          -118.3323485
        ],
        [
          46.0716402,
          -118.3320919
        ],
        [
          46.0714054,
          -118.3323178
        ],
        [
          46.0715415,
          -118.3325838
        ],
        [
          46.0714038,
          -118.3327234
        ],
        [
          46.0714694,
          -118.3328589
        ],
        [
          46.0715299,
          -118.3328016
        ],
        [
          46.0716624,
          -118.3330535
        ]
      ],
      "walkingOutline": [
        [
          46.0714038,
          -118.3327234
        ],
        [
          46.0714694,
          -118.3328589
        ],
        [
          46.0716624,
          -118.3330535
        ],
        [
          46.0720117,
          -118.3327398
        ],
        [
          46.0720684,
          -118.3326536
        ],
        [
          46.0715616,
          -118.3318566
        ],
        [
          46.0714054,
          -118.3323178
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/baker-ferguson.jpg",
    "imageAlt": "Exterior of Baker Ferguson Fitness Center at Whitman College.",
    "audio": "assets/audio/baker-ferguson.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Baker Ferguson Fitness Center brings weight training and cardio equipment together with the Paul and Louise Harvey Pool. The pool is home to Whitman’s swimming teams. The center takes its name from Baker Ferguson, a member of the Class of 1939.",
    "transcript": "You’re near Baker Ferguson Fitness Center. Baker Ferguson Fitness Center brings weight training and cardio equipment together with the Paul and Louise Harvey Pool. The pool is home to Whitman’s swimming teams. The center takes its name from Baker Ferguson, a member of the Class of 1939. Pause outside and think about the different rhythms of swimming, lifting, and walking across campus.",
    "source": "https://www.whitman.edu/campus-map?plc=x37163",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37163",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "beta-theta-pi",
    "name": "Beta Theta Pi",
    "subtitle": "A chapter in campus community",
    "category": "Sorority & Fraternity Life",
    "coordinates": [
      46.0734307,
      -118.3281306
    ],
    "listeningPosition": [
      46.0731712,
      -118.3282811
    ],
    "zone": {
      "outline": [
        [
          46.0735076,
          -118.3283272
        ],
        [
          46.0733287,
          -118.328303
        ],
        [
          46.0733537,
          -118.3279363
        ],
        [
          46.0735301,
          -118.3279549
        ]
      ],
      "walkingOutline": [
        [
          46.0731562,
          -118.3284678
        ],
        [
          46.0735076,
          -118.3283272
        ],
        [
          46.0735301,
          -118.3279549
        ],
        [
          46.0733537,
          -118.3279363
        ],
        [
          46.0731762,
          -118.3282188
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/beta-theta-pi.jpg",
    "imageAlt": "Exterior of Beta Theta Pi at Whitman College.",
    "audio": "assets/audio/beta-theta-pi.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Whitman’s Gamma Zeta chapter of Beta Theta Pi was founded in 1916. The fraternity’s history is one thread in the changing story of student communities at Whitman.",
    "transcript": "You’re near Beta Theta Pi. Whitman’s Gamma Zeta chapter of Beta Theta Pi was founded in 1916. The fraternity’s history is one thread in the changing story of student communities at Whitman. Listen from the sidewalk outside. A house can be both a familiar landmark and someone’s home, so leave its private spaces to the people who live here.",
    "source": "https://www.whitman.edu/campus-map?plc=x37164",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37164",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "bike-shop",
    "name": "Bike Shop",
    "subtitle": "Small repairs that keep campus moving",
    "category": "Athletics",
    "coordinates": [
      46.0701801,
      -118.3272224
    ],
    "listeningPosition": [
      46.0700784,
      -118.3272822
    ],
    "zone": {
      "outline": [
        [
          46.0702126,
          -118.3272783
        ],
        [
          46.0702126,
          -118.3271706
        ],
        [
          46.0701475,
          -118.3271686
        ],
        [
          46.0701467,
          -118.3272719
        ]
      ],
      "walkingOutline": [
        [
          46.0700717,
          -118.3274714
        ],
        [
          46.0702126,
          -118.3272783
        ],
        [
          46.0702126,
          -118.3271706
        ],
        [
          46.0700897,
          -118.326967
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/bike-shop.png",
    "imageAlt": "Exterior of Bike Shop at Whitman College.",
    "audio": "assets/audio/bike-shop.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "The Outdoor Program Bike Shop provides bicycle maintenance and repairs, rentals, and cycling supplies. The college locates it in the alley behind the French House and Environmental House, near Merriam Street.",
    "transcript": "You’re near Bike Shop. The Outdoor Program Bike Shop provides bicycle maintenance and repairs, rentals, and cycling supplies. The college locates it in the alley behind the French House and Environmental House, near Merriam Street. From the outdoor approach, think about the sounds of a working bicycle: a freewheel clicking, a chain turning, and tires rolling away.",
    "source": "https://www.whitman.edu/campus-map?plc=x40839",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x40839",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "boyer-house",
    "name": "Boyer House",
    "subtitle": "Where campus stories take shape",
    "category": "Administration",
    "coordinates": [
      46.0696437,
      -118.3337034
    ],
    "listeningPosition": [
      46.0697761,
      -118.3335245
    ],
    "zone": {
      "outline": [
        [
          46.0696965,
          -118.333937
        ],
        [
          46.0697095,
          -118.3339236
        ],
        [
          46.0697188,
          -118.3339022
        ],
        [
          46.0697709,
          -118.3335267
        ],
        [
          46.0695909,
          -118.3334676
        ],
        [
          46.0695679,
          -118.3336353
        ],
        [
          46.06953,
          -118.3336259
        ],
        [
          46.0695224,
          -118.3336655
        ],
        [
          46.0695371,
          -118.333673
        ],
        [
          46.0695089,
          -118.3338828
        ]
      ],
      "walkingOutline": [
        [
          46.0695089,
          -118.3338828
        ],
        [
          46.0697071,
          -118.3339907
        ],
        [
          46.0697761,
          -118.3335245
        ],
        [
          46.0697841,
          -118.3334702
        ],
        [
          46.0695909,
          -118.3334676
        ],
        [
          46.06953,
          -118.3336259
        ],
        [
          46.0695224,
          -118.3336655
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/boyer-house.jpg",
    "imageAlt": "Exterior of Boyer House at Whitman College.",
    "audio": "assets/audio/boyer-house.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Boyer House is home to Whitman’s Office of Communications. The work associated with this building helps the college share what happens across its classrooms, grounds, and communities.",
    "transcript": "You’re near Boyer House. Boyer House is home to Whitman’s Office of Communications. The work associated with this building helps the college share what happens across its classrooms, grounds, and communities. Pause on the sidewalk and look back toward campus. If you could carry one detail from this walk into a story, which sight or sound would you choose?",
    "source": "https://www.whitman.edu/campus-map?plc=x37166",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37166",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "bratton-tennis",
    "name": "Bratton Tennis Center",
    "subtitle": "A different setting for the same game",
    "category": "Athletics",
    "coordinates": [
      46.0703241,
      -118.3332657
    ],
    "listeningPosition": [
      46.0703584,
      -118.3327525
    ],
    "zone": {
      "outline": [
        [
          46.0703019,
          -118.3337561
        ],
        [
          46.0700316,
          -118.3335011
        ],
        [
          46.0703463,
          -118.3327748
        ],
        [
          46.0706201,
          -118.3330294
        ]
      ],
      "walkingOutline": [
        [
          46.0699325,
          -118.3336545
        ],
        [
          46.0703019,
          -118.3337561
        ],
        [
          46.0708533,
          -118.3330526
        ],
        [
          46.070834,
          -118.3330155
        ],
        [
          46.0707955,
          -118.3329412
        ],
        [
          46.0707406,
          -118.3328868
        ],
        [
          46.0707096,
          -118.3328562
        ],
        [
          46.0706657,
          -118.3328432
        ],
        [
          46.0703584,
          -118.3327525
        ],
        [
          46.0701828,
          -118.3327006
        ],
        [
          46.0701473,
          -118.3326901
        ],
        [
          46.0701119,
          -118.3326797
        ],
        [
          46.0700753,
          -118.332764
        ],
        [
          46.0699718,
          -118.3333654
        ],
        [
          46.0699482,
          -118.3335388
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/bratton-tennis.jpg",
    "imageAlt": "Exterior of Bratton Tennis Center at Whitman College.",
    "audio": "assets/audio/bratton-tennis.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Bratton Tennis Center is named for former Whitman president Walter A. Bratton. Its four indoor courts are home to Whitman’s men’s and women’s varsity tennis teams.",
    "transcript": "You’re near Bratton Tennis Center. Bratton Tennis Center is named for former Whitman president Walter A. Bratton. Its four indoor courts are home to Whitman’s men’s and women’s varsity tennis teams. Stay on the outdoor approach and imagine how the bounce of a ball changes inside a large enclosed space. What other sounds change when they move indoors?",
    "source": "https://www.whitman.edu/campus-map?plc=x37168",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37168",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "chinese-house",
    "name": "Chinese Language and Culture House (Huá Wén Yuàn)",
    "subtitle": "Language as part of everyday life",
    "category": "Interest Houses",
    "coordinates": [
      46.0698155,
      -118.3270793
    ],
    "listeningPosition": [
      46.069786,
      -118.3268376
    ],
    "zone": {
      "outline": [
        [
          46.0698796,
          -118.3271827
        ],
        [
          46.0698796,
          -118.326976
        ],
        [
          46.0697512,
          -118.3269784
        ],
        [
          46.0697514,
          -118.32718
        ]
      ],
      "walkingOutline": [
        [
          46.0696674,
          -118.3273748
        ],
        [
          46.0698796,
          -118.3271827
        ],
        [
          46.0700468,
          -118.3268351
        ],
        [
          46.0699125,
          -118.3268358
        ],
        [
          46.0698678,
          -118.3268361
        ],
        [
          46.069823,
          -118.3268363
        ],
        [
          46.0697119,
          -118.3268401
        ],
        [
          46.0696749,
          -118.3268414
        ],
        [
          46.0696741,
          -118.3269007
        ],
        [
          46.0696716,
          -118.3270784
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/chinese-house.jpg",
    "imageAlt": "Exterior of Chinese Language and Culture House (Huá Wén Yuàn) at Whitman College.",
    "audio": "assets/audio/chinese-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Chinese Language and Culture House, also called Hua Wen Yuan, belongs to Whitman’s Interest House Community. It collaborates with the Chinese Department, bringing language and cultural learning into a residential setting.",
    "transcript": "You’re near Chinese Language and Culture House (Huá Wén Yuàn). The Chinese Language and Culture House, also called Hua Wen Yuan, belongs to Whitman’s Interest House Community. It collaborates with the Chinese Department, bringing language and cultural learning into a residential setting. From outside, consider how a greeting or a shared conversation can turn learning into a daily habit. Please respect the residents’ private spaces.",
    "source": "https://www.whitman.edu/campus-map?plc=x37160",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37160",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "climbing-center",
    "name": "Climbing Center",
    "subtitle": "Learning a move, then trying again",
    "category": "Athletics",
    "coordinates": [
      46.0706737,
      -118.3306803
    ],
    "listeningPosition": [
      46.0704054,
      -118.3304371
    ],
    "zone": {
      "outline": [
        [
          46.0707574,
          -118.3310609
        ],
        [
          46.0708264,
          -118.3305846
        ],
        [
          46.0709893,
          -118.3306254
        ],
        [
          46.0710163,
          -118.3304141
        ],
        [
          46.0705901,
          -118.3302992
        ],
        [
          46.0705623,
          -118.3304922
        ],
        [
          46.0704684,
          -118.330468
        ],
        [
          46.0703973,
          -118.3309655
        ]
      ],
      "walkingOutline": [
        [
          46.0702161,
          -118.3310412
        ],
        [
          46.0702893,
          -118.331171
        ],
        [
          46.0707074,
          -118.3311908
        ],
        [
          46.0710101,
          -118.3306782
        ],
        [
          46.0710828,
          -118.3302203
        ],
        [
          46.0706437,
          -118.3300945
        ],
        [
          46.0704599,
          -118.3302439
        ],
        [
          46.0704236,
          -118.3303179
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/climbing-center.jpg",
    "imageAlt": "Exterior of Climbing Center at Whitman College.",
    "audio": "assets/audio/climbing-center.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Whitman’s Climbing Center is on the south side of Sherwood Athletic Center. It includes a tall climbing wall and a bouldering area, supporting learning and practice at different skill levels.",
    "transcript": "You’re near Climbing Center. Whitman’s Climbing Center is on the south side of Sherwood Athletic Center. It includes a tall climbing wall and a bouldering area, supporting learning and practice at different skill levels. Pause outside and think about a climber planning the next move. Sometimes progress starts with stopping, looking carefully, and choosing one small step.",
    "source": "https://www.whitman.edu/campus-map?plc=x52177",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x52177",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "college-house",
    "name": "College House",
    "subtitle": "Apartment life within a college community",
    "category": "Residence Halls",
    "coordinates": [
      46.0713411,
      -118.333146
    ],
    "listeningPosition": [
      46.0713493,
      -118.3335357
    ],
    "zone": {
      "outline": [
        [
          46.0714978,
          -118.3332522
        ],
        [
          46.0713138,
          -118.3328924
        ],
        [
          46.0711802,
          -118.3330298
        ],
        [
          46.0713684,
          -118.3334
        ],
        [
          46.0714978,
          -118.3332572
        ]
      ],
      "walkingOutline": [
        [
          46.0711802,
          -118.3330298
        ],
        [
          46.0713493,
          -118.3335357
        ],
        [
          46.071378,
          -118.3335045
        ],
        [
          46.0714354,
          -118.333442
        ],
        [
          46.0714641,
          -118.3334108
        ],
        [
          46.0714978,
          -118.3332572
        ],
        [
          46.0714978,
          -118.3332522
        ],
        [
          46.0713138,
          -118.3328924
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/college-house.jpg",
    "imageAlt": "Exterior of College House at Whitman College.",
    "audio": "assets/audio/college-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "College House offers apartment options for sophomores, juniors, and seniors. Its furnished living spaces are part of the range of housing choices on Whitman’s campus.",
    "transcript": "You’re near College House. College House offers apartment options for sophomores, juniors, and seniors. Its furnished living spaces are part of the range of housing choices on Whitman’s campus. From the sidewalk, notice how this residential building fits among the nearby academic and athletic places. Campus life includes ordinary routines as well as public events. Leave the living spaces to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x37169",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37169",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on an approximate same-side street frontage (6 m from the mapped road centerline), not surveyed sidewalk geometry. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "community-service-house",
    "name": "Community Service House",
    "subtitle": "A home with an outward focus",
    "category": "Interest Houses",
    "coordinates": [
      46.0694299,
      -118.3276777
    ],
    "listeningPosition": [
      46.0695045,
      -118.3277586
    ],
    "zone": {
      "outline": [
        [
          46.0695067,
          -118.3277509
        ],
        [
          46.0693509,
          -118.3277479
        ],
        [
          46.0693531,
          -118.3276061
        ],
        [
          46.0695075,
          -118.3276058
        ]
      ],
      "walkingOutline": [
        [
          46.0691491,
          -118.3279093
        ],
        [
          46.0695859,
          -118.3279135
        ],
        [
          46.0695046,
          -118.3275432
        ],
        [
          46.0693531,
          -118.3276061
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/community-service-house.png",
    "imageAlt": "Exterior of Community Service House at Whitman College.",
    "audio": "assets/audio/community-service-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Community Service House is part of Whitman’s Interest House Community. Its residents work to encourage community service among Whitman students.",
    "transcript": "You’re near Community Service House. The Community Service House is part of Whitman’s Interest House Community. Its residents work to encourage community service among Whitman students. Pause outside and consider the connection between a home and the community beyond its walls. What is one small act of service that could change the experience of someone nearby? Please respect the residents’ privacy.",
    "source": "https://www.whitman.edu/campus-map?plc=x37170",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37170",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "cordiner",
    "name": "Cordiner Hall",
    "subtitle": "A place for many voices at once",
    "category": "Auditoriums",
    "coordinates": [
      46.0706691,
      -118.3319829
    ],
    "listeningPosition": [
      46.0708928,
      -118.3320011
    ],
    "zone": {
      "outline": [
        [
          46.0707742,
          -118.3324851
        ],
        [
          46.0708972,
          -118.3315701
        ],
        [
          46.070564,
          -118.3314821
        ],
        [
          46.0704453,
          -118.3323937
        ]
      ],
      "walkingOutline": [
        [
          46.0703464,
          -118.3325508
        ],
        [
          46.070389,
          -118.3325619
        ],
        [
          46.0704741,
          -118.3325841
        ],
        [
          46.0706444,
          -118.3326285
        ],
        [
          46.0707295,
          -118.3326507
        ],
        [
          46.0707865,
          -118.3325924
        ],
        [
          46.070815,
          -118.3325633
        ],
        [
          46.0711304,
          -118.3315527
        ],
        [
          46.0710462,
          -118.331527
        ],
        [
          46.070962,
          -118.3315013
        ],
        [
          46.0703576,
          -118.3313239
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/cordiner.jpg",
    "imageAlt": "Exterior of Cordiner Hall at Whitman College.",
    "audio": "assets/audio/cordiner.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Cordiner Hall is a large performance venue used for campus gatherings, including Convocation, and for community concerts and events. It is named for Ralph J. Cordiner, a member of the Class of 1922.",
    "transcript": "You’re near Cordiner Hall. Cordiner Hall is a large performance venue used for campus gatherings, including Convocation, and for community concerts and events. It is named for Ralph J. Cordiner, a member of the Class of 1922. Standing outside, imagine the change from a quiet empty hall to a room full of people listening together. What makes a shared occasion feel memorable?",
    "source": "https://www.whitman.edu/campus-map?plc=x37171",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37171",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "dance-studio",
    "name": "Dance Studio",
    "subtitle": "A classroom where movement speaks",
    "category": "Academics",
    "coordinates": [
      46.0695446,
      -118.334531
    ],
    "listeningPosition": [
      46.0696089,
      -118.3346321
    ],
    "zone": {
      "outline": [
        [
          46.0696282,
          -118.3346281
        ],
        [
          46.0696488,
          -118.3344804
        ],
        [
          46.0694611,
          -118.3344271
        ],
        [
          46.0693857,
          -118.334526
        ],
        [
          46.0694397,
          -118.3345901
        ]
      ],
      "walkingOutline": [
        [
          46.0693857,
          -118.334526
        ],
        [
          46.0695595,
          -118.3349546
        ],
        [
          46.0696282,
          -118.3346281
        ],
        [
          46.0696488,
          -118.3344804
        ],
        [
          46.0696504,
          -118.334361
        ],
        [
          46.0694611,
          -118.3344271
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/dance-studio.jpg",
    "imageAlt": "Exterior of Dance Studio at Whitman College.",
    "audio": "assets/audio/dance-studio.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Whitman’s Dance Studio serves as both a classroom and a performance space for the Dance program. In a place like this, practice and presentation share the same floor.",
    "transcript": "You’re near Dance Studio. Whitman’s Dance Studio serves as both a classroom and a performance space for the Dance program. In a place like this, practice and presentation share the same floor. Remain on the outdoor sidewalk and notice the rhythm of your own steps. Movement can communicate through a pause, a change of direction, or the simple act of standing still.",
    "source": "https://www.whitman.edu/campus-map?plc=x37172",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37172",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "german-house",
    "name": "Das Deutsche Haus",
    "subtitle": "Culture and conversation close to home",
    "category": "Interest Houses",
    "coordinates": [
      46.0698867,
      -118.3277409
    ],
    "listeningPosition": [
      46.0698843,
      -118.3279187
    ],
    "zone": {
      "outline": [
        [
          46.0699582,
          -118.3278326
        ],
        [
          46.0698152,
          -118.3278336
        ],
        [
          46.0698152,
          -118.3276485
        ],
        [
          46.0699602,
          -118.3276489
        ]
      ],
      "walkingOutline": [
        [
          46.0696598,
          -118.3279182
        ],
        [
          46.0700623,
          -118.3280316
        ],
        [
          46.0701039,
          -118.3279192
        ],
        [
          46.0700694,
          -118.3275344
        ],
        [
          46.0696639,
          -118.3276234
        ],
        [
          46.0696615,
          -118.3278003
        ],
        [
          46.0696606,
          -118.3278592
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/german-house.jpg",
    "imageAlt": "Exterior of Das Deutsche Haus at Whitman College.",
    "audio": "assets/audio/german-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Das Deutsche Haus, the German House, is part of Whitman’s Interest House Community. It hosts German language and culture activities and works with the German Studies Department.",
    "transcript": "You’re near Das Deutsche Haus. Das Deutsche Haus, the German House, is part of Whitman’s Interest House Community. It hosts German language and culture activities and works with the German Studies Department. From the path outside, think about the conversations that make a language part of everyday life. This is also a home, so keep your visit outside and respect the people living here.",
    "source": "https://www.whitman.edu/campus-map?plc=x37173",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37173",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "environmental-house",
    "name": "Environmental House",
    "subtitle": "Everyday choices and a wider environment",
    "category": "Interest Houses",
    "coordinates": [
      46.0703609,
      -118.3269795
    ],
    "listeningPosition": [
      46.0703048,
      -118.3268392
    ],
    "zone": {
      "outline": [
        [
          46.0704411,
          -118.3270523
        ],
        [
          46.0704411,
          -118.3269088
        ],
        [
          46.0702799,
          -118.3269058
        ],
        [
          46.0702808,
          -118.327051
        ]
      ],
      "walkingOutline": [
        [
          46.0700924,
          -118.3268904
        ],
        [
          46.0702808,
          -118.327051
        ],
        [
          46.0704705,
          -118.3270846
        ],
        [
          46.0705648,
          -118.3268498
        ],
        [
          46.0704723,
          -118.326734
        ],
        [
          46.0700944,
          -118.3268348
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/environmental-house.jpg",
    "imageAlt": "Exterior of Environmental House at Whitman College.",
    "audio": "assets/audio/environmental-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Environmental House, often called the Outhouse, focuses on environmental and ecological issues. Part of the Interest House Community, it works with Environmental Studies and helps lead campus recycling efforts.",
    "transcript": "You’re near Environmental House. The Environmental House, often called the Outhouse, focuses on environmental and ecological issues. Part of the Interest House Community, it works with Environmental Studies and helps lead campus recycling efforts. Pause outside and notice the material world around you: a tree, a path, a building, and the things people carry. Which everyday choices connect this small place to a much larger environment?",
    "source": "https://www.whitman.edu/campus-map?plc=x37175",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37175",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "facilities",
    "name": "Facilities Services",
    "subtitle": "The work that keeps campus working",
    "category": "Administration",
    "coordinates": [
      46.0737929,
      -118.3300625
    ],
    "listeningPosition": [
      46.074488,
      -118.3303872
    ],
    "zone": {
      "outline": [
        [
          46.0742856,
          -118.3295051
        ],
        [
          46.0743711,
          -118.3299408
        ],
        [
          46.0743226,
          -118.3299661
        ],
        [
          46.0743717,
          -118.3301778
        ],
        [
          46.0740607,
          -118.3303042
        ],
        [
          46.0740797,
          -118.3303436
        ],
        [
          46.0734008,
          -118.3303267
        ],
        [
          46.0734015,
          -118.3301696
        ],
        [
          46.073525,
          -118.3301787
        ],
        [
          46.073522,
          -118.3300216
        ],
        [
          46.0740904,
          -118.3295324
        ],
        [
          46.0740959,
          -118.32956
        ],
        [
          46.0742094,
          -118.3294691
        ],
        [
          46.0742224,
          -118.3295312
        ]
      ],
      "walkingOutline": [
        [
          46.0731692,
          -118.3303702
        ],
        [
          46.074488,
          -118.3303872
        ],
        [
          46.0745559,
          -118.3303849
        ],
        [
          46.0742856,
          -118.3295051
        ],
        [
          46.0742094,
          -118.3294691
        ],
        [
          46.0740904,
          -118.3295324
        ],
        [
          46.073522,
          -118.3300216
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/facilities.jpg",
    "imageAlt": "Exterior of Facilities Services at Whitman College.",
    "audio": "assets/audio/facilities.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Facilities Services is located at the north end of campus. Its responsibilities range from grounds care and cleaning to heating systems, painting, repairs, and vehicle maintenance.",
    "transcript": "You’re near Facilities Services. Facilities Services is located at the north end of campus. Its responsibilities range from grounds care and cleaning to heating systems, painting, repairs, and vehicle maintenance. Listen from the surrounding sidewalk rather than entering work areas. The campus depends on many kinds of skilled work, often easiest to notice when you stop and pay attention to what is being maintained.",
    "source": "https://www.whitman.edu/campus-map?plc=x37203",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37203",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "fine-arts-house",
    "name": "Fine Arts House",
    "subtitle": "Creative practice at the scale of a home",
    "category": "Interest Houses",
    "coordinates": [
      46.0703511,
      -118.3277107
    ],
    "listeningPosition": [
      46.0702817,
      -118.3279195
    ],
    "zone": {
      "outline": [
        [
          46.0704265,
          -118.3276405
        ],
        [
          46.0702738,
          -118.3276412
        ],
        [
          46.0702756,
          -118.3277835
        ],
        [
          46.0704265,
          -118.3277775
        ]
      ],
      "walkingOutline": [
        [
          46.070151,
          -118.3279193
        ],
        [
          46.0704659,
          -118.3280325
        ],
        [
          46.0705662,
          -118.3279638
        ],
        [
          46.0704646,
          -118.3276005
        ],
        [
          46.0702738,
          -118.3276412
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/fine-arts-house.jpg",
    "imageAlt": "Exterior of Fine Arts House at Whitman College.",
    "audio": "assets/audio/fine-arts-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Fine Arts House belongs to Whitman’s Interest House Community and works with the Art Department. Its residents promote activities involving studio art, theater, and music.",
    "transcript": "You’re near Fine Arts House. The Fine Arts House belongs to Whitman’s Interest House Community and works with the Art Department. Its residents promote activities involving studio art, theater, and music. Standing outside, consider how creativity can grow through ordinary shared time as well as formal classes. What would you make if you had a little space, a little company, and an unhurried afternoon?",
    "source": "https://www.whitman.edu/campus-map?plc=x37176",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37176",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "fouts",
    "name": "Fouts Center for Visual Arts",
    "subtitle": "Many ways to make an idea visible",
    "category": "Academics",
    "coordinates": [
      46.0690295,
      -118.3318254
    ],
    "listeningPosition": [
      46.0687409,
      -118.3318271
    ],
    "zone": {
      "outline": [
        [
          46.0691425,
          -118.3322383
        ],
        [
          46.0692803,
          -118.3320127
        ],
        [
          46.0692144,
          -118.3319404
        ],
        [
          46.0691707,
          -118.3318735
        ],
        [
          46.0691244,
          -118.3317665
        ],
        [
          46.0690875,
          -118.3316597
        ],
        [
          46.0690659,
          -118.3315669
        ],
        [
          46.0691772,
          -118.3314832
        ],
        [
          46.069128,
          -118.3313533
        ],
        [
          46.0689517,
          -118.3314978
        ],
        [
          46.0689281,
          -118.3314545
        ],
        [
          46.0688231,
          -118.331545
        ],
        [
          46.0688346,
          -118.3315839
        ],
        [
          46.068746,
          -118.3316589
        ],
        [
          46.0689931,
          -118.3322542
        ],
        [
          46.0690899,
          -118.3321547
        ]
      ],
      "walkingOutline": [
        [
          46.0685587,
          -118.3314572
        ],
        [
          46.0688593,
          -118.3323839
        ],
        [
          46.0689558,
          -118.3324682
        ],
        [
          46.0691725,
          -118.3324303
        ],
        [
          46.0692803,
          -118.3320127
        ],
        [
          46.0692823,
          -118.3311661
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/fouts.jpg",
    "imageAlt": "Exterior of Fouts Center for Visual Arts at Whitman College.",
    "audio": "assets/audio/fouts.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Fouts Center for Visual Arts houses Whitman’s Art Department. Its teaching spaces support work in media including ceramics, drawing, photography, painting, sculpture, printmaking, and digital arts.",
    "transcript": "You’re near Fouts Center for Visual Arts. The Fouts Center for Visual Arts houses Whitman’s Art Department. Its teaching spaces support work in media including ceramics, drawing, photography, painting, sculpture, printmaking, and digital arts. From the outdoor path, look for changes in light, texture, and shape. Which material might you choose to capture this moment, and what would that material let you show?",
    "source": "https://www.whitman.edu/campus-map?plc=x37177",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37177",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "glover-alston",
    "name": "Glover Alston Intercultural Center",
    "subtitle": "Support, connection, and belonging",
    "category": "Academics",
    "coordinates": [
      46.0695757,
      -118.3340601
    ],
    "listeningPosition": [
      46.0696721,
      -118.334219
    ],
    "zone": {
      "outline": [
        [
          46.0696332,
          -118.3341677
        ],
        [
          46.0696592,
          -118.3339907
        ],
        [
          46.0695156,
          -118.3339531
        ],
        [
          46.0695181,
          -118.3339236
        ],
        [
          46.0694869,
          -118.3339115
        ],
        [
          46.0694817,
          -118.3339477
        ],
        [
          46.0694662,
          -118.3339488
        ],
        [
          46.0694489,
          -118.334092
        ],
        [
          46.069485,
          -118.3340994
        ],
        [
          46.0694827,
          -118.3341251
        ]
      ],
      "walkingOutline": [
        [
          46.0694489,
          -118.334092
        ],
        [
          46.0694827,
          -118.3341251
        ],
        [
          46.0696634,
          -118.3342761
        ],
        [
          46.0696721,
          -118.334219
        ],
        [
          46.0696984,
          -118.3340478
        ],
        [
          46.0696592,
          -118.3339907
        ],
        [
          46.0695181,
          -118.3339236
        ],
        [
          46.0694869,
          -118.3339115
        ],
        [
          46.0694662,
          -118.3339488
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/glover-alston.jpg",
    "imageAlt": "Exterior of Glover Alston Intercultural Center at Whitman College.",
    "audio": "assets/audio/glover-alston.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Glover Alston Intercultural Center supports intercultural awareness and student success. Its programs and individual guidance help students navigate barriers and find resources and community.",
    "transcript": "You’re near Glover Alston Intercultural Center. The Glover Alston Intercultural Center supports intercultural awareness and student success. Its programs and individual guidance help students navigate barriers and find resources and community. Pause on the sidewalk outside and think about what makes a place welcoming. Sometimes belonging begins with a conversation, a familiar face, or knowing there is someone who can help.",
    "source": "https://www.whitman.edu/campus-map?plc=x37179",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37179",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "hall-of-music",
    "name": "Hall of Music",
    "subtitle": "Practice becomes a shared sound",
    "category": "Auditoriums",
    "coordinates": [
      46.0690619,
      -118.3306337
    ],
    "listeningPosition": [
      46.0692224,
      -118.3307395
    ],
    "zone": {
      "outline": [
        [
          46.0692512,
          -118.3308529
        ],
        [
          46.0691859,
          -118.3308499
        ],
        [
          46.0691839,
          -118.3308699
        ],
        [
          46.0691589,
          -118.3308679
        ],
        [
          46.0691522,
          -118.3308845
        ],
        [
          46.0691216,
          -118.3308845
        ],
        [
          46.0691179,
          -118.3308935
        ],
        [
          46.0691039,
          -118.3308959
        ],
        [
          46.0691019,
          -118.3309119
        ],
        [
          46.0690769,
          -118.3309129
        ],
        [
          46.0690739,
          -118.3309279
        ],
        [
          46.0690499,
          -118.3309289
        ],
        [
          46.0690489,
          -118.3309709
        ],
        [
          46.0689511,
          -118.3309682
        ],
        [
          46.0689511,
          -118.3307748
        ],
        [
          46.0689938,
          -118.3307738
        ],
        [
          46.0689939,
          -118.3306839
        ],
        [
          46.0688591,
          -118.3306855
        ],
        [
          46.0688601,
          -118.3304132
        ],
        [
          46.0689932,
          -118.3304139
        ],
        [
          46.0689942,
          -118.3303368
        ],
        [
          46.0692679,
          -118.3303459
        ],
        [
          46.0692675,
          -118.3306865
        ],
        [
          46.0692169,
          -118.3306849
        ],
        [
          46.0692171,
          -118.3307668
        ],
        [
          46.0692512,
          -118.3307685
        ],
        [
          46.0692524,
          -118.3308099
        ]
      ],
      "walkingOutline": [
        [
          46.0687871,
          -118.3311463
        ],
        [
          46.0688909,
          -118.3311997
        ],
        [
          46.0689238,
          -118.3311849
        ],
        [
          46.0694095,
          -118.3309488
        ],
        [
          46.0694164,
          -118.3308935
        ],
        [
          46.0693154,
          -118.3301883
        ],
        [
          46.0691398,
          -118.3301542
        ],
        [
          46.0687881,
          -118.330282
        ],
        [
          46.068788,
          -118.3303437
        ],
        [
          46.0687872,
          -118.3310846
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/hall-of-music.jpg",
    "imageAlt": "Exterior of Hall of Music at Whitman College.",
    "audio": "assets/audio/hall-of-music.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Hall of Music is home to Whitman’s Music Department and Catharine Chism Recital Hall. It brings together rehearsal spaces, teaching studios, practice rooms, and music technology facilities.",
    "transcript": "You’re near Hall of Music. The Hall of Music is home to Whitman’s Music Department and Catharine Chism Recital Hall. It brings together rehearsal spaces, teaching studios, practice rooms, and music technology facilities. From outside, imagine separate lines of practice coming together in an ensemble. Listen to the sounds around you now. Which one would you choose as the beginning of a piece of music?",
    "source": "https://www.whitman.edu/campus-map?plc=x37180",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37180",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "hall-of-science",
    "name": "Hall of Science",
    "subtitle": "Questions from the ground to the sky",
    "category": "Observatories",
    "coordinates": [
      46.0723766,
      -118.3299051
    ],
    "listeningPosition": [
      46.0726469,
      -118.330349
    ],
    "zone": {
      "outline": [
        [
          46.0721569,
          -118.3305616
        ],
        [
          46.0720919,
          -118.3304142
        ],
        [
          46.0721235,
          -118.3303824
        ],
        [
          46.0721255,
          -118.3302583
        ],
        [
          46.0720622,
          -118.3302512
        ],
        [
          46.0720605,
          -118.3296282
        ],
        [
          46.0724155,
          -118.3296393
        ],
        [
          46.0724195,
          -118.3296843
        ],
        [
          46.0724489,
          -118.3296852
        ],
        [
          46.0724505,
          -118.3295663
        ],
        [
          46.0724049,
          -118.3295613
        ],
        [
          46.0724066,
          -118.3293385
        ],
        [
          46.0724444,
          -118.3293416
        ],
        [
          46.0724432,
          -118.3292471
        ],
        [
          46.0725759,
          -118.3292484
        ],
        [
          46.0725756,
          -118.3293308
        ],
        [
          46.0726094,
          -118.3293358
        ],
        [
          46.0726091,
          -118.3295563
        ],
        [
          46.0725755,
          -118.3295583
        ],
        [
          46.0725771,
          -118.3296802
        ],
        [
          46.0727025,
          -118.3296843
        ],
        [
          46.0727007,
          -118.3299614
        ],
        [
          46.0724208,
          -118.3299557
        ],
        [
          46.0724155,
          -118.3301703
        ],
        [
          46.0723483,
          -118.3301734
        ],
        [
          46.0724135,
          -118.3303313
        ],
        [
          46.0722893,
          -118.3304413
        ]
      ],
      "walkingOutline": [
        [
          46.0719263,
          -118.3300265
        ],
        [
          46.0719276,
          -118.3301992
        ],
        [
          46.0720655,
          -118.330692
        ],
        [
          46.0720862,
          -118.3307401
        ],
        [
          46.0721069,
          -118.3307882
        ],
        [
          46.0728767,
          -118.3301828
        ],
        [
          46.0728959,
          -118.3299314
        ],
        [
          46.0729103,
          -118.3297429
        ],
        [
          46.0729151,
          -118.32968
        ],
        [
          46.0729189,
          -118.3296259
        ],
        [
          46.0729226,
          -118.3295717
        ],
        [
          46.0725068,
          -118.3290465
        ],
        [
          46.0724448,
          -118.3290022
        ],
        [
          46.0722901,
          -118.3289928
        ],
        [
          46.0720798,
          -118.3294568
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/hall-of-science.jpg",
    "imageAlt": "Exterior of Hall of Science at Whitman College.",
    "audio": "assets/audio/hall-of-science.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Hall of Science brings together science departments, teaching and research spaces, and the STEM Hub. It also includes Clise Planetarium, a rooftop observatory, and a greenhouse.",
    "transcript": "You’re near Hall of Science. The Hall of Science brings together science departments, teaching and research spaces, and the STEM Hub. It also includes Clise Planetarium, a rooftop observatory, and a greenhouse. Stay on the path outside and notice the range of questions suggested by this one building, from growing things to distant stars. What nearby detail might become the start of an investigation?",
    "source": "https://www.whitman.edu/campus-map?plc=x37181",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37181",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "harper-joy",
    "name": "Harper Joy Theatre",
    "subtitle": "A story before the curtain rises",
    "category": "Auditoriums",
    "coordinates": [
      46.071715,
      -118.330677
    ],
    "listeningPosition": [
      46.0717951,
      -118.3302921
    ],
    "zone": {
      "outline": [
        [
          46.0719264,
          -118.3307251
        ],
        [
          46.0719248,
          -118.3304086
        ],
        [
          46.0715414,
          -118.3303287
        ],
        [
          46.0714298,
          -118.3311059
        ],
        [
          46.0714532,
          -118.3311709
        ],
        [
          46.0715532,
          -118.3310652
        ],
        [
          46.0715725,
          -118.3311229
        ],
        [
          46.0718869,
          -118.3308277
        ],
        [
          46.0718575,
          -118.3307684
        ]
      ],
      "walkingOutline": [
        [
          46.0714164,
          -118.3302049
        ],
        [
          46.0714298,
          -118.3311059
        ],
        [
          46.071473,
          -118.3314761
        ],
        [
          46.0715048,
          -118.3314993
        ],
        [
          46.0720448,
          -118.330644
        ],
        [
          46.0719818,
          -118.3303141
        ],
        [
          46.071928,
          -118.3302529
        ],
        [
          46.0717302,
          -118.3301676
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/harper-joy.jpg",
    "imageAlt": "Exterior of Harper Joy Theatre at Whitman College.",
    "audio": "assets/audio/harper-joy.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Harper Joy Theatre is home to Whitman’s Theater and Dance Department. Its performance spaces include the Alexander Stage and the Freimann Studio Theatre, with workshops and studios supporting the work behind a production.",
    "transcript": "You’re near Harper Joy Theatre. Harper Joy Theatre is home to Whitman’s Theater and Dance Department. Its performance spaces include the Alexander Stage and the Freimann Studio Theatre, with workshops and studios supporting the work behind a production. Pause outside and imagine how many different hands help bring a story to a stage. A performance begins long before an audience takes its seats.",
    "source": "https://www.whitman.edu/campus-map?plc=x37182",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37182",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "harvey",
    "name": "Harvey Hall",
    "subtitle": "A newer chapter in campus housing",
    "category": "Community & campus life",
    "coordinates": [
      46.0696193,
      -118.333193
    ],
    "listeningPosition": [
      46.0698667,
      -118.3329121
    ],
    "zone": {
      "outline": [
        [
          46.0698547,
          -118.3330277
        ],
        [
          46.0698677,
          -118.3329205
        ],
        [
          46.0697774,
          -118.3328875
        ],
        [
          46.069769,
          -118.3329297
        ],
        [
          46.0697262,
          -118.3329174
        ],
        [
          46.0697075,
          -118.3330323
        ],
        [
          46.0697185,
          -118.3330368
        ],
        [
          46.0697144,
          -118.333062
        ],
        [
          46.0694904,
          -118.3330693
        ],
        [
          46.0694891,
          -118.3332611
        ],
        [
          46.0695311,
          -118.3332638
        ],
        [
          46.0695295,
          -118.3333228
        ],
        [
          46.0698111,
          -118.3333168
        ],
        [
          46.0698471,
          -118.3330532
        ],
        [
          46.0698389,
          -118.3330519
        ],
        [
          46.0698419,
          -118.3330254
        ]
      ],
      "walkingOutline": [
        [
          46.0694891,
          -118.3332611
        ],
        [
          46.0695295,
          -118.3333228
        ],
        [
          46.0697975,
          -118.3333797
        ],
        [
          46.0698111,
          -118.3333168
        ],
        [
          46.0698547,
          -118.3330277
        ],
        [
          46.0698677,
          -118.3329205
        ],
        [
          46.0698694,
          -118.3328938
        ],
        [
          46.0698703,
          -118.3328453
        ],
        [
          46.0698721,
          -118.3327484
        ],
        [
          46.0694904,
          -118.3330693
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/harvey.jpg",
    "imageAlt": "Exterior of Harvey Hall at Whitman College.",
    "audio": "assets/audio/harvey.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Harvey Hall is one of the three buildings in Nancy Serrurier Village, offering apartment-style housing for juniors and seniors. It is named for Peter Harvey, Class of 1984, who served as Whitman’s longest-serving chief financial officer.",
    "transcript": "You’re near Harvey Hall. Harvey Hall is one of the three buildings in Nancy Serrurier Village, offering apartment-style housing for juniors and seniors. It is named for Peter Harvey, Class of 1984, who served as Whitman’s longest-serving chief financial officer. From the sidewalk outside, notice how a new residential building becomes part of an older campus. Please leave the living areas to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x65515",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x65515",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "hunter",
    "name": "Hunter Conservatory",
    "subtitle": "An old building with many forms of expression",
    "category": "Auditoriums",
    "coordinates": [
      46.0698605,
      -118.3305812
    ],
    "listeningPosition": [
      46.0699979,
      -118.3305619
    ],
    "zone": {
      "outline": [
        [
          46.0699278,
          -118.3307613
        ],
        [
          46.0699728,
          -118.3304533
        ],
        [
          46.0697932,
          -118.3304
        ],
        [
          46.0697849,
          -118.3304722
        ],
        [
          46.0697084,
          -118.3304559
        ],
        [
          46.0696912,
          -118.3305949
        ],
        [
          46.069761,
          -118.3306179
        ],
        [
          46.0697482,
          -118.330711
        ]
      ],
      "walkingOutline": [
        [
          46.0695452,
          -118.3308776
        ],
        [
          46.0699763,
          -118.3309819
        ],
        [
          46.0701295,
          -118.3309311
        ],
        [
          46.0701378,
          -118.3308733
        ],
        [
          46.0701961,
          -118.3304688
        ],
        [
          46.0702045,
          -118.330411
        ],
        [
          46.0702038,
          -118.3304038
        ],
        [
          46.0700624,
          -118.3302494
        ],
        [
          46.070022,
          -118.3302284
        ],
        [
          46.0699412,
          -118.3301865
        ],
        [
          46.0699008,
          -118.3301656
        ],
        [
          46.0697883,
          -118.3302082
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/hunter.jpg",
    "imageAlt": "Exterior of Hunter Conservatory at Whitman College.",
    "audio": "assets/audio/hunter.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Hunter Conservatory houses Film and Media Studies and Kimball Theatre, a recital and lecture space. A stained glass skylight above its multi-story atrium is one of the building’s distinctive interior features.",
    "transcript": "You’re near Hunter Conservatory. Hunter Conservatory houses Film and Media Studies and Kimball Theatre, a recital and lecture space. A stained glass skylight above its multi-story atrium is one of the building’s distinctive interior features. From the path outside, consider how a single building can hold films, readings, performances, and conversation across time. Which kind of story would you most like to hear here?",
    "source": "https://www.whitman.edu/campus-map?plc=x37183",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37183",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "spanish-house",
    "name": "La Casa Hispana",
    "subtitle": "A language learned through living",
    "category": "Interest Houses",
    "coordinates": [
      46.0703574,
      -118.3274764
    ],
    "listeningPosition": [
      46.0704662,
      -118.3274584
    ],
    "zone": {
      "outline": [
        [
          46.0704296,
          -118.3275533
        ],
        [
          46.0704296,
          -118.3274018
        ],
        [
          46.0702852,
          -118.3273998
        ],
        [
          46.0702843,
          -118.3275506
        ]
      ],
      "walkingOutline": [
        [
          46.0702843,
          -118.3275506
        ],
        [
          46.0704648,
          -118.3275877
        ],
        [
          46.070467,
          -118.3273937
        ],
        [
          46.0702852,
          -118.3273998
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/spanish-house.png",
    "imageAlt": "Exterior of La Casa Hispana at Whitman College.",
    "audio": "assets/audio/spanish-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "La Casa Hispana, the Spanish House, belongs to Whitman’s Interest House Community. It works with the Hispanic Studies Department, connecting residential life with language and cultural learning.",
    "transcript": "You’re near La Casa Hispana. La Casa Hispana, the Spanish House, belongs to Whitman’s Interest House Community. It works with the Hispanic Studies Department, connecting residential life with language and cultural learning. Stay outside on the approach and imagine the everyday exchanges that help a language become familiar. A home can be a place to practice, listen, and learn from one another. Respect the residents’ private spaces.",
    "source": "https://www.whitman.edu/campus-map?plc=x37185",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37185",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "french-house",
    "name": "La Maison",
    "subtitle": "Everyday exchanges in another language",
    "category": "Interest Houses",
    "coordinates": [
      46.0703555,
      -118.3272371
    ],
    "listeningPosition": [
      46.0704689,
      -118.3272203
    ],
    "zone": {
      "outline": [
        [
          46.0704359,
          -118.3273266
        ],
        [
          46.0704341,
          -118.3271491
        ],
        [
          46.0702759,
          -118.3271471
        ],
        [
          46.0702769,
          -118.3273256
        ]
      ],
      "walkingOutline": [
        [
          46.0702759,
          -118.3271471
        ],
        [
          46.0702769,
          -118.3273256
        ],
        [
          46.0704675,
          -118.3273462
        ],
        [
          46.0704682,
          -118.3272833
        ],
        [
          46.0704696,
          -118.3271574
        ],
        [
          46.0704341,
          -118.3271491
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/french-house.png",
    "imageAlt": "Exterior of La Maison at Whitman College.",
    "audio": "assets/audio/french-house.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "La Maison, the French House, is part of Whitman’s Interest House Community. It works with the French and Francophone Studies Department and a faculty adviser.",
    "transcript": "You’re near La Maison. La Maison, the French House, is part of Whitman’s Interest House Community. It works with the French and Francophone Studies Department and a faculty adviser. Pause on the outdoor path and think about the difference between studying words and using them in a shared daily life. What small conversation would you like to be able to have in another language?",
    "source": "https://www.whitman.edu/campus-map?plc=x37186",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37186",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "lavender-house",
    "name": "Lavender House",
    "subtitle": "Community, identity, and a place to belong",
    "category": "Interest Houses",
    "coordinates": [
      46.0691619,
      -118.3270318
    ],
    "listeningPosition": [
      46.0691613,
      -118.3268108
    ],
    "zone": {
      "outline": [
        [
          46.0692332,
          -118.3271227
        ],
        [
          46.0692332,
          -118.3269405
        ],
        [
          46.0692089,
          -118.3269412
        ],
        [
          46.0691642,
          -118.3269405
        ],
        [
          46.0690943,
          -118.3269439
        ],
        [
          46.0690907,
          -118.3270697
        ],
        [
          46.0691594,
          -118.327067
        ],
        [
          46.0691595,
          -118.3271231
        ]
      ],
      "walkingOutline": [
        [
          46.0690907,
          -118.3270697
        ],
        [
          46.0691595,
          -118.3271231
        ],
        [
          46.0692332,
          -118.3271227
        ],
        [
          46.0693052,
          -118.3268109
        ],
        [
          46.0692692,
          -118.3268109
        ],
        [
          46.0691613,
          -118.3268108
        ],
        [
          46.0690943,
          -118.3269439
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/lavender-house.jpg",
    "imageAlt": "Exterior of Lavender House at Whitman College.",
    "audio": "assets/audio/lavender-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Lavender House is part of Whitman’s Interest House Community. Its programs support learning and community building around LGBTQIA2S+ identities and experiences across campus.",
    "transcript": "You’re near Lavender House. Lavender House is part of Whitman’s Interest House Community. Its programs support learning and community building around LGBTQIA2S+ identities and experiences across campus. From the sidewalk outside, consider the importance of having room to be yourself and people who understand you. This is also a residence. Keep the listening stop outside and respect the privacy of those who call it home.",
    "source": "https://www.whitman.edu/campus-map?plc=x63639",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x63639",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on an approximate same-side street frontage (6 m from the mapped road centerline), not surveyed sidewalk geometry. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "maxey",
    "name": "Maxey Hall",
    "subtitle": "Looking closely at human stories",
    "category": "Auditoriums",
    "coordinates": [
      46.0713347,
      -118.3273105
    ],
    "listeningPosition": [
      46.0715497,
      -118.3271904
    ],
    "zone": {
      "outline": [
        [
          46.0715243,
          -118.327924
        ],
        [
          46.0712787,
          -118.327924
        ],
        [
          46.0711652,
          -118.3278114
        ],
        [
          46.0711093,
          -118.3278114
        ],
        [
          46.0711093,
          -118.3276075
        ],
        [
          46.071167,
          -118.3276075
        ],
        [
          46.071287,
          -118.3275324
        ],
        [
          46.0712894,
          -118.3274721
        ],
        [
          46.071191,
          -118.3274647
        ],
        [
          46.0711875,
          -118.3266956
        ],
        [
          46.0714759,
          -118.3266983
        ],
        [
          46.0714722,
          -118.3274305
        ],
        [
          46.071381,
          -118.3274305
        ],
        [
          46.0713801,
          -118.3275217
        ],
        [
          46.0714336,
          -118.3275217
        ],
        [
          46.0714306,
          -118.3276344
        ],
        [
          46.0715202,
          -118.327633
        ]
      ],
      "walkingOutline": [
        [
          46.0709042,
          -118.327446
        ],
        [
          46.0709612,
          -118.3280641
        ],
        [
          46.0711538,
          -118.3282085
        ],
        [
          46.0715652,
          -118.3282556
        ],
        [
          46.0716524,
          -118.3266225
        ],
        [
          46.0716419,
          -118.326598
        ],
        [
          46.0712743,
          -118.3265913
        ],
        [
          46.0710488,
          -118.3265985
        ],
        [
          46.0709544,
          -118.3268639
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/maxey.jpg",
    "imageAlt": "Exterior of Maxey Hall at Whitman College.",
    "audio": "assets/audio/maxey.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Maxey Hall houses social science departments, Deshler Auditorium, and the Maxey Museum. The museum’s collections connect natural history and anthropology with opportunities for students to study and interpret the past.",
    "transcript": "You’re near Maxey Hall. Maxey Hall houses social science departments, Deshler Auditorium, and the Maxey Museum. The museum’s collections connect natural history and anthropology with opportunities for students to study and interpret the past. Pause on the surrounding path. A familiar object can become evidence when someone asks a new question about it. What might a future visitor learn from the ordinary things around this campus?",
    "source": "https://www.whitman.edu/campus-map?plc=x37191",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37191",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "multicultural-house",
    "name": "Multicultural House",
    "subtitle": "Sharing cultures through campus life",
    "category": "Interest Houses",
    "coordinates": [
      46.0693775,
      -118.3282933
    ],
    "listeningPosition": [
      46.0693749,
      -118.3281928
    ],
    "zone": {
      "outline": [
        [
          46.0694231,
          -118.3283729
        ],
        [
          46.0693301,
          -118.3283702
        ],
        [
          46.0693319,
          -118.3282124
        ],
        [
          46.0694249,
          -118.3282178
        ]
      ],
      "walkingOutline": [
        [
          46.0691779,
          -118.328192
        ],
        [
          46.0692411,
          -118.328559
        ],
        [
          46.0696582,
          -118.3281971
        ],
        [
          46.0695532,
          -118.3281946
        ],
        [
          46.0693749,
          -118.3281928
        ],
        [
          46.0692411,
          -118.3281914
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/multicultural-house.png",
    "imageAlt": "Exterior of Multicultural House at Whitman College.",
    "audio": "assets/audio/multicultural-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "The Multicultural House belongs to Whitman’s Interest House Community and is affiliated with the Glover Alston Intercultural Center. Its residents promote cultural awareness and celebrate different cultures.",
    "transcript": "You’re near Multicultural House. The Multicultural House belongs to Whitman’s Interest House Community and is affiliated with the Glover Alston Intercultural Center. Its residents promote cultural awareness and celebrate different cultures. Listen from the sidewalk outside. Think about a tradition, a story, or a shared meal that has helped you understand someone else’s experience. Leave the private living spaces to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x37190",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37190",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "olin",
    "name": "Olin Hall",
    "subtitle": "A meeting place for many questions",
    "category": "Auditoriums",
    "coordinates": [
      46.0728583,
      -118.3282808
    ],
    "listeningPosition": [
      46.0725507,
      -118.3282524
    ],
    "zone": {
      "outline": [
        [
          46.0728678,
          -118.3292449
        ],
        [
          46.0728788,
          -118.3290949
        ],
        [
          46.0728488,
          -118.3290889
        ],
        [
          46.0728845,
          -118.3286766
        ],
        [
          46.0729158,
          -118.3286739
        ],
        [
          46.0729528,
          -118.3282564
        ],
        [
          46.0729825,
          -118.3282516
        ],
        [
          46.073006,
          -118.328038
        ],
        [
          46.0730652,
          -118.3280436
        ],
        [
          46.0730965,
          -118.3276085
        ],
        [
          46.072675,
          -118.327562
        ],
        [
          46.0726019,
          -118.328637
        ],
        [
          46.0727125,
          -118.3286516
        ],
        [
          46.0726869,
          -118.3290562
        ],
        [
          46.0726459,
          -118.3290545
        ],
        [
          46.072634,
          -118.3292206
        ],
        [
          46.0727413,
          -118.3292342
        ]
      ],
      "walkingOutline": [
        [
          46.0724865,
          -118.3290047
        ],
        [
          46.0725068,
          -118.3290465
        ],
        [
          46.0725474,
          -118.3291131
        ],
        [
          46.0727473,
          -118.3294213
        ],
        [
          46.0729226,
          -118.3295724
        ],
        [
          46.073035,
          -118.329168
        ],
        [
          46.0731711,
          -118.3274348
        ],
        [
          46.0726287,
          -118.3274101
        ],
        [
          46.0725832,
          -118.327508
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/olin.jpg",
    "imageAlt": "Exterior of Olin Hall at Whitman College.",
    "audio": "assets/audio/olin.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Olin Hall brings together humanities departments, student academic support, computing and math spaces, and an auditorium. It also contains the Donald H. Sheehan Art Gallery.",
    "transcript": "You’re near Olin Hall. Olin Hall brings together humanities departments, student academic support, computing and math spaces, and an auditorium. It also contains the Donald H. Sheehan Art Gallery. From the path outside, think about how different kinds of questions can share a building. A poem, a proof, a conversation, and a work of art can each offer a different way of seeing the world.",
    "source": "https://www.whitman.edu/campus-map?plc=x37194",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37194",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "penrose-house",
    "name": "Penrose House",
    "subtitle": "A first welcome, with a history",
    "category": "Administration",
    "coordinates": [
      46.0709567,
      -118.3261433
    ],
    "listeningPosition": [
      46.0708556,
      -118.3263703
    ],
    "zone": {
      "outline": [
        [
          46.0708566,
          -118.3262808
        ],
        [
          46.070871,
          -118.3259884
        ],
        [
          46.0710593,
          -118.3260071
        ],
        [
          46.0710423,
          -118.3262972
        ]
      ],
      "walkingOutline": [
        [
          46.0706253,
          -118.3263282
        ],
        [
          46.070794,
          -118.326596
        ],
        [
          46.0710058,
          -118.3263738
        ],
        [
          46.0710423,
          -118.3262972
        ],
        [
          46.0710593,
          -118.3260071
        ],
        [
          46.0706588,
          -118.3258477
        ],
        [
          46.0706271,
          -118.3262965
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/penrose-house.jpg",
    "imageAlt": "Exterior of Penrose House at Whitman College.",
    "audio": "assets/audio/penrose-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Penrose House is home to Whitman’s Office of Admission and is a starting place for campus tours. Built in 1921, it originally served as the college president’s residence and is named for Stephen B. L. Penrose.",
    "transcript": "You’re near Penrose House. Penrose House is home to Whitman’s Office of Admission and is a starting place for campus tours. Built in 1921, it originally served as the college president’s residence and is named for Stephen B. L. Penrose. Pause on the sidewalk outside. Think back to your own first impression of campus, and the detail that made an unfamiliar place begin to feel recognizable.",
    "source": "https://www.whitman.edu/campus-map?plc=x37198",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37198",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "phi-delta-theta",
    "name": "Phi Delta Theta",
    "subtitle": "A house within a longer history",
    "category": "Sorority & Fraternity Life",
    "coordinates": [
      46.0739951,
      -118.3270224
    ],
    "listeningPosition": [
      46.0741289,
      -118.3265546
    ],
    "zone": {
      "outline": [
        [
          46.0740473,
          -118.327131
        ],
        [
          46.0740325,
          -118.327037
        ],
        [
          46.0740979,
          -118.3270217
        ],
        [
          46.0740738,
          -118.326882
        ],
        [
          46.0738655,
          -118.326933
        ],
        [
          46.0738873,
          -118.327075
        ],
        [
          46.0739399,
          -118.327059
        ],
        [
          46.0739577,
          -118.3271523
        ]
      ],
      "walkingOutline": [
        [
          46.073812,
          -118.3266741
        ],
        [
          46.0738873,
          -118.327075
        ],
        [
          46.0739577,
          -118.3271523
        ],
        [
          46.0740473,
          -118.327131
        ],
        [
          46.0740979,
          -118.3270217
        ],
        [
          46.0741289,
          -118.3265546
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/phi-delta-theta.jpg",
    "imageAlt": "Exterior of Phi Delta Theta at Whitman College.",
    "audio": "assets/audio/phi-delta-theta.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Whitman’s Washington Beta chapter of Phi Delta Theta was founded in 1915. Its chapter house includes spaces for dining, study, and recreation.",
    "transcript": "You’re near Phi Delta Theta. Whitman’s Washington Beta chapter of Phi Delta Theta was founded in 1915. Its chapter house includes spaces for dining, study, and recreation. Listen from the sidewalk outside and consider how shared spaces can shape a student community across generations. The building is also a home, so keep this visit outside and leave its private areas to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x37200",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37200",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "prentiss",
    "name": "Prentiss Hall",
    "subtitle": "A home between gathering places",
    "category": "Residence Halls",
    "coordinates": [
      46.0694568,
      -118.3296568
    ],
    "listeningPosition": [
      46.0694259,
      -118.3296464
    ],
    "zone": {
      "outline": [
        [
          46.0697324,
          -118.3299928
        ],
        [
          46.0697314,
          -118.3298403
        ],
        [
          46.0695505,
          -118.3298376
        ],
        [
          46.0695496,
          -118.3294578
        ],
        [
          46.0697314,
          -118.3294578
        ],
        [
          46.0697332,
          -118.3293311
        ],
        [
          46.0696623,
          -118.3293261
        ],
        [
          46.0695924,
          -118.3293195
        ],
        [
          46.0694823,
          -118.3293219
        ],
        [
          46.0693872,
          -118.3293136
        ],
        [
          46.0692948,
          -118.3293133
        ],
        [
          46.0692322,
          -118.3293157
        ],
        [
          46.0692332,
          -118.3294645
        ],
        [
          46.0694313,
          -118.3294659
        ],
        [
          46.0694313,
          -118.329833
        ],
        [
          46.0692286,
          -118.3298356
        ],
        [
          46.0692305,
          -118.3299948
        ]
      ],
      "walkingOutline": [
        [
          46.069127,
          -118.3295064
        ],
        [
          46.0691297,
          -118.3299079
        ],
        [
          46.0691779,
          -118.3301548
        ],
        [
          46.0692701,
          -118.3301691
        ],
        [
          46.0693498,
          -118.3301752
        ],
        [
          46.069733,
          -118.3301378
        ],
        [
          46.0699653,
          -118.3298474
        ],
        [
          46.0699261,
          -118.3296539
        ],
        [
          46.0697894,
          -118.3292737
        ],
        [
          46.0697195,
          -118.3292149
        ],
        [
          46.0692411,
          -118.3291015
        ],
        [
          46.0691604,
          -118.3292136
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/prentiss.png",
    "imageAlt": "Exterior of Prentiss Hall at Whitman College.",
    "audio": "assets/audio/prentiss.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Prentiss Hall stands between Boyer Avenue and Cleveland Commons. It is a residence for women-identifying and gender nonbinary students and is also home to Whitman’s four sororities.",
    "transcript": "You’re near Prentiss Hall. Prentiss Hall stands between Boyer Avenue and Cleveland Commons. It is a residence for women-identifying and gender nonbinary students and is also home to Whitman’s four sororities. From the outdoor approach, notice the routes between housing, dining, and the rest of campus. Daily life often takes shape along these short, repeated journeys. Please respect the privacy of the people who live here.",
    "source": "https://www.whitman.edu/campus-map?plc=x37204",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37204",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "robart",
    "name": "Robart Hall",
    "subtitle": "Apartment life in Nancy Serrurier Village",
    "category": "Community & campus life",
    "coordinates": [
      46.0691239,
      -118.3328319
    ],
    "listeningPosition": [
      46.0689619,
      -118.3327992
    ],
    "zone": {
      "outline": [
        [
          46.0689732,
          -118.3331395
        ],
        [
          46.0689566,
          -118.3331849
        ],
        [
          46.0688831,
          -118.333126
        ],
        [
          46.0689975,
          -118.3328256
        ],
        [
          46.0690355,
          -118.3328471
        ],
        [
          46.0690557,
          -118.3327988
        ],
        [
          46.0690552,
          -118.3326862
        ],
        [
          46.0692775,
          -118.3326863
        ],
        [
          46.0692792,
          -118.3326811
        ],
        [
          46.0693533,
          -118.3326814
        ],
        [
          46.0693526,
          -118.3328055
        ],
        [
          46.069314,
          -118.3328069
        ],
        [
          46.0693138,
          -118.3328298
        ],
        [
          46.069321,
          -118.3328365
        ],
        [
          46.0693205,
          -118.3329412
        ],
        [
          46.0691558,
          -118.3329413
        ],
        [
          46.0691427,
          -118.3329309
        ],
        [
          46.0691166,
          -118.3329959
        ],
        [
          46.0691313,
          -118.3330078
        ],
        [
          46.0690862,
          -118.3331228
        ],
        [
          46.0690892,
          -118.3331275
        ],
        [
          46.0690542,
          -118.3332173
        ],
        [
          46.0689804,
          -118.333161
        ],
        [
          46.0689854,
          -118.3331449
        ]
      ],
      "walkingOutline": [
        [
          46.068788,
          -118.3332265
        ],
        [
          46.0690542,
          -118.3332173
        ],
        [
          46.0693205,
          -118.3329412
        ],
        [
          46.0693526,
          -118.3328055
        ],
        [
          46.0693533,
          -118.3326814
        ],
        [
          46.0691173,
          -118.3325215
        ],
        [
          46.0689546,
          -118.3325128
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/robart.jpg",
    "imageAlt": "Exterior of Robart Hall at Whitman College.",
    "audio": "assets/audio/robart.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Robart Hall is one of three buildings in Nancy Serrurier Village, offering apartment-style housing for juniors and seniors. It is named for James Robart, a member of the Class of 1969, a federal judge, and an emeritus trustee.",
    "transcript": "You’re near Robart Hall. Robart Hall is one of three buildings in Nancy Serrurier Village, offering apartment-style housing for juniors and seniors. It is named for James Robart, a member of the Class of 1969, a federal judge, and an emeritus trustee. Pause on the sidewalk outside and notice the spaces between neighboring buildings. Those spaces help connect individual homes with a wider campus community.",
    "source": "https://www.whitman.edu/campus-map?plc=x65516",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x65516",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "sherwood-athletic",
    "name": "Sherwood Athletic Center",
    "subtitle": "The sound of a crowd, the work of practice",
    "category": "Athletics",
    "coordinates": [
      46.0712125,
      -118.3308613
    ],
    "listeningPosition": [
      46.0711514,
      -118.3313223
    ],
    "zone": {
      "outline": [
        [
          46.0713176,
          -118.3312513
        ],
        [
          46.0713456,
          -118.3310674
        ],
        [
          46.0713819,
          -118.3310733
        ],
        [
          46.0714517,
          -118.3305723
        ],
        [
          46.0711074,
          -118.3304709
        ],
        [
          46.0710499,
          -118.3308141
        ],
        [
          46.0708555,
          -118.3307603
        ],
        [
          46.070803,
          -118.3310996
        ],
        [
          46.0709191,
          -118.3311351
        ]
      ],
      "walkingOutline": [
        [
          46.0707476,
          -118.3312024
        ],
        [
          46.0714412,
          -118.3314529
        ],
        [
          46.0714642,
          -118.3305127
        ],
        [
          46.0710804,
          -118.3304068
        ],
        [
          46.0708729,
          -118.3306929
        ],
        [
          46.0708555,
          -118.3307603
        ],
        [
          46.0707567,
          -118.3311443
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/sherwood-athletic.jpg",
    "imageAlt": "Exterior of Sherwood Athletic Center at Whitman College.",
    "audio": "assets/audio/sherwood-athletic.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Sherwood Athletic Center houses Whitman’s main gym, where varsity basketball and volleyball games take place. It also brings together other recreation and athletic spaces, including the Climbing Center on its south side.",
    "transcript": "You’re near Sherwood Athletic Center. Sherwood Athletic Center houses Whitman’s main gym, where varsity basketball and volleyball games take place. It also brings together other recreation and athletic spaces, including the Climbing Center on its south side. Standing on the path outside, imagine a gym shifting from quiet practice to a crowded game. What changes when people gather to watch and cheer together?",
    "source": "https://www.whitman.edu/campus-map?plc=x37206",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37206",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "sherwood-house",
    "name": "Sherwood House",
    "subtitle": "A private home in the college story",
    "category": "Community & campus life",
    "coordinates": [
      46.0752924,
      -118.3237138
    ],
    "listeningPosition": [
      46.0751582,
      -118.3233318
    ],
    "zone": {
      "outline": [
        [
          46.0753314,
          -118.3238775
        ],
        [
          46.0753834,
          -118.3236118
        ],
        [
          46.0752535,
          -118.3235474
        ],
        [
          46.075205,
          -118.3238239
        ]
      ],
      "walkingOutline": [
        [
          46.0750785,
          -118.3235032
        ],
        [
          46.075205,
          -118.3238239
        ],
        [
          46.0753314,
          -118.3238775
        ],
        [
          46.0753834,
          -118.3236118
        ],
        [
          46.0751582,
          -118.3233318
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/sherwood-house.jpg",
    "imageAlt": "Exterior of Sherwood House at Whitman College.",
    "audio": "assets/audio/sherwood-house.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Sherwood House was built in 1922 and has served as the Whitman College president’s residence since 1995. It is part of the college’s history, as well as a private home.",
    "transcript": "You’re near Sherwood House. Sherwood House was built in 1922 and has served as the Whitman College president’s residence since 1995. It is part of the college’s history, as well as a private home. Listen from the public sidewalk and keep away from the driveway and grounds. A campus has many visible landmarks whose everyday life is best respected from a distance.",
    "source": "https://www.whitman.edu/campus-map?plc=x37207",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37207",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on an approximate same-side street frontage (6 m from the mapped road centerline), not surveyed sidewalk geometry. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "sigma-chi",
    "name": "Sigma Chi",
    "subtitle": "A student community across generations",
    "category": "Sorority & Fraternity Life",
    "coordinates": [
      46.0735628,
      -118.3263522
    ],
    "listeningPosition": [
      46.0736646,
      -118.3265032
    ],
    "zone": {
      "outline": [
        [
          46.0736605,
          -118.326473
        ],
        [
          46.0734502,
          -118.3264542
        ],
        [
          46.0734651,
          -118.3262289
        ],
        [
          46.0736735,
          -118.326253
        ]
      ],
      "walkingOutline": [
        [
          46.0733371,
          -118.3266628
        ],
        [
          46.0736646,
          -118.3265032
        ],
        [
          46.0736735,
          -118.326253
        ],
        [
          46.0734651,
          -118.3262289
        ],
        [
          46.0733423,
          -118.3266125
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/sigma-chi.jpg",
    "imageAlt": "Exterior of Sigma Chi at Whitman College.",
    "audio": "assets/audio/sigma-chi.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Whitman’s Gamma Epsilon chapter of Sigma Chi was founded in 1923. The chapter house is part of the college’s fraternity community and the residential landscape north of the central campus.",
    "transcript": "You’re near Sigma Chi. Whitman’s Gamma Epsilon chapter of Sigma Chi was founded in 1923. The chapter house is part of the college’s fraternity community and the residential landscape north of the central campus. From the sidewalk outside, consider the many different communities that can exist within one college. This listening stop stays outside; please respect the residents and their private spaces.",
    "source": "https://www.whitman.edu/campus-map?plc=x37208",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37208",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "spirituality-house",
    "name": "Spirituality House",
    "subtitle": "A place for reflection and exchange",
    "category": "Interest Houses",
    "coordinates": [
      46.0694366,
      -118.3273271
    ],
    "listeningPosition": [
      46.0695047,
      -118.3273909
    ],
    "zone": {
      "outline": [
        [
          46.0694998,
          -118.32741
        ],
        [
          46.0693736,
          -118.3274103
        ],
        [
          46.0693734,
          -118.3272442
        ],
        [
          46.0694996,
          -118.3272439
        ]
      ],
      "walkingOutline": [
        [
          46.0693734,
          -118.3272442
        ],
        [
          46.0693736,
          -118.3274103
        ],
        [
          46.0695047,
          -118.3274688
        ],
        [
          46.0695047,
          -118.3274132
        ],
        [
          46.0695048,
          -118.3272416
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/spirituality-house.jpg",
    "imageAlt": "Exterior of Spirituality House at Whitman College.",
    "audio": "assets/audio/spirituality-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Spirituality House belongs to Whitman’s Interest House Community and works with the Office of Religious and Spiritual Life. Residents explore religious, cultural, spiritual, moral, and philosophical traditions in relationship with others.",
    "transcript": "You’re near Spirituality House. Spirituality House belongs to Whitman’s Interest House Community and works with the Office of Religious and Spiritual Life. Residents explore religious, cultural, spiritual, moral, and philosophical traditions in relationship with others. Pause outside and notice a moment of quiet between the sounds of campus. What question or practice helps you reflect? Leave the private living areas to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x63638",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x63638",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "stegner",
    "name": "Stegner Hall",
    "subtitle": "A shared village, a distinct home",
    "category": "Community & campus life",
    "coordinates": [
      46.0690228,
      -118.3336209
    ],
    "listeningPosition": [
      46.0688604,
      -118.3337865
    ],
    "zone": {
      "outline": [
        [
          46.0688206,
          -118.3334748
        ],
        [
          46.0688933,
          -118.3334102
        ],
        [
          46.068911,
          -118.3334478
        ],
        [
          46.0689212,
          -118.3334398
        ],
        [
          46.0689182,
          -118.3334264
        ],
        [
          46.0689906,
          -118.3333674
        ],
        [
          46.0690905,
          -118.3335874
        ],
        [
          46.0690773,
          -118.3336024
        ],
        [
          46.0691012,
          -118.3336604
        ],
        [
          46.0691193,
          -118.3336636
        ],
        [
          46.0691295,
          -118.3336324
        ],
        [
          46.0692764,
          -118.3337258
        ],
        [
          46.0692426,
          -118.3338373
        ],
        [
          46.0692085,
          -118.333819
        ],
        [
          46.0692037,
          -118.3338359
        ],
        [
          46.0692126,
          -118.3338484
        ],
        [
          46.0691821,
          -118.3339431
        ],
        [
          46.0690504,
          -118.3338644
        ],
        [
          46.0690735,
          -118.3337926
        ],
        [
          46.0690491,
          -118.3337779
        ],
        [
          46.0689965,
          -118.3338289
        ],
        [
          46.0689535,
          -118.3337164
        ],
        [
          46.0689401,
          -118.3337302
        ],
        [
          46.0688688,
          -118.3335565
        ],
        [
          46.0688618,
          -118.333566
        ]
      ],
      "walkingOutline": [
        [
          46.0687468,
          -118.3334605
        ],
        [
          46.0687558,
          -118.3335068
        ],
        [
          46.0687737,
          -118.3335995
        ],
        [
          46.068817,
          -118.333693
        ],
        [
          46.0688604,
          -118.3337865
        ],
        [
          46.0691821,
          -118.3339431
        ],
        [
          46.0692426,
          -118.3338373
        ],
        [
          46.0692764,
          -118.3337258
        ],
        [
          46.0689906,
          -118.3333674
        ],
        [
          46.0687669,
          -118.3332818
        ],
        [
          46.0687535,
          -118.3334009
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/stegner.jpg",
    "imageAlt": "Exterior of Stegner Hall at Whitman College.",
    "audio": "assets/audio/stegner.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Stegner Hall is part of Nancy Serrurier Village, providing apartment-style housing for juniors and seniors. It is named for John Stegner, Class of 1977, and educator Laurie Elgee Stegner, Class of 1980.",
    "transcript": "You’re near Stegner Hall. Stegner Hall is part of Nancy Serrurier Village, providing apartment-style housing for juniors and seniors. It is named for John Stegner, Class of 1977, and educator Laurie Elgee Stegner, Class of 1980. From the sidewalk outside, think about how names on buildings connect people with a place. The daily stories of the students living here add another chapter.",
    "source": "https://www.whitman.edu/campus-map?plc=x65517",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x65517",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "tau-kappa-epsilon",
    "name": "Tau Kappa Epsilon",
    "subtitle": "A chapter house on the campus edge",
    "category": "Sorority & Fraternity Life",
    "coordinates": [
      46.0734695,
      -118.3272142
    ],
    "listeningPosition": [
      46.0733085,
      -118.3269137
    ],
    "zone": {
      "outline": [
        [
          46.0735393,
          -118.3274589
        ],
        [
          46.0735673,
          -118.3269856
        ],
        [
          46.0733997,
          -118.3269689
        ],
        [
          46.0733726,
          -118.3274439
        ]
      ],
      "walkingOutline": [
        [
          46.0732348,
          -118.3274887
        ],
        [
          46.0735393,
          -118.3274589
        ],
        [
          46.0736024,
          -118.3267451
        ],
        [
          46.0733319,
          -118.3267131
        ],
        [
          46.073239,
          -118.3274368
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/tau-kappa-epsilon.jpg",
    "imageAlt": "Exterior of Tau Kappa Epsilon at Whitman College.",
    "audio": "assets/audio/tau-kappa-epsilon.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Whitman’s Alpha Theta chapter of Tau Kappa Epsilon was founded in 1930. Its house is part of the fraternity community along the northern side of central campus.",
    "transcript": "You’re near Tau Kappa Epsilon. Whitman’s Alpha Theta chapter of Tau Kappa Epsilon was founded in 1930. Its house is part of the fraternity community along the northern side of central campus. Stay on the sidewalk outside and notice how the campus changes as you move between open grounds and residential buildings. Each house holds a smaller community within the larger college. Please respect its private spaces.",
    "source": "https://www.whitman.edu/campus-map?plc=x37209",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37209",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "tekisuijuku",
    "name": "Tekisuijuku",
    "subtitle": "Japanese language in a residential setting",
    "category": "Interest Houses",
    "coordinates": [
      46.0717405,
      -118.3255145
    ],
    "listeningPosition": [
      46.0715475,
      -118.3258698
    ],
    "zone": {
      "outline": [
        [
          46.0718374,
          -118.3256395
        ],
        [
          46.0718497,
          -118.3254149
        ],
        [
          46.0716437,
          -118.3253853
        ],
        [
          46.0716345,
          -118.325619
        ]
      ],
      "walkingOutline": [
        [
          46.0714651,
          -118.3258508
        ],
        [
          46.0715063,
          -118.3258603
        ],
        [
          46.0716299,
          -118.3258888
        ],
        [
          46.0718358,
          -118.3259364
        ],
        [
          46.0719182,
          -118.3259554
        ],
        [
          46.0718497,
          -118.3254149
        ],
        [
          46.0716437,
          -118.3253853
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/tekisuijuku.jpg",
    "imageAlt": "Exterior of Tekisuijuku at Whitman College.",
    "audio": "assets/audio/tekisuijuku.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Tekisuijuku is a residential interest house for students interested in speaking Japanese and learning about Japanese culture. It is part of Whitman’s Interest House Community.",
    "transcript": "You’re near Tekisuijuku. Tekisuijuku is a residential interest house for students interested in speaking Japanese and learning about Japanese culture. It is part of Whitman’s Interest House Community. From the sidewalk outside, consider how daily conversation can make learning part of a home. A language carries stories and ways of noticing the world, as well as words. Please leave the private living areas to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x37210",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37210",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "third-space",
    "name": "Third Space Center",
    "subtitle": "A center shaped around community",
    "category": "Community & campus life",
    "coordinates": [
      46.0693629,
      -118.3322073
    ],
    "listeningPosition": [
      46.0692374,
      -118.3324827
    ],
    "zone": {
      "outline": [
        [
          46.0694142,
          -118.3323116
        ],
        [
          46.0694292,
          -118.3321871
        ],
        [
          46.0693829,
          -118.3321699
        ],
        [
          46.0693898,
          -118.3321298
        ],
        [
          46.0693428,
          -118.3321085
        ],
        [
          46.0693364,
          -118.3321057
        ],
        [
          46.0693288,
          -118.3321377
        ],
        [
          46.0693153,
          -118.3321399
        ],
        [
          46.0693033,
          -118.3322782
        ],
        [
          46.0693034,
          -118.33228
        ]
      ],
      "walkingOutline": [
        [
          46.0692041,
          -118.332472
        ],
        [
          46.0692374,
          -118.3324827
        ],
        [
          46.0692726,
          -118.3324932
        ],
        [
          46.0693431,
          -118.3325144
        ],
        [
          46.0694142,
          -118.3323116
        ],
        [
          46.0694292,
          -118.3321871
        ],
        [
          46.0693898,
          -118.3321298
        ],
        [
          46.0693428,
          -118.3321085
        ],
        [
          46.0693364,
          -118.3321057
        ],
        [
          46.0693153,
          -118.3321399
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/third-space.png",
    "imageAlt": "Exterior of Third Space Center at Whitman College.",
    "audio": "assets/audio/third-space.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "The Third Space Center supports communities of color at Whitman. Students, staff, faculty, and the Confederated Tribes of the Umatilla Indian Reservation collaborated in its design, and its programs encourage understanding of race and racism.",
    "transcript": "You’re near Third Space Center. The Third Space Center supports communities of color at Whitman. Students, staff, faculty, and the Confederated Tribes of the Umatilla Indian Reservation collaborated in its design, and its programs encourage understanding of race and racism. Pause outside and consider what it means to help shape a place around the needs and experiences of the people who use it.",
    "source": "https://www.whitman.edu/campus-map?plc=x63633",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x63633",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on an approximate same-side street frontage (6 m from the mapped road centerline), not surveyed sidewalk geometry. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "wellness-house",
    "name": "Wellness House",
    "subtitle": "Well-being as part of shared living",
    "category": "Interest Houses",
    "coordinates": [
      46.0694441,
      -118.3270589
    ],
    "listeningPosition": [
      46.069505,
      -118.3268751
    ],
    "zone": {
      "outline": [
        [
          46.0695035,
          -118.327174
        ],
        [
          46.0693847,
          -118.3271743
        ],
        [
          46.0693846,
          -118.3269438
        ],
        [
          46.0695034,
          -118.3269435
        ]
      ],
      "walkingOutline": [
        [
          46.0693846,
          -118.3269438
        ],
        [
          46.0693847,
          -118.3271743
        ],
        [
          46.0695048,
          -118.3271815
        ],
        [
          46.069505,
          -118.3268751
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/wellness-house.jpg",
    "imageAlt": "Exterior of Wellness House at Whitman College.",
    "audio": "assets/audio/wellness-house.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Wellness House is part of Whitman’s Interest House Community. This residential setting is one of the smaller places where students build a shared daily life within the larger college.",
    "transcript": "You’re near Wellness House. Wellness House is part of Whitman’s Interest House Community. This residential setting is one of the smaller places where students build a shared daily life within the larger college. From the sidewalk outside, take a breath and notice your pace. What ordinary routine helps you feel grounded? Keep this listening stop outside and respect the privacy of the people living here.",
    "source": "https://www.whitman.edu/campus-map?plc=x37178",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37178",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "welty",
    "name": "Welty Health & Counseling Center",
    "subtitle": "Care as part of campus life",
    "category": "Administration",
    "coordinates": [
      46.0701216,
      -118.3263401
    ],
    "listeningPosition": [
      46.0704769,
      -118.32619
    ],
    "zone": {
      "outline": [
        [
          46.0703814,
          -118.3263476
        ],
        [
          46.0703832,
          -118.3261975
        ],
        [
          46.0702249,
          -118.3262036
        ],
        [
          46.0702249,
          -118.3261385
        ],
        [
          46.0700192,
          -118.3261312
        ],
        [
          46.0700212,
          -118.326544
        ],
        [
          46.0702219,
          -118.3265466
        ],
        [
          46.0702277,
          -118.3263506
        ]
      ],
      "walkingOutline": [
        [
          46.0698332,
          -118.3266652
        ],
        [
          46.070098,
          -118.3267337
        ],
        [
          46.0703674,
          -118.3266663
        ],
        [
          46.0704721,
          -118.3265617
        ],
        [
          46.0704994,
          -118.3259055
        ],
        [
          46.0700192,
          -118.3261312
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/welty.png",
    "imageAlt": "Exterior of Welty Health & Counseling Center at Whitman College.",
    "audio": "assets/audio/welty.wav",
    "ambience": "chime",
    "durationLabel": "About 30 seconds",
    "description": "Welty Health and Counseling Center supports students’ physical, mental, and emotional well-being through coordinated care. It is one of the places where the work of learning is supported by the work of looking after people.",
    "transcript": "You’re near Welty Health & Counseling Center. Welty Health and Counseling Center supports students’ physical, mental, and emotional well-being through coordinated care. It is one of the places where the work of learning is supported by the work of looking after people. Pause on the outdoor path and consider the quieter forms of support that make a community possible. Respect the privacy of everyone using the center.",
    "source": "https://www.whitman.edu/campus-map?plc=x37211",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37211",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "writing-house",
    "name": "Writing House",
    "subtitle": "Making room for a sentence",
    "category": "Interest Houses",
    "coordinates": [
      46.0687933,
      -118.3276613
    ],
    "listeningPosition": [
      46.0688378,
      -118.3279106
    ],
    "zone": {
      "outline": [
        [
          46.0688374,
          -118.3277706
        ],
        [
          46.0687472,
          -118.3277672
        ],
        [
          46.0687492,
          -118.3275535
        ],
        [
          46.0688384,
          -118.3275538
        ]
      ],
      "walkingOutline": [
        [
          46.0685398,
          -118.3279227
        ],
        [
          46.0690077,
          -118.3279099
        ],
        [
          46.0688384,
          -118.3275538
        ],
        [
          46.0687492,
          -118.3275535
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/writing-house.png",
    "imageAlt": "Exterior of Writing House at Whitman College.",
    "audio": "assets/audio/writing-house.wav",
    "ambience": "chime",
    "durationLabel": "About 25 seconds",
    "description": "Writing House belongs to Whitman’s Interest House Community and works with an adviser from the English Department. It offers a shared residential setting where students can develop their writing.",
    "transcript": "You’re near Writing House. Writing House belongs to Whitman’s Interest House Community and works with an adviser from the English Department. It offers a shared residential setting where students can develop their writing. Stay on the sidewalk outside and choose one detail from your walk. How would you describe it in a single sentence? Leave the private living areas to residents.",
    "source": "https://www.whitman.edu/campus-map?plc=x37156",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x37156",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
  {
    "id": "technology-services",
    "name": "Whitman College Technology Services Building",
    "subtitle": "The work behind a connected campus",
    "category": "Administration",
    "coordinates": [
      46.0706815,
      -118.3337248
    ],
    "listeningPosition": [
      46.0708353,
      -118.3336671
    ],
    "zone": {
      "outline": [
        [
          46.0709305,
          -118.3338692
        ],
        [
          46.0706479,
          -118.3333136
        ],
        [
          46.0704672,
          -118.3336761
        ],
        [
          46.0707151,
          -118.3341318
        ]
      ],
      "walkingOutline": [
        [
          46.0704672,
          -118.3336761
        ],
        [
          46.0707151,
          -118.3341318
        ],
        [
          46.0709305,
          -118.3338692
        ],
        [
          46.0709256,
          -118.3332896
        ],
        [
          46.0706479,
          -118.3333136
        ]
      ],
      "buffer": 8,
      "exitBuffer": 14
    },
    "image": "assets/technology-services.jpg",
    "imageAlt": "Exterior of Whitman College Technology Services Building at Whitman College.",
    "audio": "assets/audio/technology-services.wav",
    "ambience": "chime",
    "durationLabel": "About 35 seconds",
    "description": "The Whitman College Technology Services Building houses Technology Services along with offices for Security, Environmental Health and Safety, and Conferences, Events and Scheduling. These services support many parts of campus life.",
    "transcript": "You’re near Whitman College Technology Services Building. The Whitman College Technology Services Building houses Technology Services along with offices for Security, Environmental Health and Safety, and Conferences, Events and Scheduling. These services support many parts of campus life. From the sidewalk outside, think about the systems and people that help an ordinary day run smoothly. Which kinds of support are easiest to overlook when everything is working?",
    "source": "https://www.whitman.edu/campus-map?plc=x38977",
    "coordinateSource": "https://www.whitman.edu/campus-map?plc=x38977",
    "coordinateNote": "Official Whitman footprint; outdoor listening area based on adjacent OSM paths. Source ways and field checks in docs/SOURCES.md. Field-test access and GPS boundaries."
  },
];

export const campus = {
  center: [46.0718, -118.3292],
  bounds: [
    [46.0677, -118.3350],
    [46.0759, -118.3230],
  ],
  // Normal browser caching is retained. No tile prefetching or offline downloads.
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maximumAccuracy: 65,
  maximumFixAge: 25000,
};

// A presentation-only movement sequence, not walking directions.
// Outdoor holds use source path points; intermediate frames avoid other stops.
export const simulation = [
  {
    "label": "Approaching Ankeny Field",
    "coordinates": [
      46.0723562,
      -118.3287556
    ],
    "seconds": 0
  },
  {
    "label": "Outside Styx",
    "coordinates": [
      46.0720452,
      -118.3290799
    ],
    "seconds": 12,
    "stopId": "styx"
  },
  {
    "label": "Listening near Styx",
    "coordinates": [
      46.0720452,
      -118.3290799
    ],
    "seconds": 53
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0708993,
      -118.32895
    ],
    "seconds": 72.058
  },
  {
    "label": "Outside Outdoor Tennis Courts",
    "coordinates": [
      46.0708577,
      -118.3286126
    ],
    "seconds": 76,
    "stopId": "tennis"
  },
  {
    "label": "Listening near Outdoor Tennis Courts",
    "coordinates": [
      46.0708577,
      -118.3286126
    ],
    "seconds": 112
  },
  {
    "label": "Outside Baker Center",
    "coordinates": [
      46.0703429,
      -118.3286867
    ],
    "seconds": 124,
    "stopId": "baker-center"
  },
  {
    "label": "Listening near Baker Center",
    "coordinates": [
      46.0703429,
      -118.3286867
    ],
    "seconds": 160
  },
  {
    "label": "Outside Fine Arts House",
    "coordinates": [
      46.0702817,
      -118.3279195
    ],
    "seconds": 172,
    "stopId": "fine-arts-house"
  },
  {
    "label": "Listening near Fine Arts House",
    "coordinates": [
      46.0702817,
      -118.3279195
    ],
    "seconds": 208
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0704407,
      -118.3277833
    ],
    "seconds": 213.389
  },
  {
    "label": "Outside La Casa Hispana",
    "coordinates": [
      46.0704662,
      -118.3274584
    ],
    "seconds": 220,
    "stopId": "spanish-house"
  },
  {
    "label": "Listening near La Casa Hispana",
    "coordinates": [
      46.0704662,
      -118.3274584
    ],
    "seconds": 256
  },
  {
    "label": "Outside La Maison",
    "coordinates": [
      46.0704689,
      -118.3272203
    ],
    "seconds": 268,
    "stopId": "french-house"
  },
  {
    "label": "Listening near La Maison",
    "coordinates": [
      46.0704689,
      -118.3272203
    ],
    "seconds": 304
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0704676,
      -118.3268889
    ],
    "seconds": 310.961
  },
  {
    "label": "Outside Environmental House",
    "coordinates": [
      46.0703048,
      -118.3268392
    ],
    "seconds": 316,
    "stopId": "environmental-house"
  },
  {
    "label": "Listening near Environmental House",
    "coordinates": [
      46.0703048,
      -118.3268392
    ],
    "seconds": 352
  },
  {
    "label": "Outside Bike Shop",
    "coordinates": [
      46.0700784,
      -118.3272822
    ],
    "seconds": 364,
    "stopId": "bike-shop"
  },
  {
    "label": "Listening near Bike Shop",
    "coordinates": [
      46.0700784,
      -118.3272822
    ],
    "seconds": 400
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0699011,
      -118.3269667
    ],
    "seconds": 407.907
  },
  {
    "label": "Outside Chinese Language and Culture House (Huá Wén Yuàn)",
    "coordinates": [
      46.069786,
      -118.3268376
    ],
    "seconds": 412,
    "stopId": "chinese-house"
  },
  {
    "label": "Listening near Chinese Language and Culture House (Huá Wén Yuàn)",
    "coordinates": [
      46.069786,
      -118.3268376
    ],
    "seconds": 448
  },
  {
    "label": "Outside Wellness House",
    "coordinates": [
      46.069505,
      -118.3268751
    ],
    "seconds": 460,
    "stopId": "wellness-house"
  },
  {
    "label": "Listening near Wellness House",
    "coordinates": [
      46.069505,
      -118.3268751
    ],
    "seconds": 496
  },
  {
    "label": "Outside Lavender House",
    "coordinates": [
      46.0691613,
      -118.3268108
    ],
    "seconds": 508,
    "stopId": "lavender-house"
  },
  {
    "label": "Listening near Lavender House",
    "coordinates": [
      46.0691613,
      -118.3268108
    ],
    "seconds": 544
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0692536,
      -118.3269667
    ],
    "seconds": 546.421
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3271222
    ],
    "seconds": 548.476
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3271611
    ],
    "seconds": 548.935
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3272
    ],
    "seconds": 549.395
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693345,
      -118.3272
    ],
    "seconds": 549.854
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693615,
      -118.3274333
    ],
    "seconds": 552.649
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0695234,
      -118.3274333
    ],
    "seconds": 555.406
  },
  {
    "label": "Outside Spirituality House",
    "coordinates": [
      46.0695047,
      -118.3273909
    ],
    "seconds": 556,
    "stopId": "spirituality-house"
  },
  {
    "label": "Listening near Spirituality House",
    "coordinates": [
      46.0695047,
      -118.3273909
    ],
    "seconds": 592
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0695234,
      -118.3277833
    ],
    "seconds": 602.974
  },
  {
    "label": "Outside Community Service House",
    "coordinates": [
      46.0695045,
      -118.3277586
    ],
    "seconds": 604,
    "stopId": "community-service-house"
  },
  {
    "label": "Listening near Community Service House",
    "coordinates": [
      46.0695045,
      -118.3277586
    ],
    "seconds": 640
  },
  {
    "label": "Outside Multicultural House",
    "coordinates": [
      46.0693749,
      -118.3281928
    ],
    "seconds": 652,
    "stopId": "multicultural-house"
  },
  {
    "label": "Listening near Multicultural House",
    "coordinates": [
      46.0693749,
      -118.3281928
    ],
    "seconds": 688
  },
  {
    "label": "Outside Das Deutsche Haus",
    "coordinates": [
      46.0698843,
      -118.3279187
    ],
    "seconds": 700,
    "stopId": "german-house"
  },
  {
    "label": "Listening near Das Deutsche Haus",
    "coordinates": [
      46.0698843,
      -118.3279187
    ],
    "seconds": 736
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3281333
    ],
    "seconds": 737.772
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3281722
    ],
    "seconds": 738.093
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3282111
    ],
    "seconds": 738.413
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.32825
    ],
    "seconds": 738.733
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3282889
    ],
    "seconds": 739.054
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3283278
    ],
    "seconds": 739.374
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3283667
    ],
    "seconds": 739.694
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3284056
    ],
    "seconds": 740.015
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3284445
    ],
    "seconds": 740.335
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3284833
    ],
    "seconds": 740.655
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3285222
    ],
    "seconds": 740.976
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0699281,
      -118.3288722
    ],
    "seconds": 743.929
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.069955,
      -118.3288722
    ],
    "seconds": 744.249
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.069955,
      -118.3291444
    ],
    "seconds": 746.492
  },
  {
    "label": "Outside Douglas Hall",
    "coordinates": [
      46.0698311,
      -118.3291847
    ],
    "seconds": 748,
    "stopId": "douglas"
  },
  {
    "label": "Listening near Douglas Hall",
    "coordinates": [
      46.0698311,
      -118.3291847
    ],
    "seconds": 784
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0691996,
      -118.3293
    ],
    "seconds": 791.642
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0692266,
      -118.3294944
    ],
    "seconds": 793.293
  },
  {
    "label": "Outside Prentiss Hall",
    "coordinates": [
      46.0694259,
      -118.3296464
    ],
    "seconds": 796,
    "stopId": "prentiss"
  },
  {
    "label": "Listening near Prentiss Hall",
    "coordinates": [
      46.0694259,
      -118.3296464
    ],
    "seconds": 832
  },
  {
    "label": "Outside Anderson Hall",
    "coordinates": [
      46.0690033,
      -118.3296454
    ],
    "seconds": 844,
    "stopId": "anderson"
  },
  {
    "label": "Listening near Anderson Hall",
    "coordinates": [
      46.0690033,
      -118.3296454
    ],
    "seconds": 880
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0690377,
      -118.3299611
    ],
    "seconds": 883.287
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0690377,
      -118.3300778
    ],
    "seconds": 884.487
  },
  {
    "label": "Outside Stanton Hall",
    "coordinates": [
      46.0685363,
      -118.3301833
    ],
    "seconds": 892,
    "stopId": "stanton"
  },
  {
    "label": "Listening near Stanton Hall",
    "coordinates": [
      46.0685363,
      -118.3301833
    ],
    "seconds": 928
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0689838,
      -118.3303111
    ],
    "seconds": 933.455
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0692805,
      -118.3303111
    ],
    "seconds": 937.005
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0692805,
      -118.3307
    ],
    "seconds": 940.231
  },
  {
    "label": "Outside Hall of Music",
    "coordinates": [
      46.0692224,
      -118.3307395
    ],
    "seconds": 941,
    "stopId": "hall-of-music"
  },
  {
    "label": "Listening near Hall of Music",
    "coordinates": [
      46.0692224,
      -118.3307395
    ],
    "seconds": 977
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.069955,
      -118.3307778
    ],
    "seconds": 986.897
  },
  {
    "label": "Outside Hunter Conservatory",
    "coordinates": [
      46.0699979,
      -118.3305619
    ],
    "seconds": 989,
    "stopId": "hunter"
  },
  {
    "label": "Listening near Hunter Conservatory",
    "coordinates": [
      46.0699979,
      -118.3305619
    ],
    "seconds": 1025
  },
  {
    "label": "Outside Climbing Center",
    "coordinates": [
      46.0704054,
      -118.3304371
    ],
    "seconds": 1037,
    "stopId": "climbing-center"
  },
  {
    "label": "Listening near Climbing Center",
    "coordinates": [
      46.0704054,
      -118.3304371
    ],
    "seconds": 1073
  },
  {
    "label": "Outside Memorial Building",
    "coordinates": [
      46.0709279,
      -118.3300362
    ],
    "seconds": 1085,
    "stopId": "memorial"
  },
  {
    "label": "Listening near Memorial Building",
    "coordinates": [
      46.0709279,
      -118.3300362
    ],
    "seconds": 1127
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.071304,
      -118.3294944
    ],
    "seconds": 1138.621
  },
  {
    "label": "Outside Penrose Library",
    "coordinates": [
      46.0712926,
      -118.3294756
    ],
    "seconds": 1139,
    "stopId": "penrose"
  },
  {
    "label": "Listening near Penrose Library",
    "coordinates": [
      46.0712926,
      -118.3294756
    ],
    "seconds": 1175
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0712501,
      -118.3296111
    ],
    "seconds": 1176.297
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0712501,
      -118.33
    ],
    "seconds": 1179.689
  },
  {
    "label": "Outside Harper Joy Theatre",
    "coordinates": [
      46.0717951,
      -118.3302921
    ],
    "seconds": 1187,
    "stopId": "harper-joy"
  },
  {
    "label": "Listening near Harper Joy Theatre",
    "coordinates": [
      46.0717951,
      -118.3302921
    ],
    "seconds": 1223
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0721674,
      -118.3305833
    ],
    "seconds": 1228.466
  },
  {
    "label": "Outside Hall of Science",
    "coordinates": [
      46.0726469,
      -118.330349
    ],
    "seconds": 1235,
    "stopId": "hall-of-science"
  },
  {
    "label": "Listening near Hall of Science",
    "coordinates": [
      46.0726469,
      -118.330349
    ],
    "seconds": 1271
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0727339,
      -118.3297667
    ],
    "seconds": 1275.737
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.072626,
      -118.3292222
    ],
    "seconds": 1280.24
  },
  {
    "label": "Outside Olin Hall",
    "coordinates": [
      46.0725507,
      -118.3282524
    ],
    "seconds": 1288,
    "stopId": "olin"
  },
  {
    "label": "Listening near Olin Hall",
    "coordinates": [
      46.0725507,
      -118.3282524
    ],
    "seconds": 1324
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.072653,
      -118.32755
    ],
    "seconds": 1329.873
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0731117,
      -118.3275889
    ],
    "seconds": 1335.292
  },
  {
    "label": "Outside Beta Theta Pi",
    "coordinates": [
      46.0731712,
      -118.3282811
    ],
    "seconds": 1341,
    "stopId": "beta-theta-pi"
  },
  {
    "label": "Listening near Beta Theta Pi",
    "coordinates": [
      46.0731712,
      -118.3282811
    ],
    "seconds": 1377
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0732196,
      -118.3279778
    ],
    "seconds": 1379.7
  },
  {
    "label": "Outside Tau Kappa Epsilon",
    "coordinates": [
      46.0733085,
      -118.3269137
    ],
    "seconds": 1389,
    "stopId": "tau-kappa-epsilon"
  },
  {
    "label": "Listening near Tau Kappa Epsilon",
    "coordinates": [
      46.0733085,
      -118.3269137
    ],
    "seconds": 1425
  },
  {
    "label": "Outside Sigma Chi",
    "coordinates": [
      46.0736646,
      -118.3265032
    ],
    "seconds": 1437,
    "stopId": "sigma-chi"
  },
  {
    "label": "Listening near Sigma Chi",
    "coordinates": [
      46.0736646,
      -118.3265032
    ],
    "seconds": 1473
  },
  {
    "label": "Outside Phi Delta Theta",
    "coordinates": [
      46.0741289,
      -118.3265546
    ],
    "seconds": 1485,
    "stopId": "phi-delta-theta"
  },
  {
    "label": "Listening near Phi Delta Theta",
    "coordinates": [
      46.0741289,
      -118.3265546
    ],
    "seconds": 1521
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0737052,
      -118.3261111
    ],
    "seconds": 1526.959
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0735163,
      -118.3261111
    ],
    "seconds": 1529.109
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0734894,
      -118.3261111
    ],
    "seconds": 1529.416
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0734624,
      -118.3261111
    ],
    "seconds": 1529.723
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0734354,
      -118.3261111
    ],
    "seconds": 1530.03
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0731926,
      -118.3263056
    ],
    "seconds": 1533.191
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0730037,
      -118.3273556
    ],
    "seconds": 1541.756
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.072707,
      -118.3272778
    ],
    "seconds": 1545.189
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0727609,
      -118.3269278
    ],
    "seconds": 1548.02
  },
  {
    "label": "Outside Jewett Hall",
    "coordinates": [
      46.0728285,
      -118.3268509
    ],
    "seconds": 1549,
    "stopId": "jewett"
  },
  {
    "label": "Listening near Jewett Hall",
    "coordinates": [
      46.0728285,
      -118.3268509
    ],
    "seconds": 1585
  },
  {
    "label": "Outside Lyman House",
    "coordinates": [
      46.0723041,
      -118.326654
    ],
    "seconds": 1597,
    "stopId": "lyman"
  },
  {
    "label": "Listening near Lyman House",
    "coordinates": [
      46.0723041,
      -118.326654
    ],
    "seconds": 1633
  },
  {
    "label": "Outside Maxey Hall",
    "coordinates": [
      46.0715497,
      -118.3271904
    ],
    "seconds": 1645,
    "stopId": "maxey"
  },
  {
    "label": "Listening near Maxey Hall",
    "coordinates": [
      46.0715497,
      -118.3271904
    ],
    "seconds": 1681
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0714929,
      -118.3266556
    ],
    "seconds": 1685.32
  },
  {
    "label": "Outside Penrose House",
    "coordinates": [
      46.0708556,
      -118.3263703
    ],
    "seconds": 1693,
    "stopId": "penrose-house"
  },
  {
    "label": "Listening near Penrose House",
    "coordinates": [
      46.0708556,
      -118.3263703
    ],
    "seconds": 1729
  },
  {
    "label": "Outside Welty Health & Counseling Center",
    "coordinates": [
      46.0704769,
      -118.32619
    ],
    "seconds": 1741,
    "stopId": "welty"
  },
  {
    "label": "Listening near Welty Health & Counseling Center",
    "coordinates": [
      46.0704769,
      -118.32619
    ],
    "seconds": 1777
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0705756,
      -118.3257611
    ],
    "seconds": 1780.558
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0706295,
      -118.3257222
    ],
    "seconds": 1781.242
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0714659,
      -118.3257611
    ],
    "seconds": 1790.739
  },
  {
    "label": "Outside Tekisuijuku",
    "coordinates": [
      46.0715475,
      -118.3258698
    ],
    "seconds": 1792,
    "stopId": "tekisuijuku"
  },
  {
    "label": "Listening near Tekisuijuku",
    "coordinates": [
      46.0715475,
      -118.3258698
    ],
    "seconds": 1828
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0706565,
      -118.3257222
    ],
    "seconds": 1837.993
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0702518,
      -118.3258389
    ],
    "seconds": 1842.592
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.069955,
      -118.3260334
    ],
    "seconds": 1846.224
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0690917,
      -118.3266945
    ],
    "seconds": 1857.117
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0690107,
      -118.3268889
    ],
    "seconds": 1858.87
  },
  {
    "label": "Outside Writing House",
    "coordinates": [
      46.0688378,
      -118.3279106
    ],
    "seconds": 1867,
    "stopId": "writing-house"
  },
  {
    "label": "Listening near Writing House",
    "coordinates": [
      46.0688378,
      -118.3279106
    ],
    "seconds": 1903
  },
  {
    "label": "Outside Cleveland Commons",
    "coordinates": [
      46.0683301,
      -118.3285186
    ],
    "seconds": 1915,
    "stopId": "cleveland"
  },
  {
    "label": "Listening near Cleveland Commons",
    "coordinates": [
      46.0683301,
      -118.3285186
    ],
    "seconds": 1952
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679585,
      -118.3293778
    ],
    "seconds": 1959.814
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.3295722
    ],
    "seconds": 1961.344
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.3296111
    ],
    "seconds": 1961.644
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.32965
    ],
    "seconds": 1961.944
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.3296889
    ],
    "seconds": 1962.245
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.3297278
    ],
    "seconds": 1962.545
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0679316,
      -118.3297667
    ],
    "seconds": 1962.845
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0680934,
      -118.3309333
    ],
    "seconds": 1972.027
  },
  {
    "label": "Outside Fouts Center for Visual Arts",
    "coordinates": [
      46.0687409,
      -118.3318271
    ],
    "seconds": 1982,
    "stopId": "fouts"
  },
  {
    "label": "Listening near Fouts Center for Visual Arts",
    "coordinates": [
      46.0687409,
      -118.3318271
    ],
    "seconds": 2018
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0689838,
      -118.3322555
    ],
    "seconds": 2024.749
  },
  {
    "label": "Outside Third Space Center",
    "coordinates": [
      46.0692374,
      -118.3324827
    ],
    "seconds": 2030,
    "stopId": "third-space"
  },
  {
    "label": "Listening near Third Space Center",
    "coordinates": [
      46.0692374,
      -118.3324827
    ],
    "seconds": 2066
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0689568,
      -118.3327611
    ],
    "seconds": 2077.121
  },
  {
    "label": "Outside Robart Hall",
    "coordinates": [
      46.0689619,
      -118.3327992
    ],
    "seconds": 2078,
    "stopId": "robart"
  },
  {
    "label": "Listening near Robart Hall",
    "coordinates": [
      46.0689619,
      -118.3327992
    ],
    "seconds": 2114
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0688758,
      -118.3331111
    ],
    "seconds": 2117.93
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0688219,
      -118.3334611
    ],
    "seconds": 2122.128
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0688219,
      -118.3335
    ],
    "seconds": 2122.583
  },
  {
    "label": "Outside Stegner Hall",
    "coordinates": [
      46.0688604,
      -118.3337865
    ],
    "seconds": 2126,
    "stopId": "stegner"
  },
  {
    "label": "Listening near Stegner Hall",
    "coordinates": [
      46.0688604,
      -118.3337865
    ],
    "seconds": 2162
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0696043,
      -118.3342
    ],
    "seconds": 2173.043
  },
  {
    "label": "Outside Glover Alston Intercultural Center",
    "coordinates": [
      46.0696721,
      -118.334219
    ],
    "seconds": 2174,
    "stopId": "glover-alston"
  },
  {
    "label": "Listening near Glover Alston Intercultural Center",
    "coordinates": [
      46.0696721,
      -118.334219
    ],
    "seconds": 2210
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0696583,
      -118.3346666
    ],
    "seconds": 2220.2
  },
  {
    "label": "Outside Dance Studio",
    "coordinates": [
      46.0696089,
      -118.3346321
    ],
    "seconds": 2222,
    "stopId": "dance-studio"
  },
  {
    "label": "Listening near Dance Studio",
    "coordinates": [
      46.0696089,
      -118.3346321
    ],
    "seconds": 2258
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0696583,
      -118.3346666
    ],
    "seconds": 2258.756
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0697932,
      -118.3341222
    ],
    "seconds": 2264.282
  },
  {
    "label": "Outside Boyer House",
    "coordinates": [
      46.0697761,
      -118.3335245
    ],
    "seconds": 2270,
    "stopId": "boyer-house"
  },
  {
    "label": "Listening near Boyer House",
    "coordinates": [
      46.0697761,
      -118.3335245
    ],
    "seconds": 2306
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3329944
    ],
    "seconds": 2316.319
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0698741,
      -118.3329166
    ],
    "seconds": 2317.782
  },
  {
    "label": "Outside Harvey Hall",
    "coordinates": [
      46.0698667,
      -118.3329121
    ],
    "seconds": 2318,
    "stopId": "harvey"
  },
  {
    "label": "Listening near Harvey Hall",
    "coordinates": [
      46.0698667,
      -118.3329121
    ],
    "seconds": 2354
  },
  {
    "label": "Outside Bratton Tennis Center",
    "coordinates": [
      46.0703584,
      -118.3327525
    ],
    "seconds": 2366,
    "stopId": "bratton-tennis"
  },
  {
    "label": "Listening near Bratton Tennis Center",
    "coordinates": [
      46.0703584,
      -118.3327525
    ],
    "seconds": 2402
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0707914,
      -118.3324889
    ],
    "seconds": 2408.851
  },
  {
    "label": "Outside Cordiner Hall",
    "coordinates": [
      46.0708928,
      -118.3320011
    ],
    "seconds": 2414,
    "stopId": "cordiner"
  },
  {
    "label": "Listening near Cordiner Hall",
    "coordinates": [
      46.0708928,
      -118.3320011
    ],
    "seconds": 2450
  },
  {
    "label": "Outside Sherwood Athletic Center",
    "coordinates": [
      46.0711514,
      -118.3313223
    ],
    "seconds": 2462,
    "stopId": "sherwood-athletic"
  },
  {
    "label": "Listening near Sherwood Athletic Center",
    "coordinates": [
      46.0711514,
      -118.3313223
    ],
    "seconds": 2498
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0712231,
      -118.3315167
    ],
    "seconds": 2499.702
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3332278
    ],
    "seconds": 2513.153
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3332666
    ],
    "seconds": 2513.454
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3333055
    ],
    "seconds": 2513.754
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3333444
    ],
    "seconds": 2514.055
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3333833
    ],
    "seconds": 2514.356
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3334222
    ],
    "seconds": 2514.657
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3334611
    ],
    "seconds": 2514.957
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3335
    ],
    "seconds": 2515.258
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3335389
    ],
    "seconds": 2515.559
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3335778
    ],
    "seconds": 2515.86
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3336166
    ],
    "seconds": 2516.16
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3336555
    ],
    "seconds": 2516.461
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3336944
    ],
    "seconds": 2516.762
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3337333
    ],
    "seconds": 2517.063
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3337722
    ],
    "seconds": 2517.363
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3338111
    ],
    "seconds": 2517.664
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.33385
    ],
    "seconds": 2517.965
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3338889
    ],
    "seconds": 2518.266
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0710072,
      -118.3339278
    ],
    "seconds": 2518.567
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0709533,
      -118.3340444
    ],
    "seconds": 2519.651
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0707644,
      -118.3342389
    ],
    "seconds": 2522.238
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0695773,
      -118.3350944
    ],
    "seconds": 2537.034
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694964,
      -118.3350555
    ],
    "seconds": 2537.985
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3345889
    ],
    "seconds": 2542.163
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.33455
    ],
    "seconds": 2542.464
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3345111
    ],
    "seconds": 2542.765
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3344722
    ],
    "seconds": 2543.065
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693615,
      -118.3337722
    ],
    "seconds": 2548.512
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693885,
      -118.3330333
    ],
    "seconds": 2554.235
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.069955,
      -118.3318667
    ],
    "seconds": 2565.249
  },
  {
    "label": "Outside Reid Campus Center",
    "coordinates": [
      46.0700777,
      -118.3312783
    ],
    "seconds": 2570,
    "stopId": "reid"
  },
  {
    "label": "Listening near Reid Campus Center",
    "coordinates": [
      46.0700777,
      -118.3312783
    ],
    "seconds": 2609
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0697392,
      -118.3326833
    ],
    "seconds": 2620.52
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3329555
    ],
    "seconds": 2624.705
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3329944
    ],
    "seconds": 2625.006
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3330333
    ],
    "seconds": 2625.307
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3330722
    ],
    "seconds": 2625.608
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3331111
    ],
    "seconds": 2625.909
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.33315
    ],
    "seconds": 2626.211
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3331889
    ],
    "seconds": 2626.512
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3332278
    ],
    "seconds": 2626.813
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3332666
    ],
    "seconds": 2627.114
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3333055
    ],
    "seconds": 2627.415
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694154,
      -118.3333444
    ],
    "seconds": 2627.717
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3344722
    ],
    "seconds": 2636.534
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3345111
    ],
    "seconds": 2636.836
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.33455
    ],
    "seconds": 2637.137
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0693075,
      -118.3345889
    ],
    "seconds": 2637.438
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0694964,
      -118.3350555
    ],
    "seconds": 2641.623
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0695773,
      -118.3350944
    ],
    "seconds": 2642.575
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0709803,
      -118.3340833
    ],
    "seconds": 2660.087
  },
  {
    "label": "Outside College House",
    "coordinates": [
      46.0713493,
      -118.3335357
    ],
    "seconds": 2666,
    "stopId": "college-house"
  },
  {
    "label": "Listening near College House",
    "coordinates": [
      46.0713493,
      -118.3335357
    ],
    "seconds": 2702
  },
  {
    "label": "Outside Baker Ferguson Fitness Center",
    "coordinates": [
      46.0720684,
      -118.3326536
    ],
    "seconds": 2714,
    "stopId": "baker-ferguson"
  },
  {
    "label": "Listening near Baker Ferguson Fitness Center",
    "coordinates": [
      46.0720684,
      -118.3326536
    ],
    "seconds": 2750
  },
  {
    "label": "Outside Facilities Services",
    "coordinates": [
      46.074488,
      -118.3303872
    ],
    "seconds": 2783,
    "stopId": "facilities"
  },
  {
    "label": "Listening near Facilities Services",
    "coordinates": [
      46.074488,
      -118.3303872
    ],
    "seconds": 2819
  },
  {
    "label": "Outside Sherwood House",
    "coordinates": [
      46.0751582,
      -118.3233318
    ],
    "seconds": 2874,
    "stopId": "sherwood-house"
  },
  {
    "label": "Listening near Sherwood House",
    "coordinates": [
      46.0751582,
      -118.3233318
    ],
    "seconds": 2910
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0734354,
      -118.3299222
    ],
    "seconds": 2964.534
  },
  {
    "label": "Between listening stops",
    "coordinates": [
      46.0714659,
      -118.3317889
    ],
    "seconds": 2990.843
  },
  {
    "label": "Outside Whitman College Technology Services Building",
    "coordinates": [
      46.0708353,
      -118.3336671
    ],
    "seconds": 3007,
    "stopId": "technology-services"
  },
  {
    "label": "Listening near Whitman College Technology Services Building",
    "coordinates": [
      46.0708353,
      -118.3336671
    ],
    "seconds": 3048
  }
];
