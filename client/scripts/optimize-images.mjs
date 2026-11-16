// Makes menu photos light enough for phones. Run after adding photos to img/menu:
//   npm run images
// - Shrinks any photo wider than MAX px (same file name and format, so the sheet doesn't change).
// - Creates a small .webp copy next to each photo; the site loads the .webp and falls back
//   to the original if a .webp is missing.
// Safe to run again: photos that are already small and have a .webp are skipped.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MAX = 1000; // px wide — cards show ~300px, the popup ~500px (x2 for sharp phone screens)
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../img/menu');
const kb = (n) => `${Math.round(n / 1024)}KB`;

let before = 0, after = 0;
for (const name of await readdir(dir)) {
  const ext = path.extname(name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const file = path.join(dir, name);
  const webp = file.slice(0, -ext.length) + '.webp';
  // Read into memory first: on Windows sharp keeps the file locked, so it couldn't be overwritten.
  const input = sharp(await readFile(file), { failOn: 'none' }).rotate();
  const { width } = await input.metadata();
  const size = (await stat(file)).size;
  const hasWebp = await stat(webp).then(() => true, () => false);
  if (width <= MAX && hasWebp) continue;

  const resized = input.resize({ width: MAX, withoutEnlargement: true });
  // Re-encode the original only when it's too big (keeps its name and format as a fallback).
  if (width > MAX || size > 300 * 1024) {
    const buf = ext === '.png'
      ? await resized.clone().png({ palette: true, quality: 85, effort: 10 }).toBuffer()
      : await resized.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    if (buf.length < size) await writeFile(file, buf);
  }
  const w = await resized.clone().webp({ quality: 78, effort: 6 }).toBuffer();
  await writeFile(webp, w);
  before += size;
  after += w.length;
  console.log(`${name}: ${kb(size)} -> ${kb(w.length)} webp`);
}
console.log(before ? `Done: ${kb(before)} -> ${kb(after)}` : 'All photos already optimized.');
