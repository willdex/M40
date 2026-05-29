'use client'

import './PageHero.css'

interface PageHeroProps {
  image: string
  title?: string
  alt?: string
  overlayOpacity?: number
  overlayEnabled?: boolean
  loading?: boolean
}

export default function PageHero({
  image,
  title = '',
  alt = '',
  overlayOpacity = 0.4,
  overlayEnabled = true,
  loading = false
}: PageHeroProps) {
  if (loading) {
    return (
      <section className="page-hero page-hero--loading">
        <div className="page-hero__placeholder" />
      </section>
    )
  }

  return (
    <section className="page-hero">
      {overlayEnabled && (
        <div
          className="page-hero__overlay"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <img
        src={image}
        alt={alt || title}
        className="page-hero__image"
        onError={(e) => {
          e.currentTarget.src = '/uploads/2024/09/slidernosotros.jpg'
        }}
      />
    </section>
  )
}
