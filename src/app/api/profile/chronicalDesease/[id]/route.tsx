import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/src/db/drizzle'
import { chronicalDesease } from '@/src/db/schema/schema'

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
      .from(chronicalDesease)
      .where(eq(chronicalDesease.idMedicalProfile, Number(id)))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error get chronical desease', { status: 400 })
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
    console.log(id)
    const res = await db
      .delete(chronicalDesease)
      .where(eq(chronicalDesease.idChronicalDesease, Number(id)))

    return NextResponse.json('Chronical Desease deleted successfully', {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error deleting chronical desease', {
      status: 400,
    })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json('ID parameter is missing', { status: 400 })
    }

    const body = await request.json()

    const { name } = body

    // Initialize insertValues with the correct values
    const insertValues = {
      name: name,
    }

    const res = await db
      .update(chronicalDesease)
      .set({
        name: insertValues.name,
      })
      .where(eq(chronicalDesease.idChronicalDesease, Number(id)))

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error editing chronical desease', { status: 400 })
  }
}
