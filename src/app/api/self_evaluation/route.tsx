import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { goalEvaluation, Goals } from "@/src/db/schema/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { idGoal, name, grade } = body;

    const goalExists = await db
      .select()
      .from(Goals)
      .where(eq(Goals.idGoal, idGoal))
      .then(results => results.length > 0);

    if (!goalExists) {
      return NextResponse.json("Goal does not exist", { status: 400 });
    }

    const insertValues = {
      idUser: session.user?.id,
      idGoal,
      name,
      grade: Number(grade),
    };

    const res = await db.insert(goalEvaluation).values(insertValues);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting evaluation", { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const res = await db.select().from(goalEvaluation).where(eq(goalEvaluation.idUser, session.user?.id));
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving evaluations", { status: 400 });
  }
}
