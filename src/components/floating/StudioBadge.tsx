"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { studio } from '@/lib/data/studio'
import { EASE_OUT } from '@/lib/utils/motion'

interface StudioBadgeProps {
  /**
   * Position: default bottom-right, above other floating elements
   * Set to false to hide entirely (for client sites that don't want it)
   */
  enabled?: boolean
}

export function StudioBadge({ enabled = studio.showFloatingBadge }: StudioBadgeProps) {
  if (!enabled) return null

  return (
    <motion.a
      href={studio.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={"Website by " + studio.name}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.0, duration: 0.5, ease: EASE_OUT }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-30 hidden md:flex items-center gap-2 pl-1 pr-3 py-1 rounded-pill glass border border-gold/20 hover:border-gold/40 shadow-float-md transition-colors duration-300 group"
    >
      <span className="relative h-7 w-7 rounded-md overflow-hidden bg-bg-primary flex items-center justify-center shrink-0">
        <Image
          src="/cyberforge-logo.svg"
          alt={studio.name}
          width={28}
          height={28}
          className="w-7 h-7"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
          Built by
        </span>
        <span className="text-xs font-semibold text-bone group-hover:text-gold transition-colors">
          {studio.name}
        </span>
      </span>
    </motion.a>
  )
}
