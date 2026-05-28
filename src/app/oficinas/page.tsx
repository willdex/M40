import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContentWithImage from '@/components/ContentWithImage'

export default function OficinasPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <section className="page-hero">
          <img 
            src="/uploads/2024/09/slideroficina.jpg" 
            alt="Oficinas" 
            className="page-hero__image"
          />
        </section>

        <ContentWithImage
          title="OFICINAS FLEXIBLES"
          text="En Manzana 40 existen muchos tipos de oficinas que se adecuan a las necesidades de cada empresa. Puedes optar por oficinas en obra gris, obra fina o proyectos llave en mano."
          image="/uploads/2024/09/oficina232.png"
          imageAlt="Oficinas Flexibles"
          features={[
            { text: 'Alquiler' },
            { text: 'Compra' },
            { text: 'Alquiler con opción a compra' }
          ]}
          ctaText="Más Información"
          ctaHref="#"
        />

        <ContentWithImage
          title="Oficinas que se adaptan perfectamente a la dimensión de su empresa"
          text="Oficinas desde 56 a 960 m2. Diseñadas para brindar un ambiente de trabajo altamente estimulante. Espacios eficientes con amplia vista de la ciudad, una luminosidad controlada, y un sistema de ventanales que aislan el ruido y la temperatura. Todo apoyado con tecnología de punta que les permite contar con un gran soporte de redes digitales e Internet."
          image="/uploads/2024/09/sss.png"
          imageAlt="Oficinas adaptadas"
          reverse
          features={[
            { text: 'Alquiler' },
            { text: 'Compra' },
            { text: 'Alquiler con opción a compra' }
          ]}
          ctaText="Más Información"
          ctaHref="https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n"
        />

        <ContentWithImage
          title="Proyectos llave en mano"
          text="Olvídate de los problemas que trae consigo trasladarte de oficina o iniciar un nuevo proyecto y deja todo en manos de un equipo especializado, capaz de materializar tus sueños y convertirlos en una oficina funcional, diseñada a medida y con todo lo que tu negocio necesita para triunfar."
          image="/uploads/2024/09/323.jpg"
          imageAlt="Proyectos llave en mano"
          ctaText="Más Información"
          ctaHref="https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n"
        />
      </main>

      <Footer />
    </div>
  )
}
