import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/schema";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const currentWorkingDirectory = process.cwd();

  try {
    const formData = await request.formData();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const caption = formData.get("caption") as string;
    const tag = formData.get("tag") as string;
    const postPhotoFile = formData.get("postPhoto") as File;

    if (!postPhotoFile) {
      return NextResponse.json("Post photo is required", { status: 400 });
    }

    const buffer = Buffer.from(await postPhotoFile.arrayBuffer());
    const postPhotoName = `${postPhotoFile.name}`;
    //const postPhotoName = `${uuidv4()}-${postPhotoFile.name}`;
    const postPhotoPath = path.join(currentWorkingDirectory, "public", "uploads", postPhotoName);

    await writeFile(postPhotoPath, buffer);

    const postPhotoUrl = `/uploads/${postPhotoName}`;

    const newPost = await db.insert(posts).values({
      creatorId: session.user?.id,
      caption: caption,
      postPhoto: postPhotoUrl,
      tag: tag
    });

    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error posting user detail", { status: 400 });
  }
}
