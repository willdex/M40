'use client'

interface HomePhoneCTAProps {
  phone?: string
  title?: string
}

export default function HomePhoneCTA({
  phone = '+591 71369822',
  title = 'Agenda tu visita'
}: HomePhoneCTAProps) {
  return (
    <section className="home-phone-cta">
      <div className="home-phone-cta__container">
        <div className="home-phone-cta__icon">
          <img src="/static-assets/2024/09/choice-phn-icon.png" alt="Phone" />
        </div>
        <div className="home-phone-cta__content">
          <h3 className="home-phone-cta__title">{title}</h3>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="home-phone-cta__phone">
            {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
