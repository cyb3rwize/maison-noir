'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { signatureDishes } from '@/lib/data/menu'

export function SignatureDishes() {
  return (
    <section className="relative section-py bg-bg-secondary/30">
      <Container size="xl" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <SectionLabel className="mb-4">Signatures</SectionLabel>
            <h2 className="font-display text-display-md text-bone leading-tight max-w-lg">
              Three dishes that define us
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Link href="/menu">
              <Button variant="outline" size="lg">
                See Full Menu
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.id} delay={0.1 * i}>
              <GlassCard hover className="overflow-hidden p-0 h-full">
                <div className="relative aspect-[4/5] bg-gradient-to-br from-bg-tertiary to-bg-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl text-gold/10 italic">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-bg-primary/90 to-transparent">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
                      {dish.category}
                    </p>
                    <h3 className="font-display text-2xl text-bone">
                      {dish.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-gold">
                      ${dish.price}
                    </span>
                    <span className="text-xs text-muted italic font-accent">
                      {dish.winePairing}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
