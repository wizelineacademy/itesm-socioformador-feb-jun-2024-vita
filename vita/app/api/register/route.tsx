import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body); 

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password:hashedPassword,
      }
    });

    console.log("User created:", user); 
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error processing registration:", error); 
  }
}
