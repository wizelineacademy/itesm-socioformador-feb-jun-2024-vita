import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user} from "@/db/schema/schema"; 


export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }
    
    const res  = await db.select()
      .from(user)
      .where(eq(user.idUser, session.user?.id)) 
      .limit(1)

    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving posts", {status: 400})
  }
}
