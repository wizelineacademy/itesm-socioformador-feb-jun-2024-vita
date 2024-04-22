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
    console.log(res)
    return NextResponse.json(res[0], { status: 200 }); 
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving reminder", { status: 400 });
  }
}

