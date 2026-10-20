import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceMeters, locate, validFix, simulationPosition } from '../src/proximity.js';
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
  assert.deepEqual(simulationPosition(simulation, 76).coordinates, landmarks[1].coordinates);
  assert.equal(simulationPosition(simulation, 6).complete, false);
  assert.equal(simulationPosition(simulation, 570).complete, true);
  assert.deepEqual(simulationPosition(simulation, 570).coordinates, landmarks.at(-1).coordinates);
});
test('the demo begins out of range and enters each landmark only once', () => {
  let current = null;
  const arrivals = [];
  assert.equal(locate(simulation[0].coordinates, landmarks).active, null);
  for (let t = 0; t <= simulation.at(-1).seconds; t++) {
    const result = locate(simulationPosition(simulation, t).coordinates, landmarks, current);
    if (result.active && result.active.id !== current) arrivals.push(result.active.id);
    current = result.active?.id || null;
  }
  assert.deepEqual(
    arrivals,
    landmarks.map((landmark) => landmark.id)
  );
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
    assert.ok(stop.exitRadius > stop.radius);
  }
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
