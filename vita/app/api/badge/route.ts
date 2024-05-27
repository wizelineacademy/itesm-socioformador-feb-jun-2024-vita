
import { NextResponse } from "next/server";
import {  badges } from "@/db/schema/schema";
import { db } from "@/db/drizzle";

export async function GET(request: Request ) {
  try {
   

    const res = await db.select()
    .from(badges)
    
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving badges" }, { status: 400 });
  }
}
