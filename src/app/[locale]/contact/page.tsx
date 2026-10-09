import { MailIcon, ShieldCheckIcon, SirenIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { DataList } from '@/components/DataList'
import { WhatsAppIcon } from '@/components/Icons'
import { Container, FinePrint, H3, Section, Split, textLink } from '@/components/layout'
import { PageIntro } from '@/components/PageIntro'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SITE, whatsappLink } from '@/config/site'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'
import { cn } from '@/lib/utils'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor(locale, '/contact'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  const tA = await getTranslations('a11y')
  const tF = await getTranslations('footer')

  const cardClass = 'gap-3.5 rounded-4xl py-[clamp(1.75rem,4vw,2.5rem)] ring-0'
  const pad = 'px-[clamp(1.75rem,4vw,2.5rem)]'

  return (
    <>
      <PageIntro title={t('title')} lead={t('lead')} />

      <Section size="tight">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className={cn(cardClass, 'border-2 border-forest bg-tone-peach')}>
              <CardHeader className={cn('gap-3.5 text-forest', pad)}>
                <WhatsAppIcon size={36} />
                <H3 as="h2">{t('whatsappTitle')}</H3>
                <p className="font-heading text-2xl font-bold text-ink [overflow-wrap:anywhere]">{SITE.whatsapp.display}</p>
              </CardHeader>
              <CardContent className={cn('text-base text-muted-foreground', pad)}>{t('whatsappText')}</CardContent>
              <CardFooter className={cn('border-0 bg-transparent py-0 pt-2', pad)}>
                <Button asChild>
                  <a href={whatsappLink(t('whatsappMessage'))} target="_blank" rel="noopener noreferrer">
                    {t('whatsappCta')}
                    <span className="sr-only"> {tA('newTab')}</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className={cn(cardClass, 'border-2 border-line bg-white/70')}>
              <CardHeader className={cn('gap-3.5 text-forest', pad)}>
                <MailIcon className="size-9" aria-hidden="true" />
                <H3 as="h2">{t('emailTitle')}</H3>
                <p className="font-heading text-2xl font-bold text-ink [overflow-wrap:anywhere]">{SITE.email}</p>
              </CardHeader>
              <CardContent className={cn('text-base text-muted-foreground', pad)}>{t('emailText')}</CardContent>
              <CardFooter className={cn('border-0 bg-transparent py-0 pt-2', pad)}>
                <Button asChild variant="outline">
                  <a href={`mailto:${SITE.email}`}>{t('emailCta')}</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <FinePrint className="mt-5">{t('response')}</FinePrint>
        </Container>
      </Section>

      <Section size="tight">
        <Container>
          <Split>
            <Alert role="note" className="h-fit gap-2.5 rounded-3xl border-2 border-ember bg-ember-soft p-6 text-base" aria-labelledby="urgent-title">
              <SirenIcon className="size-5! text-ember-deep" />
              <AlertTitle id="urgent-title">
                <H3 as="h2" className="text-ember-deep">{t('urgentTitle')}</H3>
              </AlertTitle>
              <AlertDescription className="text-base text-ink">{t('urgentText')}</AlertDescription>
            </Alert>

            <div>
              <H3 as="h2">{t('dataTitle')}</H3>
              <div className="mt-4 mb-8">
                <DataList
                  items={[
                    [t('dataName'), SITE.legalName],
                    [t('dataCif'), SITE.cif],
                    [t('dataArea'), SITE.area],
                  ]}
                />
              </div>
              <Alert role="note" className="gap-2.5 rounded-2xl border-0 bg-leaf-soft p-5 text-base">
                <ShieldCheckIcon className="size-5! text-forest" />
                <AlertTitle>
                  <h2 className="font-bold text-forest">{t('privacyTitle')}</h2>
                </AlertTitle>
                <AlertDescription className="grid justify-items-start gap-2.5 text-base text-ink">
                  <p>{t('privacyText')}</p>
                  <Link href="/privacy" className={textLink}>{tF('privacy')}</Link>
                </AlertDescription>
              </Alert>
            </div>
          </Split>
        </Container>
      </Section>
    </>
  )
}
