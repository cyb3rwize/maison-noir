import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { createServiceClient } from '@/lib/supabase/server'
import { resend, FROM_EMAIL } from '@/lib/email/resend'

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional().or(z.literal('')),
  department: z.enum(['reservations', 'events', 'press', 'careers', 'other']),
  message: z.string().min(1).max(5000),
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

    // 1. Save to DB
    const { data: inserted, error } = await supabase
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        department: data.department,
        message: data.message,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Contact insert error:', error)
      return NextResponse.json(
        { error: 'Could not save message' },
        { status: 500 }
      )
    }

    // 2. Send email notification (best effort — don't fail if it errors)
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: `Maison Noir <${FROM_EMAIL}>`,
          to: 'hello@maisonnoir.com',
          replyTo: data.email,
          subject: `New contact form — ${data.department}`,
          html: `
            <h2>New contact message</h2>
            <p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Department:</strong> ${data.department}</p>
            <hr/>
            <p>${data.message.replace(/\n/g, '<br/>')}</p>
          `,
        })
      }
    } catch (emailErr) {
      console.error('Email send failed (non-fatal):', emailErr)
    }

    return NextResponse.json({ id: inserted.id, success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
