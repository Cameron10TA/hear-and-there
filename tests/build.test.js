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

test('replacing a recording invalidates cached HTML entry, module graph, and audio URLs', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'hear-there-cache-'));
  t.after(async () => {
    assert.equal(path.dirname(root), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith('hear-there-cache-'));
    await rm(root, { recursive: true, force: true });
  });
  for (const directory of ['src', 'assets/audio']) await mkdir(path.join(root, directory), { recursive: true });
  const input = {
    'index.html': '<link href="styles.css" rel="stylesheet"><script type="module" src="src/app.js"></script>',
    'styles.css': 'body { color: navy; }',
    'src/app.js': "import { stories } from './landmarks.js';\nimport './audio.js';\nimport 'https://example.com/external.js';",
    'src/audio.js': 'export const ready = true;',
    'src/landmarks.js': "export const stories = ['assets/audio/story.wav', 'assets/audio/other.wav'];",
    'assets/audio/story.wav': 'old robotic recording',
    'assets/audio/other.wav': 'unchanged recording',
  };
  for (const [name, content] of Object.entries(input)) await writeFile(path.join(root, name), content);
  const script = fileURLToPath(new URL('../scripts/build.mjs', import.meta.url));
  const build = () => execFileSync(process.execPath, [script], { cwd: root });
  const read = (name) => readFile(path.join(root, 'dist', name), 'utf8');
  const version = (source, file) => {
    const start = source.indexOf(`${file}?v=`);
    assert.ok(start >= 0, `Versioned URL for ${file}`);
    const value = source.slice(start + file.length + 3, start + file.length + 19);
    assert.match(value, /^[a-f0-9]{16}$/);
    return value;
  };
  build();
  const firstHTML = await read('index.html');
  const firstApp = await read('src/app.js');
  const firstStories = await read('src/landmarks.js');
  const firstRelease = version(firstHTML, 'src/app.js');
  assert.equal(version(firstHTML, 'styles.css'), firstRelease);
  assert.equal(version(firstApp, './landmarks.js'), firstRelease);
  assert.equal(version(firstApp, './audio.js'), firstRelease);
  assert.ok(firstApp.includes("import 'https://example.com/external.js'"));
  const oldRecording = version(firstStories, 'assets/audio/story.wav');
  const unchangedRecording = version(firstStories, 'assets/audio/other.wav');
  build();
  assert.equal(await read('index.html'), firstHTML, 'identical inputs retain cache URLs');
  await writeFile(path.join(root, 'assets/audio/story.wav'), 'new natural recording');
  build();
  const nextRelease = version(await read('index.html'), 'src/app.js');
  const nextApp = await read('src/app.js');
  const nextStories = await read('src/landmarks.js');
  assert.notEqual(nextRelease, firstRelease, 'new HTML bypasses cached entry module');
  assert.equal(version(nextApp, './landmarks.js'), nextRelease, 'entry bypasses cached metadata module');
  assert.equal(version(nextApp, './audio.js'), nextRelease, 'whole local module graph has one version');
  assert.notEqual(version(nextStories, 'assets/audio/story.wav'), oldRecording, 'metadata bypasses old audio cache');
  assert.equal(version(nextStories, 'assets/audio/other.wav'), unchangedRecording, 'unchanged recordings can stay cached');
  assert.equal(await readFile(path.join(root, 'src/landmarks.js'), 'utf8'), input['src/landmarks.js'], 'source remains editable without build URLs');
  assert.equal(await read('assets/audio/story.wav'), 'new natural recording');
});
