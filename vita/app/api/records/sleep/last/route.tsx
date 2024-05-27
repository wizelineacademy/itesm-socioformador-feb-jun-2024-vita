import { db } from "@/db/drizzle";
import { record } from "@/db/schema/schema";
import { authOptions } from "@/lib/auth/authOptions";
import { getDifferenceInHours } from "@/lib/dateOps/dateOps";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      const res = await db.select()
      .from(record)
      .where(eq(record.name, "sleep_hours"))
      .orderBy(desc(record.date))
      .limit(1)

      const diffInHours = getDifferenceInHours(res[0].date, new Date())

      if(diffInHours < 24){
        return NextResponse.json(res[0], { status: 200 });
      } else {
        return NextResponse.json("No record found", { status: 400 });
      }

    } catch (error) {
      console.error(error);
      return NextResponse.json("Error getting record", { status: 400 });
    }
  }