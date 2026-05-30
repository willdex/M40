import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContentWithImage from '@/components/ContentWithImage'

export default function AmenidadesPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image="/static-assets/2024/09/amenidades-hero.jpg"
          title="Amenidades"
          overlayEnabled={true}
          overlayOpacity={0.4}
        />

        <ContentWithImage
          title="Galería de Arte Koqui Handal"
          text="Una espacio que celebra la expresión artística en todas sus formas. Un lugar inspirador donde el arte cobra vida. Sumérgete en el mundo de la creatividad donde encontraras desde pinturas, hasta esculturas."
          image="/static-assets/2024/09/galeriakoc.jpg"
          imageAlt="Galería de Arte Koqui Handal"
          ctaText="Más Información"
          ctaHref="https://wa.link/ml9f2a"
        />

        <ContentWithImage
          title="Terraza"
          text="Ubicada en el séptimo piso. Un espacio al aire libre para realizar eventos corporativos con zonas cubiertos, y una vista excepcional de la ciudad."
          image="/static-assets/2024/09/terraza.jpg"
          imageAlt="Terraza"
          reverse
          features={[
            { text: 'Aire Libre' },
            { text: 'Espacio para Eventos' },
            { text: 'Capacidad 200 personas o más' }
          ]}
          ctaText="Más Información"
          ctaHref="https://wa.link/a4v10i"
        />

        <ContentWithImage
          title="Piso Médico"
          text="Un espacio especializado y diseñado para vos. Con un entorno profesional y seguro donde médicos y esteticistas te brindarán la atención que necesitas."
          image="/static-assets/2024/09/pisomedico.png"
          imageAlt="Piso Médico"
          features={[
            { text: 'Consultorios' },
            { text: 'Estéticas' }
          ]}
          ctaText="Más Información"
          ctaHref="https://wa.link/ml9f2a"
        />

        <ContentWithImage
          title="Sport Motion"
          text="Un espacio que integra la última tecnología con instalaciones de primer nivel, que ofrece una experiencia completa. Con equipos de entrenamiento de ultima generación, este gimnasio redefine la era moderna."
          image="/static-assets/2024/09/gimnasio.jpg"
          imageAlt="Sport Motion"
          reverse
          features={[
            { text: 'Group Cycle' },
            { text: 'Group Cycle Power' },
            { text: 'Hatha Yoga' },
            { text: 'Iron ABS' },
            { text: 'Sala de Musculación' },
            { text: 'Tae Box' },
            { text: 'Vinyasa Flow' },
            { text: 'Yoga' }
          ]}
          ctaText="Más Información"
          ctaHref="https://wa.link/2fwmz0"
        />

        <ContentWithImage
          title="Marco Tulio"
          text="Con un equipo de expertos que esta dedicado a cuidar tu cabello y realzar tu belleza."
          image="/static-assets/2024/09/marco.jpg"
          imageAlt="Marco Tulio"
          features={[
            { text: 'Cortes' },
            { text: 'Depilación' },
            { text: 'Maquillaje' },
            { text: 'Peinados' },
            { text: 'Tintes' },
            { text: 'Uñas' }
          ]}
          ctaText="Más Información"
          ctaHref="https://wa.link/98dxi7"
        />

        <ContentWithImage
          title="Joyería Imperio"
          text="Glamour, exclusividad y sofisticación. Con un espacio de lujo diseñado para vos."
          image="/static-assets/2024/09/imperio.jpg"
          imageAlt="Joyería Imperio"
          reverse
          features={[
            { text: 'Lujo' },
            { text: 'Exclusividad' },
            { text: 'Atención Personalizada' }
          ]}
          ctaText="Más Información"
          ctaHref="https://wa.link/k1ri5l"
        />

        <ContentWithImage
          title="MOOD Boutique"
          text="Una tienda de ropa de moda y estilo, donde encontraras las últimas tendencias y prendas de alta calidad para mujeres."
          image="/static-assets/2024/09/boutique.jpg"
          imageAlt="MOOD Boutique"
          ctaText="Más Información"
          ctaHref="https://wa.link/kylf6q"
        />

        <ContentWithImage
          title="Super Soco"
          text="El destino favorito de los amantes de las ruedas con una amplia gama de motocicleta 100% eléctricas."
          image="/static-assets/2024/09/supersoco.jpg"
          imageAlt="Super Soco"
          reverse
          ctaText="Más Información"
          ctaHref="https://wa.link/h5gwcb"
        />

        <ContentWithImage
          title="Parqueo"
          text="Con 170 parqueos para visitas y 670 puestos privados, distribuidos en 6 pisos y subsuelo."
          image="/static-assets/2024/09/parqueo.jpg"
          imageAlt="Parqueo"
        />
      </main>

      <Footer />
    </div>
  )
}
