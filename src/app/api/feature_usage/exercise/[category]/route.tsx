import { db } from '@/src/db/drizzle'
import { featureUsage } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { getDateNDaysAgo } from '@/src/lib/dateOps/dateOps'
import { and, count, eq, gte } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { category: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    //get the counts of each type from the last 30 days
    const res = await db
      .select({
        type: featureUsage.detail,
        count: count(featureUsage.name),
      })
      .from(featureUsage)
      .where(
        and(
          eq(featureUsage.idUser, session.user?.id),
          eq(featureUsage.name, `routine_${params.category}`),
          gte(featureUsage.date, getDateNDaysAgo(30)),
        ),
      )
      .groupBy(featureUsage.detail)

    //sort elements and get only the top 5
    const sortedData = res.sort((a, b) => b.count - a.count)
    const topData = sortedData.slice(0, 5)

    //if there are still elements add the count of all the not included elements
    if (sortedData.length > 5) {
      topData.push({
        type: 'Otros',
        count: sortedData.slice(5).reduce((acc, val) => acc + val.count, 0),
      })
    }

    return NextResponse.json(topData, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error getting records', { status: 400 })
  }
}
