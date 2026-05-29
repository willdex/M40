'use client'

import Image from 'next/image'

interface EfficiencyItem {
  id: string
  icon: string
  title: string
  shortDesc: string
  detailDesc: string
  image: string
  ctaText: string
  ctaLink: string
}

interface FeaturesSectionProps {
  items: EfficiencyItem[]
  onItemClick?: (item: EfficiencyItem) => void
}

export default function FeaturesSection({ items, onItemClick }: FeaturesSectionProps) {
  return (
    <section className="features-section">
      <h2 className="features-section__title">DISEÑO PENSADO EN EL AHORRO</h2>
      <div className="features-grid">
        {items.map((item, index) => (
          <article key={item.id || index} className="feature-card">
            <figure className="feature-card__icon">
              <Image src={item.icon} alt={item.title} width={300} height={300} />
            </figure>
            <h3 className="feature-card__title">{item.title}</h3>
            <p className="feature-card__description">{item.shortDesc}</p>
            <button 
              className="feature-card__button"
              onClick={() => onItemClick?.(item)}
            >
              {item.ctaText || 'Ver'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
