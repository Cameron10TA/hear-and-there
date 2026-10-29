import test from 'node:test';
import assert from 'node:assert/strict';
import { groupMapStops } from '../src/map-pins.js';

const project = ([x, y]) => ({ x, y });
const stops = [
  { id: 'a', coordinates: [0, 0] },
  { id: 'b', coordinates: [45, 0] },
  { id: 'c', coordinates: [90, 0] },
  { id: 'd', coordinates: [300, 0] },
];

test('overview groups connected overlapping pins, preserves every stop once, and leaves distant pins alone', () => {
  const groups = groupMapStops(stops, project, 16);
  assert.deepEqual(groups.map((group) => group.stops.map((stop) => stop.id)), [['a', 'b', 'c'], ['d']]);
  assert.deepEqual(groups[0].coordinates, [45, 0]);
  assert.deepEqual(groups.flatMap((group) => group.stops), stops);
  assert.equal(groupMapStops([], project, 16).length, 0);
});

test('maximum zoom separates all pins and a current story stays individually accessible in an overview', () => {
  assert.equal(groupMapStops(stops, project, 19).length, stops.length);
  const groups = groupMapStops(stops, project, 17, new Set(['b']));
  assert.equal(groups.find((group) => group.stops.some((stop) => stop.id === 'b')).stops.length, 1);
  assert.equal(groups.length, 4, 'a pinned middle stop cannot bridge its neighbors into a group');
});
