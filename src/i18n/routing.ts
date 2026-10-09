import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  // Sin cookie de idioma: la web no guarda nada en el navegador del visitante.
  // El idioma se deduce de la URL (/es, /en) y, en la primera visita, de la cabecera Accept-Language.
  localeCookie: false,
  pathnames: {
    '/': '/',
    '/volunteer': { es: '/hazte-voluntario', en: '/volunteer' },
    '/tnr-method': { es: '/metodo-cer', en: '/tnr-method' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': { es: '/contacto', en: '/contact' },
    '/legal-notice': { es: '/aviso-legal', en: '/legal-notice' },
    '/privacy': { es: '/privacidad', en: '/privacy-policy' },
    '/cookies': '/cookies',
  },
})

export type Locale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
