'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_OUT } from '@/lib/utils/motion'

interface ScrollCueProps {
  label?: string
  className?: string
}

export function ScrollCue({ label = 'Scroll to explore', className }: ScrollCueProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: EASE_OUT }}
      className={className}
    >
      <div className="flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </div>
    </motion.div>
  )
}

