'use client'

import { Input } from '@/components/ui/Input'
import { occasionOptions } from '@/lib/data/reservation'
import { cn } from '@/lib/utils/cn'
import type { ReservationFormData } from '@/lib/data/reservation'

interface GuestFormProps {
  data: ReservationFormData
  onChange: (patch: Partial<ReservationFormData>) => void
}

export function GuestForm({ data, onChange }: GuestFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          placeholder="Jane"
        />
        <Input
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          placeholder="Doe"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="jane@example.com"
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-3">
          Occasion (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {occasionOptions.map((occ) => {
            const active = (data.occasion || 'None') === occ
            return (
              <button
                key={occ}
                type="button"
                onClick={() => onChange({ occasion: occ })}
                className={cn(
                  'px-4 py-2 rounded-pill text-xs transition-colors duration-300',
                  active
                    ? 'bg-gold text-bg-primary'
                    : 'border border-border text-bone/70 hover:border-gold/40'
                )}
              >
                {occ}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-xs uppercase tracking-[0.15em] text-muted mb-2"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={3}
          placeholder="Allergies, seating preferences, anything we should know..."
          className="w-full px-4 py-3 rounded-md bg-bg-secondary/60 border border-border text-bone placeholder:text-muted/60 focus:outline-none focus:border-gold/60 resize-none"
        />
      </div>
    </div>
  )
}
