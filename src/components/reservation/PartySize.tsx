'use client'

import { cn } from '@/lib/utils/cn'

interface PartySizeProps {
  value: number
  onChange: (size: number) => void
}

export function PartySize({ value, onChange }: PartySizeProps) {
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {sizes.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'h-12 w-12 rounded-full text-sm font-medium transition-colors duration-300',
              value === n
                ? 'bg-gold text-bg-primary'
                : 'border border-border text-bone hover:border-gold/40 hover:text-bone'
            )}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(9)}
          className={cn(
            'h-12 px-5 rounded-full text-xs font-medium transition-colors duration-300',
            value >= 9
              ? 'bg-gold text-bg-primary'
              : 'border border-border text-bone hover:border-gold/40 hover:text-bone'
          )}
        >
          9+ (call us)
        </button>
      </div>
    </div>
  )
}
