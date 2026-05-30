'use client'

import { useState, useEffect } from 'react'

interface EditorialSection {
  id: string
  type: 'lifestyle' | 'community'
  title: string
  subtitle: string
  paragraph: string
  image: string
  images: string
  active: boolean
  order: number
}

const FALLBACK_LIFESTYLE: EditorialSection = {
  id: 'fallback-lifestyle',
  type: 'lifestyle',
  title: 'UN ESPACIO QUE IMPULSA\nLA FORMA EN QUE TRABAJAS',
  subtitle: '',
  paragraph: 'Más que oficinas, Manzana 40 propone un entorno diseñado para conectar productividad, bienestar y experiencias. Un lugar donde cada espacio impulsa nuevas ideas, relaciones y oportunidades.',
  image: '/static-assets/2024/09/boca22.jpg',
  images: '[]',
  active: true,
  order: 0
}

const FALLBACK_COMMUNITY: EditorialSection = {
  id: 'fallback-community',
  type: 'community',
  title: 'UNA COMUNIDAD QUE\nGENERA OPORTUNIDADES',
  subtitle: '',
  paragraph: 'Empresas, profesionales y marcas conviven en un entorno pensado para generar conexiones reales, colaboración y crecimiento.',
  image: '',
  images: JSON.stringify(['/static-assets/2024/09/ofic33.jpg', '/static-assets/2024/09/reuniion1-2048x1315.jpg', '/static-assets/2024/09/HUB401-2048x1153.png']),
  active: true,
  order: 1
}

export default function HomepageEditorials() {
  const [lifestyle, setLifestyle] = useState<EditorialSection | null>(null)
  const [community, setCommunity] = useState<EditorialSection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEditorials() {
      try {
        const response = await fetch('/api/content/homepage-editorial', {
          cache: 'no-store'
        })
        if (response.ok) {
          const data: EditorialSection[] = await response.json()
          const activeSections = data.filter(s => s.active)

          const lifestyleSection = activeSections.find(s => s.type === 'lifestyle') || FALLBACK_LIFESTYLE
          const communitySection = activeSections.find(s => s.type === 'community') || FALLBACK_COMMUNITY

          setLifestyle(lifestyleSection)
          setCommunity(communitySection)
        } else {
          setLifestyle(FALLBACK_LIFESTYLE)
          setCommunity(FALLBACK_COMMUNITY)
        }
      } catch (error) {
        console.error('Failed to fetch editorial sections:', error)
        setLifestyle(FALLBACK_LIFESTYLE)
        setCommunity(FALLBACK_COMMUNITY)
      } finally {
        setLoading(false)
      }
    }

    fetchEditorials()
  }, [])

  if (loading || !lifestyle || !community) {
    return null
  }

  return (
    <>
      <section className="homepage-editorial">
        <div className="homepage-editorial__container">
          <div className="homepage-editorial__image-wrapper">
            <img
              className="homepage-editorial__image"
              src={lifestyle.image || FALLBACK_LIFESTYLE.image}
              alt="Manzana40 Lifestyle"
              loading="lazy"
            />
          </div>
          <div className="homepage-editorial__content">
            <h2 className="homepage-editorial__title">
              {lifestyle.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p className="homepage-editorial__text">
              {lifestyle.paragraph}
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-community">
        <div className="homepage-community__container">
          <div className="homepage-community__header">
            <h2 className="homepage-community__title">
              {community.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p className="homepage-community__text">
              {community.paragraph}
            </p>
          </div>
          <div className="homepage-community__grid">
            {(JSON.parse(community.images || '[]') as string[]).length > 0 ? (
              (JSON.parse(community.images || '[]') as string[]).map((img: string, index: number) => (
                <div key={index} className="homepage-community__item">
                  <img className="homepage-community__img" src={img} alt={`Manzana40 Community ${index + 1}`} loading="lazy" />
                </div>
              ))
            ) : (
              <>
                <div className="homepage-community__item">
                  <img className="homepage-community__img" src="/static-assets/2024/09/ofic33.jpg" alt="Manzana40 Business" loading="lazy" />
                </div>
                <div className="homepage-community__item">
                  <img className="homepage-community__img" src="/static-assets/2024/09/reuniion1-2048x1315.png" alt="Manzana40 Networking" loading="lazy" />
                </div>
                <div className="homepage-community__item">
                  <img className="homepage-community__img" src="/static-assets/2024/09/HUB401-2048x1153.png" alt="Manzana40 Community" loading="lazy" />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
