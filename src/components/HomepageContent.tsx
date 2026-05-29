'use client'

import { useState, useEffect } from 'react'
import DatabaseHero from './DatabaseHero'
import DatabaseServices from './DatabaseServices'
import DatabaseAmenities from './DatabaseAmenities'
import './HomepageContent.css'

interface HomepageData {
  hero: {
    title: string
    subtitle: string
    video: string
    poster: string
  }
  contactPhone: string
  featuresTitle: string
  amenitiesTitle: string
  services: Array<{
    id: string
    title: string
    description: string
    image: string
    href: string
  }>
  amenities: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
}

const fallbackData: HomepageData = {
  hero: {
    title: 'LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS.',
    subtitle: 'Un ecosistema de posibilidades, un mundo de oportunidades para tu negocio. Ubicada en el corazón financiero de Santa Cruz, diseñada para impulsar tu empresa y conectar con los mejores líderes.',
    video: '/uploads/2024/09/Hyperlapse-Manzana-40.mp4',
    poster: '/uploads/revslider/video-media/slider_1_layer.jpg'
  },
  contactPhone: '+591 71369822',
  featuresTitle: 'UN ECOSISTEMA DE POSIBILIDADES, UN MUNDO DE OPORTUNIDADES PARA TU NEGOCIO',
  amenitiesTitle: 'UNA PLAZA EMPRESARIAL ÚNICA',
  services: [
    {
      id: 'oficinas',
      title: 'OFICINAS',
      description: 'En venta y alquiler',
      image: '/uploads/elementor/thumbs/oficinam1-qubpyhacvcdu7b4d9f6lkfcw815jlau932kh7qgsc0.jpg',
      href: '/oficinas'
    },
    {
      id: 'centro-de-negocios',
      title: 'CENTRO DE NEGOCIOS',
      description: 'Eventos Corporativos',
      image: '/uploads/2024/09/oficina2.jpg',
      href: '/centro-de-negocios'
    },
    {
      id: 'hub-40',
      title: 'HUB 40',
      description: 'Co-Work',
      image: '/uploads/2024/09/oficina3.jpg',
      href: '/hub-40'
    },
    {
      id: 'boca',
      title: 'BOCA MIXTURA',
      description: 'Boulevard Gastronómico',
      image: '/uploads/2024/09/oficina4.jpg',
      href: '/boca'
    },
    {
      id: 'amenidades',
      title: 'AMENIDADES',
      description: 'Pensadas en vos',
      image: '/uploads/2024/09/boutique.jpg',
      href: '/amenidades'
    }
  ],
  amenities: [
    {
      id: 'leed',
      title: 'CERTIFICACIÓN LEED',
      description: 'Que garantiza contar con un edificio sostenible en el tiempo.',
      icon: '/uploads/2024/09/building-icono.png'
    },
    {
      id: 'seguro',
      title: 'AMBIENTE SEGURO',
      description: 'Seguridad proactiva y sustentada por tecnología avanzada.',
      icon: '/uploads/2024/09/ambienteok.png'
    },
    {
      id: 'climatizacion',
      title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
      description: 'Esta tecnología permite generar un ahorro aproximado de 30% en el consumo eléctrico.',
      icon: '/uploads/2024/09/ico3.png'
    },
    {
      id: 'aire-exterior',
      title: 'SISTEMA DE AIRE EXTERIOR',
      description: 'Necesario para la renovación de oxígeno de las oficinas, será suministrado y filtrado por medio de ventiladores de inyección de aire.',
      icon: '/uploads/2024/09/ico4.png'
    },
    {
      id: 'muro-cortina',
      title: 'MURO CORTINA',
      description: 'Paneles de doble vidrio con cámara de aire por medio, para disminuir el ingreso del sol y optimizar el uso energético.',
      icon: '/uploads/2024/09/ico5.png'
    },
    {
      id: 'ascensores',
      title: '16 ASCENSORES',
      description: 'Los más rápidos del país.',
      icon: '/uploads/2024/09/icoi6.png'
    }
  ]
}

export default function HomepageContent() {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHomepage() {
      try {
        console.log('[HomepageContent] Fetching from /api/content/homepage...')
        const response = await fetch('/api/content/homepage')
        console.log('[HomepageContent] Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('[HomepageContent] Received data:', JSON.stringify(result, null, 2))
        
        if (result.error) {
          throw new Error(result.error)
        }
        
        setData(result)
        setError(null)
      } catch (err) {
        console.error('[HomepageContent] Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchHomepage()
  }, [])

  if (loading) {
    console.log('[HomepageContent] Rendering loading state')
    return (
      <div className="homepage-content homepage-content--loading">
        <div className="homepage-content__hero-placeholder" />
        <div className="homepage-content__section-placeholder" />
        <div className="homepage-content__section-placeholder" />
      </div>
    )
  }

  if (error) {
    console.log('[HomepageContent] Rendering error state:', error)
  }

  const content = data || fallbackData
  console.log('[HomepageContent] Rendering with content, data exists:', !!data)

  return (
    <div className="homepage-content">
      <DatabaseHero 
        fallback={content.hero}
      />
      
      <div className="homepage-content__intro">
        <div className="homepage-content__intro-content">
          <h2 className="homepage-content__intro-title">{content.hero.title}</h2>
          <p className="homepage-content__intro-subtitle">{content.hero.subtitle}</p>
          
          <div className="homepage-content__contact">
            <img 
              src="/uploads/2024/09/choice-phn-icon.png" 
              alt="Phone" 
              className="homepage-content__contact-icon"
            />
            <div>
              <h3 className="homepage-content__contact-label">Agenda tu Visita</h3>
              <p className="homepage-content__contact-phone">{content.contactPhone}</p>
            </div>
          </div>
        </div>
      </div>

      <DatabaseServices 
        title={content.featuresTitle}
        fallback={content.services}
      />

      <DatabaseAmenities 
        title={content.amenitiesTitle}
        fallback={content.amenities}
      />
    </div>
  )
}