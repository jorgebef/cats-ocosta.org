import { getTranslations } from 'next-intl/server'
import { SITE } from '@/config/site'
import { Container, H3, Section } from './layout'
import { DataList } from './DataList'
import { IMG } from './Media'
import { PageIntro } from './PageIntro'

type LegalSection = { h: string; p: string[] }
type Kind = 'notice' | 'privacy' | 'cookies'

const PHOTOS = {
  notice: 'loneCat',
  privacy: 'gingerCat',
  cookies: 'twoCatsEating',
} as const satisfies Record<Kind, keyof typeof IMG>

/** Sustituye los marcadores {name}, {cif}, {email} por los datos de la asociación. */
function fill(text: string) {
  return text.replaceAll('{name}', SITE.legalName).replaceAll('{cif}', SITE.cif).replaceAll('{email}', SITE.email)
}

export async function LegalPage({ kind }: { kind: Kind }) {
  const t = await getTranslations('legal')
  const tI = await getTranslations('images')
  const sections = t.raw(`${kind}.sections`) as LegalSection[]
  const photo = PHOTOS[kind]

  return (
    <>
      <PageIntro
        title={t(`${kind}.title`)}
        lead={t('updated')}
        tone="sand"
        image={{ src: IMG[photo], alt: tI(photo) }}
      />
      <Section size="tight">
        <Container narrow className="grid gap-10 [&_p]:max-w-[68ch]">
          {kind === 'notice' && (
            <section aria-labelledby="identity" className="grid gap-3.5">
              <H3 as="h2" id="identity">{t('identityTitle')}</H3>
              <DataList
                items={[
                  [t('identity.name'), SITE.legalName],
                  [t('identity.cif'), SITE.cif],
                  [t('identity.email'), <a key="e" href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>],
                  [t('identity.whatsapp'), SITE.whatsapp.display],
                  ...(SITE.registryNumber ? [[t('identity.registry'), SITE.registryNumber] as [string, string]] : []),
                  [t('identity.area'), SITE.area],
                ]}
              />
            </section>
          )}
          {sections.map((s) => (
            <section key={s.h} className="grid gap-3.5">
              <H3 as="h2">{s.h}</H3>
              {s.p.map((p) => (
                <p key={p}>{fill(p)}</p>
              ))}
            </section>
          ))}
        </Container>
      </Section>
    </>
  )
}
