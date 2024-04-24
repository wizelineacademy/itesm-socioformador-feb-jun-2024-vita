import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { and, eq } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { Goals} from "@/app/db/schema/schema";

export async function GET(
  request: Request, 
  { params }: { params: { category:string } }
) {
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
              eq(Goals.category, params.category)
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
  
  