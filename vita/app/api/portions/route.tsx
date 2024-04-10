import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const portions = await prisma.portionsNutrition.findUnique({
        where: {
            id_user: session.user?.id,
        }
    }) 

    return NextResponse.json(portions, {status: 200});
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

    const portions = await prisma.portionsNutrition.upsert({
        where: {
          id_user: session.user?.id
        },
        update: {
          fruits: Number(fruits),
          vegetables: Number(vegetables),
          milk: Number(milk),
          legumes: Number(legumes),
          cereals: Number(cereals),
          meat: Number(meat),
          sugar: Number(sugar),
          fat: Number(fat)
        },
        create: {
            id_user: session.user?.id,
            fruits: Number(fruits),
            vegetables: Number(vegetables),
            milk: Number(milk),
            legumes: Number(legumes),
            cereals: Number(cereals),
            meat: Number(meat),
            sugar: Number(sugar),
            fat: Number(fat)
        }
    }) 

    return NextResponse.json(portions, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error posting portions", {status: 400})
  }
}
