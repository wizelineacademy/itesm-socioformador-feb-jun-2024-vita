import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { medicines } from "@/db/schema/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      idMedicalProfile, name, routeAdmin, dose , duration
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      idMedicalProfile: Number(idMedicalProfile),
      name: name,
      routeAdmin: routeAdmin,
      dose: dose,
      duration: duration
    };

    // Insert values into the database
    const res = await db.insert(medicines).values(insertValues);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting medicine", { status: 400 });
  }
}

