import { availableRecipes } from '@/src/data/plans'
import { db } from '@/src/db/drizzle'
import { getSubscription } from '@/src/db/functions/subscription'
import { featureUsage } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { getDateNDaysAgo } from '@/src/lib/dateOps/dateOps'
import { and, eq, gte, like } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', { status: 401 })
  }

  try {
    const subscription = await getSubscription(session.user?.id)
    let startDate: Date = getDateNDaysAgo(30)
    if (subscription) {
      startDate = new Date(subscription.start * 1000)
    }

    const res = await db
      .selectDistinct({
        date: featureUsage.date,
      })
      .from(featureUsage)
      .where(
        and(
          eq(featureUsage.idUser, session.user?.id),
          gte(featureUsage.date, new Date(startDate)),
          like(featureUsage.name, 'recipes%'),
        ),
      )

    const count = res.length

    const available =
      subscription && subscription.plan
        ? availableRecipes[subscription.plan]
        : 5
    const remaining = available - count

    return NextResponse.json({ remaining, available }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error retrieving remaining', {
      status: 400,
    })
  }
}
