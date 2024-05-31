import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { medicalProfile } from "@/src/db/schema/schema";
import { db } from "@/src/db/drizzle";


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const detail = await db.select()
      .from(medicalProfile)
      .where(eq(medicalProfile.idUser, session.user?.id)) 
      .limit(1)
    
    const res = detail.length > 0 ? detail[0] : null
 
    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving medicalProfile", {status: 400})
  }
}