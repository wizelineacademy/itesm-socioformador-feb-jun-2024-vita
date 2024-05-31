import { UsageRecord } from '@/src/data/datatypes/UsageRecord'
import { db } from '@/src/db/drizzle'
import { featureUsage } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const { usageRecords } = body

    console.log(usageRecords)

    const insertValues = usageRecords.map((record: UsageRecord) => ({
      idUser: session.user?.id,
      name: record.name,
      detail: record.detail,
    }))

    const res = await db.insert(featureUsage).values(insertValues)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error posting feature evaluation', {
      status: 400,
    })
  }
}
