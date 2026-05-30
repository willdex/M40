import { getPrisma } from '../src/lib/prisma'

async function auditHomepageEditorial() {
  const prisma = getPrisma()

  console.log('=== HomepageEditorial Audit ===\n')

  const editorials = await prisma.homepageEditorial.findMany({
    orderBy: { order: 'asc' }
  })

  console.log(`Found ${editorials.length} HomepageEditorial records:\n`)

  editorials.forEach((e, i) => {
    console.log(`--- Record ${i + 1} ---`)
    console.log(`  ID: ${e.id}`)
    console.log(`  Type: ${e.type}`)
    console.log(`  Title: ${e.title}`)
    console.log(`  Subtitle: ${e.subtitle}`)
    console.log(`  Paragraph: ${e.paragraph?.substring(0, 50)}...`)
    console.log(`  Image: ${e.image}`)
    console.log(`  Images (JSON): ${e.images}`)
    console.log(`  Active: ${e.active}`)
    console.log(`  Order: ${e.order}`)
    console.log('')
  })

  console.log('=== Static Fallback Values ===')
  console.log('Lifestyle fallback image: /static-assets/2024/09/boca22.jpg')
  console.log('Community fallback images: /static-assets/2024/09/ofic33.jpg, /static-assets/2024/09/reuniion1-2048x1315.jpg, /static-assets/2024/09/HUB401-2048x1153.png')

  await prisma.$disconnect()
}

auditHomepageEditorial()
  .catch(console.error)
  .finally(() => process.exit())
