import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/authOptions";
import { eq, and } from "drizzle-orm";
import { following, followers } from "@/src/db/schema/schema";
import { db } from "@/src/db/drizzle";
import { addUserPointsAndBadges } from "@/src/api/badgeUser/route";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const followerId = session.user.id; // ID del usuario autenticado
    const followedId = parseInt(params.id); // ID del usuario a seguir o dejar de seguir

    if (isNaN(followedId)) {
      return NextResponse.json({ message: "Invalid ID parameter" }, { status: 400 });
    }

    // Verificar si ya sigue al usuario
    const existingFollow = await db.select()
      .from(following)
      .where(and(eq(following.userId, followerId), eq(following.followingId, followedId)))
      .limit(1);

    if (existingFollow.length > 0) {
      // Si ya sigue, dejar de seguir (eliminar la relación)
      await db.delete(following)
        .where(and(eq(following.userId, followerId), eq(following.followingId, followedId)));

        await db.delete(followers)
        .where(and(eq(followers.userId,followedId  ), eq(followers.followerId, followerId)));

      return NextResponse.json({ message: "User unfollowed successfully" }, { status: 200 });
    } else {
      // Si no sigue, seguir al usuario (crear la relación)
      await db.insert(following).values({
        userId: followerId,
        followingId: followedId,
      });
      await db.insert(followers).values({
        userId: followedId ,
        followerId: followerId,
      });
      const existingFollow = await db.select()
      .from(following)
      .where((eq(following.userId, session.user?.id)))
      if(existingFollow.length > 4){
        const pointsToAdd = 20;
        const badgeId = 2;
        await addUserPointsAndBadges(session.user?.id, pointsToAdd, badgeId);
      }
      return NextResponse.json({ message: "User followed successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error handling follow/unfollow" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
      }
  
      const userId = session.user.id; // ID del usuario autenticado
      const requestedUserId = parseInt(params.id); // ID del usuario cuya información de seguimiento se solicita
  
      if (isNaN(requestedUserId)) {
        return NextResponse.json({ message: "Invalid ID parameter" }, { status: 400 });
      }
  
      // Verificar si el usuario autenticado sigue al usuario solicitado
      const followStatus = await db.select()
        .from(following)
        .where(and(eq(following.userId, userId), eq(following.followingId, requestedUserId)))
        .limit(1);
  
      // Devolver el estado de seguimiento (si sigue o no)
      return NextResponse.json({ isFollowing: followStatus.length > 0 }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error fetching follow status" }, { status: 500 });
    }
  }
