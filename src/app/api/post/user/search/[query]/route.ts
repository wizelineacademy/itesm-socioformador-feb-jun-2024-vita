import { NextResponse } from 'next/server'
import { db } from '@/src/db/drizzle'
import { user } from '@/src/db/schema/schema'
import { like } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: { query: string } },
) {
  try {
    const { query } = params

    if (!query) {
      return NextResponse.json('Search parameter is missing', { status: 400 })
    }

    const queryPattern = `%${query}%`

    const res = await db
      .select()
      .from(user)
      .where(like(user.name, queryPattern))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error getting users', { status: 400 })
  }
}
