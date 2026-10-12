import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { LegalPage } from '@/components/LegalPage'
import { alternatesFor } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations('legal.notice')
  return { title: t('metaTitle'), alternates: alternatesFor(locale, '/legal-notice') }
}

export default async function LegalNoticePage() {
  return <LegalPage kind="notice" />
}
