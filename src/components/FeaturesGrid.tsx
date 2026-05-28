import Image from 'next/image'

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesGridProps {
  title: string
  features: Feature[]
}

export default function FeaturesGrid({ title, features }: FeaturesGridProps) {
  return (
    <section className="features-section">
      <h2 className="features-section__title">{title}</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <article key={index} className="feature-card">
            <figure className="feature-card__icon">
              <Image src={feature.icon} alt={feature.title} width={300} height={300} />
            </figure>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__description">{feature.description}</p>
            <button className="feature-card__button">Ver</button>
          </article>
        ))}
      </div>
    </section>
  )
}
