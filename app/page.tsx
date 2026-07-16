import Image from "next/image";
import ContactDirect from "./contact-direct";

// Развевающийся флаг России. Ширина рисунка 1200 = два периода видимой
// области (600), цикл бесшовный. Полосы рисуются внахлёст (каждая — от своего
// верхнего края до низа полотна), поэтому швов между цветами нет. Поверх —
// периодическая тень «складок», движущаяся вместе с волной.
function FlagRibbon({ className = "" }: { className?: string }) {
  const A = 7; // амплитуда волны
  const H = 16; // высота одной полосы
  const TOP = A + 2;
  const BOT = TOP + H * 3;
  const edge = (y: number, reverse = false) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = reverse ? 1200 - i * 10 : i * 10;
      const dy = A * Math.sin((x / 200) * Math.PI * 2);
      pts.push(`${x},${(y + dy).toFixed(2)}`);
    }
    return pts.join(" L");
  };
  // полоса от своего волнистого верха до волнистого низа полотна
  const band = (yTop: number) => `M${edge(yTop)} L${edge(BOT, true)} Z`;
  return (
    <svg
      viewBox={`0 0 600 ${BOT + A + 2}`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="fold"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="200"
          y2="0"
          spreadMethod="repeat"
        >
          <stop offset="0" stopColor="#0c1526" stopOpacity="0" />
          <stop offset="0.3" stopColor="#0c1526" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#0c1526" stopOpacity="0" />
          <stop offset="0.8" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0c1526" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="flag-run">
        <path d={band(TOP)} fill="#ffffff" stroke="#dde4ee" strokeWidth="1.2" />
        <path d={band(TOP + H)} fill="#1b4db3" />
        <path d={band(TOP + H * 2)} fill="#c8102e" />
        <path d={band(TOP)} fill="url(#fold)" />
      </g>
    </svg>
  );
}

// ВНИМАНИЕ: цифры и пункты заслуг — заглушки-черновик, заменить реальными данными
const stats = [
  {
    value: "120+",
    label: "проведено волонтёрских работ",
    icon: (
      // сердце в ладони
      <path d="M14 25c4-1 7-1 10 1l6 3c1.5.8 1 3-1 3h-9M6 24v9h5m9-19.5c0-2 1.7-3.5 3.5-3.5 1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3 1.8 0 3.5 1.5 3.5 3.5 0 3-4.5 6-6 6.7-1.5-.7-6-3.7-6-6.7z" />
    ),
  },
  {
    value: "14",
    label: "проектов по улучшению инфраструктуры",
    icon: (
      // дома и кран
      <path d="M5 33h30M8 33V20l6-4 6 4v13m-9 0v-6h6v6m9 0V15m0 0V9l8 6h-8m8 0v18" />
    ),
  },
  {
    value: "6 лет",
    label: "работы в округе",
    icon: (
      // метка на карте
      <path d="M20 33c6-6.5 10-11.5 10-16a10 10 0 1 0-20 0c0 4.5 4 9.5 10 16zm0-12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    ),
  },
];

// Фото — CC с Flickr (черновик; для продакшена заменить на свои или лицензированные):
// парк https://flickr.com/photos/24354425@N03/7720550120 · спорт https://flickr.com/photos/44124435310@N01/3557517450
// семья https://flickr.com/photos/28481088@N00/4229063204 · дорога https://flickr.com/photos/34316967@N04/5082074277
const directions = [
  {
    title: "Благоустройство и городская среда",
    text: "Дворы, парки и общественные пространства, в которых хочется жить.",
    img: "/dir-park.jpg",
  },
  {
    title: "Образование, спорт и молодёжь",
    text: "Современные школы, доступные секции и поддержка молодёжных проектов.",
    img: "/dir-sport.jpg",
  },
  {
    title: "Поддержка семей и участников СВО",
    text: "Адресная помощь семьям, ветеранам и тем, кто в ней нуждается.",
    img: "/dir-family.jpg",
  },
  {
    title: "ЖКХ, дороги и транспорт",
    text: "Контроль качества коммунальных услуг и развитие инфраструктуры района.",
    img: "/dir-roads.jpg",
  },
];

const merits = [
  {
    year: "2014",
    text: "Победитель олимпиад «Кенгуру» и «Русский медвежонок».",
  },
  {
    year: "2021",
    text: "Избран депутатом от Красногорского района при поддержке партии «Единая Россия».",
  },
  {
    year: "2022",
    text: "Организация гуманитарных миссий и адресной помощи семьям военнослужащих.",
  },
  {
    year: "2023",
    text: "Запуск программы благоустройства дворовых территорий: обновлено 18 дворов.",
  },
  {
    year: "2024",
    text: "Открытие общественной приёмной и системная работа с обращениями жителей.",
  },
  {
    year: "2025",
    text: "Почётный гость Республики Беларусь.",
    belarus: true,
  },
  {
    year: "2026",
    text: "Ключевой инвестор пивоваренного завода «Аливария».",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">
      {/* Шапка */}
      <header className="bg-white/90 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="ribbon h-6 w-1.5 rounded-sm border border-line">
              <span /><span /><span />
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">
              Махнач Никита
            </span>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-ink/70 sm:flex">
            <a href="#work" className="hover:text-navy">Направления</a>
            <a href="#merits" className="hover:text-navy">Заслуги</a>
          </nav>
          <ContactDirect compact />
        </div>
      </header>

      {/* Хиро */}
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-6 pt-16 pb-14 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:pt-20">
        <div>
          <h1 className="rise rise-1 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Махнач Никита
            <br />
            Сергеевич
          </h1>
          {/* Рамка: кто и откуда + карта области с выделенным районом */}
          <div className="rise rise-3 mt-10 flex max-w-lg items-center gap-6 rounded-2xl border border-line p-6">
            <div className="min-w-0">
              <p className="text-lg leading-relaxed text-ink">
                Депутат Государственной Думы
              </p>
              <p className="mt-1 leading-relaxed text-ink/60">
                Фракция партии «Единая Россия»
              </p>
              <p className="mt-4 leading-relaxed text-ink/60">
                Красногорский район
                <br />
                Московская область
              </p>
            </div>
            <Image
              src="/map-krasnogorsk.svg"
              alt="Карта Московской области, Красногорский район выделен красным"
              width={631}
              height={595}
              className="w-36 shrink-0 sm:w-44"
            />
          </div>
          <ContactDirect />
        </div>

        {/* Портрет без подложки, под ним — развевающийся флаг */}
        <div className="rise rise-2 relative mx-auto w-full max-w-[340px] lg:order-first">
          <div className="relative aspect-[4/5]">
            <Image
              src="/nikita.png"
              alt="Никита Сергеевич Махнач"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-contain object-bottom"
            />
          </div>
          <FlagRibbon className="mt-6 w-[128%] max-w-none -ml-[14%]" />
        </div>
      </section>

      {/* Цифры */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-center gap-2 rounded-2xl border border-line px-1.5 py-5"
            >
              <svg
                viewBox="0 0 40 40"
                className="h-[22px] w-[22px] shrink-0 stroke-ink"
                fill="none"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {s.icon}
              </svg>
              <span className="text-2xl font-semibold tracking-tight text-ink">
                {s.value}
              </span>
              <span className="whitespace-nowrap text-[15px] text-ink/60">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Миссия */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Наша миссия</p>
          <h2 className="mt-4 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
            Делать наш город лучше, а жизнь его жителей — комфортнее
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
            Каждый проект — от благоустройства дворов до новых спортивных
            площадок — служит одной цели: чтобы жить, работать и растить детей
            в Красногорске было удобно и безопасно.
          </p>
        </div>
        <Image
          src="/gorod.png"
          alt="Миниатюра Красногорска: собор, усадьба, башня, мост и железная дорога"
          width={1299}
          height={1008}
          className="mx-auto w-full max-w-[540px]"
        />
      </section>

      {/* Направления */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Основные направления работы
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {directions.map((d) => (
            <div
              key={d.title}
              className="group overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(12,21,38,0.18)]"
            >
              <Image
                src={d.img}
                alt=""
                width={1200}
                height={340}
                className="h-28 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="p-7 pt-6">
                <h3 className="text-xl font-semibold leading-snug">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Заслуги */}
      <section id="merits">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Ключевые заслуги
          </h2>
          <ol className="relative mx-auto mt-12 max-w-2xl space-y-9 border-l-2 border-line pl-8">
            {merits.map((m) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[39px] h-3 w-3 rounded-full border-2 border-white bg-flagred shadow-[0_0_0_3px_#fdecec]"
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-[#f1f5fb] px-3.5 py-1 text-sm font-semibold text-ink">
                    {m.year}
                  </span>
                  {"belarus" in m && (
                    // флаг Республики Беларусь
                    <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[3px]" aria-label="Флаг Республики Беларусь">
                      <rect width="24" height="16" fill="#ce1720" />
                      <rect y="10.7" width="24" height="5.3" fill="#00966e" />
                      <rect width="3.2" height="16" fill="#ffffff" />
                      <path
                        d="M1.6 1.2l1 1.6-1 1.6-1-1.6zM1.6 6.4l1 1.6-1 1.6-1-1.6zM1.6 11.6l1 1.6-1 1.6-1-1.6z"
                        fill="#ce1720"
                      />
                    </svg>
                  )}
                </div>
                <p className="mt-2.5 leading-relaxed text-ink/75">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Подвал */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink/50">
          <span>© 2026 Махнач Никита Сергеевич</span>
          <span>Партия «Единая Россия» · Красногорский район</span>
        </div>
      </footer>
    </main>
  );
}
