import { mkdir, cp, rm, writeFile, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist')
  throw new Error('Build output must be the workspace dist directory.');
// Rebuild the allowlist from scratch so removed assets and local QA files cannot linger.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'styles.css', 'src', 'assets']) {
  await cp(name, path.join(output, name), { recursive: true });
}

// GitHub Pages and browsers cache ordinary URLs. Give each release a new module
// graph, and each recording its own content version, so a reload cannot combine
// new HTML with old story metadata or an old recording under the same URL.
const files = new Map();
async function collect(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) await collect(path.join(directory, entry.name), `${relative}/`);
    else files.set(relative, await readFile(path.join(directory, entry.name)));
  }
}
await collect(output);
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const release = digest([...files].map(([name, bytes]) => `${name}\0${digest(bytes)}\n`).join('')).slice(0, 16);
for (const [name, bytes] of files) {
  if (!name.startsWith('src/') || !name.endsWith('.js')) continue;
  const source = bytes.toString('utf8')
    .replace(/(\bfrom\s*|\bimport\s*)(['"])(\.{1,2}\/[^'"\r\n]+\.js)\2/g,
      (_, start, quote, specifier) => `${start}${quote}${specifier}?v=${release}${quote}`)
    .replace(/(['"])(assets\/audio\/[^'"\r\n]+)\1/g, (_, quote, audio) => {
      if (!files.has(audio)) throw new Error(`Missing recording: ${audio}`);
      return `${quote}${audio}?v=${digest(files.get(audio)).slice(0, 16)}${quote}`;
    });
  await writeFile(path.join(output, name), source);
}
const html = files.get('index.html').toString('utf8').replace(
  /((?:src|href)=['"])([^'"?#]+\.(?:js|css))(['"])/g,
  (match, start, file, quote) => files.has(file) ? `${start}${file}?v=${release}${quote}` : match
);
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Static site ready in dist/ (release ${release}). No runtime dependencies or secrets.`);
