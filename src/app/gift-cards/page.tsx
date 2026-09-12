'use client'

import { useState } from 'react'
import { Gift, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/animations/Reveal'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils/cn'

const amounts = [50, 100, 150, 250, 500]

export default function GiftCardsPage() {
  const { toast } = useToast()
  const [amount, setAmount] = useState(150)
  const [custom, setCustom] = useState('')
  const [recipient, setRecipient] = useState('')
  const [email, setEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const finalAmount = custom ? parseInt(custom) || 0 : amount

  const [submitting, setSubmitting] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    if (finalAmount < 25) {
      toast({
        type: 'error',
        title: 'Minimum gift card is $25',
      })
      return
    }

    setSubmitting(true)

    // Redirect to mock Stripe-style checkout
    const query = new URLSearchParams({
      amount: finalAmount.toString(),
      recipient,
      email,
      sender: senderName,
      message,
    }).toString()

    window.location.href = '/checkout-demo?' + query
  }

  if (submitted) {
    return (
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="ambient-mesh" aria-hidden />
        <Container size="md" className="relative z-10 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-8 text-gold text-3xl">
            <Check size={28} />
          </div>
          <h1 className="font-display text-display-md text-bone mb-4">
            Gift card on its way
          </h1>
          <p className="text-muted italic font-accent mb-8">
            A ${finalAmount} gift card for {recipient} will arrive at {email} shortly.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false)
              setRecipient('')
              setEmail('')
              setSenderName('')
              setMessage('')
              setCustom('')
            }}
          >
            Send Another
          </Button>
        </Container>
      </section>
    )
  }

  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Reveal>
            <SectionLabel className="justify-center mb-8">
              Gift Cards
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-lg text-bone leading-tight mb-6">
              Give an <span className="italic text-gradient-gold">evening</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-muted font-accent italic">
              The rare gift that never goes out of style.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Card preview */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="sticky top-32">
                <GlassCard className="p-8 aspect-[3/2] flex flex-col justify-between bg-gradient-to-br from-bg-tertiary to-bg-primary">
                  <div>
                    <Gift size={28} className="text-gold mb-6" />
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                      Gift Card
                    </p>
                    <p className="font-display text-2xl text-bone">
                      Maison Noir
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl text-gradient-gold">
                      ${finalAmount || 0}
                    </p>
                    {recipient && (
                      <p className="text-xs font-medium text-muted mt-2">For {recipient}</p>
                    )}
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.15}>
              <form onSubmit={submit} className="space-y-8">
                {/* Amount */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                    Amount
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {amounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setAmount(a)
                          setCustom('')
                        }}
                        className={cn(
                          'h-12 rounded-md text-sm transition-colors duration-300',
                          amount === a && !custom
                            ? 'bg-gold text-bg-primary'
                            : 'border border-border text-bone hover:border-gold/40'
                        )}
                      >
                        ${a}
                      </button>
                    ))}
                  </div>
                  <Input
                    label="Or enter custom amount"
                    type="number"
                    min="25"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="e.g. 200"
                  />
                </div>

                {/* Recipient */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                    Recipient
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Recipient name"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Their name"
                      required
                    />
                    <Input
                      label="Recipient email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="them@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Sender */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
                    Your details
                  </h3>
                  <Input
                    label="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="How they\'ll know it\'s from you"
                    required
                  />
                  <div className="mt-4">
                    <label
                      htmlFor="gift-message"
                      className="block text-xs uppercase tracking-[0.15em] text-muted mb-2"
                    >
                      Message (optional)
                    </label>
                    <textarea
                      id="gift-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="A short note to accompany the card..."
                      className="w-full px-4 py-3 rounded-md bg-bg-secondary/60 border border-border text-bone placeholder:text-muted resize-none focus:outline-none focus:border-gold/60"
                    />
                  </div>
                </div>

                <Button type="submit" size="xl" variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? "Redirecting to payment..." : "Continue to Payment"}
                </Button>

                <p className="text-xs font-medium text-muted text-center">
                  Card valid for 12 months from purchase. Non-refundable.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
