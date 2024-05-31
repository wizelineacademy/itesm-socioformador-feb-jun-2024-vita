import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { db } from '@/src/db/drizzle'
import {
  challengeSubmissions,
  challengeEvaluations,
  badges,
} from '@/src/db/schema/schema'
import { eq, and, not, isNull } from 'drizzle-orm'
import { notInArray, sql } from 'drizzle-orm/sql'
import { getMonthlyChallenge } from '../challenges/route'
import { addUserPoints, addUserPointsAndBadges } from '../badgeUser/route'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || typeof session.user.id !== 'number') {
      console.log('Unauthorized access attempt.')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const idUser = session.user.id
    const challenge = await getMonthlyChallenge()

    // Obtener las evaluaciones realizadas por el usuario actual en el desafío actual
    const userEvaluations = await db
      .select()
      .from(challengeEvaluations)
      .where(
        and(
          eq(challengeEvaluations.evaluatorId, idUser),
          eq(challengeEvaluations.idChallenge, challenge?.idChallenge || 0),
        ),
      )

    // Si el usuario ya ha evaluado 5 o más veces, no mostrar más submissions
    if (userEvaluations.length >= 5) {
      return NextResponse.json(
        { message: 'Ya has evaluado todas las submissions.' },
        { status: 200 },
      )
    }

    // Obtener las submissions que aún no han sido evaluadas por el usuario actual
    let submissions
    if (userEvaluations.length > 0) {
      submissions = await db
        .select()
        .from(challengeSubmissions)
        .where(
          and(
            eq(challengeSubmissions.passed, false),
            not(eq(challengeSubmissions.idUser, idUser)),
            notInArray(
              challengeSubmissions.idUser,
              userEvaluations.map((evaluation) => evaluation.idUser),
            ),
          ),
        )
        .orderBy(sql`RANDOM()`)
        .limit(1)
    } else {
      // Si no hay evaluaciones, seleccionar aleatoriamente una submission sin ninguna restricción adicional
      submissions = await db
        .select()
        .from(challengeSubmissions)
        .where(
          and(
            eq(challengeSubmissions.passed, false),
            not(eq(challengeSubmissions.idUser, idUser)),
          ),
        )
        .orderBy(sql`RANDOM()`)
        .limit(1)
    }

    // Si no hay más submissions disponibles para evaluar
    if (!submissions || submissions.length === 0) {
      return NextResponse.json(
        { message: 'No hay más submissions disponibles para evaluar.' },
        { status: 200 },
      )
    }

    return NextResponse.json(submissions, { status: 200 })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { message: 'Error fetching submissions' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const { score, idUser, idChallenge } = body
    console.log(idUser, idChallenge, 'Aca estoy')

    const res = await db.insert(challengeEvaluations).values({
      idUser: idUser,
      idChallenge: idChallenge,
      evaluatorId: session.user.id,
      score: score,
    })

    const pointsToAdd = 10
    await addUserPoints(session.user?.id, pointsToAdd)
    const challenge = await getMonthlyChallenge()

    // Obtener las evaluaciones realizadas por el usuario actual en el desafío actual
    const userEvaluations = await db
      .select()
      .from(challengeEvaluations)
      .where(
        and(
          eq(challengeEvaluations.evaluatorId, session.user.id),
          eq(challengeEvaluations.idChallenge, challenge?.idChallenge || 0),
        ),
      )

    // Si el número de evaluaciones es 5 o más, actualizar 'passed' a true en ChallengeSubmissions
    if (userEvaluations.length >= 5) {
      await db
        .update(challengeSubmissions)
        .set({ passed: true })
        .where(
          and(
            eq(challengeSubmissions.idUser, idUser),
            eq(challengeSubmissions.idChallenge, challenge?.idChallenge || 0),
          ),
        )

      // Obtener todas las evaluaciones del usuario para el desafío actual
      const allUserEvaluations = await db
        .select({
          sumScore: sql<number>`SUM(${challengeEvaluations.score})`,
        })
        .from(challengeEvaluations)
        .where(
          and(
            eq(challengeEvaluations.idUser, idUser),
            eq(challengeEvaluations.idChallenge, challenge?.idChallenge || 0),
          ),
        )

      // Calcular el puntaje final
      const totalScore = allUserEvaluations[0]?.sumScore || 0
      const finalScore = (totalScore * 100) / 5

      // Obtener el badgeId basado en el idChallenge
      const badge = await db
        .select()
        .from(badges)
        .where(eq(badges.idChallenge, idChallenge))
        .limit(1)

      const badgeId = badge[0]?.idBadge

      if (badgeId) {
        await addUserPointsAndBadges(idUser, finalScore, badgeId)
      }
    }

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error posting userDetail', { status: 400 })
  }
}
