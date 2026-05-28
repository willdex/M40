import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
    image: '/uploads/2024/09/ssd-2048x1315.png',
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
    image: '/uploads/2024/09/oficineitor3-2048x1395.png',
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
    image: '/uploads/2024/09/trinidad.png',
    imageAlt: 'Sala de Reunión Trinidad',
    reverse: true
  }
]

export default function CentroDeNegociosPage() {
  return (
    <div className="whole-layout">
      <Header />

      <main id="mid">
        <section className="page-hero">
          <img 
            src="/uploads/2024/09/slider3.png" 
            alt="Centro de Negocios" 
            className="page-hero__image"
          />
        </section>

        <ContentWithImage
          title="Salas de Reuniones"
          text="Desde USD. 30 por hora:"
          image="/uploads/2024/09/reuniion1-2048x1315.jpg"
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
          image="/uploads/2024/09/auditorio.jpg"
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
