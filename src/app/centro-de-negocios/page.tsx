import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContentWithImage from '@/components/ContentWithImage'

const rooms = [
  {
    title: 'Sala de Reunión Tujuré',
    features: [
      'Capacidad para 8 personas',
      'Smart TV',
      'Conexión inalámbrica para proyección',
      'Wi-Fi',
      'Fotocopiadora',
      'Autoservicio permanente de cafetería'
    ],
    image: '/static-assets/2024/09/ssd-2048x1315.png',
    imageAlt: 'Sala de Reunión Tujuré',
    reverse: true
  },
  {
    title: 'Sala de Reunión Toledo',
    features: [
      'Capacidad para 8 personas',
      'Smart TV',
      'Conexión inalámbrica para proyección',
      'Wi-Fi',
      'Fotocopiadora',
      'Autoservicio permanente de cafetería'
    ],
    image: '/static-assets/2024/09/oficineitor3-2048x1395.png',
    imageAlt: 'Sala de Reunión Toledo'
  },
  {
    title: 'Sala de Reunión Trinidad',
    features: [
      'Capacidad para 8 personas',
      'Smart TV',
      'Conexión inalámbrica para proyección',
      'Wi-Fi',
      'Fotocopiadora',
      'Autoservicio permanente de cafetería'
    ],
    image: '/static-assets/2024/09/trinidad.png',
    imageAlt: 'Sala de Reunión Trinidad',
    reverse: true
  }
]

export default function CentroDeNegociosPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <PageHero
          image="/static-assets/2024/09/negocio-hero.png"
          title="Centro de Negocios"
          overlayEnabled={true}
          overlayOpacity={0.4}
        />

        <ContentWithImage
          title="Salas de Reuniones"
          text="Desde USD. 30 por hora:"
          image="/static-assets/2024/09/reuniion1-2048x1315.jpg"
          imageAlt="Salas de Reuniones"
          features={[
            { text: 'Capacitaciones' },
            { text: 'Reuniones Comerciales' },
            { text: 'Sesiones de Coaching' }
          ]}
        />

        {rooms.map((room, index) => (
          <ContentWithImage
            key={index}
            title={room.title}
            text=""
            image={room.image}
            imageAlt={room.imageAlt}
            reverse={room.reverse}
            features={room.features.map(f => ({ text: f }))}
          />
        ))}

        <ContentWithImage
          title="Salón Auditorio"
          text=""
          image="/static-assets/2024/09/auditorio.jpg"
          imageAlt="Salón Auditorio"
          features={[
            { text: 'Capacidad para 80 personas' },
            { text: 'Smart TV' },
            { text: 'Conexión inalámbrica para proyección' },
            { text: 'Proyector Profesional' }
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
