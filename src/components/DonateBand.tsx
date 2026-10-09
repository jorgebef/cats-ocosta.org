import { ShieldCheckIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Container, FinePrint, Section } from './layout'
import { DonateButton } from './DonateButton'

export async function DonateBand({ title, text }: { title?: string; text?: string }) {
  const t = await getTranslations()
  return (
    <Section tone="ember" size="band" aria-labelledby="donate-band-title">
      <Container className="grid items-center gap-8 min-[860px]:grid-cols-[1fr_auto] min-[860px]:gap-16">
        <div>
          <h2 id="donate-band-title" className="font-heading text-5xl font-extrabold tracking-[-0.015em] text-balance">
            {title ?? t('home.donateBand.title')}
          </h2>
          <p className="mt-3.5 max-w-[50ch] text-xl text-(--lead)">{text ?? t('home.donateBand.text')}</p>
        </div>
        <div className="grid max-w-[22rem] justify-items-start gap-3.5">
          <DonateButton label={t('home.donateBand.cta')} variant="light" size="lg" />
          <FinePrint className="flex items-start gap-2">
            <ShieldCheckIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {t('donate.note')}
          </FinePrint>
        </div>
      </Container>
    </Section>
  )
}
