/**
 * Siluetas de gato reutilizables. La punta de oreja recortada es la seña
 * internacional de gato esterilizado por CER y el motivo gráfico de la web.
 */
type Props = { tipped?: boolean; className?: string }

/** Gato sentado visto de espaldas. Origen: centro de la base. */
export function SittingCat({ tipped = false }: Props) {
  return (
    <g>
      <path d="M-38 0 C-44 -40 -34 -78 -14 -92 L14 -92 C34 -78 44 -40 38 0 Z" />
      <ellipse cx="0" cy="-108" rx="26" ry="23" />
      <path d="M-24 -118 L-20 -146 L-6 -128 Z" />
      {tipped ? <path d="M24 -118 L21.4 -137 L13.2 -138.6 L6 -128 Z" /> : <path d="M24 -118 L20 -146 L6 -128 Z" />}
      <path d="M30 -3 C60 0 80 -6 82 -24" fill="none" strokeWidth="9" strokeLinecap="round" />
    </g>
  )
}

/** Gato tumbado "en modo pan" de perfil. Origen: centro de la base. */
export function LoafCat() {
  return (
    <g>
      <path d="M-40 0 C-44 -30 -20 -44 10 -42 C34 -40 42 -22 40 0 Z" />
      <ellipse cx="34" cy="-44" rx="17" ry="15" />
      <path d="M24 -54 L26 -72 L36 -58 Z" />
      <path d="M38 -58 L46 -71 L48 -51 Z" />
      <path d="M-38 -3 C-30 6 8 6 20 1" fill="none" strokeWidth="7" strokeLinecap="round" />
    </g>
  )
}


/** Pequeño icono de oreja con la punta recortada, usado como viñeta. */
export function EarTip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4 21 L8 6 L13 5 L20 21 Z" fill="currentColor" />
      <path d="M8.6 9.5 L12.3 9 L16 17.5 L7 17.5 Z" fill="var(--ear-inner, #fff)" opacity=".35" />
    </svg>
  )
}
