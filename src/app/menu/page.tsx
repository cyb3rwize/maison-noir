'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/animations/Reveal'
import { DishCard } from '@/components/menu/DishCard'
import { DishModal } from '@/components/menu/DishModal'
import { FilterBar } from '@/components/menu/FilterBar'
import { allDishes, type Dish } from '@/lib/data/menu'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return allDishes
    return allDishes.filter((d) => d.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 md:pt-48 pb-16 overflow-hidden">
        <div className="ambient-mesh" aria-hidden />

        <Container size="lg" className="relative z-10 text-center">
          <Reveal>
            <SectionLabel className="justify-center mb-8">
              The Menu
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-display-xl text-bone leading-[0.95] mb-6">
              A season,
              <br />
              <span className="italic text-gradient-gold">plated</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-xl mx-auto text-lg text-muted font-accent italic leading-relaxed mb-12">
              Our menu changes with the harvest. These are the dishes we\'re
              cooking tonight.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Filter bar */}
      <section className="relative pb-8">
        <Container size="lg">
          <Reveal>
            <FilterBar active={activeCategory} onChange={setActiveCategory} />
          </Reveal>
        </Container>
      </section>

      {/* Dishes grid */}
      <section className="relative pb-32">
        <Container size="xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {filtered.map((dish, i) => (
              <DishCard
                key={dish.id}
                dish={dish}
                index={i}
                onClick={() => setSelectedDish(dish)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted italic font-accent">
                Nothing matches. Try a different category?
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </>
  )
}
