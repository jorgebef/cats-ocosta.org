import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { cache } from 'react'
import { routing, type Locale } from '@/i18n/routing'
import { isCategory, type PostCategory } from './categories'

/**
 * Blog en ficheros Markdown: `content/blog/<idioma>/<slug>.md`.
 * El nombre del fichero es el slug de la URL. Usa el mismo nombre en cada idioma
 * para que el selector de idioma enlace las dos versiones de una entrada.
 */
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type Post = {
  slug: string
  locale: Locale
  title: string
  excerpt: string
  category: PostCategory
  publishedAt: string
  cover?: { src: string; alt: string }
}

export type PostWithContent = Post & { html: string }

type Frontmatter = {
  title?: string
  excerpt?: string
  category?: string
  date?: string | Date
  cover?: string
  coverAlt?: string
  draft?: boolean
}

function readPost(locale: Locale, file: string): PostWithContent | null {
  const slug = file.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, locale, file), 'utf8')
  const { data, content } = matter(raw) as unknown as { data: Frontmatter; content: string }

  if (data.draft) return null
  if (!data.title || !data.date) {
    console.warn(`[blog] ${locale}/${file}: faltan "title" o "date" en el frontmatter; se omite.`)
    return null
  }
  if (!isCategory(data.category)) {
    console.warn(`[blog] ${locale}/${file}: categoría "${data.category}" no válida; se usa "news".`)
  }

  return {
    slug,
    locale,
    title: data.title,
    excerpt: data.excerpt ?? '',
    category: isCategory(data.category) ? data.category : 'news',
    publishedAt: new Date(data.date).toISOString(),
    cover: data.cover ? { src: data.cover, alt: data.coverAlt ?? '' } : undefined,
    html: marked.parse(content, { async: false }),
  }
}

/** Todas las entradas publicadas de un idioma, de la más reciente a la más antigua. */
const allPosts = cache((locale: Locale): PostWithContent[] => {
  const dir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPost(locale, f))
    .filter((p): p is PostWithContent => p !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
})

function withoutContent(post: PostWithContent): Post {
  const { html, ...rest } = post
  void html
  return rest
}

export type PostList = { docs: Post[]; totalPages: number; page: number }

export async function getPosts({
  locale,
  limit = 9,
  page = 1,
  category,
}: {
  locale: Locale
  limit?: number
  page?: number
  category?: PostCategory
}): Promise<PostList> {
  const posts = allPosts(locale).filter((p) => !category || p.category === category)
  const totalPages = Math.ceil(posts.length / limit)
  const start = (page - 1) * limit
  return { docs: posts.slice(start, start + limit).map(withoutContent), totalPages, page }
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<PostWithContent | null> {
  return allPosts(locale).find((p) => p.slug === slug) ?? null
}

/** Idiomas en los que existe una entrada (para hreflang y el sitemap). */
export function localesForSlug(slug: string): Locale[] {
  return routing.locales.filter((l) => allPosts(l).some((p) => p.slug === slug))
}

/** Pares idioma/slug para generar todas las entradas en el build. */
export function allPostParams(): { locale: Locale; slug: string }[] {
  return routing.locales.flatMap((locale) => allPosts(locale).map((p) => ({ locale, slug: p.slug })))
}
