'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'
import { getTimeSlots, formatTime } from '@/lib/data/reservation'

interface TimeSlotsProps {
  date: string
  partySize: number
  value: string
  onChange: (time: string) => void
}

export function TimeSlots({ date, partySize, value, onChange }: TimeSlotsProps) {
  const slots = getTimeSlots(date, partySize)

  if (!date) {
    return (
      <p className="text-sm text-muted italic">
        Pick a date first to see available times.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {slots.map((slot, i) => {
        const active = slot.time === value
        return (
          <motion.button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => slot.available && onChange(slot.time)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.03 }}
            className={cn(
              'h-11 rounded-md text-sm transition-colors duration-300',
              !slot.available && 'opacity-30 line-through cursor-not-allowed',
              active
                ? 'bg-gold text-bg-primary'
                : slot.available
                  ? 'border border-border text-bone/80 hover:border-gold/40 hover:text-bone'
                  : 'border border-border text-muted'
            )}
          >
            {formatTime(slot.time)}
          </motion.button>
        )
      })}
    </div>
  )
}
