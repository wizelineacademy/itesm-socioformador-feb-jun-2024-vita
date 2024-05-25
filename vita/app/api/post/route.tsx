
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { posts, user } from "@/db/schema/schema";
import { db } from "@/db/drizzle";

export async function GET(request: Request ) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await db.select({
      idPost: posts.idPost,
      creatorId: posts.creatorId,
      caption: posts.caption,
      postPhoto: posts.postPhoto,
      tag: posts.tag,
      createdAt: posts.createdAt,
      name: user.name,
      profilePhoto: user.profilePhoto
    })
    .from(posts)
    .innerJoin(user, eq(posts.creatorId, user.idUser));

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving posts" }, { status: 400 });
  }
}