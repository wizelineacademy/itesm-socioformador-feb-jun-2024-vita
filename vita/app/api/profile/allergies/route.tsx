import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { allergies } from "@/db/schema/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      idMedicalProfile, name, reaction 
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      idMedicalProfile: Number(idMedicalProfile),
      name: name,
      reaction: reaction
    };

    // Insert values into the database
    const res = await db.insert(allergies).values(insertValues);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting reminder", { status: 400 });
  }
}