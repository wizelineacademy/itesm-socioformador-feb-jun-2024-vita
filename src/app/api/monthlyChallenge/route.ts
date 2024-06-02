import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { db } from '@/src/db/drizzle'
import { challengeSubmissions } from '@/src/db/schema/schema'
import { writeFile } from 'fs/promises'
import path from 'path'
import { eq, and } from 'drizzle-orm'
import { getMonthlyChallenge } from '@/src/db/functions/challenges'
import { createS3Url } from '@/src/lib/s3/buckets'
import config from '@/src/lib/environment/config'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const session = await getServerSession(authOptions)

    if (!session || !session.user || typeof session.user.id !== 'number') {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const description = formData.get('description') as string
    const imageUrlFile = formData.get('imageUrl') as File

    if (!imageUrlFile) {
      return NextResponse.json('Post photo is required', { status: 400 })
    }

    let photoUrl

    if (config.nodeEnv === 'production') {
      //upload image to S3
      const image = await fetch(await createS3Url(), {
        body: imageUrlFile,
        method: 'PUT',
        headers: {
          'Content-Type': imageUrlFile.type ?? 'json',
          'Content-Length': imageUrlFile.size.toString(),
        },
      })
      photoUrl = image.url.split('?')[0]
    } else {
      //upload image to local directory
      const currentWorkingDirectory = process.cwd()
      const buffer = Buffer.from(await imageUrlFile.arrayBuffer())
      const postPhotoName = `${imageUrlFile.name}`
      const postPhotoPath = path.join(
        currentWorkingDirectory,
        'public',
        'uploads',
        postPhotoName,
      )

      await writeFile(postPhotoPath, buffer)
      photoUrl = `/uploads/${postPhotoName}`
    }

    const challenge = await getMonthlyChallenge()

    if (!challenge || typeof challenge.idChallenge !== 'number') {
      return NextResponse.json('No current challenge found', { status: 400 })
    }

    const existingSubmission = await db
      .select()
      .from(challengeSubmissions)
      .where(
        and(
          eq(challengeSubmissions.idUser, session.user.id),
          eq(challengeSubmissions.idChallenge, challenge.idChallenge),
        ),
      )

    if (existingSubmission.length > 0) {
      return NextResponse.json(
        'You have already submitted for this challenge',
        { status: 400 },
      )
    }

    const challengeReponse = await db.insert(challengeSubmissions).values({
      idUser: session.user.id,
      idChallenge: challenge.idChallenge,
      imageUrl: photoUrl,
      description: description,
    })

    console.log(challengeReponse, 'Respuesta')
    return NextResponse.json(challengeReponse, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error posting user detail', { status: 400 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || typeof session.user.id !== 'number') {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const challenge = await getMonthlyChallenge()

    if (!challenge || typeof challenge.idChallenge !== 'number') {
      return NextResponse.json('No current challenge found', { status: 400 })
    }

    const submission = await db
      .select()
      .from(challengeSubmissions)
      .where(
        and(
          eq(challengeSubmissions.idUser, session.user.id),
          eq(challengeSubmissions.idChallenge, challenge.idChallenge),
        ),
      )

    if (!submission) {
      return NextResponse.json('Submission not found', { status: 404 })
    }

    return NextResponse.json(submission, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error fetching submission', { status: 500 })
  }
}
