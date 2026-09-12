'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                <div className="relative aspect-[4/5] bg-bg-tertiary overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent">
                    <p className="text-xs uppercase tracking-[0.22em] text-gold font-medium mb-2">
                      {dish.category}
                    </p>
                    <h3 className="font-display text-2xl text-bone">
                      {dish.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-muted leading-relaxed mb-4">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-gold">
                      ${dish.price}
                    </span>
                    <span className="text-xs font-medium text-muted">
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
