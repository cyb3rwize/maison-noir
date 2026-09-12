import { cn } from '@/lib/utils/cn'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="h-px w-8 bg-gold/50" />
      <span className="text-xs uppercase tracking-[0.3em] text-gold">
        {children}
      </span>
    </div>
  )
}
