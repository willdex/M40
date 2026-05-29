'use client'

import { useState, useEffect } from 'react'
import MediaDisplay from './MediaDisplay'
import Modal, { ServiceModal } from './Modal'
import './DatabaseServices.css'

interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

interface DatabaseServicesProps {
  title?: string
  fallback?: Service[]
}

export default function DatabaseServices({ title, fallback }: DatabaseServicesProps) {
  const [services, setServices] = useState<Service[]>(fallback || [])
  const [loading, setLoading] = useState(!fallback)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/content/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="database-services">
        <div className="database-services__header">
          {title && <h2 className="database-services__title">{title}</h2>}
        </div>
        <div className="database-services__grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="database-services__card database-services__card--loading">
              <div className="database-services__card-image-placeholder" />
              <div className="database-services__card-content">
                <div className="database-services__card-title-placeholder" />
                <div className="database-services__card-desc-placeholder" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section className="database-services">
      {title && (
        <div className="database-services__header">
          <h2 className="database-services__title">{title}</h2>
        </div>
      )}
      <div className="database-services__grid">
        {services.map((service) => (
          <div key={service.id} className="database-services__card">
            <div className="database-services__card-image">
              <MediaDisplay
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="database-services__card-img"
              />
            </div>
            <div className="database-services__card-content">
              <h3 className="database-services__card-title">{service.title}</h3>
              <p className="database-services__card-description">{service.description}</p>
              {service.href && (
                <button 
                  className="database-services__card-btn"
                  onClick={() => setSelectedService(service)}
                >
                  Ver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        size="medium"
      >
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </Modal>
    </section>
  )
}