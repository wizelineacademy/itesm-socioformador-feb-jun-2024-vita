import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { medicines } from "@/db/schema/schema";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id} = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
    .from(medicines)
    .where(eq(medicines.idMedicalProfile, Number(id)));
    
  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error get medicine", { status: 400 });
  }
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
  
    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }
   
    const res = await db.delete(medicines)
  .where(eq(medicines.idMedicines, Number(id)));


    return NextResponse.json("Medicine deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting medicine", { status: 400 });
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
       name, routeAdmin, dose, duration 
    } = body;

    // Initialize insertValues with the correct values
    const insertValues = {
      name: name,
      routeAdmin: routeAdmin, 
      dose: dose,
      duration: duration
    };

    const res = await db.update(medicines)
  .set({
    name: insertValues.name,
    routeAdmin: insertValues.routeAdmin,
    dose: insertValues.dose,
    duration: insertValues.duration
  })
  .where(eq(medicines.idMedicines, Number(id)));
    
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error editing medicine", { status: 400 });
  }
}
