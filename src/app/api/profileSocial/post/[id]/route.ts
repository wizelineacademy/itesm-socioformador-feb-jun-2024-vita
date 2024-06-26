import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { posts, user } from '@/src/db/schema/schema'
import { db } from '@/src/db/drizzle'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json('ID parameter is missing', { status: 400 })
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
      .innerJoin(user, eq(user.idUser, posts.creatorId))
      .where(eq(posts.creatorId, Number(id)))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error retrieving posts' },
      { status: 400 },
    )
  }
}
