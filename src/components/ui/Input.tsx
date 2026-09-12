'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-[0.15em] text-muted mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 rounded-md bg-bg-secondary/60 border border-border',
            'text-bone placeholder:text-muted/60',
            'transition-colors duration-300',
            'focus:outline-none focus:border-gold/60 focus:bg-bg-secondary',
            error && 'border-ember',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-xs text-ember">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
