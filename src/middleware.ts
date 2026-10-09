import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Excluye la API (/api), los recursos de Next y los ficheros estáticos
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
