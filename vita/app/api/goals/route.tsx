import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { and, eq } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { Goals} from "@/app/db/schema/schema"; // Importamos el modelo de la tabla Reminders

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const {
        category,
        name,
        currentValue,
        desiredValue
    } = body;

    // Insertamos el nuevo recordatorio en la base de datos
    const res = await db.insert(Goals).values({
        idUser: session.user?.id,
        name: name,
        category: category,
        currentValue: currentValue,
        desiredValue: desiredValue
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting goal", { status: 400 });
  }
}


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const res = await db.select({
        name: Goals.name
    })
      .from(Goals)
      .where(
        and(
            eq(Goals.idUser, session.user?.id), 
            eq(Goals.category, 'nutrition')
        )
    );



    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving reminders", { status: 400 });
  }
}

