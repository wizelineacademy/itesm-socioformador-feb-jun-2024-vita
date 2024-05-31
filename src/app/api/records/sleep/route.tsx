import { db } from '@/src/db/drizzle'
import { record } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { and, avg, desc, eq, sql } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    //get data from the last 7 days
    const res = await db
      .select({
        name: sql`DATE(${record.date})`,
        value: avg(record.value),
      })
      .from(record)
      .where(
        and(
          eq(record.idUser, session.user?.id),
          eq(record.name, 'sleep_hours'),
        ),
      )
      .groupBy(sql`DATE(${record.date})`)
      .orderBy(desc(sql`DATE(${record.date})`))
      .limit(7)

    //ordered data by day
    res.reverse()
    //format numbers to 2 decimals
    const formattedData = res.map((row) => ({
      ...row,
      value: Number(row.value).toFixed(2),
    }))
    return NextResponse.json(formattedData, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error getting records', { status: 400 })
  }
}
