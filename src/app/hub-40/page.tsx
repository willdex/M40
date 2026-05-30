import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContentWithImage from '@/components/ContentWithImage'

const benefits = [
  { icon: '/static-assets/2024/09/ICON1HUB.png', title: 'Accesos 24/7' },
  { icon: '/static-assets/2024/09/HUB403.png', title: 'Ingreso seguro' },
  { icon: '/static-assets/2024/09/HUB404.png', title: 'Cafeteria' },
  { icon: '/static-assets/2024/09/HUB4000.png', title: 'Salas de reuniones' },
  { icon: '/static-assets/2024/09/HUB40032.png', title: 'Impresiones disponibles' },
  { icon: '/static-assets/2024/09/HUB405.png', title: 'WiFi ilimitado' }
]

const reasons = [
  { title: 'Flexibilidad', description: 'Te ofrecemos espacios listos para ser utilizados, con las comodidades de una oficina y una atención que te hará sentir como en casa.' },
  { title: 'Adaptabilidad', description: 'Nos adaptamos a todas tus necesidades.' },
  { title: 'Te escuchamos', description: 'Nuestro equipo es el aliado que tu empresa necesita.' },
  { title: 'Asesoría', description: 'Los office managers se preocupan por generar un entorno ideal de trabajo y brindarte una excelente experiencia.' }
]

const membershipFeatures = [
  'Salas de reuniones',
  'Acceso 24/7',
  'Impresora',
  'Cafetería'
]

export default function Hub40Page() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image="/static-assets/2024/09/hub40-hero.jpg"
          title="Hub 40"
          overlayEnabled={true}
          overlayOpacity={0.4}
        />

        <section className="hub-why">
          <div className="hub-why__container">
            <div className="hub-why__image">
              <img src="/static-assets/2024/09/HUB401-2048x1153.png" alt="Hub 40" />
            </div>
            <div className="hub-why__content">
              <h2 className="hub-why__title">¿POR QUÉ ELEGIRNOS?</h2>
              <p className="hub-why__subtitle">La mejor experiencia en Cowork</p>
              <div className="hub-why__list">
                {reasons.map((reason, index) => (
                  <div key={index} className="hub-why__item">
                    <span className="hub-why__icon">✓</span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="hub-benefits">
          <div className="hub-benefits__container">
            <h2 className="hub-benefits__title">Hub 40 la mejor experiencia para los coworkers</h2>
            <h3 className="hub-benefits__subtitle">Conoce nuestros beneficios</h3>
            <div className="hub-benefits__grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="hub-benefit">
                  <img src={benefit.icon} alt={benefit.title} />
                  <h4>{benefit.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContentWithImage
          title="Sistema de Membresías"
          subtitle="únete"
          text="En nuestro cowork encontrarás una variedad de espacios adaptados a tus necesidades, desde escritorios compartidos hasta oficinas privadas. Contamos con cuatro membresías disponibles que incluyen:"
          image="/static-assets/2024/09/DSC08027.png"
          imageAlt="Hub 40 Cowork"
          features={membershipFeatures.map(f => ({ text: f }))}
          ctaText="Cotiza Aquí"
          ctaHref="https://www.hub40.com.bo/"
        />

        <section className="hub-cta">
          <div className="hub-cta__container">
            <h2>SE PARTE DEL NUEVO ESPACIO DE HUB40 EN EL PISO 10<br/>RESERVA TU ESPACIO AQUÍ</h2>
            <a href="https://wa.link/ux947r" className="hub-cta__button">Reservar</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
