import { NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'
import { db } from '@/src/db/drizzle'
import { user, followers } from '@/src/db/schema/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const requestedUserId = parseInt(params.id) // ID del usuario cuya información de seguimiento se solicita

    if (isNaN(requestedUserId)) {
      return NextResponse.json(
        { message: 'Invalid ID parameter' },
        { status: 400 },
      )
    }

    // Obtenemos a todos los seguidores con sus nombres y fotos de perfil
    const res = await db
      .select({
        idUser: user.idUser,
        name: user.name,
        profilePhoto: user.profilePhoto,
      })
      .from(followers)
      .innerJoin(user, eq(followers.followerId, user.idUser))
      .where(eq(followers.userId, requestedUserId))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching follow status' },
      { status: 500 },
    )
  }
}
