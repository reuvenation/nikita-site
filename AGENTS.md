<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Проект: сайт-визитка Никиты Махнача

Одностраничный сайт депутата (Красногорск, «Единая Россия»). Next.js 16 + Tailwind v4, шрифт TT Fors (Trial, вариативный, app/fonts/TTForsVariable.ttf; для прода нужна полная лицензия TypeType), палитра: navy #10357f, blue #1b4db3, красный #c8102e (только акценты), фон #f6f8fb. Фирменный элемент — триколор-лента и портрет-вырезка в синей арке.

## Важно
- Цифры в блоке статистики, «Заслуги», адрес приёмной и email — ЗАГЛУШКИ, ждут реальных данных.
- `scripts/cutout.mjs` — вырезка фона фото (@imgly/background-removal-node), `scripts/crop.mjs N` — отрезание левой полосы N px. Источники в `assets/`, результат — `public/nikita.png`.
- Верхнеуровневый sharp на этой машине не грузится (DLL-конфликт) — скрипты используют копию sharp из node_modules @imgly (0.32.6). Python на машине нет (только заглушка Windows Store).
- `public/map-krasnogorsk.svg` — карта Мособласти с красным Красногорским районом (Wikimedia Commons, перекрашена в светлый стиль, реки удалены, сжата svgo). Исходник: File:Location of Krasnogorsk Region (Moscow Oblast).svg.
- Флаг в хиро — компонент FlagRibbon в page.tsx: полосы внахлёст (без швов), поверх движущийся градиент «складок».
