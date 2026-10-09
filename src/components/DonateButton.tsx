import { HeartIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { SITE } from '@/config/site'
import { ExternalLink } from './ExternalLink'

type Props = {
  label?: string
  variant?: 'donate' | 'donate-outline' | 'light'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export async function DonateButton({ label, variant = 'donate', size, className }: Props) {
  const t = await getTranslations()
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <ExternalLink href={SITE.teamingUrl} newTabLabel={t('a11y.newTab')}>
        <HeartIcon className="fill-current" />
        {label ?? t('donate.button')}
      </ExternalLink>
    </Button>
  )
}
