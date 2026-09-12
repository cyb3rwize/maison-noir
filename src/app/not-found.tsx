'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Utensils } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EASE_OUT } from '@/lib/utils/motion'

export default function NotFound() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="md" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <SectionLabel className="justify-center mb-8">
            Error 404
          </SectionLabel>

          <h1 className="font-display text-[8rem] md:text-[12rem] leading-none text-gradient-gold italic mb-6">
            404
          </h1>

          <h2 className="font-display text-3xl md:text-4xl text-bone mb-6">
            This table doesn&apos;t exist
          </h2>

          <p className="text-lg text-muted font-accent italic max-w-md mx-auto mb-12">
            The page you&apos;re looking for has been cleared, moved, or never
            existed. Let&apos;s get you back to the dining room.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/">
              <Button size="lg" variant="primary">
                <Home size={16} /> Back Home
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline">
                <Utensils size={16} /> View Menu
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
