import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentBlock from '@/components/ContentBlock'
import FeaturesSectionClient from '@/components/FeaturesSectionClient'

const STATIC_FALLBACK = {
  heroImage: '/static-assets/2024/09/slidernosotros.jpg',
  heroAlt: 'Nosotros',
  contentBlocks: [
    {
      title: 'Ubicación Privilegiada',
      text: 'Manzana 40 Plaza Empresarial, es un proyecto de clase mundial que nace de una alianza Estratégica entre dos grandes grupos empresariales: GRUPO H y GRUPO LAS LOMAS. Es un Proyecto arquitectónico elaborado por el prestigio estudio chileno A4 Arquitectos.\n\nVisto desde afuera, Manzana 40 es un complejo imponente, llamativo y moderno, digno de las grandes ciudades. Con 30 pisos minuciosamente construido lo convierte en un proyecto de indiscutible de calidad y buen gusto.\n\nLas torres, casi idénticas, se alzan hacia el cielo, dejando ver toda la grandeza de un proyecto que sin duda alguna marca un antes y un después de la urbe cruceña.',
      image: '/static-assets/2024/09/foto-oficina-ubicacion.jpg',
      imageAlt: 'Ubicación Privilegiada',
      reverse: false
    },
    {
      title: 'Edificación Sustentable',
      text: 'Manzana 40 es la primera edificación empresarial en Bolivia que cuenta con la certificación LEED (Leadership in Energy & Environmental Design), otorgada por el Consejo de la Construcción Verde de Estados Unidos (U.S. Green Building Council), que garantiza un edificio sostenible a lo largo del tiempo, ya que cumple con aspectos relacionados con altos estándares de eficiencia energética, mejora de la calidad ambiental interior, eficiencia en el consumo de agua, desarrollo sostenible de espacios libres y selección de materiales adecuados.',
      image: '/static-assets/2024/09/nosotro2.png',
      imageAlt: 'Edificación Sustentable',
      reverse: true
    },
    {
      title: 'La mayor plaza de parqueos',
      text: 'Manzana 40 cuenta con una generosa área dedicada a estacionamientos: 840 parqueos, 670 para propietarios y 170 para visitantes. Además, dispose de parqueos especiales para personas con discapacidad y espacios adicionales para motos y bicicletas.',
      image: '/static-assets/2024/09/nosotros33.png',
      imageAlt: 'Plaza de parqueos',
      reverse: false
    },
    {
      title: 'Bauleras o bodegas',
      text: 'Las empresas y comercios que requieren espacios adicionales para archivo pueden acceder a más de 70 bauleras o bodegas de distintos tamaños, que pueden adquirirse o alquilarseler.',
      image: '/static-assets/2024/09/nosotros44.png',
      imageAlt: 'Bauleras o bodegas',
      reverse: true
    }
  ],
  efficiencyItems: [
    {
      id: '1',
      icon: '/static-assets/2024/09/05-SISTEMA-DE-CLIMATIZACION-300x300-1.png',
      title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
      shortDesc: 'Una solución avanzada que optimiza el control de la temperatura',
      detailDesc: 'Sistema de climatización de última generación que permite un control preciso de la temperatura en todas las áreas del edificio, optimizando el consumo energético mientras mantiene un ambiente laboral confortable.',
      image: '/static-assets/2024/09/climatizacion-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    },
    {
      id: '2',
      icon: '/static-assets/2024/09/2.png',
      title: 'SISTEMA DE ENFRIAMIENTO DE SALAS DE COMPUTACIÓN',
      shortDesc: 'Es esencial para mantener la temperatura óptima de estas áreas críticas',
      detailDesc: 'Sistemas especializados de enfriamiento diseñados específicamente para salas de servidores y computación, garantizando que la temperatura se mantenga en niveles óptimos para el funcionamiento de equipos electrónicos sensibles.',
      image: '/static-assets/2024/09/enfriamiento-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    },
    {
      id: '3',
      icon: '/static-assets/2024/09/iconi3.png',
      title: 'SISTEMAS DE AIRE EXTERIOR',
      shortDesc: 'Es una parte vital de la ventilación y climatización',
      detailDesc: 'Sistema de ventilación que garantiza la renovación constante del aire interior con aire exterior filtrado, mejorando la calidad del ambiente laboral y reduciendo la concentración de contaminantes.',
      image: '/static-assets/2024/09/aire-exterior-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    },
    {
      id: '4',
      icon: '/static-assets/2024/09/oconin4.png',
      title: 'FACHADA VENTILADA',
      shortDesc: 'Se ha diseñado un sistema de revestimiento exterior',
      detailDesc: 'Fachada ventilada con paneles de doble vidrio que proporciona aislamiento térmico superior, reduciendo significativamente los costos de climatización y proporcionando un aspecto moderno y elegante.',
      image: '/static-assets/2024/09/fachada-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    },
    {
      id: '5',
      icon: '/static-assets/2024/09/iconin4.png',
      title: 'SISTEMA DE CONTROL CENTRALIZADO',
      shortDesc: 'Coordina y gestiona diversas funciones y sistemas dentro de la edificación',
      detailDesc: 'Sistema BMS (Building Management System) que permite el control y monitoreo centralizado de todos los sistemas del edificio, desde climatización hasta iluminación y seguridad.',
      image: '/static-assets/2024/09/control-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    },
    {
      id: '6',
      icon: '/static-assets/2024/09/iconin6.png',
      title: 'CANALIZACIÓN DE AGUAS DE LLUVIA',
      shortDesc: 'Un sistema de drenaje diseñado para capturar y dirigir el agua de lluvia lejos de la estructura',
      detailDesc: 'Sistema integral de drenaje que captura y dirige el agua de lluvia lejos de la estructura, previniendo filtraciones y daños por humedad mientras contribuye a la sostenibilidad ambiental.',
      image: '/static-assets/2024/09/drenaje-grande.jpg',
      ctaText: 'Ver más',
      ctaLink: ''
    }
  ]
}

async function getNosotrosContent() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const [nosotrosRes, efficiencyRes] = await Promise.all([
      fetch(`${baseUrl}/api/content/nosotros`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/content/efficiency`, { cache: 'no-store' })
    ])
    
    if (!nosotrosRes.ok) {
      console.error('Failed to fetch nosotros content, using fallback')
      return STATIC_FALLBACK
    }
    
    const data = await nosotrosRes.json()
    let efficiencyItems = []
    
    if (efficiencyRes.ok) {
      const efficiencyData = await efficiencyRes.json()
      efficiencyItems = Array.isArray(efficiencyData) ? efficiencyData : []
    }
    
    return {
      heroImage: data.hero?.image || STATIC_FALLBACK.heroImage,
      heroAlt: data.hero?.alt || STATIC_FALLBACK.heroAlt,
      contentBlocks: data.contentBlocks?.length > 0 ? data.contentBlocks : STATIC_FALLBACK.contentBlocks,
      efficiencyItems: efficiencyItems.length > 0 ? efficiencyItems : STATIC_FALLBACK.efficiencyItems
    }
  } catch (error) {
    console.error('Error fetching nosotros content:', error)
    return STATIC_FALLBACK
  }
}

export default async function NosotrosPage() {
  const content = await getNosotrosContent()

  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <section className="page-hero">
          <img 
            src={content.heroImage} 
            alt={content.heroAlt} 
            className="page-hero__image"
          />
        </section>

        {content.contentBlocks.map((block: { title: string; text: string; image: string; imageAlt: string; reverse: boolean }, index: number) => (
          <ContentBlock key={index} {...block} />
        ))}

        <FeaturesSectionClient items={content.efficiencyItems} />
      </main>

      <Footer />
    </div>
  )
}
