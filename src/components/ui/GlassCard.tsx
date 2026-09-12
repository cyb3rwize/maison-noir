'use client'

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  intensity?: 'light' | 'strong'
  hover?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = 'light', hover = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          intensity === 'strong' ? 'glass-strong' : 'glass',
          'rounded-lg',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
GlassCard.displayName = 'GlassCard'
