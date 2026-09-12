'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/utils/motion'
import { getGradientStyle, type GalleryItem } from '@/lib/data/gallery'

interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-4"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 h-12 w-12 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors z-10"
        >
          <X size={18} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors z-10"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors z-10"
        >
          <ChevronRight size={22} />
        </button>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[85vh] aspect-[4/3] rounded-lg overflow-hidden"
          style={getGradientStyle(item.gradient)}
        >
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: NOISE_SVG }}
          />

          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
              {item.category}
            </p>
            <p className="font-display text-3xl text-bone">{item.title}</p>
            <p className="text-xs text-muted mt-2">
              {index + 1} / {items.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
