import { MailIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { SITE, whatsappLink } from '@/config/site'
import { Link } from '@/i18n/navigation'
import { SittingCat } from './Cats'
import { Logo } from './Decor'
import { DonateButton } from './DonateButton'
import { WhatsAppIcon } from './Icons'
import { Container } from './layout'

const linkClass = 'inline-flex items-center gap-2 no-underline [overflow-wrap:anywhere] hover:text-cream hover:underline hover:underline-offset-4'

function Column({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <div>
      <h2 id={id} className="mb-4 font-heading font-bold text-cream">{title}</h2>
      <ul className="grid gap-2.5">{children}</ul>
    </div>
  )
}

export async function Footer() {
  const t = await getTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-16 rounded-t-[clamp(28px,4.5vw,56px)] bg-tone-footer pt-18 pb-8 text-[#e7dfcc] [&_:focus-visible]:outline-butter">
      {/* Un gato de la colonia sentado sobre el borde del pie */}
      <svg
        className="absolute top-0 right-[clamp(1.5rem,12vw,10rem)] w-17 -translate-y-[96%] text-tangerine"
        viewBox="-50 -150 140 150"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="currentColor" stroke="currentColor">
          <SittingCat tipped />
        </g>
      </svg>

      <Container className="grid gap-10 md:grid-cols-[1.6fr_1fr_1.2fr_1fr]">
        <div className="grid max-w-96 justify-items-start gap-4">
          <p className="inline-flex items-center gap-3 text-cream">
            <Logo className="size-18 rounded-full bg-white p-1" />
            <span className="font-heading text-[1.3rem] font-extrabold">
              Cats <span className="text-tangerine">Ocosta</span>
            </span>
          </p>
          <p>{t('footer.tagline')}</p>
          <DonateButton variant="light" />
        </div>

        <nav aria-labelledby="footer-nav">
          <Column title={t('footer.navTitle')} id="footer-nav">
            <li><Link href="/tnr-method" className={linkClass}>{t('nav.tnr')}</Link></li>
            <li><Link href="/volunteer" className={linkClass}>{t('nav.volunteer')}</Link></li>
            <li><Link href="/blog" className={linkClass}>{t('nav.blog')}</Link></li>
            <li><Link href="/contact" className={linkClass}>{t('nav.contact')}</Link></li>
          </Column>
        </nav>

        <Column title={t('footer.contactTitle')}>
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <WhatsAppIcon size={18} /> {SITE.whatsapp.display}
              <span className="sr-only"> {t('a11y.newTab')}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              <MailIcon className="size-[18px]" aria-hidden="true" /> {SITE.email}
            </a>
          </li>
        </Column>

        <nav aria-labelledby="footer-legal">
          <Column title={t('footer.legalTitle')} id="footer-legal">
            <li><Link href="/legal-notice" className={linkClass}>{t('footer.legalNotice')}</Link></li>
            <li><Link href="/privacy" className={linkClass}>{t('footer.privacy')}</Link></li>
            <li><Link href="/cookies" className={linkClass}>{t('footer.cookies')}</Link></li>
          </Column>
        </nav>
      </Container>

      <Container>
        <Separator className="mt-14 mb-6 bg-white/15" />
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.9rem] text-[#c2b79f]">
          <p>{t('footer.copyright', { year })}</p>
          <p>{SITE.legalName}</p>
          <p>{t('footer.cif', { cif: SITE.cif })}</p>
          <p>{t('footer.privacyNote')}</p>
        </div>
      </Container>
    </footer>
  )
}
