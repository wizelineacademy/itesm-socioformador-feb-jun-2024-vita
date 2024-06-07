import { db } from '@/src/db/drizzle'
import { record } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { getDifferenceInHours } from '@/src/lib/dateOps/dateOps'
import { and, desc, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', { status: 401 })
  }

  try {
    const res = await db
      .select()
      .from(record)
      .where(
        and(
          eq(record.name, 'sleep_hours'),
          eq(record.idUser, session.user?.id),
        ),
      )
      .orderBy(desc(record.date))
      .limit(1)

    if (!res) {
      return NextResponse.json('No data', { status: 400 })
    }

    const diffInHours = getDifferenceInHours(res[0].date, new Date())

    if (diffInHours < 24) {
      return NextResponse.json(res[0], { status: 200 })
    } else {
      return NextResponse.json('Invalid data', { status: 400 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error getting record', { status: 400 })
  }
}
