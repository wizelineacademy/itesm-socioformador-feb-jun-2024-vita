import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { Reminders } from "@/app/db/schema/schema"; // Importamos el modelo de la tabla Reminders

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const {
      name,
      description,
      frequency,
      startTime,
      endTime
    } = body;

    // Creamos un objeto que contiene los valores a insertar
    const insertValues: {
      idUser: number;
      name: string;
      description: string;
      frequency: number;
      startTime: Date;
      endTime?: Date | null | undefined; 
    } = {
      idUser: session.user?.id,
      name,
      description,
      frequency: Number(frequency),
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null 
    };

    // Insertamos el nuevo recordatorio en la base de datos
    const res = await db.insert(Reminders).values(insertValues); // Cambiamos values(insertValues) a values([insertValues])

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting reminder", { status: 400 });
  }
}


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const res = await db.select()
      .from(Reminders)
      .where(eq(Reminders.idUser, session.user?.id));



    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving reminders", { status: 400 });
  }
}

