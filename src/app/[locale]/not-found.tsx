import { useTranslations } from 'next-intl'
import { Container, Lead, Section } from '@/components/layout'
import { IMG, Photo } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')
  const tI = useTranslations('images')
  return (
    <Section>
      <Container className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,22rem)]">
        <div className="grid justify-items-start gap-5">
          <h1 className="font-heading text-7xl font-bold tracking-[-0.02em] text-forest">{t('title')}</h1>
          <Lead>{t('text')}</Lead>
          <Button asChild>
            <Link href="/">{t('home')}</Link>
          </Button>
        </div>
        <Photo src={IMG.loneCat} alt={tI('loneCat')} ratio="aspect-[3/4]" sizes="22rem" className="max-w-xs md:max-w-none" />
      </Container>
    </Section>
  )
}
