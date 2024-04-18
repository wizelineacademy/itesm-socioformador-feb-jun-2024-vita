import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { userDetail } from "@/db/schema/schema";
import { db } from "@/db/drizzle";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const detail = await db.select()
      .from(userDetail)
      .where(eq(userDetail.idUser, session.user?.id)) 
      .limit(1)

    const res = detail.length > 0 ? detail[0] : null

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving userDetail", {status: 400})
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const { sex, weight,  height, bodyFat, muscularMass, birthDate } = body;

    const detail = await db.select()
    .from(userDetail)
    .where(eq(userDetail.idUser, session.user?.id)) 
    .limit(1)

    let res;

    if(detail.length > 0){ //update

      res = await db.update(userDetail)
      .set({
        sex: sex,
        weight: Number(weight),
        height: Number(height),
        bodyFat: Number(bodyFat),
        muscularMass: Number(muscularMass),
        birthDate: new Date(birthDate)
      })
      .where(eq(userDetail.idUser, session.user?.id))
    } else { //create
      res = await db.insert(userDetail).values({
        idUser: session.user?.id,
        sex: sex,
        weight: Number(weight),
        height: Number(height),
        bodyFat: Number(bodyFat),
        muscularMass: Number(muscularMass),
        birthDate: new Date(birthDate) 
      })
    }

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error posting userDetail", {status: 400})
  }
}


