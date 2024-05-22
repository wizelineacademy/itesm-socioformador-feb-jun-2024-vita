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
  
      const {
        idGoal,
        name,
        grade
      } = body;
  
      const res = await db.insert(goalEvaluation).values({
        idUser: session.user?.id,
        idGoal,
        name,
        grade
      }); 
  
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json("Error posting goal evaluation", { status: 400 });
    }
  }