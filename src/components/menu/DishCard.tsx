'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import type { Dish } from '@/lib/data/menu'
import { EASE_OUT } from '@/lib/utils/motion'

interface DishCardProps {
  dish: Dish
  onClick: () => void
  index?: number
}

export function DishCard({ dish, onClick, index = 0 }: DishCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="View"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="text-left w-full group"
    >
      <GlassCard hover className="overflow-hidden p-0 h-full">
        <div className="relative aspect-[4/5] bg-gradient-to-br from-bg-tertiary to-bg-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl text-gold/10 italic select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary/90 to-transparent" />
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-gold bg-bg-primary/60 backdrop-blur px-3 py-1 rounded-pill">
            {dish.category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl text-bone group-hover:text-gold transition-colors duration-300 mb-3">
            {dish.name}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {dish.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-display text-xl text-gold">${dish.price}</span>
            {dish.winePairing && (
              <span className="text-[10px] text-muted italic font-accent text-right max-w-[120px]">
                {dish.winePairing}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.button>
  )
}
