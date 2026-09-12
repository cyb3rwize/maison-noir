'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'
import type { GalleryItem } from '@/lib/data/gallery'

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
        'relative w-full rounded-md overflow-hidden group cursor-pointer bg-bg-tertiary',
        aspectClasses[item.aspect]
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        quality={85}
      />

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold mb-1">
          {item.category}
        </p>
        <p className="font-display text-lg text-white">{item.title}</p>
      </div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold border border-gold/40 rounded-pill px-4 py-2 font-semibold">
          View
        </span>
      </div>
    </motion.button>
  )
}
