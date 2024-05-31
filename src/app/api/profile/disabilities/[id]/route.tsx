import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/db/drizzle";
import { disability} from "@/src/db/schema/schema";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id} = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
    .from(disability)
    .where(eq(disability.idMedicalProfile, Number(id)));
    
  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error get disabilities", { status: 400 });
  }
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
  
    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }
   
    const res = await db.delete(disability)
  .where(eq(disability.idDisability, Number(id)));


    return NextResponse.json("Disability deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting disability", { status: 400 });
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
       name
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      name: name,
    };

    const res = await db.update(disability)
  .set({
    name: insertValues.name
  })
  .where(eq(disability.idDisability, Number(id)));
    
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error editing disability", { status: 400 });
  }
}