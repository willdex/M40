import { getPrisma } from '../src/lib/prisma'

async function migrateAssetPaths() {
  const prisma = getPrisma()

  console.log('=== MIGRATION: Updating /uploads/ to /static-assets/ ===\n')

  let updatedCount = 0

  // Migrate Service table
  console.log('--- Updating Service table ---')
  const services = await prisma.service.findMany()
  for (const service of services) {
    if (service.image?.includes('/uploads/')) {
      const oldImage = service.image
      const newImage = service.image.replace('/uploads/', '/static-assets/')
      await prisma.service.update({
        where: { id: service.id },
        data: { image: newImage }
      })
      console.log(`  ✅ Service "${service.title}":`)
      console.log(`     OLD: ${oldImage}`)
      console.log(`     NEW: ${newImage}`)
      updatedCount++
    }
  }

  // Migrate Amenity table
  console.log('\n--- Updating Amenity table ---')
  const amenities = await prisma.amenity.findMany()
  for (const amenity of amenities) {
    if (amenity.icon?.includes('/uploads/')) {
      const oldIcon = amenity.icon
      const newIcon = amenity.icon.replace('/uploads/', '/static-assets/')
      await prisma.amenity.update({
        where: { id: amenity.id },
        data: { icon: newIcon }
      })
      console.log(`  ✅ Amenity "${amenity.title}":`)
      console.log(`     OLD: ${oldIcon}`)
      console.log(`     NEW: ${newIcon}`)
      updatedCount++
    }
  }

  console.log(`\n=== MIGRATION COMPLETE ===`)
  console.log(`Updated ${updatedCount} records`)

  await prisma.$disconnect()
}

migrateAssetPaths()
  .catch(console.error)
  .finally(() => process.exit())
