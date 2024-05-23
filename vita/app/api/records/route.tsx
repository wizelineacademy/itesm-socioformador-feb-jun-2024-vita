import { Record } from "@/data/datatypes/autoeval";
import { db } from "@/db/drizzle";
import { record } from "@/db/schema/schema";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
  
      const {records} = body;

      const insertValues = records.map((record: Record) => ({
        idUser: session.user?.id,
        name: record.name,
        value: record.value,
        category: record.category
      }))
  
      const res = await db.insert(record).values(insertValues); 
  
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json("Error posting record", { status: 400 });
    }
  }