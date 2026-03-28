import Stripe from 'stripe'
import type { Handler } from '@netlify/functions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const PRICE_PRO = process.env.STRIPE_PRICE_PRO!

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { userId } = JSON.parse(event.body || '{}')

    if (!userId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing userId' }) }
    }

    const origin = event.headers.origin || event.headers.referer?.replace(/\/$/, '') || 'https://orgbrief.com'
    const successUrl = `${origin}/app/dashboard?upgraded=true`
    const cancelUrl = `${origin}/app/dashboard`

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: PRICE_PRO,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      subscription_data: {
        trial_period_days: 7,
      },
      metadata: { userId },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Checkout error:', message)
    return { statusCode: 500, body: JSON.stringify({ error: message }) }
  }
}

export { handler }
