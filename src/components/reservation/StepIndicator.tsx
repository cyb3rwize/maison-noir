'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'

const STEPS = ['When', 'Where', 'Confirm'] as const

interface StepIndicatorProps {
  current: number
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {STEPS.map((label, i) => {
        const active = i === current
        const done = i < current
        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: done || active ? '#C9A961' : 'rgba(201,169,97,0.15)',
                  color: done || active ? '#0A0A0A' : '#8A857C',
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium"
              >
                {done ? '✓' : i + 1}
              </motion.div>
              <span
                className={cn(
                  'text-[10px] uppercase tracking-[0.25em] transition-colors duration-300',
                  active ? 'text-gold' : done ? 'text-bone/70' : 'text-muted'
                )}
              >
                {label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="relative w-12 md:w-24 h-px bg-border mb-6 overflow-hidden">
                <motion.div
                  animate={{ x: done ? '0%' : '-100%' }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="absolute inset-0 bg-gold"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
