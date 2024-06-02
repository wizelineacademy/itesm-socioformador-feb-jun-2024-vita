import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db/drizzle'
import { posts } from '@/src/db/schema/schema'
import { writeFile } from 'fs/promises'
import path from 'path'
import { createS3Url, deleteS3Image } from '@/src/lib/s3/buckets'
import config from '@/src/lib/environment/config'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json('ID parameter is missing', { status: 400 })
    }

    const res = await db
      .select()
      .from(posts)
      .where(eq(posts.idPost, Number(id)))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error get posts ', { status: 400 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const formData = await request.formData()

    const caption = formData.get('caption') as string
    const tag = formData.get('tag') as string
    const postPhotoFile = formData.get('postPhoto') as File
    const postPhotoString = formData.get('postPhoto') as string

    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.idPost, Number(id)))

    // Actualizar solo caption y tag si no se proporciona una nueva foto
    if (!postPhotoFile || postPhotoString === '/') {
      await db
        .update(posts)
        .set({
          caption: caption,
          tag: tag,
        })
        .where(eq(posts.idPost, Number(id)))

      return NextResponse.json('Post caption and tag updated successfully', {
        status: 200,
      })
    }

    let postPhotoUrl

    if (config.nodeEnv === 'production') {
      //delete previous image
      if (existingPost[0].postPhoto) {
        const res = await deleteS3Image(existingPost[0].postPhoto)
        if (!res.success) {
          throw Error('Could not delete image')
        }
      }

      //upload image to S3
      const image = await fetch(await createS3Url(), {
        body: postPhotoFile,
        method: 'PUT',
        headers: {
          'Content-Type': postPhotoFile.type ?? 'json',
          'Content-Length': postPhotoFile.size.toString(),
        },
      })
      postPhotoUrl = image.url.split('?')[0]
    } else {
      //upload image to local directory
      const currentWorkingDirectory = process.cwd()
      const buffer = Buffer.from(await postPhotoFile.arrayBuffer())
      const postPhotoName = `${postPhotoFile.name}`
      const postPhotoPath = path.join(
        currentWorkingDirectory,
        'public',
        'uploads',
        postPhotoName,
      )
      await writeFile(postPhotoPath, buffer)
      postPhotoUrl = `/uploads/${postPhotoName}`
    }

    await db
      .update(posts)
      .set({
        caption: caption,
        tag: tag,
        postPhoto: postPhotoUrl,
      })
      .where(eq(posts.idPost, Number(id)))

    return NextResponse.json('Post updated successfully', { status: 200 })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json('Error updating post', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json('ID parameter is missing', { status: 400 })
    }

    await db.delete(posts).where(eq(posts.idPost, Number(id)))

    return NextResponse.json('Post deleted successfully', { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error deleting post', { status: 500 })
  }
}
