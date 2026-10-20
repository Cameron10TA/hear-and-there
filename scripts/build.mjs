import { mkdir, cp, rm, writeFile } from 'node:fs/promises';
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
await writeFile(path.join(output, '.nojekyll'), '');
console.log('Static site ready in dist/. No runtime dependencies or secrets.');
