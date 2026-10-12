import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { LegalPage } from '@/components/LegalPage'
import { alternatesFor } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('legal.cookies')
  return { title: t('metaTitle'), alternates: alternatesFor(locale, '/cookies') }
}

export default async function CookiesPage() {
  return <LegalPage kind="cookies" />
}
