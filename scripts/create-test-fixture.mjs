// Generates a LOCAL-ONLY UI test harness. The production build copies an allowlist
// that excludes tests and scripts. No query parameter bypass exists in the app.
import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile('index.html', 'utf8');
const fixture = source
  .replace('<head>', '<head><base href="../">')
  .replace('src="src/app.js"', 'src="tests/browser-fixture.js"');
await writeFile('tests/fixture.html', fixture);
console.log('Local test fixture: http://localhost:4173/tests/fixture.html');
