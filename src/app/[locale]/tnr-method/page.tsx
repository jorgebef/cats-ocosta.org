import { TriangleAlertIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SittingCat } from '@/components/Cats'
import { BenefitGrid, DefinitionRows, LawSeal, TickList } from '@/components/ContentBlocks'
import { DonateButton } from '@/components/DonateButton'
import { ExternalLink } from '@/components/ExternalLink'
import { Container, FinePrint, H2, H3, Lead, Muted, Section, SectionHeader, Split, SplitAside, textLink } from '@/components/layout'
import { PageIntro } from '@/components/PageIntro'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'
import { cn } from '@/lib/utils'

type Item = { title: string; text: string }
type Myth = { myth: string; fact: string }
type Props = { params: Promise<{ locale: Locale }> }

const BOE_URL = 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936'
const SECTIONS = ['what', 'why', 'myths', 'law', 'rights', 'benefits'] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tnr' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor(locale, '/tnr-method'),
  }
}

export default async function TnrPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('tnr')
  const tA = await getTranslations('a11y')
  const tNav = await getTranslations('nav')

  const whatSteps = t.raw('what.steps') as Item[]
  const why = t.raw('why.items') as Item[]
  const myths = t.raw('myths.items') as Myth[]
  const law = t.raw('law.items') as Item[]
  const rights = t.raw('rights.items') as string[]
  const benefits = t.raw('benefits.items') as Item[]

  return (
    <>
      <PageIntro title={t('title')} lead={t('lead')}>
        <nav className="mt-4" aria-label={t('toc')}>
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((id) => (
              <li key={id}>
                <Button asChild variant="secondary" size="sm" className="bg-cream hover:bg-forest hover:text-cream">
                  <a href={`#${id}`}>{t(`tocItems.${id}`)}</a>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      {/* QUÉ ES */}
      <Section id="what" aria-labelledby="what-title">
        <Container>
          <Split>
            <H2 id="what-title">{t('what.title')}</H2>
            <p className="max-w-[62ch] text-xl leading-[1.55] text-pretty">{t('what.text')}</p>
          </Split>
          <ol className="relative mt-[clamp(3rem,6vw,5rem)] grid min-[860px]:grid-cols-4 min-[860px]:before:absolute min-[860px]:before:top-6 min-[860px]:before:right-[12%] min-[860px]:before:left-6 min-[860px]:before:border-t-2 min-[860px]:before:border-dashed min-[860px]:before:border-line">
            {whatSteps.map((step, i) => (
              <li key={step.title} className="relative grid gap-4 pr-6 pb-8">
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative grid size-12 place-items-center rounded-full font-heading text-[1.3rem] font-extrabold text-cream',
                    ['bg-forest', 'bg-ember', 'bg-leaf', 'bg-tangerine'][i % 4],
                  )}
                >
                  {i + 1}
                </span>
                <div>
                  <H3>{step.title}</H3>
                  <Muted className="mt-1.5">{step.text}</Muted>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* POR QUÉ FUNCIONA */}
      <Section id="why" tone="green" aria-labelledby="why-title">
        <Container>
          <SectionHeader>
            <H2 id="why-title">{t('why.title')}</H2>
            <Lead>{t('why.lead')}</Lead>
          </SectionHeader>
          <BenefitGrid items={why} onDark />
        </Container>
      </Section>

      {/* MITOS */}
      <Section id="myths" aria-labelledby="myths-title">
        <Container>
          <SectionHeader>
            <H2 id="myths-title">{t('myths.title')}</H2>
          </SectionHeader>
          <div className="grid gap-5 md:grid-cols-2">
            {myths.map((m, i) => (
              <Card
                key={m.myth}
                className={cn(
                  'gap-3.5 rounded-4xl py-7 ring-0',
                  i % 2
                    ? 'bg-[radial-gradient(60%_80%_at_100%_0%,rgb(62_155_58/0.14),transparent_70%)] bg-leaf-soft'
                    : 'bg-[radial-gradient(60%_80%_at_100%_0%,rgb(236_138_50/0.16),transparent_70%)] bg-peach',
                )}
              >
                <CardHeader className="px-7">
                  <p className="font-heading text-xl font-bold text-muted-foreground">
                    <s className="decoration-ember decoration-3">{m.myth}</s>
                  </p>
                </CardHeader>
                <CardContent className="px-7 text-base">
                  <p>{m.fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* LA LEY */}
      <Section id="law" tone="sand" aria-labelledby="law-title">
        <Container>
          <div className="mb-[clamp(2rem,4vw,3rem)] grid items-center gap-x-[clamp(2rem,6vw,5rem)] gap-y-8 md:grid-cols-[auto_1fr]">
            <LawSeal small={locale === 'es' ? 'Ley' : 'Law'} big="7/2023" />
            <div className="grid gap-4">
              <H2 id="law-title">{t('law.title')}</H2>
              <Lead>{t('law.lead')}</Lead>
            </div>
          </div>
          <DefinitionRows items={law} wide />
          <Alert role="note" className="mt-10 gap-3.5 rounded-l-none rounded-r-2xl border-0 border-l-4 border-forest bg-cream/60 p-6 text-base">
            <AlertDescription className="grid justify-items-start gap-3.5 text-base text-ink [&_p]:max-w-[68ch]">
              <p>{t('law.regional')}</p>
              <FinePrint>{t('law.disclaimer')}</FinePrint>
              <ExternalLink href={BOE_URL} className={textLink} newTabLabel={tA('newTab')}>
                {t('law.boe')}
              </ExternalLink>
            </AlertDescription>
          </Alert>
        </Container>
      </Section>

      {/* DERECHOS */}
      <Section id="rights" aria-labelledby="rights-title">
        <Container>
          <Split>
            <SplitAside>
              <H2 id="rights-title">{t('rights.title')}</H2>
              <Lead>{t('rights.lead')}</Lead>
            </SplitAside>
            <div>
              <TickList items={rights} large className="mb-10" />
              <Alert role="note" className="gap-2.5 rounded-3xl border-2 border-ember bg-ember-soft p-6 text-base" aria-labelledby="report-title">
                <TriangleAlertIcon className="size-5! text-ember-deep" />
                <AlertTitle id="report-title">
                  <H3 as="h3" className="text-ember-deep">{t('rights.reportTitle')}</H3>
                </AlertTitle>
                <AlertDescription className="text-base text-ink">{t('rights.reportText')}</AlertDescription>
              </Alert>
            </div>
          </Split>
        </Container>
      </Section>

      {/* BENEFICIOS */}
      <Section id="benefits" tone="peach" aria-labelledby="benefits-title">
        <Container>
          <SectionHeader>
            <H2 id="benefits-title">{t('benefits.title')}</H2>
          </SectionHeader>
          <BenefitGrid items={benefits} />
        </Container>
      </Section>

      <Section aria-labelledby="tnr-cta">
        <Container narrow className="grid justify-items-center gap-5 text-center [--squiggle-inline:auto]">
          <svg viewBox="-60 -160 150 170" className="w-18 text-tangerine" aria-hidden="true" focusable="false">
            <g fill="currentColor" stroke="currentColor"><SittingCat tipped /></g>
          </svg>
          <H2 id="tnr-cta">{t('ctaTitle')}</H2>
          <Lead className="mx-auto">{t('ctaText')}</Lead>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <DonateButton />
            <Button asChild variant="outline">
              <Link href="/volunteer">{tNav('volunteer')}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
