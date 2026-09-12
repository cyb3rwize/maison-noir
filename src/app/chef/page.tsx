import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { chef } from '@/lib/data/chef'

export const metadata = {
  title: 'Chef',
  description: 'Meet Chef Aurelien Dubois.',
}

export default function ChefPage() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden glass lg:sticky lg:top-32">
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
              <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
                {chef.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-12">
                {chef.title}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <p className="text-base text-bone/80 leading-relaxed whitespace-pre-line">
                  {chef.bio}
                </p>
                <p className="text-base text-muted leading-relaxed">
                  His cooking resists the theatrical. Where other kitchens chase
                  novelty, Chef Dubois pursues clarity - a single ingredient,
                  treated with respect, allowed to speak for itself. The
                  technique is French, the sensibility Japanese, the result
                  unmistakably his own.
                </p>
                <p className="text-base text-muted leading-relaxed">
                  Tonight, as every night, he will be in the kitchen. Not
                  behind a pass, not in an office - at the fire, with his team.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                  Recognition
                </p>
                <ul className="space-y-2">
                  {chef.awards.map((award) => (
                    <li key={award} className="text-sm text-bone/80">
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/reservations">
                  <Button size="lg" variant="primary">
                    Dine With Us
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" variant="outline">
                    See the Menu
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
