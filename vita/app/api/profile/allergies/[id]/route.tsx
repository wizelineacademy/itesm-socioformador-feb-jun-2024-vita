import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { allergies } from "@/db/schema/schema";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id} = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
    .from(allergies)
    .where(eq(allergies.idMedicalProfile, Number(id)));
    
    

  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting reminder", { status: 400 });
  }
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("papa")
    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }
    console.log(id)
    const res = await db.delete(allergies)
  .where(eq(allergies.idAllergies, Number(id)));


    return NextResponse.json("Allergie deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting reminder", { status: 400 });
  }
}
