import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("ready")

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    })

    console.log("User created:", user); 
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error processng registration", {status: 400})
  }
}
