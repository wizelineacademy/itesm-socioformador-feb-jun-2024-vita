import { db } from "@/src/db/drizzle";
import { Goals } from "@/src/db/schema/schema";
import { authOptions } from "@/src/lib/auth/authOptions";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//Post sleep goal
export async function POST(
    request: Request,
    { params }: { params: { category:string } }
  ) {
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
  
      //find if a goal already exists
      const previousGoal = await db.select({
          name: Goals.name
      })
        .from(Goals)
        .where(
          and(
              eq(Goals.idUser, session.user?.id), 
              eq(Goals.category, category),
              eq(Goals.variable, "Horas de sueño")
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
          }).where(
            and(
              eq(Goals.idUser, session.user?.id),
              eq(Goals.category, category),
              eq(Goals.variable, "Horas de sueño")
            )
          );
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
    