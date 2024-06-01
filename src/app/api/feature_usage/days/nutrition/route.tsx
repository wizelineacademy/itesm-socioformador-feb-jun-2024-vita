import { db } from '@/src/db/drizzle'
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
    //get the number of routines generated in the last 30 days
    const res = await db
      .selectDistinct({
        date: featureUsage.date,
      })
      .from(featureUsage)
      .where(
        and(
          eq(featureUsage.idUser, session.user?.id),
          gte(featureUsage.date, new Date(getDateNDaysAgo(30))),
          like(featureUsage.name, 'recipes%'),
        ),
      )

    return NextResponse.json({ amount: res.length }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error getting records', { status: 400 })
  }
}
