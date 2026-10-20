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



/** Pequeño icono de oreja con la punta recortada, usado como viñeta. */
export function EarTip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4 21 L8 6 L13 5 L20 21 Z" fill="currentColor" />
      <path d="M8.6 9.5 L12.3 9 L16 17.5 L7 17.5 Z" fill="var(--ear-inner, #fff)" opacity=".35" />
    </svg>
  )
}

/** Huella de gato (almohadilla y cuatro dedos), usada como viñeta. */
export function PawPrint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <path d="M12 12.2c-2.9 0-6.2 3.1-6.2 5.9 0 1.7 1.3 2.6 2.8 2.6 1.3 0 2.2-.6 3.4-.6s2.1.6 3.4.6c1.5 0 2.8-.9 2.8-2.6 0-2.8-3.3-5.9-6.2-5.9z" />
        <ellipse cx="4.6" cy="10.4" rx="2" ry="2.5" transform="rotate(-20 4.6 10.4)" />
        <ellipse cx="9" cy="5.6" rx="2.1" ry="2.7" transform="rotate(-8 9 5.6)" />
        <ellipse cx="15" cy="5.6" rx="2.1" ry="2.7" transform="rotate(8 15 5.6)" />
        <ellipse cx="19.4" cy="10.4" rx="2" ry="2.5" transform="rotate(20 19.4 10.4)" />
      </g>
    </svg>
  )
}
