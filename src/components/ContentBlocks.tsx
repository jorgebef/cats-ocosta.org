import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { EarTip } from './Cats'
import { H3, Muted } from './layout'

type Item = { title: string; text: string }

/** Tarjetas de beneficios con borde superior en los colores del logotipo. */
export function BenefitGrid({ items, onDark = false }: { items: Item[]; onDark?: boolean }) {
  const accents = ['border-t-leaf', 'border-t-tangerine', 'border-t-butter']
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b, i) => (
        <li key={b.title} className="grid">
          <Card
            className={cn(
              'gap-2 rounded-t-2xl rounded-b-3xl border-t-5 py-6 ring-0 transition-transform hover:-translate-y-1',
              onDark ? 'border-t-butter bg-white/8 text-cream backdrop-blur-[2px]' : cn('bg-white/72 shadow-soft', accents[i % 3]),
            )}
          >
            <CardHeader className="px-6">
              <CardTitle className="font-heading text-xl font-bold text-(--heading)">
                <h3>{b.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 text-base">
              <Muted>{b.text}</Muted>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}

/** Pasos numerados con cifras grandes. */
export function StepList({ items, columns = 3 }: { items: Item[]; columns?: 3 | 4 }) {
  return (
    <ol className={cn('grid gap-x-8 gap-y-10 md:grid-cols-3', columns === 4 && 'md:grid-cols-2 lg:grid-cols-4')}>
      {items.map((step, i) => (
        <li key={step.title} className="grid content-start gap-2.5">
          <span className="font-heading text-[clamp(3.5rem,3rem+3vw,5.5rem)] leading-[0.9] font-extrabold text-(--accent-num)" aria-hidden="true">
            {i + 1}
          </span>
          <H3>{step.title}</H3>
          <Muted>{step.text}</Muted>
        </li>
      ))}
    </ol>
  )
}

/** Lista con la oreja recortada como viñeta. */
export function TickList({ items, large = false, className }: { items: ReactNode[]; large?: boolean; className?: string }) {
  return (
    <ul className={cn('grid gap-3', large && 'gap-4.5 text-xl leading-[1.45]', className)}>
      {items.map((item, i) => (
        <li key={i} className={cn('grid grid-cols-[1.4rem_1fr] items-start gap-3', large && 'grid-cols-[1.6rem_1fr]')}>
          <EarTip className={cn('mt-1 w-5 text-ember', large && 'w-6')} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Filas de definición con separadores. */
export function DefinitionRows({ items, wide = false }: { items: Item[]; wide?: boolean }) {
  return (
    <dl className="grid">
      {items.map((c) => (
        <div
          key={c.title}
          className={cn('grid gap-1.5 border-t py-6 last:border-b', wide && 'md:grid-cols-[17rem_1fr] md:gap-8')}
        >
          <dt className="font-heading text-xl font-bold text-(--heading)">{c.title}</dt>
          <dd className="max-w-[62ch] text-(--body-muted)">{c.text}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Sello en forma de arco para la Ley 7/2023. */
export function LawSeal({ small, big }: { small: string; big: string }) {
  return (
    <p
      aria-hidden="true"
      className="grid aspect-[4/5] w-[clamp(9rem,16vw,12.5rem)] place-content-center justify-items-center rounded-t-full rounded-b-2xl bg-forest font-heading leading-none text-cream shadow-soft"
    >
      <span className="text-xl font-medium opacity-85">{small}</span>
      <span className="text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] font-extrabold tracking-[-0.02em]">{big}</span>
    </p>
  )
}
