import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { site } from '@/lib/data/site'

interface LogoProps {
  className?: string
  onClick?: () => void
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={cn(
        'font-display text-lg tracking-tight text-bone hover:text-gold transition-colors duration-300',
        className
      )}
    >
      Maison <span className="text-gradient-gold italic">Noir</span>
    </Link>
  )
}
