import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { disability } from "@/db/schema/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      idMedicalProfile, name
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      idMedicalProfile: Number(idMedicalProfile),
      name: name,
    };

    // Insert values into the database
    const res = await db.insert(disability).values(insertValues);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting reminder", { status: 400 });
  }
}

