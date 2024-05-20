import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/schema";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const session = await getServerSession(authOptions);
  
  
      if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
      }
      // Now, proceed with updating or creating userDetail
      const { caption,postPhoto, 	tag } = body;

       const res = await db.insert(posts).values({
        creatorId:   session.user?.id,
        caption: caption, 
        postPhoto: postPhoto,
        tag: tag 
       })  
    
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json("Error posting userDetail", { status: 400 });
    }
  }
  
  
  