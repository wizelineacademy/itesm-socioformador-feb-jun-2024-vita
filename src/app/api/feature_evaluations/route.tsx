import { Metric } from '@/src/data/datatypes/autoeval'
import { db } from '@/src/db/drizzle'
import { featureEvaluation } from '@/src/db/schema/schema'
import { authOptions } from '@/src/lib/auth/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const { evaluations } = body

    const insertValues = evaluations.map((evaluation: Metric) => ({
      idUser: session.user?.id,
      name: evaluation.name,
      grade: evaluation.value,
    }))

    const res = await db.insert(featureEvaluation).values(insertValues)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error posting feature evaluation', {
      status: 400,
    })
  }
}
