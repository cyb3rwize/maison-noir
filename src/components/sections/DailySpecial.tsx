'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { dailySpecial } from '@/lib/data/daily-special'

export function DailySpecial() {
  if (!dailySpecial.active) return null

  return (
    <section className="relative section-py overflow-hidden">
      <Container size="md" className="relative z-10">
        <Reveal>
          <SectionLabel className="justify-center mb-8">
            Chef&apos;s Daily Special
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-gold text-[10px] uppercase tracking-[0.25em]">
              <Sparkles size={12} />
              <span>Tonight only</span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl text-bone mb-4">
              {dailySpecial.name}
            </h3>

            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto mb-8">
              {dailySpecial.description}
            </p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
                  Price
                </p>
                <p className="font-display text-3xl text-gradient-gold">
                  ${dailySpecial.price}
                </p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">
                  Availability
                </p>
                <p className="text-sm text-bone">
                  {dailySpecial.availableUntil}
                </p>
              </div>
            </div>

            <Link href="/reservations">
              <Button size="lg" variant="primary">
                Reserve to Try It
              </Button>
            </Link>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  )
}
