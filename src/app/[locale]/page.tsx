import { ShieldCheckIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { EarTip } from '@/components/Cats'
import { BenefitGrid, LawSeal, StepList } from '@/components/ContentBlocks'
import { Butterflies, Logo } from '@/components/Decor'
import { DonateBand } from '@/components/DonateBand'
import { DonateButton } from '@/components/DonateButton'
import { HeroScene } from '@/components/HeroScene'
import { Container, FinePrint, H2, H3, Lead, Muted, Section, SectionHeader, Split, SplitAside, Stack, textLink } from '@/components/layout'
import { PostCard } from '@/components/PostCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'
import { getPosts } from '@/lib/posts'
import { cn } from '@/lib/utils'

type Item = { title: string; text: string }
type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return { alternates: alternatesFor(locale, '/') }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const { docs: posts } = await getPosts({ locale, limit: 3 })

  const work = t.raw('work.items') as Item[]
  const steps = t.raw('steps.items') as Item[]
  const benefits = t.raw('benefits.items') as Item[]

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(38rem_30rem_at_88%_35%,rgb(236_138_50/0.22),transparent_70%),radial-gradient(30rem_24rem_at_0%_100%,rgb(62_155_58/0.14),transparent_70%),radial-gradient(22rem_18rem_at_45%_0%,rgb(244_197_66/0.16),transparent_70%)] pt-[clamp(2.5rem,5vw,4.5rem)] pb-12 lg:pb-[clamp(5rem,8vw,7rem)]">
        {/* Mancha orgánica detrás del arco */}
        <div
          aria-hidden="true"
          className="absolute -right-[30%] bottom-16 -z-10 aspect-square w-[110vw] animate-blob rounded-[58%_42%_48%_52%/46%_55%_45%_54%] bg-[linear-gradient(145deg,var(--color-ember-soft),color-mix(in_srgb,var(--color-leaf-soft)_70%,transparent))] lg:top-[8%] lg:-right-24 lg:bottom-auto lg:w-[min(44rem,70vw)]"
        />
        <Butterflies placement="hero" className="z-20" />

        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
          <Stack className="gap-6">
            <Badge variant="secondary" className="h-auto gap-2 bg-leaf-soft px-3.5 py-1.5 text-[0.9rem] font-bold text-forest">
              <EarTip className="size-4! text-ember" />
              {t('hero.eyebrow')}
            </Badge>
            <h1 className="font-heading text-[clamp(2.4rem,1.5rem+3.6vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance text-forest">
              {t('hero.title')}
            </h1>
            <p className="max-w-[34em] text-xl leading-[1.55]">{t('hero.lead')}</p>
            <div className="mt-2 flex flex-wrap items-start gap-x-8 gap-y-5">
              <div className="grid justify-items-start gap-2.5">
                <DonateButton label={t('hero.donate')} size="lg" />
                <FinePrint className="inline-flex items-center gap-2">
                  <ShieldCheckIcon className="size-4" aria-hidden="true" /> {t('hero.donateNote')}
                </FinePrint>
              </div>
              <Link href="/tnr-method" className={cn(textLink, 'mt-4')}>{t('hero.learn')}</Link>
            </div>
          </Stack>

          <div className="relative w-full max-w-[30rem] justify-self-center">
            <div className="absolute -top-6 -left-5 z-10 aspect-square w-[clamp(6.5rem,12vw,8.5rem)] animate-badge-in rounded-full bg-white p-1.5 shadow-soft">
              <Logo priority className="size-full" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl bg-peach shadow-arch">
              <HeroScene label={t('hero.sceneLabel')} />
            </div>
            <Card className="relative mt-[-3.5rem] ml-auto max-w-[19rem] animate-note-in flex-row items-start gap-3.5 text-base rounded-2xl border-2 border-ember bg-cream px-4.5 py-4 shadow-soft ring-0 lg:mr-[-2rem] lg:mt-[-4rem] lg:max-w-[21rem]">
              <EarTip className="w-7 shrink-0 text-ember" />
              <CardContent className="p-0">
                <p className="mb-1 leading-snug font-bold">{t('hero.earTitle')}</p>
                <p className="text-[0.9rem] leading-[1.45] text-muted-foreground">{t('hero.earText')}</p>
              </CardContent>
            </Card>
          </div>
        </Container>

        <a
          href="#work"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 justify-items-center gap-2 text-[0.9rem] text-muted-foreground no-underline lg:grid"
        >
          {t('hero.scroll')}
          <span
            aria-hidden="true"
            className="h-9 w-0.5 animate-cue bg-[linear-gradient(var(--color-forest)_50%,transparent_0)] bg-size-[100%_200%]"
          />
        </a>
      </section>

      {/* LO QUE HACEMOS */}
      <Section id="work" aria-labelledby="work-title">
        <Container>
          <Split>
            <SplitAside>
              <H2 id="work-title">{t('work.title')}</H2>
              <Lead>{t('work.lead')}</Lead>
            </SplitAside>
            <ul className="grid">
              {work.map((item) => (
                <li key={item.title} className="grid grid-cols-[2rem_1fr] gap-5 border-t py-7 last:border-b">
                  <EarTip className="mt-0.5 w-8 text-ember" />
                  <div>
                    <H3>{item.title}</H3>
                    <Muted className="mt-1.5 max-w-[52ch]">{item.text}</Muted>
                  </div>
                </li>
              ))}
            </ul>
          </Split>
        </Container>
      </Section>

      {/* CER EN TRES PASOS */}
      <Section tone="green" aria-labelledby="steps-title">
        <Container>
          <SectionHeader>
            <H2 id="steps-title">{t('steps.title')}</H2>
            <Lead>{t('steps.lead')}</Lead>
          </SectionHeader>
          <StepList items={steps} />
          <Link href="/tnr-method" className={cn(textLink, 'mt-10')}>{t('steps.link')}</Link>
        </Container>
      </Section>

      {/* BENEFICIOS */}
      <Section tone="peach" aria-labelledby="benefits-title">
        <Container>
          <SectionHeader>
            <H2 id="benefits-title">{t('benefits.title')}</H2>
            <Lead>{t('benefits.lead')}</Lead>
          </SectionHeader>
          <BenefitGrid items={benefits} />
        </Container>
      </Section>

      {/* LA LEY */}
      <Section tone="sand" aria-labelledby="law-title">
        <Container className="grid items-center gap-x-[clamp(2rem,6vw,5rem)] gap-y-8 md:grid-cols-[auto_1fr]">
          <LawSeal small={locale === 'es' ? 'Ley' : 'Law'} big="7/2023" />
          <Stack className="gap-4.5">
            <H2 id="law-title">{t('law.title')}</H2>
            <p className="max-w-[62ch] text-pretty">{t('law.text')}</p>
            <Link href={{ pathname: '/tnr-method', hash: 'law' }} className={textLink}>{t('law.link')}</Link>
          </Stack>
        </Container>
      </Section>

      {/* BLOG */}
      <Section aria-labelledby="blog-title">
        <Container>
          <SectionHeader className="items-end gap-x-8 sm:grid-cols-[1fr_auto]">
            <div className="grid gap-4">
              <H2 id="blog-title">{t('blog.title')}</H2>
              <Lead>{t('blog.lead')}</Lead>
            </div>
            <Link href="/blog" className={textLink}>{t('blog.all')}</Link>
          </SectionHeader>
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <Muted className="rounded-3xl border-2 border-dashed p-8">{t('blog.empty')}</Muted>
          )}
        </Container>
      </Section>

      {/* CÓMO AYUDAR */}
      <Section size="tight" aria-labelledby="join-title">
        <Container>
          <SectionHeader>
            <H2 id="join-title">{t('join.title')}</H2>
            <Lead>{t('join.lead')}</Lead>
          </SectionHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="gap-4 rounded-4xl bg-tone-peach p-[clamp(1.75rem,4vw,2.75rem)] text-base ring-0">
              <H3>{t('join.time.title')}</H3>
              <p>{t('join.time.text')}</p>
              <Button asChild className="self-start">
                <Link href="/volunteer">{t('join.time.cta')}</Link>
              </Button>
            </Card>
            <Card className="gap-4 rounded-4xl bg-ember-soft p-[clamp(1.75rem,4vw,2.75rem)] text-base ring-0">
              <H3 className="text-ember-deep">{t('join.money.title')}</H3>
              <p>{t('join.money.text')}</p>
              <DonateButton label={t('join.money.cta')} variant="donate-outline" className="self-start" />
            </Card>
          </div>
        </Container>
      </Section>

      <DonateBand />
    </>
  )
}
