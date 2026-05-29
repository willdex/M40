'use client'

import { useState, useEffect } from 'react'
import Modal, { AmenityModal } from './Modal'
import './DatabaseAmenities.css'

interface Amenity {
  id: string
  title: string
  description: string
  icon: string
}

interface DatabaseAmenitiesProps {
  title?: string
  fallback?: Amenity[]
}

export default function DatabaseAmenities({ title, fallback }: DatabaseAmenitiesProps) {
  const [amenities, setAmenities] = useState<Amenity[]>(fallback || [])
  const [loading, setLoading] = useState(!fallback)
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null)

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch('/api/content/amenities')
        if (response.ok) {
          const data = await response.json()
          setAmenities(data)
        }
      } catch (error) {
        console.error('Failed to fetch amenities:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAmenities()
  }, [])

  if (loading) {
    return (
      <section className="database-amenities">
        {title && <h2 className="database-amenities__title">{title}</h2>}
        <div className="database-amenities__grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="database-amenities__item database-amenities__item--loading">
              <div className="database-amenities__icon-placeholder" />
              <div className="database-amenities__text-placeholder" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (amenities.length === 0) {
    return null
  }

  return (
    <section className="database-amenities">
      {title && (
        <h2 className="database-amenities__title">{title}</h2>
      )}
      <div className="database-amenities__grid">
        {amenities.map((amenity) => (
          <button 
            key={amenity.id}
            className="database-amenities__item"
            onClick={() => setSelectedAmenity(amenity)}
          >
            <div className="database-amenities__icon">
              <img 
                src={amenity.icon} 
                alt={amenity.title}
                className="database-amenities__icon-img"
              />
            </div>
            <span className="database-amenities__label">{amenity.title}</span>
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selectedAmenity}
        onClose={() => setSelectedAmenity(null)}
        size="small"
      >
        {selectedAmenity && (
          <AmenityModal 
            amenity={selectedAmenity} 
            onClose={() => setSelectedAmenity(null)} 
          />
        )}
      </Modal>
    </section>
  )
}