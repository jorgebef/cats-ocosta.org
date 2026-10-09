import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SITE } from '@/config/site'
import { routing } from '@/i18n/routing'
import '../globals.css'

// next/font descarga las tipografías en el build y las sirve desde este dominio:
// el navegador del visitante nunca se conecta a Google.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const body = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-atkinson',
  display: 'swap',
})

type Props = { children: ReactNode; params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = { themeColor: '#2C6E2A' }

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: `%s · ${SITE.name}` },
    description: t('description'),
    applicationName: SITE.name,
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('a11y')

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <NextIntlClientProvider>
          <a
            href="#main"
            className="absolute -top-16 left-4 z-100 rounded-2xl bg-ink px-4 py-3 text-cream no-underline focus:top-4"
          >
            {t('skip')}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
