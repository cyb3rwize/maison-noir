"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Mail, Home } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { EASE_OUT } from '@/lib/utils/motion'

export default function GiftCardSuccessPage() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="md" className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <div className="mx-auto h-20 w-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-8 text-gold text-3xl">
            <Check size={28} />
          </div>

          <SectionLabel className="justify-center mb-6">
            Payment Successful
          </SectionLabel>

          <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
            Thank <span className="italic text-gradient-gold">you</span>
          </h1>

          <p className="text-lg text-muted font-accent italic max-w-md mx-auto mb-8 leading-relaxed">
            Your gift card has been created and emailed to the recipient.
            They&apos;ll be able to redeem it at any time.
          </p>

          <div className="glass rounded-lg p-6 max-w-md mx-auto mb-12 text-left">
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-1">
                  What&apos;s Next
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  A confirmation email with the gift card code has been sent.
                  The recipient can use it when booking any future reservation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" variant="primary">
                <Home size={16} className="mr-2" /> Back Home
              </Button>
            </Link>
            <Link href="/gift-cards">
              <Button size="lg" variant="outline">
                Send Another
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
