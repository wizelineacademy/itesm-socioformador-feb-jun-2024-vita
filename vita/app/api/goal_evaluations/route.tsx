import { GoalMetric } from "@/context/autoevaluation";
import { db } from "@/db/drizzle";
import { goalEvaluation } from "@/db/schema/schema";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }

      const {evaluations} = body;

      const insertValues = evaluations.map((evaluation: GoalMetric) => ({
        idUser: session.user?.id,
        idGoal: evaluation.idGoal,
        grade: evaluation.value,
        name: evaluation.name
      }))
  
      const res = await db.insert(goalEvaluation).values(insertValues); 
  
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json("Error posting goal evaluation", { status: 400 });
    }
  }