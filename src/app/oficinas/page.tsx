'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContentWithImage from '@/components/ContentWithImage'
import './oficinas.css'

interface OficinasContent {
  hero: {
    image: string
    title: string
  }
  sections: Array<{
    id: string
    title: string
    text: string
    image: string
    imageAlt: string
    reverse: boolean
    features: string[]
    ctaText: string
    ctaHref: string
    order: number
    active: boolean
  }>
}

const STATIC_FALLBACK: OficinasContent = {
  hero: {
    image: '/uploads/2024/09/oficinas-hero.jpg',
    title: 'OFICINAS'
  },
  sections: [
    {
      id: 'flexibles',
      title: 'OFICINAS FLEXIBLES',
      text: 'En Manzana 40 existen muchos tipos de oficinas que se adecuan a las necesidades de cada empresa. Puedes optar por oficinas en obra gris, obra fina o proyectos llave en mano.',
      image: '/uploads/2024/09/oficina232.png',
      imageAlt: 'Oficinas Flexibles',
      reverse: false,
      features: ['Alquiler', 'Compra', 'Alquiler con opción a compra'],
      ctaText: 'Más Información',
      ctaHref: '#',
      order: 0,
      active: true
    },
    {
      id: 'dimension',
      title: 'Oficinas que se adaptan perfectamente a la dimensión de su empresa',
      text: 'Oficinas desde 56 a 960 m2. Diseñadas para brindar un ambiente de trabajo altamente estimulante. Espacios eficientes con amplia vista de la ciudad, una luminosidad controlada, y un sistema de ventanales que aislan el ruido y la temperatura. Todo apoyado con tecnología de punta que les permite contar con un gran soporte de redes digitales e Internet.',
      image: '/uploads/2024/09/sss.png',
      imageAlt: 'Oficinas adaptadas',
      reverse: true,
      features: ['Alquiler', 'Compra', 'Alquiler con opción a compra'],
      ctaText: 'Más Información',
      ctaHref: 'https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n',
      order: 1,
      active: true
    },
    {
      id: 'llave',
      title: 'Proyectos llave en mano',
      text: 'Olvídate de los problemas que trae consigo trasladarte de oficina o iniciar un nuevo proyecto y deja todo en manos de un equipo especializado, capaz de materializar tus sueños y convertirlos en una oficina funcional, diseñada a medida y con todo lo que tu negocio necesita para triunfar.',
      image: '/uploads/2024/09/323.jpg',
      imageAlt: 'Proyectos llave en mano',
      reverse: false,
      features: [],
      ctaText: 'Más Información',
      ctaHref: 'https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n',
      order: 2,
      active: true
    }
  ]
}

export default function OficinasPage() {
  const [content, setContent] = useState<OficinasContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/content/oficinas')
        if (response.ok) {
          const data = await response.json()
          if (data && data.sections && data.sections.length > 0) {
            setContent(data)
          } else {
            setContent(STATIC_FALLBACK)
          }
        } else {
          setContent(STATIC_FALLBACK)
        }
      } catch {
        setContent(STATIC_FALLBACK)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  const data = content || STATIC_FALLBACK
  const activeSections = (data.sections || [])
    .filter(s => s && s.active)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image={data.hero.image}
          title={data.hero.title}
          overlayEnabled={true}
          overlayOpacity={0.4}
          loading={loading}
        />

        {activeSections.map((section) => (
          <ContentWithImage
            key={section.id}
            title={section.title}
            text={section.text}
            image={section.image}
            imageAlt={section.imageAlt}
            reverse={section.reverse}
            features={section.features.map((f) => ({ text: f }))}
            ctaText={section.ctaText}
            ctaHref={section.ctaHref}
          />
        ))}
      </main>

      <Footer />
    </div>
  )
}
