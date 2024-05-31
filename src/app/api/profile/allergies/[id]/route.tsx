import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { allergies } from "@/src/db/schema/schema";


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
    return NextResponse.json("Error get allergies ", { status: 400 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }
    console.log(id)
    const res = await db.delete(allergies)
  .where(eq(allergies.idAllergies, Number(id)));


    return NextResponse.json("Allergie deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting allergie", { status: 400 });
  }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const body = await request.json();
    
    const {
       name, reaction 
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      name: name,
      reaction: reaction
    };

    const res = await db.update(allergies)
  .set({
    name: insertValues.name,
    reaction: insertValues.reaction
  })
  .where(eq(allergies.idAllergies, Number(id)));

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error editing allergie", { status: 400 });
  }
}
