'use client'

import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Marquee } from '@/components/animations/Marquee'
import { Reveal } from '@/components/animations/Reveal'
import { pressLogos, pressQuotes } from '@/lib/data/press'

export function Press() {
  return (
    <section className="relative section-py overflow-hidden border-y border-border">
      <Container size="lg" className="relative z-10 mb-16">
        <Reveal>
          <SectionLabel className="justify-center">In the Press</SectionLabel>
        </Reveal>
      </Container>

      {/* Logos marquee */}
      <Marquee speed={35} className="py-8">
        {pressLogos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center gap-2 shrink-0 text-2xl md:text-3xl font-display text-muted/60 hover:text-gold transition-colors duration-300 whitespace-nowrap"
          >
            <span>{logo.name}</span>
            {logo.stars > 0 && (
              <span className="text-gold text-lg">
                {'★'.repeat(logo.stars)}
              </span>
            )}
          </div>
        ))}
      </Marquee>

      {/* Quotes grid */}
      <Container size="lg" className="relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressQuotes.map((q, i) => (
            <Reveal key={q.source} delay={0.1 * i}>
              <blockquote className="flex flex-col h-full">
                <p className="font-accent italic text-lg text-bone/90 leading-snug mb-6 flex-1">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="text-xs uppercase tracking-[0.25em] text-gold">
                  — {q.source}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
