import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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
    console.error('Homepage content update error:', error)
    return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [meta, services, amenities, footer, heroes] = await Promise.all([
      getPrisma().siteMeta.findMany(),
      getPrisma().service.findMany({ 
        where: { active: true },
        orderBy: { order: 'asc' } 
      }),
      getPrisma().amenity.findMany({ 
        where: { active: true },
        orderBy: { order: 'asc' } 
      }),
      getPrisma().footerContent.findFirst(),
      getPrisma().hero.findMany({ 
        where: { page: 'homepage', active: true },
        orderBy: { order: 'asc' },
        take: 1
      })
    ])

    const metaMap: Record<string, string> = {}
    meta.forEach(item => {
      metaMap[item.key] = item.value
    })

    const homepageHero = heroes[0] || {
      title: metaMap.homepage_heroTitle || '',
      subtitle: metaMap.homepage_heroSubtitle || '',
      videoSrc: metaMap.homepage_heroVideo || '',
      posterSrc: metaMap.homepage_heroPoster || ''
    }

    return NextResponse.json({
      hero: {
        title: homepageHero.title || metaMap.homepage_heroTitle || '',
        subtitle: homepageHero.subtitle || metaMap.homepage_heroSubtitle || '',
        video: homepageHero.videoSrc || metaMap.homepage_heroVideo || '',
        poster: homepageHero.posterSrc || metaMap.homepage_heroPoster || ''
      },
      contactPhone: metaMap.homepage_contactPhone || '',
      featuresTitle: metaMap.homepage_featuresTitle || '',
      amenitiesTitle: metaMap.homepage_amenitiesTitle || '',
      videoSection: {
        title: metaMap.homepage_videoSectionTitle || '',
        youtubeUrl: metaMap.homepage_videoSectionYoutube || '',
        poster: metaMap.homepage_videoSectionPoster || ''
      },
      services: services.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        image: s.image,
        href: s.href
      })),
      amenities: amenities.map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        icon: a.icon
      })),
      footer: footer ? {
        aboutTitle: footer.aboutTitle,
        aboutText: footer.aboutText,
        servicesTitle: footer.servicesTitle,
        contactTitle: footer.contactTitle,
        address: footer.address,
        phone: footer.phone,
        email: footer.email,
        facebook: footer.facebook,
        instagram: footer.instagram
      } : null
    })
  } catch (error) {
    console.error('Homepage content fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch homepage content' }, { status: 500 })
  }
}