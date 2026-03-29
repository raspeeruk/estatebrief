import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_ID_PRO!,
  agency: process.env.STRIPE_PRICE_ID_AGENCY!,
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { plan = 'pro' } = await req.json()
  const origin = req.headers.get('origin') || 'https://estatebrief.com'

  const priceId = PRICE_IDS[plan]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  // Get authenticated user for metadata
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: `${origin}/app/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/app/settings/billing`,
    metadata: {
      userId: user?.id ?? '',
      plan,
    },
    ...(user?.email ? { customer_email: user.email } : {}),
  })

  return NextResponse.json({ url: session.url })
}
