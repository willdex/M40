import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const sections = await getPrisma().homepageEditorial.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(sections)
  } catch (error) {
    console.error('Homepage editorial fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch editorial sections' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, title, subtitle, paragraph, image, images, active = true, order = 0 } = body

    const section = await getPrisma().homepageEditorial.create({
      data: { type, title, subtitle, paragraph, image, images, active, order }
    })

    return NextResponse.json({ success: true, data: section })
  } catch (error) {
    console.error('Homepage editorial create error:', error)
    return NextResponse.json({ error: 'Failed to create editorial section' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, type, title, subtitle, paragraph, image, images, active, order } = body

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const section = await getPrisma().homepageEditorial.update({
      where: { id },
      data: { type, title, subtitle, paragraph, image, images, active, order }
    })

    return NextResponse.json({ success: true, data: section })
  } catch (error) {
    console.error('Homepage editorial update error:', error)
    return NextResponse.json({ error: 'Failed to update editorial section' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await getPrisma().homepageEditorial.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Homepage editorial delete error:', error)
    return NextResponse.json({ error: 'Failed to delete editorial section' }, { status: 500 })
  }
}
