'use client'

import { useState, useMemo } from 'react'
import { Wine as WineIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/animations/Reveal'
import { wines, wineTypes } from '@/lib/data/wine'
import { cn } from '@/lib/utils/cn'

export default function WinePage() {
  const [activeType, setActiveType] = useState('all')

  const filtered = useMemo(() => {
    if (activeType === 'all') return wines
    return wines.filter((w) => w.type === activeType)
  }, [activeType])

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-8">
              Wine Program
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
              The <span className="italic text-gradient-gold">cellar</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted font-accent italic">
              Small growers. Old vines. Wines with a sense of place.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {wineTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={cn(
                  'px-5 py-2.5 rounded-pill text-sm transition-colors duration-300',
                  activeType === t.id
                    ? 'bg-gold text-bg-primary'
                    : 'border border-border text-bone/70 hover:border-gold/40'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="space-y-4 max-w-3xl mx-auto">
          {filtered.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.05}>
              <GlassCard hover className="p-6 md:p-8">
                <div className="flex items-start gap-6">
                  <div className="h-12 w-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <WineIcon size={18} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-bone">
                          {w.name}
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {w.producer} · {w.region} · {w.vintage}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {w.glass && (
                          <p className="text-sm text-gold">${w.glass} / glass</p>
                        )}
                        <p className="text-sm text-bone">${w.bottle} / bottle</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-3">
                      {w.notes}
                    </p>
                    <p className="text-xs text-gold/80 italic">
                      Pairs with: {w.pairing}
                    </p>
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
