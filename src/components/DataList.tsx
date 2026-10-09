import type { ReactNode } from 'react'

/** Lista de pares etiqueta / valor (datos de la asociación). */
export function DataList({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="grid">
      {items.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[minmax(8rem,12rem)_1fr] gap-4 border-b py-3">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-bold [overflow-wrap:anywhere]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
