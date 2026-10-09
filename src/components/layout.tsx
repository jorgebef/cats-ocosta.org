import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Piezas de maquetación reutilizables. Cada tono de sección redefine unas
 * variables CSS (--heading, --lead, --link…) que usan los títulos y textos
 * de dentro, así que el mismo componente funciona sobre fondo claro u oscuro.
 */

export function Container({ narrow, className, ...props }: ComponentProps<'div'> & { narrow?: boolean }) {
  return (
    <div
      className={cn('mx-auto w-full px-[clamp(1.25rem,4vw,2.5rem)]', narrow ? 'max-w-[50rem]' : 'max-w-[74rem]', className)}
      {...props}
    />
  )
}

export type Tone = 'plain' | 'peach' | 'sand' | 'green' | 'ember'

const TONES: Record<Tone, string> = {
  plain: '',
  peach: 'panel bg-tone-peach',
  sand: 'panel bg-tone-sand [--panel-cat:var(--color-leaf)] [--panel-cat-flip:scaleX(-1)]',
  green:
    'panel bg-tone-green text-cream [--heading:var(--color-cream)] [--lead:#e4f1dc] [--body-muted:#eef5e8] [--link:var(--color-cream)] [--accent-line:var(--color-butter)] [--accent-num:var(--color-butter)] [--panel-cat:#fff] [--panel-cat-opacity:0.08] [&_:focus-visible]:outline-butter',
  ember:
    'panel bg-tone-ember text-white [--heading:#fff] [--lead:#fff1e3] [--body-muted:#fff1e3] [--link:#fff] [--accent-line:var(--color-butter)] [--panel-cat:#fff] [--panel-cat-opacity:0.1] [&_:focus-visible]:outline-cream',
}

export function Section({
  tone = 'plain',
  size = 'default',
  className,
  ...props
}: ComponentProps<'section'> & { tone?: Tone; size?: 'default' | 'tight' | 'band' }) {
  return (
    <section
      className={cn(
        size === 'default' && 'py-[clamp(4rem,3rem+5vw,7.5rem)]',
        size === 'tight' && 'py-[clamp(2.4rem,1.8rem+3vw,4.5rem)]',
        size === 'band' && 'py-[clamp(3rem,6vw,4.5rem)]',
        TONES[tone],
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mb-[clamp(2rem,4vw,3.5rem)] grid gap-4', className)} {...props} />
}

/** Dos columnas: título fijo a la izquierda y contenido a la derecha. */
export function Split({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid gap-x-[clamp(2rem,6vw,5rem)] gap-y-8 min-[860px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]', className)}
      {...props}
    />
  )
}

export function SplitAside({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('grid content-start gap-4 min-[860px]:sticky min-[860px]:top-28', className)} {...props} />
}

type HeadingProps = ComponentProps<'h2'> & { as?: 'h1' | 'h2' | 'h3' | 'h4'; squiggle?: boolean }

export function H2({ as: Tag = 'h2', squiggle = true, className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-heading text-5xl font-bold tracking-[-0.015em] text-balance text-(--heading)',
        squiggle && 'squiggle',
        className,
      )}
      {...props}
    />
  )
}

export function H3({ as: Tag = 'h3', className, ...props }: HeadingProps) {
  return <Tag className={cn('font-heading text-xl font-bold text-balance text-(--heading)', className)} {...props} />
}

export function Lead({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('max-w-[38em] text-xl text-pretty text-(--lead)', className)} {...props} />
}

export function Muted({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-(--body-muted)', className)} {...props} />
}

export function FinePrint({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-[0.9rem] text-(--body-muted)', className)} {...props} />
}

/** Estilo de enlace de texto subrayado; se aplica a <a> o al Link de next-intl. */
export const textLink =
  'inline-block font-bold text-(--link) underline decoration-2 underline-offset-[0.3em] decoration-current/35 transition-colors hover:decoration-current'

export function Stack({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('grid content-start justify-items-start gap-4', className)} {...props} />
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid max-w-[62ch] gap-[1.1em] text-pretty', className)}>{children}</div>
}
