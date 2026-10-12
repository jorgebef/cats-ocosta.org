import type { routing } from './routing'

// Tipa los idiomas en toda la API de next-intl (p. ej. getLocale() devuelve 'es' | 'en')
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
  }
}
