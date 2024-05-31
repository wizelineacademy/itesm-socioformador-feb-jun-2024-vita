import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db/drizzle'
import { user } from '@/src/db/schema/schema'

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
      .select()
      .from(user)
      .where(eq(user.idUser, Number(id)))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error get user ', { status: 400 })
  }
}
