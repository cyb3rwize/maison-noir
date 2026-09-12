'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { navLinks, ctaLink } from '@/lib/data/nav'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'
import { EASE_OUT } from '@/lib/utils/motion'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const pathname = usePathname()
  const { direction, scrolled } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Hide navbar when scrolling down (but not at top)
  const hidden = mounted && direction === 'down' && scrolled && !mobileOpen

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed top-4 md:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <motion.nav
          animate={{
            width: scrolled ? 'min(720px, 100%)' : 'min(1200px, 100%)',
          }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className={cn(
            'pointer-events-auto',
            'flex items-center justify-between',
            'rounded-pill',
            'px-4 md:px-6 py-2.5 md:py-3',
            'bg-bg-primary/70 backdrop-blur-xl',
            'border border-gold/15',
            'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]'
          )}
        >
          {/* Logo */}
          <Logo className="pl-1" />

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-sm rounded-pill',
                      'transition-colors duration-300',
                      active ? 'text-gold' : 'text-bone hover:text-bone'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-pill bg-gold/10 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link href={ctaLink.href} className="hidden md:block">
              <Button size="sm" variant="primary">
                {ctaLink.label}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'md:hidden relative h-10 w-10 rounded-full',
                'flex items-center justify-center',
                'border border-gold/20 text-bone',
                'hover:bg-gold/10 transition-colors duration-300'
              )}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

/* ---------- Mobile menu overlay ---------- */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="fixed inset-0 z-30 md:hidden bg-bg-primary/95 backdrop-blur-2xl"
    >
      <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: open ? 1 : 0,
              y: open ? 0 : 20,
            }}
            transition={{
              duration: 0.5,
              ease: EASE_OUT,
              delay: open ? i * 0.06 : 0,
            }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-display text-4xl md:text-5xl text-bone hover:text-gold transition-colors duration-300 py-3 block"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : 20,
          }}
          transition={{
            duration: 0.5,
            ease: EASE_OUT,
            delay: open ? navLinks.length * 0.06 : 0,
          }}
          className="mt-8"
        >
          <Link href={ctaLink.href} onClick={onClose}>
            <Button size="xl" variant="primary">
              {ctaLink.label}
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
