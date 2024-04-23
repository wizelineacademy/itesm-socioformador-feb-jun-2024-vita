import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { Reminders } from "@/app/db/schema/schema"; // Importamos el modelo de la tabla Reminders



export async function GET(request: Request,{params }: {params: {idReminders:string }}) {
  try {
  
    const { idReminders } = params;

    if (!idReminders) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
      .from(Reminders)
      .where(eq(Reminders.idReminders, Number(idReminders)))
  
  

    if (res.length === 0) {
      return NextResponse.json("Reminder not found", { status: 404 });
    }
  
    return NextResponse.json(res[0], { status: 200 }); 
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving reminder", { status: 400 });
  }
}

export async function PUT(request: Request, { params }: { params: { idReminders: string } }) {
  try {
    const { idReminders } = params;

    if (!idReminders) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const { name, description, frequency, startTime, endTime } = await request.json();

    // Validar que los campos requeridos estén presentes
    if (!name || !description || !frequency || !startTime) {
      return NextResponse.json("Name, description, frequency, and startTime are required", { status: 400 });
    }

    // Convertir las fechas a objetos Date
    const startTimeDate = new Date(startTime);
    const endTimeDate = endTime ? new Date(endTime) : null;
   
  

    const res = await db.update(Reminders)
      .set({ name, description, frequency: Number(frequency),
         startTime: new Date(startTimeDate), endTime: endTimeDate ? new Date(endTimeDate) : null,})
         .where(eq(Reminders.idReminders, Number(idReminders)))

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error updating reminder", { status: 400 });
  }
}
