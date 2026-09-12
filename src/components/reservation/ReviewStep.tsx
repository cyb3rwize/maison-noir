'use client'

import { formatDate, formatTime, seatingOptions } from '@/lib/data/reservation'
import { GlassCard } from '@/components/ui/GlassCard'
import type { ReservationFormData } from '@/lib/data/reservation'

interface ReviewStepProps {
  data: ReservationFormData
}

export function ReviewStep({ data }: ReviewStepProps) {
  const seatingLabel =
    seatingOptions.find((s) => s.id === data.seating)?.label || data.seating

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
              When
            </p>
            <p className="font-display text-2xl text-bone">
              {formatDate(data.date)}
            </p>
            <p className="text-sm text-muted mt-1">
              {formatTime(data.time)} · {data.partySize}{' '}
              {data.partySize === 1 ? 'guest' : 'guests'}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
              Where
            </p>
            <p className="font-display text-2xl text-bone">{seatingLabel}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
              Guest
            </p>
            <p className="text-bone">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-sm text-muted mt-1">{data.email}</p>
            <p className="text-sm text-muted">{data.phone}</p>
          </div>
        </div>

        <div className="space-y-6">
          {data.occasion && data.occasion !== 'None' && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
                Occasion
              </p>
              <p className="text-bone">{data.occasion}</p>
            </div>
          )}

          {data.notes && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
                Notes
              </p>
              <p className="text-sm text-bone/80 whitespace-pre-line">
                {data.notes}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted italic">
              A $25 per-person deposit will be authorized to hold your
              reservation. Fully refundable up to 24 hours before.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
