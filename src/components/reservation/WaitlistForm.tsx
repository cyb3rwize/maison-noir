'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'

interface WaitlistFormProps {
  date: string
  partySize: number
}

export function WaitlistForm({ date, partySize }: WaitlistFormProps) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date,
          partySize,
        }),
      })

      if (!res.ok) throw new Error('Could not join waitlist')

      setDone(true)
      toast({
        type: 'success',
        title: 'Added to waitlist',
        description: "We'll text you if a table opens up.",
      })
    } catch (err) {
      toast({
        type: 'error',
        title: 'Could not join',
        description: err instanceof Error ? err.message : 'Try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto h-14 w-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4">
          <Bell size={20} />
        </div>
        <h3 className="font-display text-2xl text-bone mb-3">
          You&apos;re on the list
        </h3>
        <p className="text-sm text-muted max-w-sm mx-auto">
          We&apos;ll contact you the moment a table opens for that date.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="text-center mb-6">
        <Bell size={24} className="text-gold mx-auto mb-3" />
        <h3 className="font-display text-xl text-bone mb-2">
          Join the waitlist
        </h3>
        <p className="text-xs text-muted">
          No availability on this date? Get notified when a table opens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <Button
        type="submit"
        size="lg"
        variant="outline"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  )
}
