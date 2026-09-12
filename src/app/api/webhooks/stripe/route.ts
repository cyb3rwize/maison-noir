import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/server'
import { createServiceClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

/**
 * Generate a unique gift card code, e.g., "MN-4F7K9X2A"
 */
function generateGiftCardCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'MN-'
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  // If webhook secret isn't set, accept unverified events (dev only)
  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET not set — skipping verification (dev only)')
  }

  let event: Stripe.Event
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata || {}

    if (metadata.type === 'gift_card') {
      const supabase = createServiceClient()
      const code = generateGiftCardCode()

      const { error } = await supabase.from('gift_cards').insert({
        code,
        amount_cents: Math.round(parseFloat(metadata.amount || '0') * 100),
        recipient_name: metadata.recipient_name,
        recipient_email: metadata.recipient_email,
        sender_name: metadata.sender_name,
        message: metadata.message || null,
        stripe_session_id: session.id,
        status: 'active',
      })

      if (error) {
        console.error('Gift card insert failed:', error)
      } else {
        console.log('✅ Gift card created:', code, 'for', metadata.recipient_email)
      }
    }
  }

  return NextResponse.json({ received: true })
}
