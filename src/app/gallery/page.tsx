'use client'

import { useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { GalleryTile } from '@/components/gallery/GalleryTile'
import { Lightbox } from '@/components/gallery/Lightbox'
import { galleryCategories, galleryItems } from '@/lib/data/gallery'
import { cn } from '@/lib/utils/cn'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return galleryItems
    return galleryItems.filter((i) => i.category === activeCategory)
  }, [activeCategory])

  const openLightbox = (id: string) => {
    const idx = filtered.findIndex((i) => i.id === id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const closeLightbox = () => setLightboxIndex(null)
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    )
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-8">Gallery</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
              Moments from <span className="italic text-gradient-gold">the room</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted font-accent italic">
              Food, faces, and the space between.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  'px-5 py-2.5 rounded-pill text-sm transition-colors duration-300',
                  activeCategory === c.id
                    ? 'bg-gold text-bg-primary'
                    : 'border border-border text-bone hover:border-gold/40'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="break-inside-avoid">
              <GalleryTile
                item={item}
                index={i}
                onClick={() => openLightbox(item.id)}
              />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted italic font-accent">
              Nothing here yet — try another category.
            </p>
          </div>
        )}
      </Container>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
