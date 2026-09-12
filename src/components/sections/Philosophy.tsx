'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal, SplitText } from '@/components/animations/Reveal'
import { EASE_OUT } from '@/lib/utils/motion'

export function Philosophy() {
  return (
    <section className="relative section-py overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        <Reveal>
          <SectionLabel className="justify-center mb-12">
            Our Philosophy
          </SectionLabel>
        </Reveal>

        <h2 className="font-display text-display-lg text-bone text-center leading-[1.05] mb-10">
          <SplitText text="We cook with" />{' '}
          <SplitText
            text="intention"
            wordClassName="italic text-gradient-gold"
          />
          <br />
          <SplitText text="We serve with" delay={0.15} />{' '}
          <SplitText
            text="devotion"
            delay={0.2}
            wordClassName="italic text-gradient-gold"
          />
        </h2>

        <Reveal delay={0.4}>
          <p className="max-w-2xl mx-auto text-center text-lg text-muted font-accent italic leading-relaxed">
            Every plate begins with a question: what does this ingredient want
            to become? We listen, we wait, we work. Nothing enters the dining
            room that hasn\'t earned its place.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20">
          {[
            {
              title: 'Sourced',
              body: 'Ingredients from farms we visit, fisheries we trust, foragers we know by name.',
            },
            {
              title: 'Fired',
              body: 'Cooked over Japanese binchotan and open flame. No shortcuts, no sous-vide tricks.',
            },
            {
              title: 'Served',
              body: 'In a room designed for stillness. No music above a whisper. No rush.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div className="text-center">
                <span className="block font-display text-5xl text-gold/30 mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl text-bone mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-muted leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
