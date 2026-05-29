'use client'

import { useState, useEffect } from 'react'
import MediaDisplay from './MediaDisplay'
import './DatabaseHero.css'

interface HeroData {
  title: string
  subtitle: string
  video: string
  poster: string
}

interface DatabaseHeroProps {
  fallback?: HeroData
}

export default function DatabaseHero({ fallback }: DatabaseHeroProps) {
  const [hero, setHero] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch('/api/content/homepage')
        if (response.ok) {
          const data = await response.json()
          if (data.hero && data.hero.title) {
            setHero(data.hero)
            console.log('[DatabaseHero] Fetched hero from API:', data.hero.title)
          }
        }
      } catch (error) {
        console.error('[DatabaseHero] Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHero()
  }, [])

  const content = hero || fallback

  if (loading) {
    return (
      <section className="database-hero database-hero--loading">
        <div className="database-hero__placeholder" />
      </section>
    )
  }

  if (!content) {
    console.log('[DatabaseHero] No content available, returning null')
    return null
  }

  console.log('[DatabaseHero] Rendering hero:', content.title ? 'YES title' : 'NO title', content.video ? 'YES video' : 'NO video')

  return (
    <section className="database-hero">
      <div className="database-hero__media">
        {content.video ? (
          <video
            className="database-hero__video"
            src={content.video}
            autoPlay
            muted
            loop
            playsInline
            poster={content.poster}
          />
        ) : content.poster ? (
          <MediaDisplay
            src={content.poster}
            alt="Hero"
            fill
            priority
            className="database-hero__image"
          />
        ) : null}
        <div className="database-hero__overlay" />
      </div>
      <div className="database-hero__content">
        <div className="database-hero__content-inner">
          {content.title && (
            <h1 className="database-hero__title">{content.title}</h1>
          )}
          {content.subtitle && (
            <p className="database-hero__subtitle">{content.subtitle}</p>
          )}
        </div>
      </div>
    </section>
  )
}