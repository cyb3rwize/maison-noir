'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'
import { getGradientStyle, type GalleryItem } from '@/lib/data/gallery'

interface GalleryTileProps {
  item: GalleryItem
  index: number
  onClick: () => void
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function GalleryTile({ item, index, onClick }: GalleryTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="View"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: (index % 6) * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative w-full rounded-md overflow-hidden group cursor-pointer',
        aspectClasses[item.aspect]
      )}
      style={getGradientStyle(item.gradient)}
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_SVG }}
      />

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
          {item.category}
        </p>
        <p className="font-display text-lg text-bone">{item.title}</p>
      </div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold border border-gold/40 rounded-pill px-4 py-2">
          View
        </span>
      </div>
    </motion.button>
  )
}
