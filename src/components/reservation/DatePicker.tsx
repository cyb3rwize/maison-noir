'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { EASE_OUT } from '@/lib/utils/motion'
import { getUpcomingDates } from '@/lib/data/reservation'

interface DatePickerProps {
  value: string
  onChange: (iso: string) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const dates = getUpcomingDates()

  return (
    <div className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x">
        {dates.map((d, i) => {
          const active = d.iso === value
          return (
            <motion.button
              key={d.iso}
              type="button"
              onClick={() => onChange(d.iso)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.02 }}
              className={cn(
                'shrink-0 snap-start flex flex-col items-center justify-center w-20 h-24 rounded-md border transition-colors duration-300',
                active
                  ? 'bg-gold text-bg-primary border-gold'
                  : 'bg-bg-secondary/60 border-border text-bone hover:border-gold/40'
              )}
            >
              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest',
                  active ? 'text-bg-primary/70' : 'text-muted'
                )}
              >
                {d.day}
              </span>
              <span className="font-display text-2xl mt-1">{d.date}</span>
              <span
                className={cn(
                  'text-[10px] uppercase tracking-widest mt-1',
                  active ? 'text-bg-primary/70' : 'text-muted'
                )}
              >
                {d.month}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
