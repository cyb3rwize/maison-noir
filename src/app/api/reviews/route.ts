import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const schema = z.object({
  author: z.string().min(1).max(100),
  email: z.string().email(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServiceClient()

    const { error } = await supabase.from('guest_reviews').insert({
      author: data.author,
      email: data.email,
      rating: data.rating,
      body: data.body,
      status: 'pending',
    })

    if (error) {
      console.error('Review insert error:', error)
      return NextResponse.json(
        { error: 'Could not save review' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Review API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
