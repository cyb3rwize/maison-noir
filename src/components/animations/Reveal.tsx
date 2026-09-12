'use client'

import { motion, type Variants } from 'framer-motion'
import { EASE_OUT } from '@/lib/utils/motion'
import { cn } from '@/lib/utils/cn'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Word-by-word reveal for headings */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: i * 0.06 },
  }),
}

interface SplitTextProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
}: SplitTextProps) {
  const words = text.split(' ')
  return (
    <span className={cn('inline-flex flex-wrap', className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em]"
        >
          <motion.span
            className={cn('inline-block', wordClassName)}
            custom={i + delay * 10}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={wordVariants}
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
