import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    if (page === 'nosotros') {
      const [contentBlocks, features] = await Promise.all([
        getPrisma().contentBlock.findMany({
          where: { page: 'nosotros', active: true },
          orderBy: { order: 'asc' }
        }),
        getPrisma().feature.findMany({
          where: { active: true },
          orderBy: { order: 'asc' }
        })
      ])
      return NextResponse.json({ contentBlocks, features })
    }

    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { page, type, data } = body

    if (page === 'nosotros' && type === 'contentBlock') {
      const { title, content, image, imageAlt, reverse, order } = data
      const block = await getPrisma().contentBlock.create({
        data: {
          page: 'nosotros',
          title,
          content,
          image: image || '',
          imageAlt: imageAlt || '',
          reverse: reverse || false,
          order: order || 0,
          active: true
        }
      })
      return NextResponse.json({ success: true, data: block })
    }

    if (page === 'nosotros' && type === 'feature') {
      const { sectionTitle, icon, title, description, order } = data
      const feature = await getPrisma().feature.create({
        data: {
          sectionTitle: sectionTitle || null,
          icon,
          title,
          description,
          order: order || 0,
          active: true
        }
      })
      return NextResponse.json({ success: true, data: feature })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Content create error:', error)
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (type === 'contentBlock') {
      const { id, title, content, image, imageAlt, reverse, order, active } = data
      const block = await getPrisma().contentBlock.update({
        where: { id },
        data: { title, content, image, imageAlt, reverse, order, active }
      })
      return NextResponse.json({ success: true, data: block })
    }

    if (type === 'feature') {
      const { id, sectionTitle, icon, title, description, order, active } = data
      const feature = await getPrisma().feature.update({
        where: { id },
        data: { sectionTitle, icon, title, description, order, active }
      })
      return NextResponse.json({ success: true, data: feature })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!id || !type) {
      return NextResponse.json({ error: 'ID and type required' }, { status: 400 })
    }

    if (type === 'contentBlock') {
      await getPrisma().contentBlock.delete({ where: { id } })
    } else if (type === 'feature') {
      await getPrisma().feature.delete({ where: { id } })
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Content delete error:', error)
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}
