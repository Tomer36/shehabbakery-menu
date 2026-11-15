import './premium.scss';

const copy = {
  he: {
    eyebrow: 'עונת החגים',
    title: 'מתוקים של חג',
    sub: 'חג מולד שמח ושנה טובה!',
    subMore: 'פינוקי החורף מחכים לכם',
  },
  ar: {
    eyebrow: 'موسم الأعياد',
    title: 'حلويات العيد',
    sub: 'ميلاد مجيد وكل عام وأنتم بخير!',
    subMore: 'حلويات الشتاء بانتظاركم',
  },
};

// Tree lights: [x, y, colour]
const LIGHTS = [
  [62, 34, '#FFF3C4'], [78, 44, '#E0414B'], [58, 50, '#F5C26B'],
  [50, 68, '#FFF3C4'], [68, 62, '#F5C26B'], [88, 72, '#FFF3C4'], [76, 80, '#E0414B'],
  [42, 98, '#E0414B'], [58, 92, '#FFF3C4'], [74, 102, '#F5C26B'], [94, 96, '#FFF3C4'], [102, 108, '#E0414B'], [52, 110, '#F5C26B'],
];

// Snow-dusted tree with twinkling lights, wrapped gifts and a steaming cup.
function HeroArt() {
  return (
    <svg className="xp-hero-art" viewBox="0 0 220 140" aria-hidden="true">
      <defs>
        <linearGradient id="xp-foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6E3B4" />
          <stop offset="0.5" stopColor="#D4A24C" />
          <stop offset="1" stopColor="#F1D58E" />
        </linearGradient>
        <linearGradient id="xp-pine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3F8A52" />
          <stop offset="1" stopColor="#173D24" />
        </linearGradient>
        <radialGradient id="xp-glow">
          <stop offset="0" stopColor="#FFD98A" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
        </radialGradient>
        <filter id="xp-blur"><feGaussianBlur stdDeviation="1.4" /></filter>
      </defs>

      {/* warm glow + snowy ground */}
      <circle cx="72" cy="72" r="66" fill="url(#xp-glow)" />
      <ellipse cx="110" cy="132" rx="108" ry="8" fill="#FBF5EA" opacity="0.9" />

      {/* tree tiers, bottom first, each with a snowy lower edge */}
      <path d="M70 58 L114 118 H26 Z" fill="url(#xp-pine)" />
      <path d="M26 118 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0 q5.5 -5 11 0" fill="none" stroke="#FBF5EA" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M70 38 L104 88 H36 Z" fill="url(#xp-pine)" />
      <path d="M36 88 q5.7 -5 11.3 0 q5.7 -5 11.3 0 q5.7 -5 11.3 0 q5.7 -5 11.3 0 q5.7 -5 11.3 0 q5.7 -5 11.3 0" fill="none" stroke="#FBF5EA" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M70 20 L94 58 H46 Z" fill="url(#xp-pine)" />
      <path d="M46 58 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0" fill="none" stroke="#FBF5EA" strokeWidth="2.3" strokeLinecap="round" />
      <rect x="64" y="118" width="12" height="10" rx="1" fill="#5a3416" />

      {/* gold garland swags */}
      <g fill="none" stroke="url(#xp-foil)" strokeWidth="1.3" opacity="0.9">
        <path d="M54 46 Q70 56 86 46" />
        <path d="M44 76 Q68 88 96 74" />
        <path d="M34 106 Q66 120 106 104" />
      </g>

      {/* lights */}
      {LIGHTS.map(([x, y, c], i) => (
        <g key={i} className={`xp-light xp-l${i % 4}`}>
          <circle cx={x} cy={y} r="4.5" fill={c} opacity="0.35" filter="url(#xp-blur)" />
          <circle cx={x} cy={y} r="2.2" fill={c} />
        </g>
      ))}

      {/* star */}
      <circle cx="70" cy="15" r="10" fill="url(#xp-glow)" />
      <path className="xp-twinkle" d="M70 4 L72.9 11.6 L81 12 L74.7 17 L76.9 25 L70 20.4 L63.1 25 L65.3 17 L59 12 L67.1 11.6 Z" fill="url(#xp-foil)" />

      {/* gifts */}
      <g>
        <rect x="96" y="106" width="30" height="24" rx="2" fill="#B3202A" />
        <rect x="108" y="106" width="6" height="24" fill="url(#xp-foil)" />
        <rect x="94" y="104" width="34" height="7" rx="1.5" fill="#C1272D" />
        <rect x="108" y="104" width="6" height="7" fill="url(#xp-foil)" />
        <path d="M111 104 C104 94 98 100 108 104 M111 104 C118 94 124 100 114 104" fill="none" stroke="url(#xp-foil)" strokeWidth="2.2" strokeLinecap="round" />

        <rect x="12" y="114" width="24" height="16" rx="2" fill="url(#xp-foil)" />
        <rect x="21" y="114" width="5" height="16" fill="#B3202A" />
        <path d="M23.5 114 C18 107 14 112 21 114 M23.5 114 C29 107 33 112 26 114" fill="none" stroke="#B3202A" strokeWidth="2" strokeLinecap="round" />

        <rect x="128" y="118" width="16" height="12" rx="1.5" fill="#2E6B3F" />
        <rect x="134" y="118" width="4" height="12" fill="#F6E3B4" />
      </g>

      {/* cup of hot chocolate */}
      <g>
        <path className="xp-steam" d="M170 70 Q164 60 170 51 Q176 42 170 32" fill="none" stroke="#F6E3B4" strokeWidth="1.6" strokeLinecap="round" />
        <path className="xp-steam xp-steam-2" d="M184 70 Q178 60 184 51 Q190 42 184 34" fill="none" stroke="#F6E3B4" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="177" cy="129" rx="30" ry="4" fill="#E9DCC6" />
        <path d="M154 78 H200 V100 Q200 124 177 124 Q154 124 154 100 Z" fill="#FBF5EA" />
        <rect x="154" y="90" width="46" height="8" fill="#B3202A" />
        <path d="M200 84 Q214 84 214 96 Q214 108 200 107" fill="none" stroke="#FBF5EA" strokeWidth="4" />
        <ellipse cx="177" cy="78" rx="23" ry="4" fill="#6B3A1C" />
        <circle cx="170" cy="76" r="3.5" fill="#fff" />
        <circle cx="180" cy="75" r="3.5" fill="#fff" />
        <circle cx="186" cy="78" r="3" fill="#fff" />
      </g>

      {/* sparkles */}
      <g fill="#F6E3B4">
        <path className="xp-twinkle xp-d1" d="M206 20 l1.5 4.5 l4.5 1.5 l-4.5 1.5 l-1.5 4.5 l-1.5 -4.5 l-4.5 -1.5 l4.5 -1.5 Z" />
        <path className="xp-twinkle xp-d2" d="M134 30 l1.2 3.6 l3.6 1.2 l-3.6 1.2 l-1.2 3.6 l-1.2 -3.6 l-3.6 -1.2 l3.6 -1.2 Z" />
        <path className="xp-twinkle xp-d3" d="M14 40 l1.2 3.6 l3.6 1.2 l-3.6 1.2 l-1.2 3.6 l-1.2 -3.6 l-3.6 -1.2 l3.6 -1.2 Z" />
      </g>
    </svg>
  );
}

// Red satin bow for the hero corner.
function Bow() {
  return (
    <svg className="xp-bow" viewBox="0 0 64 56" aria-hidden="true">
      <path d="M32 22 C18 2 0 8 6 22 C10 32 24 28 32 22 Z" fill="#B3202A" />
      <path d="M32 22 C46 2 64 8 58 22 C54 32 40 28 32 22 Z" fill="#B3202A" />
      <path d="M32 22 C22 10 12 12 12 20" fill="none" stroke="#7E121B" strokeWidth="1.5" opacity="0.6" />
      <path d="M32 22 C42 10 52 12 52 20" fill="none" stroke="#7E121B" strokeWidth="1.5" opacity="0.6" />
      <path d="M29 24 L18 52 L24 48 L27 54 L32 26 Z" fill="#9B1B30" />
      <path d="M35 24 L46 52 L40 48 L37 54 L32 26 Z" fill="#9B1B30" />
      <ellipse cx="32" cy="23" rx="6" ry="5.5" fill="#C1272D" />
      <ellipse cx="30" cy="21.5" rx="2" ry="1.5" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export default function Hero({ lang }) {
  const t = copy[lang] ?? copy.he;
  return (
    <section className={`xp-hero xp-lang-${lang}`} aria-label={t.title}>
      <span className="xp-garland" aria-hidden="true" />
      <Bow />
      <div className="xp-hero-text">
        <p className="xp-eyebrow">{t.eyebrow}</p>
        <h2 className="xp-title">{t.title}</h2>
        <p className="xp-sub">
          {t.sub} <span className="xp-sub-more">{t.subMore}</span>
        </p>
      </div>
      <HeroArt />
    </section>
  );
}
