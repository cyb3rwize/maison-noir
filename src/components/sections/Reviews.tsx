'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { EASE_OUT } from '@/lib/utils/motion'
import { reviews } from '@/lib/data/reviews'
import { cn } from '@/lib/utils/cn'

export function Reviews() {
  const [index, setIndex] = useState(0)

  const prev = () =>
    setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  const review = reviews[index]

  return (
    <section className="relative section-py overflow-hidden border-y border-border">
      <Container size="lg" className="relative z-10">
        <Reveal>
          <SectionLabel className="justify-center mb-6">
            What Guests Say
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-display-md text-bone text-center leading-tight mb-16">
            In their <span className="italic text-gradient-gold">words</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="h-10 w-10 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    i < review.rating
                      ? 'fill-gold text-gold'
                      : 'text-muted'
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="h-10 w-10 rounded-full glass flex items-center justify-center text-bone hover:text-gold transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="font-accent italic text-2xl md:text-3xl text-bone leading-snug mb-8">
                &ldquo;{review.body}&rdquo;
              </p>
              <div className="space-y-1">
                <p className="text-sm text-bone font-medium">{review.author}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {review.source} · {review.date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={'Go to review ' + (i + 1)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-gold' : 'w-1.5 bg-muted/40'
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
