import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { timelineEvents } from '@/lib/data/timeline'

export const metadata = {
  title: 'Experience',
  description: 'The story of Maison Noir.',
}

export default function ExperiencePage() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-8">
              The Experience
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-8">
              A story told in
              <br />
              <span className="italic text-gradient-gold">seven courses</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted font-accent italic max-w-2xl mx-auto leading-relaxed">
              Maison Noir began as a conversation between a chef and a fire.
              Everything since has been an attempt to keep that conversation
              alive.
            </p>
          </Reveal>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div
            aria-hidden
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border"
          />

          <div className="space-y-16">
            {timelineEvents.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.05}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div
                    aria-hidden
                    className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gold ring-4 ring-bg-primary"
                  />

                  <div
                    className={
                      i % 2 === 0
                        ? 'md:text-right md:pr-16 pl-12 md:pl-0'
                        : 'md:order-2 md:pl-16 pl-12'
                    }
                  >
                    <p className="font-display text-3xl md:text-4xl text-gradient-gold mb-3">
                      {event.year}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-bone mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {event.body}
                    </p>
                  </div>

                  <div
                    className={
                      i % 2 === 0 ? 'md:order-2' : 'md:order-1 hidden md:block'
                    }
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-32 max-w-2xl mx-auto">
            <p className="font-accent italic text-2xl md:text-3xl text-bone/90 leading-snug">
              &ldquo;The room changes nothing about the food. But the food changes
              everything about the room.&rdquo;
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold">
              — Chef Aurelien Dubois
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
