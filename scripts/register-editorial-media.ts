import { getPrisma } from '@/lib/prisma'

const EDITORIAL_IMAGES = [
  { url: '/uploads/2024/09/boca22.jpg', name: 'boca22.jpg' },
  { url: '/uploads/2024/09/ofic33.jpg', name: 'ofic33.jpg' },
  { url: '/uploads/2024/09/reuniion1-2048x1315.jpg', name: 'reuniion1-2048x1315.jpg' },
  { url: '/uploads/2024/09/HUB401-2048x1153.png', name: 'HUB401-2048x1153.png' }
]

async function registerEditorialImages() {
  const prisma = getPrisma()
  console.log('Registering editorial images in Media database...')

  for (const img of EDITORIAL_IMAGES) {
    const existing = await prisma.media.findFirst({
      where: { url: img.url }
    })

    if (!existing) {
      await prisma.media.create({
        data: {
          filename: img.name,
          originalName: img.name,
          url: img.url,
          category: 'editorial',
          mimeType: img.url.endsWith('.png') ? 'image/png' : 'image/jpeg',
          size: 0,
          alt: ''
        }
      })
      console.log(`Registered: ${img.url}`)
    } else {
      console.log(`Already exists: ${img.url}`)
    }
  }

  console.log('Done!')
}

registerEditorialImages()
  .catch(console.error)
  .finally(() => getPrisma().$disconnect())
