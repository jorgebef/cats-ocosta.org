import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/** Logotipo circular de la asociación (Costa Orihuela Cats-OC · Colonias felinas). */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/logo-256.png" alt="" width={256} height={256} className={className} priority={priority} />
}

const BUTTERFLIES = [
  { color: 'text-butter', flap: '0.5s', delay: '0s', duration: '9s' },
  { color: 'text-leaf', flap: '0.42s', delay: '-3s', duration: '11s' },
  { color: 'text-blossom', flap: '0.6s', delay: '-6s', duration: '13s' },
]

const POSITIONS = {
  hero: [
    'left-[60%] top-1 w-6 lg:left-[52%] lg:top-[12%] lg:w-8',
    'left-[74%] top-4 w-6 lg:left-[60%] lg:top-[26%] lg:w-7',
    'left-[87%] top-1 w-6 lg:left-[66%] lg:top-[8%] lg:w-8',
  ],
  intro: ['right-[18%] top-[18%] w-8', 'right-[10%] top-[40%] w-7', 'right-[6%] top-[12%] w-8'],
}

/** Las tres mariposas del logotipo, revoloteando como decoración de fondo. */
export function Butterflies({ placement, className }: { placement: keyof typeof POSITIONS; className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      {BUTTERFLIES.map((b, i) => (
        <svg
          key={b.color}
          viewBox="0 0 40 32"
          focusable="false"
          className={cn('absolute animate-drift', b.color, POSITIONS[placement][i])}
          style={{ animationDelay: b.delay, animationDuration: b.duration, '--flap': b.flap } as CSSProperties}
        >
          <g className="butterfly-wing" fill="currentColor">
            <path d="M20 16 C14 2 2 0 2 8 C2 14 10 16 20 16Z" />
            <path d="M20 16 C12 18 6 26 10 30 C14 32 18 24 20 16Z" opacity=".8" />
          </g>
          <g className="butterfly-wing butterfly-wing-right" fill="currentColor">
            <path d="M20 16 C26 2 38 0 38 8 C38 14 30 16 20 16Z" />
            <path d="M20 16 C28 18 34 26 30 30 C26 32 22 24 20 16Z" opacity=".8" />
          </g>
          <rect x="19.1" y="9" width="1.8" height="16" rx=".9" fill="#5e5244" />
        </svg>
      ))}
    </div>
  )
}
