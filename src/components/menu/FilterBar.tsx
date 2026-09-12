'use client'

import { cn } from '@/lib/utils/cn'
import { menuCategories } from '@/lib/data/menu'

interface FilterBarProps {
  active: string
  onChange: (id: string) => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const items = [{ id: 'all', label: 'All' }, ...menuCategories]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={cn(
            'relative px-5 py-2.5 rounded-pill text-sm transition-colors duration-300',
            active === c.id
              ? 'text-bg-primary bg-gold'
              : 'text-bone/70 hover:text-bone border border-border hover:border-gold/40'
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
