import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [hero, sections] = await Promise.all([
      prisma.hero.findFirst({
        where: { page: 'oficinas', active: true }
      }),
      prisma.contentBlock.findMany({
        where: { page: 'oficinas', active: true },
        orderBy: { order: 'asc' }
      })
    ])

    const result = {
      hero: {
        image: hero?.posterSrc || hero?.videoSrc || '/uploads/2024/09/oficinas-hero.jpg',
        title: hero?.title || 'OFICINAS'
      },
      sections: sections.map(s => ({
        id: s.sectionId || s.id,
        title: s.title,
        text: s.content,
        image: s.image || '',
        imageAlt: s.imageAlt || s.title,
        reverse: s.reverse,
        features: s.sectionId ? [] : [],
        ctaText: 'Más Información',
        ctaHref: 'https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n',
        order: s.order,
        active: s.active
      }))
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Oficinas content fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch oficinas content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { hero, sections } = await request.json()

    if (hero) {
      await prisma.hero.upsert({
        where: { id: hero.id || 'oficinas-hero' },
        update: {
          page: 'oficinas',
          title: hero.title || 'OFICINAS',
          posterSrc: hero.image,
          active: true
        },
        create: {
          id: 'oficinas-hero',
          page: 'oficinas',
          title: hero.title || 'OFICINAS',
          posterSrc: hero.image,
          active: true
        }
      })
    }

    if (sections && Array.isArray(sections)) {
      for (const section of sections) {
        if (section.id) {
          await prisma.contentBlock.updateMany({
            where: { id: section.id, page: 'oficinas' },
            data: {
              title: section.title,
              content: section.text,
              image: section.image,
              imageAlt: section.imageAlt,
              reverse: section.reverse || false,
              order: section.order || 0,
              active: section.active !== false
            }
          })
        } else if (section.title) {
          await prisma.contentBlock.create({
            data: {
              page: 'oficinas',
              sectionId: section.id || null,
              title: section.title,
              content: section.text || '',
              image: section.image || '',
              imageAlt: section.imageAlt || section.title,
              reverse: section.reverse || false,
              order: section.order || 0,
              active: section.active !== false
            }
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Oficinas content update error:', error)
    return NextResponse.json({ error: 'Failed to update oficinas content' }, { status: 500 })
  }
}
