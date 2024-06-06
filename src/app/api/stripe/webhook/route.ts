import { db } from '@/src/db/drizzle'
import { user } from '@/src/db/schema/schema'
import configuration from '@/src/lib/environment/config'
import { stripe } from '@/src/lib/stripe/stripe'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') as string
  const webhookSecret = configuration.stripeWebhookSecret

  if (!webhookSecret)
    return new NextResponse('Missing Webhook Secret', { status: 500 })

  if (!signature)
    return new NextResponse('Missing Stripe Signature', { status: 400 })

  let event: Stripe.Event | null = null

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const subscriptionId = session.subscription
      if (session.metadata) {
        const userId = session.metadata.userId
        await db
          .update(user)
          .set({
            membership: subscriptionId?.toString(),
            membershipTime: new Date(),
          })
          .where(eq(user.idUser, Number(userId)))
      }
    }
    return NextResponse.json('OK', { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Invalid Stripe Signature', { status: 400 })
  }
}
