'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-gold text-bg-primary hover:bg-gold-light shadow-glow-gold hover:shadow-glow-gold-lg',
        outline:
          'border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold',
        ghost: 'text-bone/80 hover:text-bone hover:bg-white/5',
        ember:
          'bg-ember text-bone hover:bg-ember/90 shadow-[0_0_30px_rgba(232,93,47,0.35)]',
      },
      size: {
        sm: 'h-9 px-4 text-xs uppercase tracking-[0.15em]',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-base uppercase tracking-[0.15em]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
