'use client'

import Link from 'next/link'
import { Calendar, Clock, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { events, formatEventDate } from '@/lib/data/events'

export function Events() {
  return (
    <section className="relative section-py overflow-hidden border-t border-border">
      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-6">
              Upcoming Evenings
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-display-md text-bone leading-tight mb-4">
              One-off <span className="italic text-gradient-gold">nights</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted font-accent italic">
              Special dinners, tastings, and collaborations.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08}>
              <GlassCard hover className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                      {formatEventDate(event.date)}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-bone">
                      {event.title}
                    </h3>
                  </div>
                  <p className="font-display text-2xl text-gold shrink-0">
                    ${event.price}
                  </p>
                </div>

                <p className="text-sm font-medium text-muted leading-relaxed mb-6 flex-1">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted mb-6 pt-4 border-t border-border font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-gold" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="text-gold" /> {event.seats} seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gold" /> Reserve ahead
                  </span>
                </div>

                <Link href="/reservations">
                  <Button variant="outline" size="md" className="w-full">
                    Reserve
                  </Button>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
