import type { Metadata } from 'next'
import { SITE } from '@/config/site'
import { getPathname } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

type Href = Parameters<typeof getPathname>[0]['href']

/**
 * URL canónica y alternativas hreflang. `locales` limita las alternativas a los
 * idiomas en los que existe la página (p. ej. una entrada sin traducir).
 */
export function alternatesFor(
  locale: Locale,
  href: Href,
  locales: readonly Locale[] = routing.locales,
): Metadata['alternates'] {
  const url = (l: Locale) => SITE.url + getPathname({ locale: l, href })
  const fallback = locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0]
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, url(l)])),
      ...(fallback ? { 'x-default': url(fallback) } : {}),
    },
  }
}
