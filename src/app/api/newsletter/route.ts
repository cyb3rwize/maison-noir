import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { createServiceClient } from '@/lib/supabase/server'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: parsed.data.email })

    // 23505 = unique violation (email already subscribed) — treat as success
    if (error && error.code !== '23505') {
      console.error('Newsletter insert error:', error)
      return NextResponse.json(
        { error: 'Could not subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
