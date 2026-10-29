import test from 'node:test';
import assert from 'node:assert/strict';
import { landmarks } from '../src/landmarks.js';
import { tours, tourSummary, findTour } from '../src/tours.js';

test('three short collections reuse unique existing stories and preserve their suggested order', () => {
  assert.equal(tours.length, 3);
  assert.equal(new Set(tours.map((tour) => tour.id)).size, tours.length);
  for (const tour of tours) {
    assert.ok(tour.stopIds.length >= 5 && tour.stopIds.length <= 8);
    assert.equal(new Set(tour.stopIds).size, tour.stopIds.length);
    const summary = tourSummary(tour, landmarks);
    assert.ok(summary.stops.every(Boolean));
    assert.deepEqual(summary.stops.map((stop) => stop.id), tour.stopIds);
    assert.ok(summary.minutes >= 2 && summary.minutes <= 5);
    assert.equal(summary.completed, 0);
    assert.equal(summary.next.id, tour.stopIds[0]);
  }
  assert.equal(findTour('missing'), undefined);
});

test('collection progress counts only its completed stories and finds the first remaining story', () => {
  const tour = findTour('first-visit');
  const completed = new Set(['jewett', 'styx', 'memorial']);
  const summary = tourSummary(tour, landmarks, completed);
  assert.equal(summary.minutes, 3);
  assert.equal(summary.completed, 2);
  assert.equal(summary.next.id, 'penrose');
  for (const id of tour.stopIds) completed.add(id);
  assert.equal(tourSummary(tour, landmarks, completed).next, undefined);
  assert.equal(tourSummary(tour, landmarks, completed).completed, tour.stopIds.length);
});

test('narration estimates understand minutes and seconds and reject missing estimates', () => {
  const tour = { stopIds: ['sample'] };
  assert.equal(tourSummary(tour, [{ id: 'sample', durationLabel: 'About 1 minute 30 seconds' }]).minutes, 2);
  assert.throws(() => tourSummary(tour, [{ id: 'sample', durationLabel: 'Unknown' }]), /Missing narration estimate/);
});
