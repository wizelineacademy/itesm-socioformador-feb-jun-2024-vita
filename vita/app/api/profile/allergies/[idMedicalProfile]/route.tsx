import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { allergies } from "@/db/schema/schema";


export async function GET(request: Request, { params }: { params: { idMedicalProfile: string } }) {
  try {
    const { idMedicalProfile} = params;

    if (!idMedicalProfile) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
    .from(allergies)
    .where(eq(allergies.idMedicalProfile, Number(idMedicalProfile)));
    
    

  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting reminder", { status: 400 });
  }
}