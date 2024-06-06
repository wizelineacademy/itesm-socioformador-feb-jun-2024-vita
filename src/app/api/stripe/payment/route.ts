import { authOptions } from '@/src/lib/auth/authOptions'
import config from '@/src/lib/environment/config'
import { stripe } from '@/src/lib/stripe/stripe'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.json()
  const session = await getServerSession(authOptions)
  const { priceId, allowTrial } = body

  const stripeConfig: Stripe.Checkout.SessionCreateParams = {
    success_url: config.nextAuthUrl + '/home',
    cancel_url: config.nextAuthUrl,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: session?.user.email,
    allow_promotion_codes: true,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session?.user.id,
    },
    subscription_data: {
      trial_settings: {
        end_behavior: {
          missing_payment_method: 'cancel',
        },
      },
    },
    payment_method_collection: 'if_required',
  }

  if (stripeConfig.subscription_data && allowTrial) {
    stripeConfig.subscription_data.trial_period_days = 7
  }

  const res = await stripe.checkout.sessions.create(stripeConfig)

  return NextResponse.json({ url: res.url }, { status: 200 })
}
