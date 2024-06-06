import { NextResponse } from 'next/server'
import { db } from '@/src/db/drizzle'
import { user } from '@/src/db/schema/schema'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { stripe } from '@/src/lib/stripe/stripe'
import { plans } from '@/src/data/plans'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 404 })
  }

  try {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.idUser, session.user?.id))
      .limit(1)

    //find stripe subscription
    const subscriptionId = existingUser[0].membership
    if (!subscriptionId) {
      return NextResponse.json({ message: 'No subscription' }, { status: 200 })
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (
      subscription.status !== 'active' &&
      subscription.status !== 'trialing'
    ) {
      return NextResponse.json({ message: 'No subscription' }, { status: 200 })
    }

    const subscriptionData = subscription.items.data[0].price.id
    const planType = plans.find((plan) => plan.priceId === subscriptionData)

    return NextResponse.json(
      {
        plan: planType?.name,
        status: subscription.status,
        end: subscription.trial_end,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error processing registration', { status: 400 })
  }
}
