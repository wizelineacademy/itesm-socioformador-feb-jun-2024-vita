import { NextResponse } from 'next/server'
import { userBadges } from '@/src/db/schema/schema'
import { db } from '@/src/db/drizzle'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { eq } from 'drizzle-orm'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 400 })
  }

  try {
    const res = await db
      .select()
      .from(userBadges)
      .where(eq(userBadges.userId, session.user?.id))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error retrieving badges' },
      { status: 400 },
    )
  }
}
