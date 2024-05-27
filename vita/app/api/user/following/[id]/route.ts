import { NextResponse } from "next/server";
import { eq} from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user , following } from "@/db/schema/schema";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const requestedUserId = parseInt(params.id); // ID del usuario cuya información de seguimiento se solicita
  
      if (isNaN(requestedUserId)) {
        return NextResponse.json({ message: "Invalid ID parameter" }, { status: 400 });
      }
  
      // Obtenemos a todos los seguidores con sus nombres y fotos de perfil
      const res = await db.select({
        idUser: following.followingId,
        name: user.name,
        profilePhoto: user.profilePhoto,
      })
      .from(following)
      .innerJoin(user, eq(following.followingId, user.idUser))
      .where(eq(following.userId , requestedUserId));
    
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error fetching follow status" }, { status: 500 });
    }
  }