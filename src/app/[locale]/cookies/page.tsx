import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { LegalPage } from '@/components/LegalPage'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.cookies' })
  return { title: t('metaTitle'), alternates: alternatesFor(locale, '/cookies') }
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalPage kind="cookies" />
}
