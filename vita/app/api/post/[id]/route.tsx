import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request: Request, { params }: { params: { id: string } }) {
 
  try {
    const { id} = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const res = await db.select()
    .from(posts)
    .where(eq(posts.idPost, Number(id)));

  return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error get posts ", { status: 400 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const currentWorkingDirectory = process.cwd();
  try {
    const { id } = params;
    const formData = await request.formData();

    const caption = formData.get("caption") as string;
    const tag = formData.get("tag") as string;
    const postPhotoFile = formData.get("postPhoto") as File;
    const postPhotoString = formData.get("postPhoto") as String;
    console.log("Cambio de foto", postPhotoString)
    // Actualizar solo caption y tag si no se proporciona una nueva foto
    if (!postPhotoFile || postPhotoString === "/") {
      const res = await db.update(posts)
        .set({
          caption: caption,
          tag: tag,
        })
        .where(eq(posts.idPost, Number(id)));

      return NextResponse.json("Post caption and tag updated successfully", { status: 200 });
    }

    // Si se proporciona una nueva foto, actualizar foto, caption y tag
    const buffer = Buffer.from(await postPhotoFile.arrayBuffer());
    const postPhotoName = `${postPhotoFile.name}`;
    const postPhotoPath = path.join(currentWorkingDirectory, "public", "uploads", postPhotoName);
    await writeFile(postPhotoPath, buffer);
    const postPhotoUrl = `/uploads/${postPhotoName}`;

    const res = await db.update(posts)
      .set({
        caption: caption,
        tag: tag,
        postPhoto: postPhotoUrl
      })
      .where(eq(posts.idPost, Number(id)));

    return NextResponse.json("Post updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json("Error updating post", { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json("ID parameter is missing", { status: 400 });
    }

    const deleteResult = await db
      .delete(posts)
      .where(eq(posts.idPost, Number(id)));

  

    return NextResponse.json("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error deleting post", { status: 500 });
  }
}