import { NextResponse } from 'next/server'
import { db } from '@/src/db/drizzle'
import { posts, user } from '@/src/db/schema/schema'
import { or, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { sql } from 'drizzle-orm/sql'

export async function GET(
  request: Request,
  { params }: { params: { query: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const { query } = params

    if (!query) {
      return NextResponse.json('Search parameter is missing', { status: 400 })
    }

    const queryPattern = `%${query.toLowerCase()}%`

    const res = await db
      .select({
        idPost: posts.idPost,
        creatorId: posts.creatorId,
        caption: posts.caption,
        postPhoto: posts.postPhoto,
        tag: posts.tag,
        createdAt: posts.createdAt,
        name: user.name,
        profilePhoto: user.profilePhoto,
      })
      .from(posts)
      .innerJoin(user, eq(posts.creatorId, user.idUser))
      .where(
        or(
          sql`${sql`LOWER(${posts.caption})`} LIKE ${queryPattern}`,
          sql`${sql`LOWER(${posts.tag})`} LIKE ${queryPattern}`,
        ),
      )

    if (res.length === 0) {
      return NextResponse.json('No posts found', { status: 404 })
    }

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error getting posts', { status: 500 })
  }
}
