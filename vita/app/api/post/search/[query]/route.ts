import { NextResponse } from 'next/server';
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/schema";
import { like, or } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: { query: string } }) {
  try {
    const { query } = params;


    if (!query) {
      return NextResponse.json("Search parameter is missing", { status: 400 });
    }

    const queryPattern = `%${query}%`;
    const res = await db.select()
      .from(posts)
      .where(
        or(
          like(posts.caption, queryPattern),
          like(posts.tag, queryPattern)
        )
      );


    if (res.length === 0) {
      return NextResponse.json("No posts found", { status: 404 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error getting posts", { status: 500 });
  }
}
