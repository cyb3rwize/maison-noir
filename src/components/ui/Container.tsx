import { cn } from '@/lib/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full container-px', sizes[size], className)}>
      {children}
    </div>
  )
}
