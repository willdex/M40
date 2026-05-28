'use client'

import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

interface ServicesSectionProps {
  title: string
  services: Service[]
}

export default function ServicesSection({ title, services }: ServicesSectionProps) {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2 className="services-title">{title}</h2>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <Link 
            href={service.href} 
            key={service.id} 
            className="service-card"
          >
            <div 
              className="service-card-bg" 
              style={{ backgroundImage: `url(${service.image})` }}
              role="img"
              aria-label={service.title}
            />
            <div className="service-card-overlay" />
            <div className="service-card-content">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
