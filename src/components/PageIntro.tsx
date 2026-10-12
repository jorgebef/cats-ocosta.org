import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './layout'

type Props = { title: string; lead?: string; children?: ReactNode; tone?: 'peach' | 'sand' }

/** Cabecera de las páginas interiores, rematada con arcos encalados y una fotografía. */
export function PageIntro({ title, lead, children, tone = 'peach' }: Props) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden scallop-bottom pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(4rem,7vw,6rem)]',
        tone === 'peach' ? 'bg-tone-peach' : 'bg-tone-sand',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-8 right-[clamp(0rem,3vw,4rem)] -z-10 hidden w-[clamp(12rem,24vw,19rem)] overflow-hidden rounded-3xl lg:block"
      >
        <Image
          src="/img/gatos-comiendo-recogedor.webp"
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) clamp(12rem,24vw,19rem)"
        />
      </div>
      <Container className="relative grid justify-items-start gap-5">
        <h1 className="font-heading text-7xl font-extrabold tracking-[-0.03em] text-balance text-forest">{title}</h1>
        {lead && <p className="max-w-[40em] text-xl">{lead}</p>}
        {children}
        <div aria-hidden="true" className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:hidden">
          <Image
            src="/img/gatos-comiendo-recogedor.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Container>
    </section>
  )
}
