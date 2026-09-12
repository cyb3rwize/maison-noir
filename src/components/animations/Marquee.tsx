'use client'

import { cn } from '@/lib/utils/cn'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden',
        pauseOnHover && 'hover:[&_.marquee-track]:[animation-play-state:paused]',
        className
      )}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-16 animate-[marquee_var(--duration)_linear_infinite]"
        style={
          {
            '--duration': `${speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
