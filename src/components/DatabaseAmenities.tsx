'use client'

import Image from 'next/image'
import './DatabaseAmenities.css'

interface Amenity {
  id: string
  title: string
  description: string
  icon: string
  order?: number
  active?: boolean
}

interface DatabaseAmenitiesProps {
  title?: string
  fallback?: Amenity[]
}

export default function DatabaseAmenities({ title, fallback }: DatabaseAmenitiesProps) {
  const amenities = fallback || []

  if (amenities.length === 0) {
    return null
  }

  const sortedAmenities = [...amenities].sort((a, b) => (a.order || 0) - (b.order || 0))
  const activeAmenities = sortedAmenities.filter(a => a.active !== false)

  if (activeAmenities.length === 0) {
    return null
  }

  return (
    <section className="database-amenities">
      {title && (
        <h2 className="database-amenities__title">{title}</h2>
      )}
      <div className="database-amenities__grid">
        {activeAmenities.map((amenity) => (
          <article key={amenity.id} className="amenity-card">
            <figure className="amenity-card__icon">
              <Image src={amenity.icon} alt={amenity.title} width={300} height={300} />
            </figure>
            <h3 className="amenity-card__title">{amenity.title}</h3>
            <p className="amenity-card__description">{amenity.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
