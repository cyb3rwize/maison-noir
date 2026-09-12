'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitText } from '@/components/animations/Reveal'
import { ScrollCue } from '@/components/animations/ScrollCue'
import { Hero3D } from '@/components/3d/Hero3D'
import { EASE_OUT } from '@/lib/utils/motion'
import { site } from '@/lib/data/site'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
      {/* Ambient mesh */}
      <div className="ambient-mesh" aria-hidden />

      {/* 3D layer behind content */}
      <Hero3D />

      {/* Top spacer */}
      <div className="h-28 md:h-32 shrink-0" aria-hidden />

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-5xl mx-auto container-px text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          >
            <SectionLabel className="justify-center mb-8">
              {getGreeting()} — Maison Noir
            </SectionLabel>
          </motion.div>

          <h1 className="font-display text-bone leading-[0.92] mb-8">
            <span className="block text-display-lg">
              <SplitText text="A table" />
            </span>
            <span className="block text-display-xl">
              <SplitText
                text="unlike"
                delay={0.05}
                wordClassName="italic text-gradient-gold"
              />{' '}
              <SplitText text="any other" delay={0.1} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.8 }}
            className="text-lg md:text-xl text-muted max-w-xl mx-auto font-accent italic leading-relaxed"
          >
            Seasonal ingredients. Open fire. Silence you can taste.
            A dining room where every detail is intentional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.0 }}
            className="mt-12 flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/reservations">
              <Button size="xl" variant="primary">
                Reserve a Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="xl" variant="outline">
                Explore the Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.2 }}
        className="relative z-10 w-full container-px pb-10 md:pb-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-end">
          <InfoItem label="Tonight" value="5:30 PM — 11:00 PM" />
          <InfoItem
            label="Location"
            value={`${site.address.street}, ${site.address.city}`}
          />
          <InfoItem label="Reservations" value={site.phone} />
          <div className="col-span-2 md:col-span-1 flex justify-end">
            <ScrollCue className="hidden md:block" />
          </div>
        </div>
      </motion.div>

      {/* Mobile scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="md:hidden absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
      >
        <ScrollCue label="Scroll" />
      </motion.div>
    </section>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.25em] text-gold/70">
        {label}
      </span>
      <span className="text-xs md:text-sm text-bone/80">{value}</span>
    </div>
  )
}
