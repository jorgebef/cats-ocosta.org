import { MailIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DefinitionRows, StepList, TickList } from '@/components/ContentBlocks'
import { DonateButton } from '@/components/DonateButton'
import { WhatsAppIcon } from '@/components/Icons'
import { Container, FinePrint, H2, H3, Lead, Prose, Section, SectionHeader, Split } from '@/components/layout'
import { PageIntro } from '@/components/PageIntro'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SITE, whatsappLink } from '@/config/site'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'

type Item = { title: string; text: string }
type Faq = { q: string; a: string }
type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'volunteer' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor(locale, '/volunteer'),
  }
}

export default async function VolunteerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('volunteer')
  const tA = await getTranslations('a11y')

  const meaning = t.raw('meaning') as string[]
  const activeTasks = t.raw('active.tasks') as string[]
  const donorTasks = t.raw('donor.tasks') as string[]
  const steps = t.raw('steps') as Item[]
  const commit = t.raw('commit') as Item[]
  const faq = t.raw('faq') as Faq[]
  const wa = whatsappLink(t('active.message'))

  const whatsappButton = (
    <Button asChild>
      <a href={wa} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={20} /> {t('active.cta')}
        <span className="sr-only"> {tA('newTab')}</span>
      </a>
    </Button>
  )

  return (
    <>
      <PageIntro title={t('title')} lead={t('lead')} />

      <Section aria-labelledby="meaning-title">
        <Container>
          <Split>
            <H2 id="meaning-title">{t('meaningTitle')}</H2>
            <Prose>
              {meaning.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Prose>
          </Split>
        </Container>
      </Section>

      <Section size="tight" aria-labelledby="paths-title">
        <Container>
          <SectionHeader>
            <H2 id="paths-title">{t('pathsTitle')}</H2>
          </SectionHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gap-5 rounded-4xl bg-tone-peach py-[clamp(1.75rem,4vw,2.75rem)] ring-0">
              <CardHeader className="gap-4 px-[clamp(1.75rem,4vw,2.75rem)]">
                <H3 className="text-2xl">{t('active.title')}</H3>
                <p className="text-xl leading-[1.45]">{t('active.who')}</p>
              </CardHeader>
              <CardContent className="grid gap-4 px-[clamp(1.75rem,4vw,2.75rem)] text-base">
                <h4 className="font-bold">{t('active.tasksTitle')}</h4>
                <TickList items={activeTasks} />
              </CardContent>
              <CardFooter className="mt-auto border-0 bg-transparent px-[clamp(1.75rem,4vw,2.75rem)] py-0">{whatsappButton}</CardFooter>
            </Card>

            <Card className="gap-5 rounded-4xl bg-ember-soft py-[clamp(1.75rem,4vw,2.75rem)] ring-0">
              <CardHeader className="gap-4 px-[clamp(1.75rem,4vw,2.75rem)]">
                <H3 className="text-2xl text-ember-deep">{t('donor.title')}</H3>
                <p className="text-xl leading-[1.45]">{t('donor.who')}</p>
              </CardHeader>
              <CardContent className="grid gap-4 px-[clamp(1.75rem,4vw,2.75rem)] text-base">
                <h4 className="font-bold">{t('donor.tasksTitle')}</h4>
                <TickList items={donorTasks} />
              </CardContent>
              <CardFooter className="mt-auto grid justify-items-start gap-3 border-0 bg-transparent px-[clamp(1.75rem,4vw,2.75rem)] py-0">
                <DonateButton label={t('donor.cta')} />
                <FinePrint>{t('donor.inKind')}</FinePrint>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="peach" aria-labelledby="join-steps-title">
        <Container>
          <SectionHeader>
            <H2 id="join-steps-title">{t('stepsTitle')}</H2>
          </SectionHeader>
          <StepList items={steps} columns={4} />
        </Container>
      </Section>

      <Section aria-labelledby="commit-title">
        <Container>
          <Split>
            <H2 id="commit-title">{t('commitTitle')}</H2>
            <DefinitionRows items={commit} />
          </Split>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="faq-title">
        <Container narrow>
          <SectionHeader>
            <H2 id="faq-title">{t('faqTitle')}</H2>
          </SectionHeader>
          <Accordion type="multiple" className="gap-3">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="rounded-2xl border-0 bg-cream shadow-soft">
                <AccordionTrigger className="items-center gap-4 px-6 py-5 font-heading text-xl font-bold text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-ember">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[64ch] px-6 pb-6 text-base text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Section aria-labelledby="cta-title">
        <Container narrow className="grid justify-items-center gap-5 text-center [--squiggle-inline:auto]">
          <H2 id="cta-title">{t('ctaTitle')}</H2>
          <Lead className="mx-auto">{t('ctaText')}</Lead>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {whatsappButton}
            <Button asChild variant="outline">
              <a href={`mailto:${SITE.email}`}>
                <MailIcon aria-hidden="true" /> {t('ctaEmail')}
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
