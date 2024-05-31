import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/db/drizzle";
import { challengeSubmissions, challengeEvaluations } from "@/db/schema/schema";
import { eq, and, not, isNull } from 'drizzle-orm';
import { notInArray, sql } from 'drizzle-orm/sql';
import { getMonthlyChallenge } from "../challenges/route";
import { addUserPoints } from "../badgeUser/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || typeof session.user.id !== 'number') {
      console.log("Unauthorized access attempt.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const idUser = session.user.id;
    const challenge = await getMonthlyChallenge();

    // Obtener las evaluaciones realizadas por el usuario actual en el desafío actual
    const userEvaluations = await db.select()
      .from(challengeEvaluations)
      .where(and(
        eq(challengeEvaluations.evaluatorId, idUser),
        eq(challengeEvaluations.idChallenge, challenge?.idChallenge || 0) 
      ));

    // Obtener las submissions que aún no han sido evaluadas por el usuario actual
    let submissions;
    if (userEvaluations.length > 0) {
      submissions = await db.select()
        .from(challengeSubmissions)
        .where(and(
          eq(challengeSubmissions.passed, false),
          not(eq(challengeSubmissions.idUser, idUser)),
          notInArray(challengeSubmissions.idUser, userEvaluations.map(evaluation => evaluation.idUser))
        ))
        .orderBy(sql`RANDOM()`)
        .limit(1);
    } else {
      // Si no hay evaluaciones, seleccionar aleatoriamente una submission sin ninguna restricción adicional
      submissions = await db.select()
        .from(challengeSubmissions)
        .where(and(
          eq(challengeSubmissions.passed, false),
          not(eq(challengeSubmissions.idUser, idUser))
        ))
        .orderBy(sql`RANDOM()`)
        .limit(1);
    }

    // console.log("Random submission to be evaluated:", submissions);

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ message: "Error fetching submissions" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { score,  idUser,idChallenge } = body;
    console.log(idUser,idChallenge, "Aca estoy")
 
    const res = await db.insert(challengeEvaluations).values({
      idUser: idUser,
      idChallenge: idChallenge,
      evaluatorId: session.user.id,
      score:score,
    });
    
    const pointsToAdd = 10;
    await addUserPoints(session.user?.id, pointsToAdd);

  
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error posting userDetail", { status: 400 });
  }
}


