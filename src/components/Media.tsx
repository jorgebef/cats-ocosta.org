import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Fotografías y vídeos de la asociación (carpeta public/img). */
export const IMG = {
  feedingCleanup: '/img/gatos-comiendo-recogedor.webp',
  eatingClose: '/img/gatos-comiendo-cerca.webp',
  twoCatsEating: '/img/2-gatos-comiendo.jpeg',
  wallCats: '/img/2-gatos-pared.jpeg',
  colonyCats: '/img/gatos-comiendo-colonia.jpeg',
  gingerCat: '/img/gato-rubio.jpeg',
  loneCat: '/img/gato-solo-colonia.jpeg',
  trappedCat: '/img/gato-capturado.jpeg',
  trapsCovered: '/img/captura-varios-gatos.jpeg',
  vetCheck: '/img/gato-capturado-veterinario.jpeg',
  earTip: '/img/gato-muestra-oreja.jpeg',
  neuteredFemale: '/img/hembra-esterilizada-2025.jpeg',
  fundraisingStand: '/img/recaudacion-CER.jpeg',
  rescue: '/img/rescate-gato-bomberos.jpeg',
} as const

export const RELEASE_VIDEO = {
  src: '/img/liberacion-gato-esterlizado.mp4',
  poster: '/img/liberacion-gato-esterlizado-poster.jpg',
}

type PhotoProps = {
  src: string
  alt: string
  caption?: string
  /** Proporción del recuadro, p. ej. "aspect-[4/3]". */
  ratio?: string
  sizes?: string
  className?: string
  imgClassName?: string
}

/** Foto recortada en un recuadro redondeado, con pie opcional. */
export function Photo({ src, alt, caption, ratio = 'aspect-[4/3]', sizes = '(min-width: 1024px) 40vw, 100vw', className, imgClassName }: PhotoProps) {
  return (
    <figure className={cn('grid gap-2.5', className)}>
      <div className={cn('relative overflow-hidden rounded-3xl bg-peach shadow-soft', ratio)}>
        <Image src={src} alt={alt} fill sizes={sizes} className={cn('object-cover', imgClassName)} />
      </div>
      {caption && <figcaption className="text-[0.9rem] font-bold text-(--body-muted)">{caption}</figcaption>}
    </figure>
  )
}

/** Vídeo corto sin sonido, con controles y sin reproducción automática. */
export function Video({ label, caption, ratio = 'aspect-[4/3]', className }: { label: string; caption?: string; ratio?: string; className?: string }) {
  return (
    <figure className={cn('grid gap-2.5', className)}>
      <div className={cn('relative overflow-hidden rounded-3xl bg-ink shadow-soft', ratio)}>
        <video
          className="size-full object-cover"
          src={RELEASE_VIDEO.src}
          poster={RELEASE_VIDEO.poster}
          aria-label={label}
          controls
          muted
          playsInline
          preload="none"
        />
      </div>
      {caption && <figcaption className="text-[0.9rem] font-bold text-(--body-muted)">{caption}</figcaption>}
    </figure>
  )
}
