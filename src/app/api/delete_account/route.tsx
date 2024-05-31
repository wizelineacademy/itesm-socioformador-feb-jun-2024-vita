import { db } from "@/src/db/drizzle";
import { user } from "@/src/db/schema/schema";
import { authOptions } from "@/src/lib/auth/authOptions";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {

    const body = await request.json();
    const session = await getServerSession(authOptions);

    const {password} = body;

    //check that password is correct
    const userData = await db.select()
    .from(user)
    .where(eq(user.idUser, session?.user.id))

    const passwordCorrect = await bcrypt.compare(password, userData[0].password || "")

    if(!passwordCorrect){
        return NextResponse.json("Error deleting account", { status: 400 });
    }

    //delete user account
    await db.delete(user)
    .where(eq(user.idUser, session?.user.id))

    return NextResponse.json("OK", { status: 200 });

    } catch(error) {
        console.error(error);
        return NextResponse.json("Error deleting account", { status: 400 });
    }
}