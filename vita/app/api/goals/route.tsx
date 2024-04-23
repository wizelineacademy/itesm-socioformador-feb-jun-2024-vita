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
        desiredValue,
        variable
    } = body;

    if(!name || !category){
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })    
    }

    //find if a nutrition goal already exists
    const previousGoal = await db.select({
        name: Goals.name
    })
      .from(Goals)
      .where(
        and(
            eq(Goals.idUser, session.user?.id), 
            eq(Goals.category, 'nutrition')
        )
    );

    let res;

    //if there is already a goal update it, else create a new one
    if(previousGoal.length > 0){
        res = await db.update(Goals).set({
            name: name,
            category: category,
            variable: variable,
            currentValue: currentValue,
            desiredValue: desiredValue
        }).where(eq(Goals.idUser, session.user?.id));
    } else {
        res = await db.insert(Goals).values({
            idUser: session.user?.id,
            name: name,
            category: category,
            variable: variable,
            currentValue: currentValue,
            desiredValue: desiredValue
        });
    }

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

    if(!res.length){
        return NextResponse.json(res, { status: 400 });
    } else {
        return NextResponse.json(res[0], { status: 200 })
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving goal", { status: 400 });
  }
}
