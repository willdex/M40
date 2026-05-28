import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentBlock from '@/components/ContentBlock'
import FeaturesGrid from '@/components/FeaturesGrid'

const contentBlocks = [
  {
    title: 'Ubicación Privilegiada',
    text: 'Manzana 40 Plaza Empresarial, es un proyecto de clase mundial que nace de una alianza Estratégica entre dos grandes grupos empresariales: GRUPO H y GRUPO LAS LOMAS. Es un Proyecto arquitectónico elaborado por el prestigio estudio chileno A4 Arquitectos.\n\nVisto desde afuera, Manzana 40 es un complejo imponente, llamativo y moderno, digno de las grandes ciudades. Con 30 pisos minuciosamente construido lo convierte en un proyecto de indiscutible de calidad y buen gusto.\n\nLas torres, casi idénticas, se alzan hacia el cielo, dejando ver toda la grandeza de un proyecto que sin duda alguna marca un antes y un después de la urbe cruceña.',
    image: '/uploads/2024/09/foto-oficina-ubicacion.jpg',
    imageAlt: 'Ubicación Privilegiada',
    reverse: false
  },
  {
    title: 'Edificación Sustentable',
    text: 'Manzana 40 es la primera edificación empresarial en Bolivia que cuenta con la certificación LEED (Leadership in Energy & Environmental Design), otorgada por el Consejo de la Construcción Verde de Estados Unidos (U.S. Green Building Council), que garantiza un edificio sostenible a lo largo del tiempo, ya que cumple con aspectos relacionados con altos estándares de eficiencia energética, mejora de la calidad ambiental interior, eficiencia en el consumo de agua, desarrollo sostenible de espacios libres y selección de materiales adecuados.',
    image: '/uploads/2024/09/nosotro2.png',
    imageAlt: 'Edificación Sustentable',
    reverse: true
  },
  {
    title: 'La mayor plaza de parqueos',
    text: 'Manzana 40 cuenta con una generosa área dedicada a estacionamientos: 840 parqueos, 670 para propietarios y 170 para visitantes. Además, dispose de parqueos especiales para personas con discapacidad y espacios adicionales para motos y bicicletas.',
    image: '/uploads/2024/09/nosotros33.png',
    imageAlt: 'Plaza de parqueos',
    reverse: false
  },
  {
    title: 'Bauleras o bodegas',
    text: 'Las empresas y comercios que requieren espacios adicionales para archivo pueden acceder a más de 70 bauleras o bodegas de distintos tamaños, que pueden adquirirse o alquilarse.',
    image: '/uploads/2024/09/nosotros44.png',
    imageAlt: 'Bauleras o bodegas',
    reverse: true
  }
]

const features = [
  {
    icon: '/uploads/2024/09/05-SISTEMA-DE-CLIMATIZACION-300x300-1.png',
    title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
    description: 'Una solución avanzada que optimiza el control de la temperatura'
  },
  {
    icon: '/uploads/2024/09/2.png',
    title: 'SISTEMA DE ENFRIAMIENTO DE SALAS DE COMPUTACIÓN',
    description: 'Es esencial para mantener la temperatura óptima de estas áreas críticas'
  },
  {
    icon: '/uploads/2024/09/iconi3.png',
    title: 'SISTEMAS DE AIRE EXTERIOR',
    description: 'Es una parte vital de la ventilación y climatización'
  },
  {
    icon: '/uploads/2024/09/oconin4.png',
    title: 'FACHADA VENTILADA',
    description: 'Se ha diseñado un sistema de revestimiento exterior'
  },
  {
    icon: '/uploads/2024/09/iconin4.png',
    title: 'SISTEMA DE CONTROL CENTRALIZADO',
    description: 'Coordina y gestiona diversas funciones y sistemas dentro de la edificación'
  },
  {
    icon: '/uploads/2024/09/iconin6.png',
    title: 'CANALIZACIÓN DE AGUAS DE LLUVIA',
    description: 'Un sistema de drenaje diseñado para capturar y dirigir el agua de lluvia lejos de la estructura'
  }
]

export default function NosotrosPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <section className="page-hero">
          <img 
            src="/uploads/2024/09/slidernosotros.jpg" 
            alt="Nosotros" 
            className="page-hero__image"
          />
        </section>

        {contentBlocks.map((block, index) => (
          <ContentBlock key={index} {...block} />
        ))}

        <FeaturesGrid 
          title="DISEÑO PENSADO EN EL AHORRO"
          features={features}
        />
      </main>

      <Footer />
    </div>
  )
}
