import { NextResponse } from 'next/server'
import { userBadges } from '@/src/db/schema/schema'
import { db } from '@/src/db/drizzle'

export async function GET() {
  try {
    const res = await db.select().from(userBadges)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error retrieving badges' },
      { status: 400 },
    )
  }
}
