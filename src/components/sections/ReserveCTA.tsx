'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function ReserveCTA() {
  return (
    <section className="relative section-py overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="md" className="relative z-10 text-center">
        <Reveal>
          <SectionLabel className="justify-center mb-8">
            Reserve
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-display-lg text-bone leading-[1.02] mb-8">
            Your table is
            <br />
            <span className="italic text-gradient-gold">waiting</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="max-w-lg mx-auto text-lg text-muted font-accent italic mb-12">
            We seat a limited number of guests each evening. Reservations open
            30 days in advance.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Link href="/reservations">
            <Button size="xl" variant="primary">
              Reserve a Table
            </Button>
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
