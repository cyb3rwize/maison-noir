'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Wine, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EASE_OUT } from '@/lib/utils/motion'
import type { Dish } from '@/lib/data/menu'

interface DishModalProps {
  dish: Dish | null
  onClose: () => void
}

export function DishModal({ dish, onClose }: DishModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (dish) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [dish, onClose])

  return (
    <AnimatePresence>
      {dish && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg glass-strong flex flex-col md:flex-row">
              {/* Image side */}
              <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-gradient-to-br from-bg-tertiary to-bg-secondary shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[10rem] text-gold/10 italic select-none">
                    {dish.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                  {dish.category}
                </span>
                <h2 className="font-display text-display-sm text-bone mb-4">
                  {dish.name}
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  {dish.description}
                </p>

                {dish.ingredients.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                      Ingredients
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ing) => (
                        <li
                          key={ing}
                          className="text-xs px-3 py-1 rounded-pill border border-border text-bone/80"
                        >
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {dish.allergens.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3 flex items-center gap-1.5">
                      <AlertCircle size={10} /> Allergens
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {dish.allergens.map((a) => (
                        <li
                          key={a}
                          className="text-xs px-3 py-1 rounded-pill border border-ember/30 text-ember/90"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {dish.winePairing && (
                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3 flex items-center gap-1.5">
                      <Wine size={10} /> Wine Pairing
                    </p>
                    <p className="text-sm text-bone/80 italic font-accent">
                      {dish.winePairing}
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-border">
                  <span className="font-display text-3xl text-gold">
                    ${dish.price}
                  </span>
                  <Button size="md" variant="primary">
                    Add to Order
                  </Button>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors duration-300"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
