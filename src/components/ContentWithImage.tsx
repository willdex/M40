interface FeatureItem {
  text: string
}

interface ContentWithImageProps {
  title: string
  subtitle?: string
  text: string
  image: string
  imageAlt: string
  reverse?: boolean
  features?: FeatureItem[]
  ctaText?: string
  ctaHref?: string
}

export default function ContentWithImage({
  title,
  subtitle,
  text,
  image,
  imageAlt,
  reverse = false,
  features = [],
  ctaText,
  ctaHref = '#'
}: ContentWithImageProps) {
  return (
    <section className={`content-with-image ${reverse ? 'content-with-image--reverse' : ''}`}>
      <div className="content-with-image__image">
        <img src={image} alt={imageAlt} />
      </div>
      <div className="content-with-image__content">
        <h2 className="content-with-image__title">{title}</h2>
        {subtitle && <p className="content-with-image__subtitle">{subtitle}</p>}
        <p className="content-with-image__text">{text}</p>
        
        {features.length > 0 && (
          <ul className="content-with-image__features">
            {features.map((feature, index) => (
              <li key={index} className="content-with-image__feature">
                <span className="content-with-image__feature-icon">▸</span>
                {feature.text}
              </li>
            ))}
          </ul>
        )}
        
        {ctaText && (
          <a href={ctaHref} className="content-with-image__cta">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
