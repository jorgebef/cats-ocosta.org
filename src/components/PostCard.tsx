import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import type { PostCategory } from '@/lib/categories'
import type { Post } from '@/lib/posts'
import { cn } from '@/lib/utils'
import { LoafCat } from './Cats'

/** Colores de cada categoría: fondo de la ilustración y de la etiqueta. */
export const CATEGORY_STYLES: Record<PostCategory, { media: string; badge: string }> = {
  grants: { media: 'bg-leaf-soft text-forest', badge: 'bg-leaf-soft text-forest' },
  actions: { media: 'bg-sand text-[#6d5a3c]', badge: 'bg-sand text-[#6d5a3c]' },
  campaigns: { media: 'bg-ember-soft text-ember-deep', badge: 'bg-ember-soft text-ember-deep' },
  fundraising: { media: 'bg-[#fbe4ee] text-[#9c3d68]', badge: 'bg-[#fbe4ee] text-[#9c3d68]' },
  news: { media: 'bg-peach text-forest', badge: 'bg-peach text-forest' },
}

export async function CategoryBadge({ category }: { category: PostCategory }) {
  const t = await getTranslations('categories')
  return (
    <Badge variant="secondary" className={cn('h-auto px-3 py-1 text-[0.85rem] font-bold', CATEGORY_STYLES[category].badge)}>
      {t(category)}
    </Badge>
  )
}

export async function PostDate({ date }: { date: string }) {
  const format = await getFormatter()
  return <time dateTime={date}>{format.dateTime(new Date(date), { day: 'numeric', month: 'long', year: 'numeric' })}</time>
}

export async function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <Card className="group relative gap-0 rounded-3xl border-0 bg-white/80 py-0 shadow-soft ring-0 transition-transform hover:-translate-y-1 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ember">
      <div
        className={cn(
          'm-3 mb-0 grid aspect-[4/3] items-end justify-items-center overflow-hidden rounded-t-[240px] rounded-b-2xl',
          CATEGORY_STYLES[post.category].media,
        )}
      >
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover.src} alt={post.cover.alt} loading="lazy" className="size-full object-cover" />
        ) : (
          <svg viewBox="-80 -90 160 100" className="-mb-0.5 w-[55%]" aria-hidden="true" focusable="false">
            <g fill="currentColor" stroke="currentColor">
              <LoafCat />
            </g>
          </svg>
        )}
      </div>
      <CardHeader className="gap-3 px-6 pt-5">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[0.9rem] text-muted-foreground">
          <CategoryBadge category={post.category} />
          <PostDate date={post.publishedAt} />
        </div>
        <CardTitle className="font-heading text-xl font-bold text-balance text-forest">
          <Heading>
            <Link
              href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
              className="no-underline outline-none after:absolute after:inset-0 hover:underline hover:underline-offset-4"
            >
              {post.title}
            </Link>
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-2 pb-6">
        <CardDescription className="text-base text-muted-foreground">{post.excerpt}</CardDescription>
      </CardContent>
    </Card>
  )
}
