import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.efficiencyItem.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Efficiency items fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch efficiency items' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, shortDesc, detailDesc, image, icon, ctaText, ctaLink, order, active } = body

    const item = await prisma.efficiencyItem.create({
      data: {
        title,
        shortDesc: shortDesc || '',
        detailDesc: detailDesc || '',
        image: image || '',
        icon: icon || '',
        ctaText: ctaText || 'Ver más',
        ctaLink: ctaLink || '',
        order: order || 0,
        active: active !== false
      }
    })

    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error('Efficiency item create error:', error)
    return NextResponse.json({ error: 'Failed to create efficiency item' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, shortDesc, detailDesc, image, icon, ctaText, ctaLink, order, active } = body

    const item = await prisma.efficiencyItem.update({
      where: { id },
      data: {
        title,
        shortDesc: shortDesc || '',
        detailDesc: detailDesc || '',
        image: image || '',
        icon: icon || '',
        ctaText: ctaText || 'Ver más',
        ctaLink: ctaLink || '',
        order: order || 0,
        active: active !== false
      }
    })

    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    console.error('Efficiency item update error:', error)
    return NextResponse.json({ error: 'Failed to update efficiency item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.efficiencyItem.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Efficiency item delete error:', error)
    return NextResponse.json({ error: 'Failed to delete efficiency item' }, { status: 500 })
  }
}
