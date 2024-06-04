import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { eq } from 'drizzle-orm'
import { posts, user } from '@/src/db/schema/schema'
import { db } from '@/src/db/drizzle'
import { sql } from 'drizzle-orm/sql'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

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
      .orderBy(sql`RANDOM()`)
      .limit(10)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error retrieving posts' },
      { status: 400 },
    )
  }
}
