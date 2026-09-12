import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createGiftCardCheckout } from '@/lib/stripe/server'

const schema = z.object({
  amount: z.number().int().min(25).max(5000),
  recipientName: z.string().min(1).max(100),
  recipientEmail: z.string().email(),
  senderName: z.string().min(1).max(100),
  message: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Stripe check
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local to enable payments.',
        },
        { status: 503 }
      )
    }

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

    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'

    const session = await createGiftCardCheckout({
      ...parsed.data,
      origin,
    })

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Could not create checkout session',
      },
      { status: 500 }
    )
  }
}
