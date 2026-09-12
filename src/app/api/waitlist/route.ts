import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  partySize: z.number().int().min(1).max(12),
  notes: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServiceClient()

    const { error } = await supabase.from('waitlist').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      party_size: data.partySize,
      notes: data.notes || null,
      status: 'waiting',
    })

    if (error) {
      console.error('Waitlist insert error:', error)
      return NextResponse.json(
        { error: 'Could not join waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
