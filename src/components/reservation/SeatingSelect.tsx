'use client'

import { cn } from '@/lib/utils/cn'
import { seatingOptions } from '@/lib/data/reservation'

interface SeatingSelectProps {
  value: string
  onChange: (id: string) => void
}

export function SeatingSelect({ value, onChange }: SeatingSelectProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {seatingOptions.map((opt) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              'text-left p-4 rounded-md border transition-colors duration-300',
              active
                ? 'border-gold bg-gold/10'
                : 'border-border hover:border-gold/40'
            )}
          >
            <p
              className={cn(
                'font-display text-lg mb-1',
                active ? 'text-gold' : 'text-bone'
              )}
            >
              {opt.label}
            </p>
            <p className="text-xs font-medium text-muted">{opt.description}</p>
          </button>
        )
      })}
    </div>
  )
}
