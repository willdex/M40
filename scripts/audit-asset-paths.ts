import { getPrisma } from '../src/lib/prisma'

async function auditAssetPaths() {
  const prisma = getPrisma()
  
  console.log('=== AUDIT: Checking for /uploads/ paths in database ===\n')

  let totalUploads = 0
  let totalStaticAssets = 0

  // Check Hero table
  console.log('--- Hero table ---')
  const heroes = await prisma.hero.findMany()
  heroes.forEach(h => {
    if (h.videoSrc?.includes('/uploads/')) {
      console.log(`  [OLD] Hero ${h.id} (${h.page}): videoSrc = ${h.videoSrc}`)
      totalUploads++
    }
    if (h.posterSrc?.includes('/uploads/')) {
      console.log(`  [OLD] Hero ${h.id} (${h.page}): posterSrc = ${h.posterSrc}`)
      totalUploads++
    }
    if (h.videoSrc?.includes('/static-assets/')) {
      console.log(`  [NEW] Hero ${h.id} (${h.page}): videoSrc = ${h.videoSrc}`)
      totalStaticAssets++
    }
    if (h.posterSrc?.includes('/static-assets/')) {
      console.log(`  [NEW] Hero ${h.id} (${h.page}): posterSrc = ${h.posterSrc}`)
      totalStaticAssets++
    }
  })
  if (heroes.length === 0) console.log('  (empty)')

  // Check Service table
  console.log('\n--- Service table ---')
  const services = await prisma.service.findMany()
  services.forEach(s => {
    if (s.image?.includes('/uploads/')) {
      console.log(`  [OLD] Service ${s.id}: image = ${s.image}`)
      totalUploads++
    }
    if (s.image?.includes('/static-assets/')) {
      console.log(`  [NEW] Service ${s.id}: image = ${s.image}`)
      totalStaticAssets++
    }
  })
  if (services.length === 0) console.log('  (empty)')

  // Check Amenity table
  console.log('\n--- Amenity table ---')
  const amenities = await prisma.amenity.findMany()
  amenities.forEach(a => {
    if (a.icon?.includes('/uploads/')) {
      console.log(`  [OLD] Amenity ${a.id}: icon = ${a.icon}`)
      totalUploads++
    }
    if (a.icon?.includes('/static-assets/')) {
      console.log(`  [NEW] Amenity ${a.id}: icon = ${a.icon}`)
      totalStaticAssets++
    }
  })
  if (amenities.length === 0) console.log('  (empty)')

  // Check ContentBlock table
  console.log('\n--- ContentBlock table ---')
  const contentBlocks = await prisma.contentBlock.findMany()
  contentBlocks.forEach(cb => {
    if (cb.image?.includes('/uploads/')) {
      console.log(`  [OLD] ContentBlock ${cb.id} (${cb.page}): image = ${cb.image}`)
      totalUploads++
    }
    if (cb.image?.includes('/static-assets/')) {
      console.log(`  [NEW] ContentBlock ${cb.id} (${cb.page}): image = ${cb.image}`)
      totalStaticAssets++
    }
  })
  if (contentBlocks.length === 0) console.log('  (empty)')

  // Check Feature table
  console.log('\n--- Feature table ---')
  const features = await prisma.feature.findMany()
  features.forEach(f => {
    if (f.icon?.includes('/uploads/')) {
      console.log(`  [OLD] Feature ${f.id}: icon = ${f.icon}`)
      totalUploads++
    }
    if (f.icon?.includes('/static-assets/')) {
      console.log(`  [NEW] Feature ${f.id}: icon = ${f.icon}`)
      totalStaticAssets++
    }
  })
  if (features.length === 0) console.log('  (empty)')

  // Check SiteMeta table (keys containing image paths)
  console.log('\n--- SiteMeta table ---')
  const siteMetas = await prisma.siteMeta.findMany()
  siteMetas.forEach(m => {
    if (m.value?.includes('/uploads/')) {
      console.log(`  [OLD] SiteMeta ${m.key}: value contains /uploads/`)
      console.log(`      Value: ${m.value.substring(0, 100)}...`)
      totalUploads++
    }
    if (m.value?.includes('/static-assets/')) {
      console.log(`  [NEW] SiteMeta ${m.key}: value contains /static-assets/`)
      totalStaticAssets++
    }
  })
  if (siteMetas.length === 0) console.log('  (empty)')

  // Check HomepageEditorial table
  console.log('\n--- HomepageEditorial table ---')
  const editorials = await prisma.homepageEditorial.findMany()
  editorials.forEach(e => {
    if (e.image?.includes('/uploads/')) {
      console.log(`  [OLD] Editorial ${e.id} (${e.type}): image = ${e.image}`)
      totalUploads++
    }
    if (e.images?.includes('/uploads/')) {
      console.log(`  [OLD] Editorial ${e.id} (${e.type}): images = ${e.images}`)
      totalUploads++
    }
    if (e.image?.includes('/static-assets/')) {
      console.log(`  [NEW] Editorial ${e.id} (${e.type}): image = ${e.image}`)
      totalStaticAssets++
    }
    if (e.images?.includes('/static-assets/')) {
      console.log(`  [NEW] Editorial ${e.id} (${e.type}): images = ${e.images}`)
      totalStaticAssets++
    }
  })
  if (editorials.length === 0) console.log('  (empty)')

  // Check EfficiencyItem table
  console.log('\n--- EfficiencyItem table ---')
  const efficiencyItems = await prisma.efficiencyItem.findMany()
  efficiencyItems.forEach(ei => {
    if (ei.image?.includes('/uploads/')) {
      console.log(`  [OLD] EfficiencyItem ${ei.id}: image = ${ei.image}`)
      totalUploads++
    }
    if (ei.icon?.includes('/uploads/')) {
      console.log(`  [OLD] EfficiencyItem ${ei.id}: icon = ${ei.icon}`)
      totalUploads++
    }
    if (ei.image?.includes('/static-assets/')) {
      console.log(`  [NEW] EfficiencyItem ${ei.id}: image = ${ei.image}`)
      totalStaticAssets++
    }
    if (ei.icon?.includes('/static-assets/')) {
      console.log(`  [NEW] EfficiencyItem ${ei.id}: icon = ${ei.icon}`)
      totalStaticAssets++
    }
  })
  if (efficiencyItems.length === 0) console.log('  (empty)')

  // Check Media table
  console.log('\n--- Media table ---')
  const media = await prisma.media.findMany()
  media.forEach(m => {
    if (m.url?.includes('/uploads/')) {
      console.log(`  [OLD] Media ${m.id}: url = ${m.url}`)
      totalUploads++
    }
    if (m.url?.includes('/static-assets/')) {
      console.log(`  [NEW] Media ${m.id}: url = ${m.url}`)
      totalStaticAssets++
    }
  })
  if (media.length === 0) console.log('  (empty)')

  console.log('\n=== SUMMARY ===')
  console.log(`Total records with /uploads/: ${totalUploads}`)
  console.log(`Total records with /static-assets/: ${totalStaticAssets}`)
  
  if (totalUploads === 0) {
    console.log('\n✅ All asset paths have been migrated to /static-assets/')
  } else {
    console.log(`\n⚠️  ${totalUploads} records still need migration`)
  }

  await prisma.$disconnect()
}

auditAssetPaths()
  .catch(console.error)
  .finally(() => process.exit())
