'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

const LABELS: Record<Locale, { short: string; long: string }> = {
  es: { short: 'ES', long: 'Español' },
  en: { short: 'EN', long: 'English' },
}

export function LocaleSwitcher() {
  const t = useTranslations('a11y')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function change(next: string) {
    if (!next || next === locale) return
    startTransition(() => {
      // Los parámetros (p. ej. el slug de una entrada) siempre corresponden a la ruta actual
      const href = { pathname, params } as unknown as Parameters<typeof router.replace>[0]
      router.replace(href, { locale: next as Locale })
    })
  }

  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={change}
      aria-label={t('language')}
      aria-busy={isPending}
      spacing={0}
      className="rounded-full border border-line p-[3px]"
    >
      {routing.locales.map((l) => (
        <ToggleGroupItem
          key={l}
          value={l}
          lang={l}
          aria-label={LABELS[l].long}
          className="h-8 min-w-10 rounded-full! px-3 text-[0.85rem] font-bold text-muted-foreground data-[state=on]:bg-forest data-[state=on]:text-cream"
        >
          {LABELS[l].short}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
