'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { EASE_OUT } from '@/lib/utils/motion'
import { faqItems } from '@/lib/data/faq'
import { cn } from '@/lib/utils/cn'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative section-py overflow-hidden">
      <Container size="md" className="relative z-10">
        <Reveal>
          <SectionLabel className="justify-center mb-6">
            Questions
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-display-md text-bone text-center leading-tight mb-16">
            Before you <span className="italic text-gradient-gold">arrive</span>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div
                  className={cn(
                    'rounded-md border transition-colors duration-300 overflow-hidden',
                    isOpen ? 'border-gold/40 bg-gold/5' : 'border-border'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  >
                    <span
                      className={cn(
                        'font-display text-lg md:text-xl transition-colors duration-300',
                        isOpen ? 'text-gold' : 'text-bone'
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 h-8 w-8 rounded-full border flex items-center justify-center transition-colors duration-300',
                        isOpen
                          ? 'border-gold text-gold'
                          : 'border-border text-muted'
                      )}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-muted leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
