import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db/drizzle'
import { Reminders } from '@/src/db/schema/schema' // Importamos el modelo de la tabla Reminders
import { addUserPointsAndBadges } from '../badgeUser/route'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const { name, description, frequency, startTime, endTime } = body

    // Creamos un objeto que contiene los valores a insertar
    const insertValues: {
      idUser: number
      name: string
      description: string
      frequency: number
      startTime: Date
      dueTime: Date | null
      endTime?: Date | null | undefined
    } = {
      idUser: session.user?.id,
      name,
      description,
      frequency: Number(frequency),
      startTime: new Date(startTime),
      dueTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
    }

    const res = await db.insert(Reminders).values(insertValues)

    // Insertamoslos datos del logro
    const pointsToAdd = 10
    const badgeId = 1
    await addUserPointsAndBadges(session.user?.id, pointsToAdd, badgeId)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error posting reminder', { status: 400 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const res = await db
      .select()
      .from(Reminders)
      .where(eq(Reminders.idUser, session.user?.id))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error retrieving reminders', { status: 400 })
  }
}
