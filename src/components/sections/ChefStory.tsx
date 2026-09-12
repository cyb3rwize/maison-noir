'use client'

import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { chef } from '@/lib/data/chef'

export function ChefStory() {
  return (
    <section className="relative section-py overflow-hidden">
      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[14rem] leading-none text-gold/10 italic select-none">
                  &ldquo;
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-accent italic text-lg text-bone/90 leading-snug">
                  {chef.quote}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold">
                  {chef.name}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel className="mb-6">The Chef</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-display-md text-bone leading-tight mb-6">
                {chef.name}
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-8">
                {chef.title}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base text-muted leading-relaxed mb-8 whitespace-pre-line">
                {chef.bio}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col gap-3 pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                  Recognition
                </p>
                {chef.awards.map((award) => (
                  <p key={award} className="text-sm text-bone/80">
                    {award}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
