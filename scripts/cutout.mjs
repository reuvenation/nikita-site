// Вырезка фона: node scripts/cutout.mjs <вход> <выход.png>
import { removeBackground } from '@imgly/background-removal-node';
import { writeFile, readFile } from 'node:fs/promises';

const [src = 'assets/nikita-original.jpg', out = 'assets/cutout.png'] =
  process.argv.slice(2);

const input = new Blob([await readFile(src)], { type: 'image/png' });
const blob = await removeBackground(input, { model: 'medium' });
const buf = Buffer.from(await blob.arrayBuffer());
await writeFile(out, buf);
console.log('done', out, buf.length);
