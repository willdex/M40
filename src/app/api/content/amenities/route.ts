import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(amenities)
  } catch (error) {
    console.error('Amenities fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch amenities' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, icon, order = 0, active = true } = body

    const amenity = await prisma.amenity.create({
      data: { title, description, icon, order, active }
    })

    return NextResponse.json({ success: true, data: amenity })
  } catch (error) {
    console.error('Amenity create error:', error)
    return NextResponse.json({ error: 'Failed to create amenity' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, icon, order, active } = body

    const amenity = await prisma.amenity.update({
      where: { id },
      data: { title, description, icon, order, active }
    })

    return NextResponse.json({ success: true, data: amenity })
  } catch (error) {
    console.error('Amenity update error:', error)
    return NextResponse.json({ error: 'Failed to update amenity' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.amenity.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Amenity delete error:', error)
    return NextResponse.json({ error: 'Failed to delete amenity' }, { status: 500 })
  }
}