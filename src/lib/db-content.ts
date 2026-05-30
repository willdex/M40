import { getPrisma } from '@/lib/prisma'

export async function getHomepageContent() {
  const prisma = getPrisma()
  
  const [meta, services, amenities, footer, heroes] = await Promise.all([
    prisma.siteMeta.findMany(),
    prisma.service.findMany({ 
      where: { active: true },
      orderBy: { order: 'asc' } 
    }),
    prisma.amenity.findMany({ 
      where: { active: true },
      orderBy: { order: 'asc' } 
    }),
    prisma.footerContent.findFirst(),
    prisma.hero.findMany({ 
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

  return {
    hero: {
      title: homepageHero.title || metaMap.homepage_heroTitle || '',
      subtitle: homepageHero.subtitle || metaMap.homepage_heroSubtitle || '',
      video: homepageHero.videoSrc || metaMap.homepage_heroVideo || '',
      poster: homepageHero.posterSrc || metaMap.homepage_heroPoster || ''
    },
    contactPhone: metaMap.homepage_contactPhone || '',
    featuresTitle: metaMap.homepage_featuresTitle || '',
    amenitiesTitle: metaMap.homepage_amenitiesTitle || '',
    videoSection1: {
      url: metaMap.homepage_videoSection1_url || '/static-assets/videos/VideoHomeage.mp4',
      poster: metaMap.homepage_videoSection1_poster || '/static-assets/revslider/video-media/slider_1_layer.jpg'
    },
    videoSection2: {
      url: metaMap.homepage_videoSection2_url || '',
      poster: metaMap.homepage_videoSection2_poster || '/static-assets/2024/09/hyperportada.jpg'
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
  }
}

export async function getNosotrosContent() {
  const prisma = getPrisma()
  
  const [hero, contentBlocks, features, siteMeta] = await Promise.all([
    prisma.hero.findFirst({
      where: { page: 'nosotros', active: true },
      orderBy: { order: 'asc' }
    }),
    prisma.contentBlock.findMany({
      where: { page: 'nosotros', active: true },
      orderBy: { order: 'asc' }
    }),
    prisma.feature.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    }),
    prisma.siteMeta.findMany({
      where: { key: { startsWith: 'nosotros_' } }
    })
  ])

  const metaMap: Record<string, string> = {}
  siteMeta.forEach(item => {
    metaMap[item.key] = item.value
  })

  const featuresTitle = metaMap.nosotros_featuresTitle || 'DISEÑO PENSADO EN EL AHORRO'

  return {
    hero: hero ? {
      image: hero.videoSrc || '',
      alt: hero.alt || 'Nosotros'
    } : {
      image: metaMap.nosotros_heroImage || '/static-assets/2024/09/slidernosotros.jpg',
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
  }
}

export async function getOficinasContent() {
  const prisma = getPrisma()

  const [hero, sections] = await Promise.all([
    prisma.hero.findFirst({
      where: { page: 'oficinas', active: true }
    }),
    prisma.contentBlock.findMany({
      where: { page: 'oficinas', active: true },
      orderBy: { order: 'asc' }
    })
  ])

  return {
    hero: {
      image: hero?.posterSrc || hero?.videoSrc || '/static-assets/2024/09/oficinas-hero.jpg',
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
}

export async function getEfficiencyContent() {
  const prisma = getPrisma()

  const items = await prisma.efficiencyItem.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })

  return items.map(ei => ({
    id: ei.id,
    icon: ei.icon,
    title: ei.title,
    shortDesc: ei.shortDesc,
    detailDesc: ei.detailDesc,
    image: ei.image,
    ctaText: ei.ctaText,
    ctaLink: ei.ctaLink
  }))
}
