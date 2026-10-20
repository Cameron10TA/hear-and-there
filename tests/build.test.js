import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

test('rebuilding removes stale files and publishes only website inputs', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'hear-there-build-'));
  t.after(async () => {
    assert.equal(path.dirname(root), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith('hear-there-build-'));
    await rm(root, { recursive: true, force: true });
  });
  for (const directory of ['src', 'assets', 'tests', 'dist/tests', 'dist/assets'])
    await mkdir(path.join(root, directory), { recursive: true });
  for (const name of [
    'index.html',
    'styles.css',
    'src/app.js',
    'assets/current.wav',
    'tests/fixture.html',
    'AGENTS.md',
    '.env',
    'dist/tests/fixture.html',
    'dist/assets/removed.wav',
    'dist/leaked.txt',
  ])
    await writeFile(path.join(root, name), name);
  const script = fileURLToPath(new URL('../scripts/build.mjs', import.meta.url));
  execFileSync(process.execPath, [script], { cwd: root });
  assert.deepEqual((await readdir(path.join(root, 'dist'))).sort(), [
    '.nojekyll',
    'assets',
    'index.html',
    'src',
    'styles.css',
  ]);
  assert.deepEqual(await readdir(path.join(root, 'dist/assets')), ['current.wav']);
  assert.equal(await readFile(path.join(root, 'dist/src/app.js'), 'utf8'), 'src/app.js');
  assert.equal(await readFile(path.join(root, 'tests/fixture.html'), 'utf8'), 'tests/fixture.html');
});
