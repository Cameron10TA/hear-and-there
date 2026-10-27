import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesPlace, placeCategory, placeCategories } from '../src/catalog.js';
import { landmarks } from '../src/landmarks.js';

test('place search matches names without case, accents, punctuation or word-order barriers', () => {
  const chinese = landmarks.find((s) => s.id === 'chinese-house');
  assert.equal(matchesPlace(chinese, '  HUA   wen yuan '), true);
  assert.equal(matchesPlace(chinese, 'culture chinese'), true);
  assert.equal(matchesPlace(chinese, 'Huá-Wén'), true);
  assert.equal(matchesPlace(chinese, 'Maxey'), false);
  assert.equal(matchesPlace(chinese, '><script>alert(1)</script>'), false);
  assert.ok(landmarks.every((s) => matchesPlace(s, '   ')));
});

test('browsing categories cover every place and distinguish residences from arts venues', () => {
  const categories = new Set(placeCategories.map((c) => c.id));
  for (const stop of landmarks) {
    assert.ok(categories.has(placeCategory(stop)));
    assert.equal(matchesPlace(stop, '', placeCategory(stop)), true);
  }
  for (const [id, expected] of [['olin','academics'], ['harvey','housing'], ['fine-arts-house','housing'], ['hall-of-music','arts'], ['tennis','athletics'], ['third-space','campus']])
    assert.equal(placeCategory(landmarks.find((s) => s.id === id)), expected);
});

test('search and category combine without changing the landmark data', () => {
  const original = JSON.stringify(landmarks);
  assert.deepEqual(landmarks.filter((s) => matchesPlace(s, 'penrose')).map((s) => s.id), ['penrose', 'penrose-house']);
  assert.deepEqual(landmarks.filter((s) => matchesPlace(s, 'penrose', 'academics')).map((s) => s.id), ['penrose']);
  assert.deepEqual(landmarks.filter((s) => matchesPlace(s, 'penrose', 'housing')), []);
  assert.equal(JSON.stringify(landmarks), original);
});
