'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays } from 'lucide-react'

import { EASE_OUT } from '@/lib/utils/motion'
import { useScrollDirection } from '@/lib/hooks/useScrollDirection'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const { direction } = useScrollDirection()

  useEffect(() => {
    const onScroll = () => {
      const scrolledPast = window.scrollY > window.innerHeight * 0.6
      // Only show when scrolling up (so it doesn't fight the natural flow)
      setVisible(scrolledPast && direction === 'up')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [direction])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="hidden md:block fixed bottom-24 right-8 z-40"
        >
          <Link
            href="/reservations"
            className="group relative inline-flex items-center gap-2.5 pl-3 pr-5 py-3 rounded-pill bg-gold text-bg-primary font-medium shadow-glow-gold hover:shadow-glow-gold-lg transition-shadow duration-500"
          >
            {/* Pulsing ring */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-pill ring-2 ring-gold/40 animate-pulse-gold pointer-events-none"
            />

            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-bg-primary/10">
              <CalendarDays size={16} strokeWidth={2} />
            </span>
            <span className="text-sm font-medium">Reserve a Table</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
