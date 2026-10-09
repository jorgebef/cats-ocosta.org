import { useTranslations } from 'next-intl'
import { SittingCat } from '@/components/Cats'
import { Container, Lead, Section } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <Section>
      <Container className="grid justify-items-start gap-5">
        <svg viewBox="-60 -160 150 170" className="w-22 text-tangerine" aria-hidden="true" focusable="false">
          <g fill="currentColor" stroke="currentColor"><SittingCat tipped /></g>
        </svg>
        <h1 className="font-heading text-7xl font-bold tracking-[-0.02em] text-forest">{t('title')}</h1>
        <Lead>{t('text')}</Lead>
        <Button asChild>
          <Link href="/">{t('home')}</Link>
        </Button>
      </Container>
    </Section>
  )
}
