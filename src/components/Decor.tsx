import Image from 'next/image'

/** Logotipo circular de la asociación (Costa Orihuela Cats-OC · Colonias felinas). */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/logo-256.png" alt="" width={256} height={256} className={className} priority={priority} />
}
