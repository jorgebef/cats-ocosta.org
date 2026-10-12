import { notFound } from 'next/navigation'
import * as rootParams from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

/**
 * El idioma sale del segmento raíz `[locale]` (next/root-params). Si se pasa un
 * idioma explícito, p. ej. `getTranslations({ locale: 'en' })`, tiene prioridad.
 */
export default getRequestConfig(async ({ locale: override }) => {
  const locale = override ?? (await rootParams.locale())
  if (!hasLocale(routing.locales, locale)) notFound()

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
