// Сведение на белый фон с сохранением родной тени и целого силуэта:
// альфа = max(альфа imgly-вырезки, «темнее модельного фона»).
// node scripts/on-white.mjs <оригинал> <вырезка> <выход.png>
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require(
  path.resolve('node_modules/@imgly/background-removal-node/node_modules/sharp/lib/index.js'),
);

const [orig = 'assets/gorod-original.png', cutout = 'assets/gorod-cutout.png', out = 'public/gorod.png'] =
  process.argv.slice(2);

const { data: o, info } = await sharp(orig).raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: co } = info;
const { data: cut, info: ci } = await sharp(cutout).raw().toBuffer({ resolveWithObject: true });
const cc = ci.channels;

const S = 12; // краевая полоса для модели фона
const top = [], bot = [], left = [], right = [];
for (let x = 0; x < w; x++) {
  let t = 0, b = 0;
  for (let y = 0; y < S; y++)
    for (let c = 0; c < 3; c++) {
      t += o[(y * w + x) * co + c];
      b += o[((h - 1 - y) * w + x) * co + c];
    }
  top.push(t / (S * 3));
  bot.push(b / (S * 3));
}
for (let y = 0; y < h; y++) {
  let l = 0, r = 0;
  for (let x = 0; x < S; x++)
    for (let c = 0; c < 3; c++) {
      l += o[(y * w + x) * co + c];
      r += o[(y * w + (w - 1 - x)) * co + c];
    }
  left.push(l / (S * 3));
  right.push(r / (S * 3));
}

const outBuf = Buffer.alloc(w * h * 3);
for (let y = 0; y < h; y++) {
  const fy = y / (h - 1);
  for (let x = 0; x < w; x++) {
    const fx = x / (w - 1);
    const i = y * w + x;
    const B = (top[x] * (1 - fy) + bot[x] * fy + left[y] * (1 - fx) + right[y] * fx) / 2;
    const luma = (o[i * co] + o[i * co + 1] + o[i * co + 2]) / 3;
    const aCut = cut[i * cc + 3] / 255;
    const aDark = Math.max(0, Math.min(1, (B - luma) / 30));
    const a = Math.max(aCut, aDark);
    for (let c = 0; c < 3; c++) outBuf[i * 3 + c] = Math.round(o[i * co + c] * a + 255 * (1 - a));
  }
}
await sharp(outBuf, { raw: { width: w, height: h, channels: 3 } })
  .trim({ threshold: 8 })
  .extend({ top: 30, bottom: 44, left: 30, right: 30, background: { r: 255, g: 255, b: 255 } })
  .png()
  .toFile(out);
const m = await sharp(out).metadata();
console.log('done', out, m.width, m.height);
