import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq, and } from "drizzle-orm";
import { postLikes, posts, user } from "@/db/schema/schema";
import { db } from "@/db/drizzle";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id; // ID del usuario autenticado
    const postId = parseInt(params.id); // ID del post a dar o quitar like

    if (isNaN(postId)) {
      return NextResponse.json({ message: "Invalid ID parameter" }, { status: 400 });
    }

    // Verificar si ya dio like al post
    const existingLike = await db.select()
      .from(postLikes)
      .where(and(eq(postLikes.userId, userId), eq(postLikes.postId, postId)))
      .limit(1);

    if (existingLike.length > 0) {
      // Si ya dio like, quitar like (eliminar la relación)
      await db.delete(postLikes)
        .where(and(eq(postLikes.userId, userId), eq(postLikes.postId, postId)));

      return NextResponse.json({ message: "Post unliked successfully" }, { status: 200 });
    } else {
      // Si no dio like, dar like al post (crear la relación)
      await db.insert(postLikes).values({
        userId: userId,
        postId: postId,
      });

      return NextResponse.json({ message: "Post liked successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error handling like/unlike" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const postId = parseInt(params.id);
  
      if (isNaN(postId)) {
        return NextResponse.json({ message: "Invalid ID parameter" }, { status: 400 });
      }
  
      // Count the number of likes for the post
      const likeCountResult = await db.select()
        .from(postLikes)
        .where(eq(postLikes.postId, postId));
  
      const likeCount = likeCountResult.length;
  
      // Check if the user has liked the post
      const session = await getServerSession(authOptions);
      const userId = session ? session.user.id : null;
  
      let isLiked = false;
      if (userId) {
        const likeStatus = await db.select()
          .from(postLikes)
          .where(and(eq(postLikes.userId, userId), eq(postLikes.postId, postId)))
          .limit(1);
  
        isLiked = likeStatus.length > 0;
      }
  
      return NextResponse.json({ likeCount, isLiked }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error fetching like count" }, { status: 500 });
    }
  }