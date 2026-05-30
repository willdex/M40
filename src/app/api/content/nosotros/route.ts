import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const [hero, contentBlocks, features, siteMeta] = await Promise.all([
      getPrisma().hero.findFirst({
        where: { page: 'nosotros', active: true },
        orderBy: { order: 'asc' }
      }),
      getPrisma().contentBlock.findMany({
        where: { page: 'nosotros', active: true },
        orderBy: { order: 'asc' }
      }),
      getPrisma().feature.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
      }),
      getPrisma().siteMeta.findMany({
        where: { key: { startsWith: 'nosotros_' } }
      })
    ])

    const metaMap: Record<string, string> = {}
    siteMeta.forEach(item => {
      metaMap[item.key] = item.value
    })

    const featuresTitle = metaMap.nosotros_featuresTitle || 'DISEÑO PENSADO EN EL AHORRO'

    return NextResponse.json({
      hero: hero ? {
        image: hero.videoSrc || '',
        alt: hero.alt || 'Nosotros'
      } : {
        image: metaMap.nosotros_heroImage || '/uploads/2024/09/slidernosotros.jpg',
        alt: metaMap.nosotros_heroAlt || 'Nosotros'
      },
      contentBlocks: contentBlocks.map(block => ({
        id: block.id,
        title: block.title,
        text: block.content,
        image: block.image || '',
        imageAlt: block.imageAlt || '',
        reverse: block.reverse
      })),
      featuresTitle,
      features: features.map(f => ({
        id: f.id,
        icon: f.icon,
        title: f.title,
        description: f.description
      }))
    })
  } catch (error) {
    console.error('Nosotros content fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch nosotros content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json()
    
    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value required' }, { status: 400 })
    }

    await getPrisma().siteMeta.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Nosotros content update error:', error)
    return NextResponse.json({ error: 'Failed to update nosotros content' }, { status: 500 })
  }
}
