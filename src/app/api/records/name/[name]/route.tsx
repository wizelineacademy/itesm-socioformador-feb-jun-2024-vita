import { db } from "@/src/db/drizzle";
import { record } from "@/src/db/schema/schema";
import { authOptions } from "@/src/lib/auth/authOptions";
import { getDateNDaysAgo } from "@/src/lib/dateOps/dateOps";
import { and, avg, desc, eq, gte, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const months:Record<string, string> = {
    "1": "Enero",
    "2": "Febrero",
    "3": "Marzo",
    "4": "Abril",
    "5": "Mayo",
    "6": "Junio",
    "7": "Julio",
    "8": "Agosto",
    "9": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre"
}

export async function GET(
    request: Request,
    { params }: { params: { name:string } }
) {
    try {

      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      //get data from the last 12 months
      const res = await db.select({
        name: sql`EXTRACT(MONTH FROM ${record.date})`,
        value: avg(record.value)
      })
      .from(record)
      .where(
        and(
          eq(record.idUser, session.user?.id),
          eq(record.name, params.name),
          gte(record.date, getDateNDaysAgo(365))

        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${record.date})`)
      .orderBy(desc(sql`EXTRACT(MONTH FROM ${record.date})`))
      .limit(12)

      //ordered data by month
      res.reverse()

      //format numbers to 2 decimals and month names
      const formattedData = res.map(row => ({
        name: months[row.name as string],
        value: Number(row.value).toFixed(2)
      }))

      return NextResponse.json(formattedData, { status: 200 });

    } catch (error) {
      console.error(error);
      return NextResponse.json("Error getting records", { status: 400 });
    }
}