import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { reportId } = await req.json()
  const origin = req.headers.get('origin') || 'https://estatebrief.com'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    mode: 'payment',
    success_url: `${origin}/app/success?session_id={CHECKOUT_SESSION_ID}&report_id=${reportId}`,
    cancel_url: `${origin}/app/report/${reportId}`,
    metadata: { reportId },
  })

  return NextResponse.json({ url: session.url })
}
