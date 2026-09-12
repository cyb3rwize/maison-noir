"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { EASE_OUT } from '@/lib/utils/motion'

export default function GiftCardCancelPage() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="md" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-ember/10 border border-ember/30 flex items-center justify-center mb-8 text-ember text-3xl">
            <X size={28} />
          </div>

          <SectionLabel className="justify-center mb-6">
            Payment Cancelled
          </SectionLabel>

          <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
            No <span className="italic text-gradient-gold">charge</span>
          </h1>

          <p className="text-lg text-muted font-accent italic max-w-md mx-auto mb-12 leading-relaxed">
            You cancelled before completing payment. Nothing was charged.
            You can try again whenever you&apos;re ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/gift-cards">
              <Button size="lg" variant="primary">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Back Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
