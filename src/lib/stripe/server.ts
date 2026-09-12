import Stripe from 'stripe'

/**
 * Server-side Stripe client.
 * NEVER import this into client components.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

/**
 * Create a Stripe Checkout session for a gift card purchase.
 */
export async function createGiftCardCheckout(params: {
  amount: number          // in dollars
  recipientName: string
  recipientEmail: string
  senderName: string
  message?: string
  origin: string          // e.g., http://localhost:3000
}) {
  const amountCents = Math.round(params.amount * 100)
  const sessionId = Math.random().toString(36).slice(2, 10).toUpperCase()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Maison Noir Gift Card — $\${params.amount}`,
            description: `A gift card for ${params.recipientName}. Redeemable for dining at Maison Noir.`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    customer_email: params.recipientEmail,
    success_url: `\${params.origin}/gift-cards/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `\${params.origin}/gift-cards/cancel`,
    metadata: {
      type: 'gift_card',
      recipient_name: params.recipientName,
      recipient_email: params.recipientEmail,
      sender_name: params.senderName,
      message: params.message || '',
      amount: params.amount.toString(),
      code_preview: sessionId,
    },
  })

  return session
}
