import type { ComponentProps } from 'react'

type Props = ComponentProps<'a'> & { href: string; newTabLabel: string }

/** Enlace externo seguro: no envía referer ni da acceso a window.opener. */
export function ExternalLink({ children, newTabLabel, ...props }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  )
}
