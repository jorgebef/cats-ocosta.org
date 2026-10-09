import { LoafCat, SittingCat } from './Cats'

/** Atardecer en la costa: tres gatos naranjas de colonia sobre un muro encalado. */
export function HeroScene({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 480 600" className="size-full" role="img" aria-label={label} preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCE3B8" />
          <stop offset=".6" stopColor="#F9C99A" />
          <stop offset="1" stopColor="#F6B27A" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C9C9A" />
          <stop offset="1" stopColor="#23767A" />
        </linearGradient>
      </defs>

      <rect width="480" height="600" fill="url(#sky)" />
      <circle cx="362" cy="350" r="62" fill="#FFF1C9" />
      <path d="M0 356 C60 340 110 346 150 352 C190 340 230 344 260 356 L480 356 L480 362 L0 362 Z" fill="#7FAE7A" />
      <rect y="360" width="480" height="120" fill="url(#sea)" />
      <g stroke="#FFF1C9" strokeLinecap="round" opacity=".75">
        <path d="M322 374 H402" strokeWidth="4" />
        <path d="M334 390 H388" strokeWidth="3.5" />
        <path d="M344 406 H378" strokeWidth="3" />
        <path d="M352 421 H370" strokeWidth="2.5" />
      </g>
      <g stroke="#7CC5BF" strokeLinecap="round" strokeWidth="2.5" opacity=".8">
        <path d="M40 384 H78" />
        <path d="M120 402 H150" />
        <path d="M60 426 H108" />
        <path d="M200 380 H236" />
        <path d="M416 396 H452" />
        <path d="M392 440 H430" />
      </g>

      {/* Muro encalado */}
      <rect y="462" width="480" height="138" fill="#F7F5F0" />
      <rect y="462" width="480" height="12" fill="#E7E2D9" />
      <path d="M0 520 H480 M0 572 H480" stroke="#ECE7DE" strokeWidth="2" />

      {/* Buganvilla */}
      <g>
        <path d="M-6 600 C10 540 30 500 58 478" stroke="#2C6E2A" strokeWidth="5" fill="none" />
        <g fill="#3E9B3A">
          <ellipse cx="20" cy="486" rx="16" ry="9" transform="rotate(-24 20 486)" />
          <ellipse cx="54" cy="500" rx="14" ry="8" transform="rotate(18 54 500)" />
          <ellipse cx="8" cy="530" rx="15" ry="8" transform="rotate(-10 8 530)" />
        </g>
        <g fill="#D9689A">
          <circle cx="10" cy="470" r="15" />
          <circle cx="36" cy="460" r="13" />
          <circle cx="64" cy="474" r="12" />
          <circle cx="26" cy="498" r="14" />
          <circle cx="-2" cy="506" r="14" />
          <circle cx="14" cy="552" r="12" />
        </g>
        <g fill="#F2A7C6">
          <circle cx="30" cy="458" r="6" />
          <circle cx="4" cy="476" r="6" />
          <circle cx="58" cy="470" r="5" />
          <circle cx="20" cy="500" r="5" />
        </g>
      </g>

      {/* Gatos de la colonia */}
      <g fill="#E98934" stroke="#E98934" transform="translate(230 466) scale(1.5)">
        <SittingCat tipped />
      </g>
      <g fill="#D4722A" stroke="#D4722A" transform="translate(362 466) scale(1)">
        <SittingCat />
      </g>
      <g fill="#F2A55E" stroke="#F2A55E" transform="translate(436 466) scale(.8)">
        <LoafCat />
      </g>

      {/* Marca sobre la oreja recortada */}
      <circle className="origin-center animate-ring-in [transform-box:fill-box]" cx="256" cy="258" r="21" fill="none" stroke="#2C6E2A" strokeWidth="3" strokeDasharray="5 5" />
    </svg>
  )
}
