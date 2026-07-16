import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
// верхнеуровневый sharp не грузится на этой машине (DLL-конфликт), берём копию из imgly
const sharp = require(
  path.resolve('node_modules/@imgly/background-removal-node/node_modules/sharp/lib/index.js'),
);

const CUT = Number(process.argv[2] ?? 90); // ширина отрезаемой левой полосы

await sharp('assets/nikita-cutout-raw.png')
  .extract({ left: CUT, top: 0, width: 640 - CUT, height: 640 })
  .png()
  .toFile('public/nikita.png');
console.log('cropped at', CUT);
