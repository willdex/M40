import { getPrisma } from '@/lib/prisma'

async function seedEditorialSections() {
  const prisma = getPrisma()
  console.log('Seeding homepage editorial sections...')

  const existingSections = await prisma.homepageEditorial.findMany()
  console.log(`Found ${existingSections.length} existing editorial sections`)

  const lifestyleSection = existingSections.find(s => s.type === 'lifestyle')
  if (!lifestyleSection) {
    await prisma.homepageEditorial.create({
      data: {
        type: 'lifestyle',
        title: 'UN ESPACIO QUE IMPULSA\nLA FORMA EN QUE TRABAJAS',
        subtitle: '',
        paragraph: 'Más que oficinas, Manzana 40 propone un entorno diseñado para conectar productividad, bienestar y experiencias. Un lugar donde cada espacio impulsa nuevas ideas, relaciones y oportunidades.',
        image: '/uploads/2024/09/boca22.jpg',
        images: '[]',
        active: true,
        order: 0
      }
    })
    console.log('Created lifestyle section')
  } else {
    console.log('Lifestyle section already exists')
  }

  const communitySection = existingSections.find(s => s.type === 'community')
  if (!communitySection) {
    await prisma.homepageEditorial.create({
      data: {
        type: 'community',
        title: 'UNA COMUNIDAD QUE\nGENERA OPORTUNIDADES',
        subtitle: '',
        paragraph: 'Empresas, profesionales y marcas conviven en un entorno pensado para generar conexiones reales, colaboración y crecimiento.',
        image: '',
        images: JSON.stringify([
          '/uploads/2024/09/ofic33.jpg',
          '/uploads/2024/09/reuniion1-2048x1315.jpg',
          '/uploads/2024/09/HUB401-2048x1153.png'
        ]),
        active: true,
        order: 1
      }
    })
    console.log('Created community section')
  } else {
    console.log('Community section already exists')
  }

  console.log('Seeding complete!')
}

seedEditorialSections()
  .catch(console.error)
  .finally(() => getPrisma().$disconnect())
