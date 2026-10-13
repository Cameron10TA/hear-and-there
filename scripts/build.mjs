import { mkdir, cp, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const name of ['index.html', 'styles.css', 'src', 'assets']) {
  await cp(name, `dist/${name}`, { recursive: true });
}
await writeFile('dist/.nojekyll', '');
console.log('Static site ready in dist/. No runtime dependencies or secrets.');
