import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/db/drizzle";
import { portionsNutrition } from "@/db/schema/schema";
import { eq } from "drizzle-orm";


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const portions = await db.select()
      .from(portionsNutrition)
      .where(eq(portionsNutrition.idUser, session.user?.id)) 
      .limit(1)

    const res = portions.length > 0 ? portions[0] : null

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving portions", {status: 400})
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const { fruits, vegetables, milk, legumes, cereals, meat, sugar, fat } = body;

    const existingPortions = await db.select()
      .from(portionsNutrition)
      .where(eq(portionsNutrition.idUser, session.user?.id)) 
      .limit(1)

    let res;

    if(existingPortions.length > 0){ //update
      res = await db.update(portionsNutrition)
      .set({
        fruits: Number(fruits),
        vegetables: Number(vegetables),
        milk: Number(milk),
        legumes: Number(legumes),
        cereals: Number(cereals),
        meat: Number(meat),
        sugar: Number(sugar),
        fat: Number(fat)
      })
      .where(eq(portionsNutrition.idUser, session.user?.id))
    } else { //create
      res = await db.insert(portionsNutrition).values({
        idUser: session.user?.id,
        fruits: Number(fruits),
        vegetables: Number(vegetables),
        milk: Number(milk),
        legumes: Number(legumes),
        cereals: Number(cereals),
        meat: Number(meat),
        sugar: Number(sugar),
        fat: Number(fat)
      })
    }

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error posting portions", {status: 400})
  }
}
