import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Container, Muted, Section, textLink } from '@/components/layout'
import { PageIntro } from '@/components/PageIntro'
import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { isCategory, POST_CATEGORIES } from '@/lib/categories'
import { alternatesFor } from '@/lib/metadata'
import { getPosts } from '@/lib/posts'

const PER_PAGE = 9

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor(locale, '/blog'),
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams
  const category = isCategory(sp.category) ? sp.category : undefined
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

  const t = await getTranslations('blog')
  const tCat = await getTranslations('categories')
  const { docs, totalPages } = await getPosts({ locale, category, page, limit: PER_PAGE })

  const pageHref = (p: number) => ({
    pathname: '/blog' as const,
    query: { ...(category ? { category } : {}), ...(p > 1 ? { page: String(p) } : {}) },
  })

  const chipClass =
    'border-line bg-white/60 text-ink hover:border-forest hover:bg-white aria-[current=page]:border-forest aria-[current=page]:bg-forest aria-[current=page]:text-cream'

  return (
    <>
      <PageIntro title={t('title')} lead={t('lead')} />

      <Section size="tight">
        <Container>
          <nav className="mb-10" aria-label={t('filter')}>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Button asChild variant="outline" size="sm" className={chipClass}>
                  <Link href="/blog" aria-current={!category ? 'page' : undefined}>
                    {tCat('all')}
                  </Link>
                </Button>
              </li>
              {POST_CATEGORIES.map((c) => (
                <li key={c}>
                  <Button asChild variant="outline" size="sm" className={chipClass}>
                    <Link href={{ pathname: '/blog', query: { category: c } }} aria-current={category === c ? 'page' : undefined}>
                      {tCat(c)}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {docs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((post) => (
                <PostCard key={post.slug} post={post} headingLevel={2} />
              ))}
            </div>
          ) : (
            <div className="grid justify-items-start gap-4 rounded-3xl border-2 border-dashed p-8">
              <Muted>{category ? t('empty') : t('emptyAll')}</Muted>
              {category && <Link href="/blog" className={textLink}>{t('seeAll')}</Link>}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-between gap-4" aria-label={t('page', { page, total: totalPages })}>
              {page > 1 ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={pageHref(page - 1)}>{t('prev')}</Link>
                </Button>
              ) : <span />}
              <p className="text-muted-foreground">{t('page', { page, total: totalPages })}</p>
              {page < totalPages ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={pageHref(page + 1)}>{t('next')}</Link>
                </Button>
              ) : <span />}
            </nav>
          )}
        </Container>
      </Section>
    </>
  )
}
