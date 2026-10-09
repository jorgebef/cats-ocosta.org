import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Butterflies } from './Decor'
import { Container } from './layout'

type Props = { title: string; lead?: string; children?: ReactNode; tone?: 'peach' | 'sand' }

/** Cabecera de las páginas interiores, rematada con arcos encalados y un gato asomado. */
export function PageIntro({ title, lead, children, tone = 'peach' }: Props) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden scallop-bottom pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(4rem,7vw,6rem)]',
        tone === 'peach' ? 'bg-tone-peach' : 'bg-tone-sand',
      )}
    >
      <Butterflies placement="intro" />
      <div
        aria-hidden="true"
        className="cat-silhouette absolute right-[clamp(-1rem,4vw,6rem)] bottom-6 -z-10 w-[clamp(7rem,16vw,13rem)] text-tangerine opacity-20"
      />
      <Container className="relative grid justify-items-start gap-5">
        <h1 className="font-heading text-7xl font-extrabold tracking-[-0.03em] text-balance text-forest">{title}</h1>
        {lead && <p className="max-w-[40em] text-xl">{lead}</p>}
        {children}
      </Container>
    </section>
  )
}
