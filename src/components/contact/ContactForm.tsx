'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { departmentOptions } from '@/lib/data/contact'
import { cn } from '@/lib/utils/cn'

export function ContactForm() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'reservations',
    message: '',
  })

  const patch = (p: Partial<typeof form>) => setForm((f) => ({ ...f, ...p }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(data.error || 'Could not send message')

      setDone(true)
      toast({
        type: 'success',
        title: 'Message sent',
        description: "We'll get back to you within 24 hours.",
      })
    } catch (err) {
      toast({
        type: 'error',
        title: 'Could not send',
        description: err instanceof Error ? err.message : 'Try again shortly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="glass rounded-lg p-10 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 text-2xl text-gold">
          ✓
        </div>
        <h3 className="font-display text-2xl text-bone mb-3">
          Thank you
        </h3>
        <p className="text-sm font-medium text-muted mb-8 max-w-sm mx-auto">
          Your message has reached the right person. Expect a reply within
          24 hours.
        </p>
        <Button
          variant="outline"
          size="md"
          onClick={() => {
            setDone(false)
            setForm({
              name: '',
              email: '',
              phone: '',
              department: 'reservations',
              message: '',
            })
          }}
        >
          Send Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Jane Doe"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => patch({ email: e.target.value })}
          placeholder="jane@example.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => patch({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />

        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-muted mb-2">
            Department
          </label>
          <div className="relative">
            <select
              value={form.department}
              onChange={(e) => patch({ department: e.target.value })}
              className="w-full h-12 px-4 rounded-md bg-bg-secondary/60 border border-border text-bone appearance-none focus:outline-none focus:border-gold/60"
            >
              {departmentOptions.map((d) => (
                <option key={d.id} value={d.id} className="bg-bg-secondary">
                  {d.label}
                </option>
              ))}
            </select>
            <ArrowRight
              size={14}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.15em] text-muted mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(e) => patch({ message: e.target.value })}
          rows={6}
          required
          placeholder="How can we help?"
          className={cn(
            'w-full px-4 py-3 rounded-md bg-bg-secondary/60 border border-border',
            'text-bone placeholder:text-muted resize-none',
            'focus:outline-none focus:border-gold/60'
          )}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={submitting}
        className="w-full md:w-auto"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
