import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/app/db/drizzle";
import {user} from "@/app/db/schema/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await db.select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1) 

    if(existingUser.length > 0){
      return NextResponse.json("Error. Invalid email", {status: 401});
    }

    const res = await db.insert(user).values({
      email,
      name,
      password: hashedPassword
    }) 

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error processing registration", {status: 400})
  }
}
