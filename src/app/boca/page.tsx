import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContentWithImage from '@/components/ContentWithImage'

const galleryImages = [
  '/static-assets/2024/09/bocamixtura123-768x576-1.jpg',
  '/static-assets/2024/09/boca33.jpg',
  '/static-assets/2024/09/boca22.jpg'
]

const restaurantImages = [
  '/static-assets/2024/09/M40_TINTO.png',
  '/static-assets/2024/09/M40_HITO.png',
  '/static-assets/2024/09/M40_OMA.png',
  '/static-assets/2024/09/M40_JALEO.png',
  '/static-assets/2024/09/M40_MANGAROSA.png',
  '/static-assets/2024/09/M40_SERAFINA.png',
  '/static-assets/2024/09/M40_BERNADETTE.png'
]

export default function BocaPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image="/static-assets/2024/09/boca-hero.jpg"
          title="Boca Mixtura"
          overlayEnabled={true}
          overlayOpacity={0.4}
        />

        <ContentWithImage
          title="Boulevard Gastronómico"
          text="Situado en la planta baja, Boca Mixtura está diseñado para combinar el gusto con los negocios. Un conjunto de restaurantes de algunos de los mejores desarrolladores gastronómicos del país."
          image="/static-assets/2024/09/comida.jpg"
          imageAlt="Boulevard Gastronómico"
          ctaText="Más Información"
          ctaHref="https://bit.ly/oficinasm40"
        />

        <section className="boca-gallery">
          <div className="boca-gallery__grid">
            {galleryImages.map((src, index) => (
              <div key={index} className="boca-gallery__item">
                <img src={src} alt={`Galería ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="boca-restaurants">
          <div className="boca-restaurants__grid">
            {restaurantImages.map((src, index) => (
              <div key={index} className="boca-restaurant">
                <img src={src} alt={`Restaurante ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
