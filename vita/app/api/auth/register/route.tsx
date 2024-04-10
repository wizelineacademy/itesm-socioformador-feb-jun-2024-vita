import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({
      where: {
          email
      }
    })

    if(existingUser){
      return NextResponse.json("Error. Invalid email", {status: 401});
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    })

    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error processing registration", {status: 400})
  }
}
