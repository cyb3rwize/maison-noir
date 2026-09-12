'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'

export function Newsletter() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Subscription failed')
      }

      setStatus('done')
      toast({
        type: 'success',
        title: 'Welcome to the table',
        description: 'You\'ll hear from us soon.',
      })
    } catch (err) {
      setStatus('idle')
      toast({
        type: 'error',
        title: 'Subscription failed',
        description: err instanceof Error ? err.message : 'Try again',
      })
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
        Newsletter
      </p>
      <p className="text-sm font-medium text-muted mb-4 max-w-xs">
        Seasonal menus, chef notes, and first access to reservations.
      </p>

      {status === 'done' ? (
        <div className="flex items-center gap-2 text-sm text-gold">
          <Check size={16} />
          <span>You&apos;re subscribed</span>
        </div>
      ) : (
        <form onSubmit={submit} className="flex items-center gap-2 max-w-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 h-11 px-4 rounded-md bg-bg-secondary/60 border border-border text-sm text-bone placeholder:text-muted focus:outline-none focus:border-gold/60"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            aria-label="Subscribe"
            className="h-11 w-11 rounded-md bg-gold text-bg-primary flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      )}
    </div>
  )
}
