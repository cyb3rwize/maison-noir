'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from '@/components/reservation/StepIndicator'
import { DatePicker } from '@/components/reservation/DatePicker'
import { PartySize } from '@/components/reservation/PartySize'
import { TimeSlots } from '@/components/reservation/TimeSlots'
import { SeatingSelect } from '@/components/reservation/SeatingSelect'
import { GuestForm } from '@/components/reservation/GuestForm'
import { ReviewStep } from '@/components/reservation/ReviewStep'
import { EASE_OUT } from '@/lib/utils/motion'
import type { ReservationFormData } from '@/lib/data/reservation'

const INITIAL: ReservationFormData = {
  date: '',
  time: '',
  partySize: 2,
  seating: 'main',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  occasion: 'None',
  notes: '',
}

export default function ReservationsPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ReservationFormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  const patch = (p: Partial<ReservationFormData>) =>
    setData((d) => ({ ...d, ...p }))

  const canProceed = () => {
    if (step === 0) return data.date && data.time && data.partySize > 0
    if (step === 1)
      return (
        data.firstName &&
        data.lastName &&
        data.email &&
        data.phone &&
        data.seating
      )
    return true
  }

  const next = () => setStep((s) => Math.min(s + 1, 2))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = () => {
    console.log('Booking submitted:', data)
    setSubmitted(true)
  }

  if (submitted) {
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
              ✓
            </div>
            <h1 className="font-display text-display-lg text-bone mb-6">
              Table <span className="italic text-gradient-gold">confirmed</span>
            </h1>
            <p className="text-lg text-muted font-accent italic max-w-md mx-auto mb-12">
              We've sent a confirmation to {data.email}. We look forward to
              hosting you.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setSubmitted(false)
                setStep(0)
                setData(INITIAL)
              }}
            >
              Make Another Reservation
            </Button>
          </motion.div>
        </Container>
      </section>
    )
  }

  return (
    <section className="relative min-h-[100svh] pt-40 pb-32 overflow-hidden">
      <div className="ambient-mesh" aria-hidden />

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel className="justify-center mb-8">
            Reservations
          </SectionLabel>
          <h1 className="font-display text-display-lg text-bone mb-6">
            Book your <span className="italic text-gradient-gold">evening</span>
          </h1>
        </div>

        {/* Step indicator */}
        <div className="mb-16">
          <StepIndicator current={step} />
        </div>

        {/* Step content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              {step === 0 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="font-display text-2xl text-bone mb-6">
                      When would you like to join us?
                    </h2>
                    <DatePicker
                      value={data.date}
                      onChange={(date) => patch({ date, time: '' })}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
                      Party size
                    </h3>
                    <PartySize
                      value={data.partySize}
                      onChange={(partySize) => patch({ partySize })}
                    />
                  </div>

                  {data.date && (
                    <div>
                      <h3 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
                        Available times
                      </h3>
                      <TimeSlots
                        date={data.date}
                        partySize={data.partySize}
                        value={data.time}
                        onChange={(time) => patch({ time })}
                      />
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="font-display text-2xl text-bone mb-6">
                      Where would you like to sit?
                    </h2>
                    <SeatingSelect
                      value={data.seating}
                      onChange={(seating) =>
                        patch({ seating: seating as ReservationFormData['seating'] })
                      }
                    />
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
                      Your details
                    </h3>
                    <GuestForm data={data} onChange={patch} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <h2 className="font-display text-2xl text-bone mb-6">
                    Review your reservation
                  </h2>
                  <ReviewStep data={data} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <Button
              size="lg"
              variant="ghost"
              onClick={prev}
              disabled={step === 0}
              className={step === 0 ? 'opacity-0 pointer-events-none' : ''}
            >
              <ArrowLeft size={16} /> Back
            </Button>

            {step < 2 ? (
              <Button
                size="lg"
                variant="primary"
                onClick={next}
                disabled={!canProceed()}
              >
                Continue <ArrowRight size={16} />
              </Button>
            ) : (
              <Button size="lg" variant="primary" onClick={submit}>
                Confirm Reservation
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
