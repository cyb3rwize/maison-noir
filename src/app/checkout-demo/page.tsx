"use client"

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, CreditCard } from 'lucide-react'

function CheckoutContent() {
  const router = useRouter()
  const params = useSearchParams()

  const amount = parseInt(params.get('amount') || '0')
  const recipient = params.get('recipient') || ''
  const email = params.get('email') || ''
  const sender = params.get('sender') || ''
  const message = params.get('message') || ''

  const [submitting, setSubmitting] = useState(false)
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!amount) router.push('/gift-cards')
  }, [amount, router])

  const formatCard = (value: string) =>
    value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').slice(0, 4)
    return v.length >= 3 ? v.slice(0, 2) + '/' + v.slice(2) : v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500))

    // Redirect to success page
    const query = new URLSearchParams({
      amount: amount.toString(),
      recipient,
      email,
      sender,
      message,
    }).toString()

    router.push('/checkout-demo/success?' + query)
  }

  return (
    <div className="min-h-[100svh] bg-[#f7f8fa] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-[#635bff] flex items-center justify-center">
              <CreditCard size={14} className="text-white" />
            </div>
            <span className="font-semibold text-[#1a1a1a] text-sm">Stripe Test Mode</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#635bff]/10 text-[#635bff] font-semibold">
              DEMO
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
            <Lock size={11} />
            <span>Secure checkout</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Order summary */}
            <div className="p-8 bg-[#f7f8fa] border-b md:border-b-0 md:border-r border-[#e5e7eb]">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-6 font-semibold">
                Order Summary
              </p>

              <div className="mb-6">
                <p className="text-3xl font-semibold text-[#1a1a1a]">
                  ${amount.toFixed(2)}
                </p>
                <p className="text-sm text-[#6b7280] mt-1">USD</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Gift Card</span>
                  <span className="text-[#1a1a1a] font-medium">${amount.toFixed(2)}</span>
                </div>
                {recipient && (
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Recipient</span>
                    <span className="text-[#1a1a1a]">{recipient}</span>
                  </div>
                )}
                {email && (
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Email</span>
                    <span className="text-[#1a1a1a] text-xs break-all">{email}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  Maison Noir Gift Card — redeemable for dining. Valid for 12 months from purchase.
                </p>
              </div>
            </div>

            {/* Right: Payment form */}
            <form onSubmit={handleSubmit} className="p-8">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-6 font-semibold">
                Payment Details
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-[#1a1a1a] mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    required
                    className="w-full h-11 px-3 rounded border border-[#e5e7eb] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]/20"
                  />
                  <p className="text-[10px] text-[#6b7280] mt-1.5">
                    Use 4242 4242 4242 4242 for demo
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      required
                      className="w-full h-11 px-3 rounded border border-[#e5e7eb] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1a1a1a] mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      required
                      className="w-full h-11 px-3 rounded border border-[#e5e7eb] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1a1a1a] mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full h-11 px-3 rounded border border-[#e5e7eb] bg-white text-[#1a1a1a] text-sm focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded bg-[#635bff] text-white font-medium text-sm hover:bg-[#5851e0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing payment...' : 'Pay $' + amount.toFixed(2)}
                </button>

                <p className="text-[10px] text-[#6b7280] text-center leading-relaxed">
                  Demo checkout — no real payment is processed.
                  <br />
                  Powered by CyberForge
                </p>
              </div>
            </form>
          </div>
        </div>

        <p className="text-xs text-[#6b7280] text-center mt-6">
          Cancel and return to <button type="button" onClick={() => router.push('/gift-cards')} className="text-[#635bff] hover:underline">Maison Noir</button>
        </p>
      </div>
    </div>
  )
}

export default function CheckoutDemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
