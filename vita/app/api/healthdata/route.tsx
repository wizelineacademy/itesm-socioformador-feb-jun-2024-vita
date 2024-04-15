import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session)
    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const userDetail = await prisma.userDetail.findUnique({
        where: {
            id_user: session.user?.id,
        }
    }) 

    return NextResponse.json(userDetail, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving userDetail", {status: 400})
  }
}



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);
    console.log(session)

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const { sex, weight,  height, body_fat, muscular_mass, birth_date } = body;
     
    const userDetail = await prisma.userDetail.upsert({
        where: {
          id_user: session.user?.id
        },
        update: {
            sex: sex,
            weight: Number(weight),
            height: Number(height),
            body_fat: Number(body_fat),
            muscular_mass: Number(muscular_mass),
            birth_date: new Date(birth_date) 
        },
        create: {
            id_user: session.user?.id,
            sex: sex,
            weight: Number(weight),
            height: Number(height),
            body_fat: Number(body_fat),
            muscular_mass: Number(muscular_mass),
            birth_date: new Date(birth_date) 
        }
    }) 

    return NextResponse.json(userDetail, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error posting userDetail", {status: 400})
  }
}
