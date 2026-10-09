import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'
import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname, type Locale } from '@/i18n/routing'
import { getPosts, localesForSlug } from '@/lib/posts'

type StaticPath = Exclude<AppPathname, '/blog/[slug]'>
const PAGES: StaticPath[] = ['/', '/tnr-method', '/volunteer', '/blog', '/contact', '/legal-notice', '/privacy', '/cookies']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  type Href = Parameters<typeof getPathname>[0]['href']
  const entry = (href: Href, locales: readonly Locale[] = routing.locales, lastModified?: string) => ({
    url: SITE.url + getPathname({ locale: locales[0], href }),
    lastModified,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, SITE.url + getPathname({ locale: l, href })])),
    },
  })

  // Una entrada por slug, aunque exista en varios idiomas
  const posts = new Map<string, string>()
  for (const locale of routing.locales) {
    const { docs } = await getPosts({ locale, limit: 10_000 })
    for (const post of docs) if (!posts.has(post.slug)) posts.set(post.slug, post.publishedAt)
  }

  return [
    ...PAGES.map((p) => entry(p)),
    ...[...posts].map(([slug, date]) =>
      entry({ pathname: '/blog/[slug]', params: { slug } }, localesForSlug(slug), date),
    ),
  ]
}
