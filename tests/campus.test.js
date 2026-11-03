import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { landmarks, campus, simulation } from '../src/landmarks.js';
import { footprintDistance, locate, distanceMeters } from '../src/proximity.js';

// Independent inventory from Whitman's official map, retrieved 2026-10-27.
// The farm-based Bracher and Pacific Northwest Regional observatories are not
// buildings in this campus walk. Their IDs are x37167 and x37197.
const campusBuildingIds = `x37156 x37158 x37160 x37162 x37163 x37164 x37166 x37168 x37169 x37170 x37171 x37172 x37173 x37174 x37175 x37176 x37177 x37178 x37179 x37180 x37181 x37182 x37183 x37184 x37185 x37186 x37188 x37190 x37191 x37192 x37194 x37198 x37199 x37200 x37203 x37204 x37205 x37206 x37207 x37208 x37209 x37210 x37211 x38977 x40839 x46557 x46558 x52177 x63633 x63638 x63639 x65515 x65516 x65517`.split(' ');

test('all 54 campus-map buildings have one complete stop within campus bounds', () => {
  assert.equal(landmarks.length, 56);
  assert.equal(new Set(landmarks.map((s) => s.id)).size, landmarks.length);
  const buildings = landmarks.filter((s) => s.zone && s.id !== 'tennis');
  assert.deepEqual(buildings.map((s) => new URL(s.coordinateSource).searchParams.get('plc')).sort(), campusBuildingIds);
  for (const s of landmarks) {
    for (const point of [s.coordinates, s.listeningPosition, ...(s.zone?.walkingOutline ?? [])].filter(Boolean)) {
      for (const axis of [0, 1]) assert.ok(point[axis] >= campus.bounds[0][axis] && point[axis] <= campus.bounds[1][axis], `${s.id} fits campus bounds`);
    }
    assert.equal(simulation.filter((f) => f.stopId === s.id).length, 1, `${s.id} has a jump`);
  }
});

// Actual source-segment midpoints; these are held separately from production
// walking polygons. Four explicitly marked frontages estimate the same-side
// sidewalk at 6 m from an OSM street centerline and require field calibration.
const checkpoints = JSON.parse(await readFile(new URL('./campus-paths.json', import.meta.url), 'utf8'));
const shared = new Map([
  ['46.0715643,-118.3281875', 'tennis'],
  ['46.0715627,-118.328069', 'tennis'],
  ['46.071359,-118.3281161', 'tennis'],
  ['46.0711542,-118.3281607', 'tennis'],
  ['46.0697195,-118.3292149', 'douglas'],
  ['46.0692041,-118.332472', 'robart'],
]);

test('new buildings cover independent outdoor approaches and resolve shared paths', () => {
  let checked = 0, beyondWallMargin = 0, independent = 0;
  assert.equal(Object.keys(checkpoints).length, 45);
  for (const [id, data] of Object.entries(checkpoints)) {
    const stop = landmarks.find((s) => s.id === id);
    assert.ok(data.points.length, `${id} has source checkpoints`);
    for (const { point, way } of data.points) {
      assert.match(way, /^\d+$/);
      assert.ok(footprintDistance(point, stop.zone.outline) > 0, `${id} checkpoint is outdoors`);
      assert.equal(locate(point, [stop]).active?.id, id, `${id} covers way ${way}`);
      assert.equal(locate(point, landmarks).active?.id, shared.get(point.join(',')) ?? id, `${id} selection on ${way} at ${point}`);
      if (footprintDistance(point, stop.zone.outline) > stop.zone.buffer) beyondWallMargin++;
      if (stop.zone.walkingOutline.every((p) => distanceMeters(p, point) > .1)) independent++;
      checked++;
    }
  }
  assert.ok(checked >= 300, `${checked} outdoor checkpoints`);
  assert.ok(beyondWallMargin >= 150, 'approaches beyond a wall-only buffer');
  assert.ok(independent >= 200, 'checkpoints are not merely the fitted polygon vertices');
});

const cross = (a, b, c) => (b[1] - a[1]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[1] - a[1]);
function crosses(a, b, c, d) {
  return cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0;
}
test('physical and listening polygons are simple and retain footprint coverage', () => {
  for (const s of landmarks.filter((s) => s.zone)) {
    for (const polygon of [s.zone.outline, s.zone.walkingOutline]) {
      assert.ok(polygon.length >= 3);
      for (let i = 0; i < polygon.length; i++) {
        const next = (i + 1) % polygon.length;
        assert.ok(distanceMeters(polygon[i], polygon[next]) > .01, `${s.id} has no zero-length edges`);
        for (let j = i + 2; j < polygon.length; j++) {
          if ((j + 1) % polygon.length === i) continue;
          assert.equal(crosses(polygon[i], polygon[next], polygon[j], polygon[(j + 1) % polygon.length]), false, `${s.id} is not self-intersecting`);
        }
      }
    }
    for (const point of s.zone.outline) assert.ok(footprintDistance(point, s.zone.walkingOutline) < .02, `${s.id} keeps its footprint`);
    for (const [east, north] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) {
      const [lat, lon] = s.listeningPosition;
      const point = [lat + north / 111195, lon + east / (111195 * Math.cos(lat * Math.PI / 180))];
      assert.equal(locate(point, landmarks, s.id).active?.id, s.id, `${s.id} holds through small drift`);
    }
  }
});

// Duration of a mono 44.1 kHz MPEG-1 Layer III file, walking every frame header.
function mp3Seconds(mp3, id) {
  let at = 0;
  if (mp3.toString('ascii', 0, 3) === 'ID3') {
    at = 10 + ((mp3[6] << 21) | (mp3[7] << 14) | (mp3[8] << 7) | mp3[9]);
  }
  const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  let frames = 0;
  while (at + 4 <= mp3.length && mp3[at] === 0xff && (mp3[at + 1] & 0xfe) === 0xfa) {
    const kbps = bitrates[mp3[at + 2] >> 4];
    assert.ok(kbps, `${id} valid bitrate`);
    assert.equal((mp3[at + 2] >> 2) & 3, 0, `${id} is 44.1 kHz`);
    assert.equal(mp3[at + 3] >> 6, 3, `${id} is mono`);
    const size = Math.floor((144000 * kbps) / 44100) + ((mp3[at + 2] >> 1) & 1);
    assert.ok(at + size <= mp3.length, `${id} complete frames`);
    at += size;
    frames++;
  }
  if (mp3.toString('ascii', at, at + 3) === 'TAG') at += 128;
  assert.equal(at, mp3.length, `${id} contains only MP3 frames`);
  return (frames * 1152) / 44100;
}

function wavSeconds(wav, id) {
  let format, channels, sampleRate, byteRate, bits, data;
  assert.equal(wav.readUInt32LE(4) + 8, wav.length, `${id} complete RIFF`);
  for (let at = 12; at + 8 <= wav.length;) {
    const kind = wav.toString('ascii', at, at + 4), size = wav.readUInt32LE(at + 4);
    assert.ok(at + 8 + size <= wav.length, `${id} complete chunks`);
    if (kind === 'fmt ') {
      format = wav.readUInt16LE(at + 8); channels = wav.readUInt16LE(at + 10);
      sampleRate = wav.readUInt32LE(at + 12); byteRate = wav.readUInt32LE(at + 16); bits = wav.readUInt16LE(at + 22);
    }
    if (kind === 'data') data = wav.subarray(at + 8, at + 8 + size);
    at += 8 + size + size % 2;
  }
  assert.deepEqual([format, channels, sampleRate, bits], [1, 1, 24000, 16], id);
  assert.equal(byteRate, 48000);
  let peak = 0, sumSquares = 0;
  for (let at = 0; at < data.length; at += 2) {
    const sample = data.readInt16LE(at) / 32768;
    peak = Math.max(peak, Math.abs(sample));
    sumSquares += sample * sample;
  }
  assert.ok(peak > 0.05 && peak <= 0.921, `${id} audible without clipped peaks`);
  assert.ok(Math.sqrt(sumSquares / (data.length / 2)) > 0.005, `${id} audible average level`);
  return data.length / byteRate;
}

test('every recording is finite mono narration, compact and long enough for its transcript', async () => {
  for (const stop of landmarks) {
    const file = await readFile(new URL(`../${stop.audio}`, import.meta.url));
    const seconds = stop.audio.endsWith('.mp3') ? mp3Seconds(file, stop.id) : wavSeconds(file, stop.id);
    assert.ok(seconds > 12 && seconds < 70, `${stop.id} compact speech`);
    const words = stop.transcript.trim().split(/\s+/).length;
    assert.ok(words / seconds > 1 && words / seconds < 4.5, `${stop.id} duration matches spoken text length`);
    const label = Number(stop.durationLabel.match(/\d+/)[0]);
    assert.ok(Math.abs(label - seconds) < 8, `${stop.id} accurate duration label`);
    const arrival = simulation.findIndex((f) => f.stopId === stop.id);
    assert.ok(simulation[arrival + 1].seconds - simulation[arrival].seconds >= seconds + 3, `${stop.id} has enough listening time`);
  }
});
