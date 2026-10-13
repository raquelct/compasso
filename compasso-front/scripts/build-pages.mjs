// Gera ../docs/index.html: o front inteiro (só dados mockados) em um único HTML para o GitHub Pages
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dist-pages');
execSync(`npx vite build --base ./ --outDir ${outDir} --emptyOutDir`, {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, VITE_SEM_API: 'true' },
});

const assets = join(outDir, 'assets');
const files = readdirSync(assets);
let html = readFileSync(join(outDir, 'index.html'), 'utf8');
for (const f of files.filter((f) => f.endsWith('.css'))) {
  const css = readFileSync(join(assets, f), 'utf8');
  html = html.replace(new RegExp(`<link rel="stylesheet"[^>]*href="\\./assets/${f}"[^>]*>`), () => `<style>${css}</style>`);
}
for (const f of files.filter((f) => f.endsWith('.js'))) {
  const js = readFileSync(join(assets, f), 'utf8').replace(/<\/script/g, '<\\/script');
  html = html.replace(new RegExp(`<script type="module"[^>]*src="\\./assets/${f}"[^>]*></script>`), () => `<script type="module">${js}</script>`);
}
if (/\.\/assets\//.test(html)) throw new Error('Sobrou referência a ./assets no HTML');

const docs = join(root, '..', 'docs');
mkdirSync(docs, { recursive: true });
writeFileSync(join(docs, 'index.html'), html);
writeFileSync(join(docs, '.nojekyll'), '');
console.log(`docs/index.html gerado (${(html.length / 1024).toFixed(0)} KB)`);
