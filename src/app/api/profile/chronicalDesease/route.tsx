import { NextResponse } from 'next/server'
import { db } from '@/src/db/drizzle'
import { chronicalDesease } from '@/src/db/schema/schema'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { idMedicalProfile, name } = body

    // Initialize insertValues with the correct values
    const insertValues = {
      idMedicalProfile: Number(idMedicalProfile),
      name: name,
    }

    // Insert values into the database
    const res = await db.insert(chronicalDesease).values(insertValues)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error posting chronical desease', { status: 400 })
  }
}
