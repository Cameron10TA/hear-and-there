import test from 'node:test';
import assert from 'node:assert/strict';
import { ListeningProgress } from '../src/progress.js';

test('replays count once in the collection and out-of-order stories reset the hidden thread', () => {
  const progress = new ListeningProgress();
  for (const id of ['styx', 'penrose', 'reid', 'memorial']) progress.finish(id);
  assert.equal(progress.completed.size, 4);
  assert.equal(progress.trailStep, 0);
  assert.equal(progress.bonusUnlocked, false);
  progress.finish('penrose');
  progress.finish('memorial');
  assert.equal(progress.completed.size, 4);
  assert.equal(progress.bonusUnlocked, false);
  for (const id of ['styx', 'styx', 'penrose', 'memorial']) progress.finish(id);
  assert.equal(progress.bonusUnlocked, true);
  assert.equal(progress.completed.size, 4);
  progress.finish('reid');
  assert.equal(progress.bonusUnlocked, true, 'the revealed bonus stays available this session');
  progress.reset();
  assert.equal(progress.completed.size, 0);
  assert.equal(progress.trailStep, 0);
  assert.equal(progress.bonusUnlocked, false);
});
