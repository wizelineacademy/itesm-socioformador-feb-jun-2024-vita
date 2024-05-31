import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { eq } from 'drizzle-orm'
import { comments, user } from '@/src/db/schema/schema'
import { db } from '@/src/db/drizzle'

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 },
      )
    }

    const userId = session.user.id // ID del usuario autenticado
    const postId = parseInt(params.id) // ID del post al que se quiere agregar el comentario

    if (isNaN(postId)) {
      return NextResponse.json(
        { message: 'Invalid ID parameter' },
        { status: 400 },
      )
    }

    const requestBody = await request.json()
    const { content } = requestBody

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { message: 'Invalid comment content' },
        { status: 400 },
      )
    }

    await db.insert(comments).values({
      userId: userId,
      postId: postId,
      content: content,
    })

    return NextResponse.json(
      { message: 'Comment added successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error adding comment' },
      { status: 500 },
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = parseInt(params.id) // ID del post del que se quieren obtener los comentarios

    if (isNaN(postId)) {
      return NextResponse.json(
        { message: 'Invalid ID parameter' },
        { status: 400 },
      )
    }

    const res = await db
      .select({
        idComment: comments.idComment,
        postId: comments.postId,
        userId: comments.userId,
        content: comments.content,
        profilePhoto: user.profilePhoto,
        name: user.name,
      })
      .from(comments)
      .innerJoin(user, eq(comments.userId, user.idUser))
      .where(eq(comments.postId, postId))
    console.log(res)

    return NextResponse.json({ comments: res }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching comments' },
      { status: 500 },
    )
  }
}
