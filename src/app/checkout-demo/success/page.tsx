"use client"

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Copy, Home, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { EASE_OUT } from '@/lib/utils/motion'
import { useToast } from '@/components/ui/Toast'

function SuccessContent() {
  const params = useSearchParams()
  const { toast } = useToast()

  const amount = params.get('amount') || '0'
  const recipient = params.get('recipient') || 'the recipient'
  const email = params.get('email') || ''

  const [code, setCode] = useState('')

  useEffect(() => {
    // Generate a gift card code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let c = 'MN-'
    for (let i = 0; i < 8; i++) {
      c += chars[Math.floor(Math.random() * chars.length)]
    }
    setCode(c)
  }, [])

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      type: 'success',
      title: 'Code copied',
      description: 'Share it with the recipient.',
    })
  }

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
            Your ${amount} gift card for {recipient} is ready to share.
          </p>

          {/* Gift card code */}
          <div className="glass rounded-lg p-6 max-w-md mx-auto mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">
              Gift Card Code
            </p>
            <div className="flex items-center justify-between gap-3 bg-bg-secondary rounded-md p-4">
              <code className="text-xl font-mono text-gold tracking-widest">
                {code}
              </code>
              <button
                type="button"
                onClick={copyCode}
                aria-label="Copy code"
                className="h-9 w-9 rounded-md bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors shrink-0"
              >
                <Copy size={14} />
              </button>
            </div>
            {email && (
              <p className="text-xs text-muted mt-3 flex items-center gap-1.5 justify-center">
                <Mail size={11} />
                Also sent to {email}
              </p>
            )}
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

          <p className="text-xs text-muted italic mt-12">
            Demo mode — no real payment was processed.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
