import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './layout'

type Props = {
  title: string
  lead?: string
  children?: ReactNode
  tone?: 'peach' | 'sand'
  /** Fotografía de la cabecera (una de public/img). */
  image: { src: string; alt: string }
}

/** Cabecera de las páginas interiores, rematada con arcos encalados y una fotografía. */
export function PageIntro({ title, lead, children, tone = 'peach', image }: Props) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden scallop-bottom pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(4rem,7vw,6rem)]',
        tone === 'peach' ? 'bg-tone-peach' : 'bg-tone-sand',
      )}
    >
      {/* Escritorio: la foto ocupa el lateral derecho */}
      <div className="pointer-events-none absolute inset-y-8 right-[clamp(0rem,3vw,4rem)] -z-10 hidden w-[clamp(12rem,24vw,19rem)] overflow-hidden rounded-3xl shadow-soft lg:block">
        <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="19rem" />
      </div>
      <Container className="relative grid justify-items-start gap-5 lg:pr-[clamp(14rem,28vw,24rem)]">
        <h1 className="font-heading text-7xl font-extrabold tracking-[-0.03em] text-balance text-forest">{title}</h1>
        {lead && <p className="max-w-[40em] text-xl">{lead}</p>}
        {children}
        {/* Móvil y tableta: la foto va debajo del texto */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft lg:hidden">
          <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="100vw" />
        </div>
      </Container>
    </section>
  )
}
