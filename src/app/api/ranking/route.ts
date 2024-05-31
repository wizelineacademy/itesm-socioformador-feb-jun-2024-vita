import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { db } from "@/src/db/drizzle";
import { userPoints, user } from "@/src/db/schema/schema";
import { eq, desc } from "drizzle-orm"; 

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await db.select({
      idUser: user.idUser,
      name: user.name,
      points: userPoints.points
    })
    .from(userPoints)
    .innerJoin(user, eq(userPoints.idUser, user.idUser))
    .orderBy(desc(userPoints.points)) 
    .limit(10); 

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving ranking" }, { status: 400 });
  }
}
