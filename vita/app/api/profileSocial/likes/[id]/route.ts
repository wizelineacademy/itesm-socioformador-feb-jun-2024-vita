import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { postLikes,user, posts } from "@/db/schema/schema";


export async function GET(request: Request, { params }: { params: { id: string } }) {
 
  try {
    const { id} = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
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
    .from(postLikes)
    .innerJoin(posts, eq(posts.idPost, postLikes.postId))
    .innerJoin(user, eq(user.idUser, posts.creatorId))
    .where(eq(postLikes.userId, Number(id)));

  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error get user ", { status: 400 });
  }
}
