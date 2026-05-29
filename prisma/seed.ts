import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const adminPassword = await bcrypt.hash('manzana40admin', 10)
  await prisma.adminUser.upsert({
    where: { email: 'admin@manzana40.com' },
    update: {},
    create: {
      email: 'admin@manzana40.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'admin'
    }
  })
  console.log('Admin user created: admin@manzana40.com / manzana40admin')

  await prisma.siteMeta.upsert({
    where: { key: 'homepage_heroTitle' },
    update: {},
    create: {
      key: 'homepage_heroTitle',
      value: 'LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS.'
    }
  })

  await prisma.siteMeta.upsert({
    where: { key: 'homepage_heroSubtitle' },
    update: {},
    create: {
      key: 'homepage_heroSubtitle',
      value: 'Un ecosistema de posibilidades, un mundo de oportunidades para tu negocio. Ubicada en el corazón financiero de Santa Cruz, diseñada para impulsar tu empresa y conectar con los mejores líderes.'
    }
  })

  await prisma.siteMeta.upsert({
    where: { key: 'homepage_contactPhone' },
    update: {},
    create: {
      key: 'homepage_contactPhone',
      value: '+591 71369822'
    }
  })

  await prisma.siteMeta.upsert({
    where: { key: 'homepage_featuresTitle' },
    update: {},
    create: {
      key: 'homepage_featuresTitle',
      value: 'UN ECOSISTEMA DE POSIBILIDADES, UN MUNDO DE OPORTUNIDADES PARA TU NEGOCIO'
    }
  })

  await prisma.siteMeta.upsert({
    where: { key: 'homepage_amenitiesTitle' },
    update: {},
    create: {
      key: 'homepage_amenitiesTitle',
      value: 'UNA PLAZA EMPRESARIAL ÚNICA'
    }
  })

  const services = [
    {
      title: 'OFICINAS',
      description: 'En venta y alquiler',
      image: '/uploads/elementor/thumbs/oficinam1-qubpyhacvcdu7b4d9f6lkfcw815jlau932kh7qgsc0.jpg',
      href: '/oficinas',
      order: 0
    },
    {
      title: 'CENTRO DE NEGOCIOS',
      description: 'Eventos Corporativos',
      image: '/uploads/2024/09/oficina2.jpg',
      href: '/centro-de-negocios',
      order: 1
    },
    {
      title: 'HUB 40',
      description: 'Co-Work',
      image: '/uploads/2024/09/oficina3.jpg',
      href: '/hub-40',
      order: 2
    },
    {
      title: 'BOCA MIXTURA',
      description: 'Boulevard Gastronómico',
      image: '/uploads/2024/09/oficina4.jpg',
      href: '/boca',
      order: 3
    },
    {
      title: 'AMENIDADES',
      description: 'Pensadas en vos',
      image: '/uploads/2024/09/boutique.jpg',
      href: '/amenidades',
      order: 4
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: service.title.toLowerCase().replace(/\s+/g, '-'),
        ...service,
        active: true
      }
    })
  }

  const amenities = [
    {
      title: 'CERTIFICACIÓN LEED',
      description: 'Que garantiza contar con un edificio sostenible en el tiempo.',
      icon: '/uploads/2024/09/building-icono.png',
      order: 0
    },
    {
      title: 'AMBIENTE SEGURO',
      description: 'Seguridad proactiva y sustentada por tecnología avanzada.',
      icon: '/uploads/2024/09/ambienteok.png',
      order: 1
    },
    {
      title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
      description: 'Esta tecnología permite generar un ahorro aproximado de 30% en el consumo eléctrico.',
      icon: '/uploads/2024/09/ico3.png',
      order: 2
    },
    {
      title: 'SISTEMA DE AIRE EXTERIOR',
      description: 'Necesario para la renovación de oxígeno de las oficinas, será suministrado y filtrado por medio de ventiladores de inyección de aire.',
      icon: '/uploads/2024/09/ico4.png',
      order: 3
    },
    {
      title: 'MURO CORTINA',
      description: 'Paneles de doble vidrio con cámara de aire por medio, para disminuir el ingreso del sol y optimizar el uso energético.',
      icon: '/uploads/2024/09/ico5.png',
      order: 4
    },
    {
      title: '16 ASCENSORES',
      description: 'Los más rápidos del país.',
      icon: '/uploads/2024/09/icoi6.png',
      order: 5
    }
  ]

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: amenity.title.toLowerCase().replace(/\s+/g, '-'),
        ...amenity,
        active: true
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })