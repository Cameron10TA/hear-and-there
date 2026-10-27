import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceMeters, footprintDistance, locate, validFix, simulationPosition, zoneBufferPixels } from '../src/proximity.js';
import { landmarks, campus, simulation } from '../src/landmarks.js';
import { readFile, stat } from 'node:fs/promises';

test('distance uses real-world meters and handles identical points', () => {
  assert.equal(distanceMeters([46, -118], [46, -118]), 0);
  assert.ok(Math.abs(distanceMeters([0, 0], [0, 1]) - 111195) < 1);
  assert.ok(distanceMeters(landmarks[0].coordinates, landmarks[1].coordinates) > 60);
});
test('every landmark activates at its center', () => {
  for (const stop of landmarks)
    assert.equal(locate(stop.coordinates, landmarks).active.id, stop.id);
});
test('a far-away visitor never triggers campus audio', () => {
  assert.equal(locate([47.6, -122.3], landmarks).active, null);
});
test('hysteresis holds a current stop outside entry radius, then releases it', () => {
  const stop = { id: 'test', coordinates: [0, 0], radius: 30, exitRadius: 48 };
  const nearEdge = [0.00036, 0]; // about 40 m
  assert.equal(locate(nearEdge, [stop]).active, null);
  assert.equal(locate(nearEdge, [stop], 'test').active.id, 'test');
  assert.equal(locate([0.0005, 0], [stop], 'test').active, null);
});
test('fresh accurate positions are accepted; stale, approximate, malformed fixes are rejected', () => {
  const fix = { latitude: 46, longitude: -118, accuracy: 10, timestamp: 100000 };
  assert.ok(validFix(fix, 101000, campus));
  for (const change of [
    { accuracy: 500 },
    { accuracy: -1 },
    { timestamp: 50000 },
    { latitude: 95 },
    { longitude: NaN },
    { timestamp: 200000 },
  ])
    assert.equal(validFix({ ...fix, ...change }, 101000, campus), false);
  assert.equal(validFix(null, 101000, campus), false);
});
test('demo interpolates, reaches each stop, and terminates exactly', () => {
  assert.deepEqual(simulationPosition(simulation, 12).coordinates, landmarks[0].coordinates);
  assert.deepEqual(simulationPosition(simulation, 76).coordinates, landmarks[1].listeningPosition);
  assert.equal(simulationPosition(simulation, 6).complete, false);
  assert.equal(simulationPosition(simulation, simulation.at(-1).seconds).complete, true);
  assert.deepEqual(simulationPosition(simulation, simulation.at(-1).seconds).coordinates, landmarks.at(-1).listeningPosition ?? landmarks.at(-1).coordinates);
});
test('the demo begins out of range and enters each landmark only once', () => {
  let current = null;
  const arrivals = [];
  assert.equal(locate(simulation[0].coordinates, landmarks).active, null);
  // Short passages near adjacent zones can be missed by whole-second samples.
  for (let tick = 0; tick <= simulation.at(-1).seconds * 10; tick++) {
    const t = tick / 10;
    const result = locate(simulationPosition(simulation, t).coordinates, landmarks, current);
    if (result.active && result.active.id !== current) arrivals.push(result.active.id);
    current = result.active?.id || null;
  }
  assert.deepEqual(
    arrivals,
    simulation.filter((frame) => frame.stopId).map((frame) => frame.stopId)
  );
  assert.deepEqual([...arrivals].sort(), landmarks.map((stop) => stop.id).sort());
});
test('every stop has a playable local WAV, photograph, source, and transcript', async () => {
  for (const stop of landmarks) {
    const wav = await readFile(stop.audio);
    assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
    assert.equal(wav.toString('ascii', 8, 12), 'WAVE');
    assert.ok(wav.length > 100000);
    assert.ok((await stat(stop.image)).size > 1000);
    assert.ok(stop.transcript.length > 100);
    assert.ok(stop.source.startsWith('https://'));
    if (stop.zone) assert.ok(stop.zone.exitBuffer > stop.zone.buffer);
    else assert.ok(stop.exitRadius > stop.radius);
  }
});

const origin = [46.07, -118.33];
function offset([lat, lon], east, north) {
  return [lat + north / 111194.9266, lon + east / (111194.9266 * Math.cos(lat * Math.PI / 180))];
}
const square = [[-10, -10], [10, -10], [10, 10], [-10, 10]].map(([x, y]) => offset(origin, x, y));
const building = { id: 'building', coordinates: origin, zone: { outline: square, buffer: 8, exitBuffer: 14 } };

test('polygon distance covers interiors, all sides, and rounded corners in meters', () => {
  assert.equal(footprintDistance(origin, square), 0);
  for (const [x, y] of [[16, 0], [-16, 0], [0, 16], [0, -16]]) {
    assert.ok(Math.abs(footprintDistance(offset(origin, x, y), square) - 6) < 0.01);
    assert.equal(locate(offset(origin, x, y), [building]).active?.id, 'building');
  }
  assert.ok(Math.abs(footprintDistance(offset(origin, 16, 16), square) - Math.sqrt(72)) < 0.01);
  assert.equal(locate(offset(origin, 16, 16), [building]).active, null, 'outside rounded corner');
  assert.equal(locate(offset(origin, 20, 0), [building]).active, null);
  assert.equal(locate(offset(origin, 20, 0), [building], 'building').active?.id, 'building');
  assert.equal(locate(offset(origin, 25, 0), [building], 'building').active, null);
  assert.ok(Math.abs(zoneBufferPixels(building, 18) / zoneBufferPixels(building, 17) - 2) < 0.001);
});

test('every footprint edge and vertex is in range, including a 6 m perimeter on every side', () => {
  for (const stop of landmarks.filter((item) => item.zone)) {
    const outline = stop.zone.outline;
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i], b = outline[(i + 1) % outline.length];
      for (const point of [a, a.map((value, axis) => (value + b[axis]) / 2)]) {
        assert.equal(locate(point, landmarks).active?.id, stop.id, `${stop.id} edge ${i}`);
        for (const [x, y] of [[6, 0], [-6, 0], [0, 6], [0, -6]]) {
          const nearby = offset(point, x, y);
          assert.equal(locate(nearby, [stop]).active?.id, stop.id, `${stop.id} perimeter coverage ${i}`);
          const selected = locate(nearby, landmarks).active;
          // Adjacent buildings can share a perimeter margin. The same nearest
          // physical-footprint rule applies across the complete campus.
          assert.ok(selected, `${stop.id} buffered edge ${i}`);
          if (selected.id !== stop.id) {
            assert.ok(selected.zone, 'a physical neighbor takes priority');
            assert.ok(footprintDistance(nearby, selected.zone.outline) <= footprintDistance(nearby, outline), `${stop.id}: nearer ${selected.id}`);
          }
        }
      }
    }
  }
});

test('court footprint keeps its cutout while outdoor paths can trigger the story', () => {
  const tennis = landmarks.find((stop) => stop.id === 'tennis');
  assert.ok(footprintDistance([46.07106, -118.3282], tennis.zone.outline) > 8);
  assert.equal(locate([46.0710039, -118.3279415], [tennis]).active?.id, 'tennis');
  assert.equal(locate([46.07106, -118.3287], [tennis]).active?.id, 'tennis');
});

test('neighboring footprint or entry takes priority over an old exit buffer', () => {
  const neighbor = { id: 'neighbor', coordinates: offset(origin, 35, 0), zone: {
    outline: square.map((point) => offset(point, 35, 0)), buffer: 8, exitBuffer: 14,
  } };
  assert.equal(locate(offset(origin, 20, 0), [building, neighbor], 'building').active.id, 'neighbor');
  const tiny = { id: 'tiny', coordinates: offset(origin, 16, 0), zone: {
    outline: [[15, -1], [17, -1], [17, 1], [15, 1]].map(([x, y]) => offset(origin, x, y)), buffer: 2, exitBuffer: 3,
  } };
  assert.equal(locate(tiny.coordinates, [building, tiny], 'building').active.id, 'tiny');
});
test('production source has no persistent visitor storage or test fixture', async () => {
  for (const name of ['src/app.js', 'src/audio.js', 'src/landmarks.js', 'index.html']) {
    const text = await readFile(name, 'utf8');
    assert.doesNotMatch(
      text,
      /localStorage|sessionStorage|indexedDB|document\.cookie|test-fixture/
    );
  }
});

// Independent OSM footway checkpoints, retrieved 2026-10-20. These are path
// centerlines outside the physical footprints, not vertices generated from zones.
const outdoorPaths = {
  jewett: [
    [46.0730829, -118.3274321], // way 1565095483: northwest sidewalk
    [46.07312985, -118.32695725], // midpoint of way 1565063616: north sidewalk
    [46.0726742, -118.3273122], // way 155689352: southwest
    [46.0726762, -118.3269759], // way 155689352: south approach
    [46.0727472, -118.3268278], // way 1565339196: recessed approach
  ],
  lyman: [
    [46.0725013, -118.3267238], // way 155689352: northwest
    [46.0723041, -118.326654], // west side
    [46.0719915, -118.326595], // southwest
    [46.0718165, -118.326536], // south corner
    [46.0718265, -118.3262033], // way 138193998: southeast approach
  ],
  anderson: [
    [46.0688467, -118.3301581], // way 1296430169: west
    [46.0690384, -118.3298109], // way 1565059645: northwest
    [46.0690033, -118.3296454], // north recess
    [46.0691065, -118.3292897], // northeast
    [46.0690077, -118.3291621], // way 1565067569: east
    [46.0687611, -118.3293957], // way 1565063625: south
  ],
  stanton: [
    [46.0686524, -118.3301675], // way 1565062349: west
    [46.0685363, -118.3301833],
    [46.0680722, -118.33013], // way 1296430168: southwest
    [46.0680083, -118.329658], // south
    [46.0680424, -118.329432],
    [46.0683749, -118.3293041], // way 1296430169: east
    [46.0684047, -118.3295389], // recessed east approach
    [46.0686996, -118.3297306], // northeast
  ],
  douglas: [
    [46.0700051, -118.3290122], // way 1565090820: north
    [46.0698793, -118.3286039], // east approach
    [46.0698311, -118.3291847], // way 1565067615: west
    [46.069632, -118.3292147], // way 1565062350: southwest
    [46.0696325, -118.3291098], // way 1567226416: south
  ],
  tennis: [
    [46.0715599, -118.3279343], // way 847806503: north/east path
    [46.0711493, -118.3279425],
    [46.0710039, -118.3279415],
    [46.0708639, -118.3284677], // way 771170320: south path
    [46.0712276, -118.3291928], // way 771170906: west path
  ],
  penrose: [
    [46.0719874, -118.3292503], // way 771170321: north path
    [46.0719793, -118.3300345],
    [46.0719006, -118.3300129],
    [46.0716174, -118.3302624], // way 1565095481: west path
    [46.0714966, -118.3302424],
    [46.071235, -118.3301202], // way 771170910: southwest path
    [46.0712868, -118.3294976], // way 1565062337: south path
    [46.0715861, -118.3291858], // way 771170906: shared east path
  ],
  memorial: [
    [46.0710312, -118.329883], // way 771170906: north path
    [46.0710263, -118.3295397],
    [46.0708126, -118.3303266], // way 771170911: west path
    [46.0709279, -118.3300362], // way 847807105: inner west path
    [46.0706993, -118.3298989], // way 771170320: south path
    [46.070772, -118.3291594],
  ],
  cleveland: [
    [46.0692411, -118.3290454], // way 1565067586: north path
    [46.0692411, -118.3281914],
    [46.0688378, -118.3279106], // way 1565091975: east sidewalk
    [46.0685486, -118.3279188],
    [46.0684126, -118.3287071], // way 1296430169: south path
    [46.0688116, -118.3288643], // way 1565095479: west path, nearer Cleveland
  ],
  reid: [
    [46.0700777, -118.3312783], // way 1565062347: north sidewalk
    [46.0699763, -118.3309819], // way 1446463280: east sidewalk
    [46.0697083, -118.3309038],
    [46.0696395, -118.3308904],
    [46.0695517, -118.3310896], // way 1446463287: southeast sidewalk
  ],
};

// These existing source points are now shared with additional buildings. Keep
// explicit expectations, plus each stop's isolated coverage assertion below.
const sharedPathOwners = new Map([
  ['46.0730829,-118.3274321', 'olin'],
  ['46.069632,-118.3292147', 'prentiss'],
  ['46.0715599,-118.3279343', 'maxey'],
  ['46.0711493,-118.3279425', 'maxey'],
  ['46.0710039,-118.3279415', 'maxey'],
  ['46.0719793,-118.3300345', 'hall-of-science'],
  ['46.0716174,-118.3302624', 'harper-joy'],
  ['46.0714966,-118.3302424', 'harper-joy'],
  ['46.0708126,-118.3303266', 'climbing-center'],
  ['46.0692411,-118.3281914', 'multicultural-house'],
  ['46.0688378,-118.3279106', 'writing-house'],
  ['46.0685486,-118.3279188', 'writing-house'],
  ['46.0699763,-118.3309819', 'hunter'],
  ['46.0697083,-118.3309038', 'hunter'],
  ['46.0696395,-118.3308904', 'hunter'],
]);

test('outdoor paths around every stop trigger without entering a building', () => {
  let previouslyMissed = 0;
  for (const [id, points] of Object.entries(outdoorPaths)) {
    const stop = landmarks.find((item) => item.id === id);
    for (const point of points) {
      const distance = footprintDistance(point, stop.zone.outline);
      assert.ok(distance > 0, `${id}: checkpoint must be outdoors`);
      if (distance > stop.zone.buffer) previouslyMissed++;
      assert.equal(locate(point, [stop]).active?.id, id, `${id}: outdoor coverage ${point}`);
      assert.equal(locate(point, landmarks).active?.id, sharedPathOwners.get(point.join(',')) ?? id, `${id}: shared path ${point}`);
    }
  }
  assert.ok(previouslyMissed >= 15, 'checks paths missed by the former wall buffer');
});

test('demo listening points are outside footprints and inside the outdoor listening areas', () => {
  for (const stop of landmarks.filter((item) => item.zone)) {
    assert.ok(footprintDistance(stop.listeningPosition, stop.zone.outline) > 0);
    assert.equal(locate(stop.listeningPosition, landmarks).active?.id, stop.id);
    for (const neighbor of landmarks.filter((item) => item.id !== stop.id)) {
      const active = locate(stop.listeningPosition, landmarks, neighbor.id).active?.id;
      if ((stop.id === 'beta-theta-pi' && neighbor.id === 'olin') || (stop.id === 'writing-house' && neighbor.id === 'cleveland')) {
        assert.equal(active, neighbor.id, 'the shared sidewalk retains the current story through its exit margin');
        assert.equal(locate([47.6, -122.3], landmarks, neighbor.id).active, null, 'departure releases the neighbor');
        assert.equal(locate(stop.listeningPosition, landmarks).active?.id, stop.id, 'arrival after departure selects the new story');
      } else assert.equal(active, stop.id, `${stop.id} arriving from ${neighbor.id}`);
    }
  }
});

test('residence overlaps choose one story, retain it through drift, and release on departure', () => {
  for (const { point, closest, other, departure } of [
    { point: [46.0688251, -118.3291148], closest: 'anderson', other: 'cleveland', departure: [46.0683301, -118.3285186] },
    { point: [46.0725757, -118.3267989], closest: 'jewett', other: 'lyman', departure: [46.0723041, -118.326654] },
    { point: [46.0687506, -118.3299415], closest: 'stanton', other: 'anderson', departure: [46.0690033, -118.3296454] },
  ]) {
    assert.equal(locate(point, landmarks).active?.id, closest);
    for (const current of [closest, other]) {
      assert.equal(locate(point, landmarks, current).active?.id, current);
      for (const [x, y] of [[2, 0], [-2, 0], [0, 2], [0, -2]])
        assert.equal(locate(offset(point, x, y), landmarks, current).active?.id, current);
    }
    assert.equal(locate(departure, landmarks, closest).active?.id, other);
  }
  // Keep the open space between Douglas and Cleveland separate from either stop.
  assert.equal(locate([46.0694, -118.3287], landmarks).active, null);
  assert.equal(locate([46.07335, -118.3269], landmarks).active?.id, 'tau-kappa-epsilon');
});

test('shared path selects one nearest building and holds it through small GPS drift', () => {
  const point = [46.0715861, -118.3291858];
  assert.equal(locate(point, landmarks).active?.id, 'penrose');
  for (const [x, y] of [[2, 0], [-2, 0], [0, 2], [0, -2]])
    assert.equal(locate(offset(point, x, y), landmarks, 'penrose').active?.id, 'penrose');
  assert.equal(locate([46.0711493, -118.3279425], landmarks, 'penrose').active?.id, 'maxey');
});
