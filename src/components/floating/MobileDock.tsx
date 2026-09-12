'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { UtensilsCrossed, CalendarDays, BookOpen, User } from 'lucide-react'

import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'

const items = [
  { label: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { label: 'Reserve', href: '/reservations', icon: CalendarDays },
  { label: 'Journal', href: '/experience', icon: BookOpen },
  { label: 'Account', href: '/account', icon: User },
] as const

export function MobileDock() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
      aria-label="Quick navigation"
      className={cn(
        'md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40',
        'pointer-events-auto'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-2 rounded-pill',
          'bg-bg-primary/80 backdrop-blur-2xl',
          'border border-gold/15',
          'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]'
        )}
      >
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'px-3 py-1.5 rounded-pill',
                'min-w-[64px]',
                'transition-colors duration-300',
                active ? 'text-gold' : 'text-bone/70'
              )}
            >
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-pill bg-gold/10 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={18} strokeWidth={1.8} />
              <span className="text-[10px] mt-0.5 uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
