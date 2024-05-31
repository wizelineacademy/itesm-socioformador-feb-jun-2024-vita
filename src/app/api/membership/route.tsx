
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import {  user } from "@/src/db/schema/schema";
import { db } from "@/src/db/drizzle";

export async function GET(request: Request ) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await db.select()
    .from(user)
    .where(eq(session.user?.id, user.idUser)) 
    
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving posts" }, { status: 400 });
  }
}
