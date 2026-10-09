import { ArrowLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server'
import { DonateBand } from '@/components/DonateBand'
import { Container, Lead } from '@/components/layout'
import { CategoryBadge } from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { alternatesFor } from '@/lib/metadata'
import { allPostParams, getPostBySlug, localesForSlug } from '@/lib/posts'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

// Todas las entradas se generan en el build a partir de content/blog/<idioma>/
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  return allPostParams()
    .filter((p) => p.locale === params.locale)
    .map(({ slug }) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(locale, { pathname: '/blog/[slug]', params: { slug } }, localesForSlug(slug)),
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.cover ? [{ url: post.cover.src, alt: post.cover.alt }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()

  const t = await getTranslations('post')
  const tHome = await getTranslations('home.donateBand')
  const format = await getFormatter()

  return (
    <>
      <article>
        <header className="pt-[clamp(2.5rem,5vw,4rem)] pb-8">
          <Container narrow className="grid justify-items-start gap-4.5">
            <Button asChild variant="ghost" size="sm" className="-ml-3 mb-4 text-forest">
              <Link href="/blog">
                <ArrowLeftIcon aria-hidden="true" /> {t('back')}
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[0.9rem] text-muted-foreground">
              <CategoryBadge category={post.category} />
              <time dateTime={post.publishedAt}>
                {t('published', {
                  date: format.dateTime(new Date(post.publishedAt), { day: 'numeric', month: 'long', year: 'numeric' }),
                })}
              </time>
            </div>
            <h1 className="font-heading text-5xl font-bold tracking-[-0.02em] text-balance text-forest squiggle">{post.title}</h1>
            <Lead>{post.excerpt}</Lead>
          </Container>
        </header>

        {post.cover && (
          <Container className="mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover.src} alt={post.cover.alt} className="max-h-[34rem] w-full rounded-4xl object-cover" />
          </Container>
        )}

        <Container narrow>
          <div
            className="prose prose-lg max-w-none pb-[clamp(4rem,3rem+5vw,7.5rem)] prose-headings:font-heading prose-headings:text-forest prose-a:text-forest prose-a:decoration-2 prose-a:underline-offset-4 prose-strong:text-ink prose-blockquote:rounded-r-2xl prose-blockquote:border-l-ember prose-blockquote:bg-peach prose-blockquote:py-2 prose-blockquote:font-heading prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-forest prose-li:marker:text-ember prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </article>

      <DonateBand title={t('helpTitle')} text={`${t('helpText')} ${tHome('text')}`} />
    </>
  )
}
