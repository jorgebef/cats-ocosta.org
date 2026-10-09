/** Categorías del blog. El valor va en el campo `category` del frontmatter de cada entrada. */
export const POST_CATEGORIES = ['grants', 'actions', 'campaigns', 'fundraising', 'news'] as const
export type PostCategory = (typeof POST_CATEGORIES)[number]

export function isCategory(value: unknown): value is PostCategory {
  return typeof value === 'string' && (POST_CATEGORIES as readonly string[]).includes(value)
}
