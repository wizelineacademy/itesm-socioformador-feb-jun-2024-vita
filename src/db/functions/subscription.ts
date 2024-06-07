import { eq } from 'drizzle-orm'
import { db } from '../drizzle'
import { user } from '../schema/schema'
import { stripe } from '@/src/lib/stripe/stripe'
import { plans } from '@/src/data/plans'

export const getSubscription = async (idUser: number) => {
  try {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.idUser, idUser))
      .limit(1)

    //find stripe subscription
    const subscriptionId = existingUser[0].membership
    if (!subscriptionId) {
      return null
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (
      subscription.status !== 'active' &&
      subscription.status !== 'trialing'
    ) {
      return null
    }

    const subscriptionData = subscription.items.data[0].price.id
    const planType = plans.find((plan) => plan.priceId === subscriptionData)
    return {
      plan: planType?.name,
      status: subscription.status,
      end: subscription.trial_end,
      start: subscription.start_date,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
