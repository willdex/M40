import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const videoSectionMeta = [
  { key: 'homepage_videoSection1_url', value: '/static-assets/videos/VideoHomeage.mp4' },
  { key: 'homepage_videoSection1_poster', value: '/static-assets/revslider/video-media/slider_1_layer.jpg' },
  { key: 'homepage_videoSection2_url', value: '' },
  { key: 'homepage_videoSection2_poster', value: '/static-assets/2024/09/hyperportada.jpg' }
];

async function main() {
  console.log('=== Seeding Homepage Video Section Meta ===\n');

  for (const meta of videoSectionMeta) {
    const existing = await prisma.siteMeta.findUnique({ where: { key: meta.key } });

    if (existing) {
      console.log(`Updating: ${meta.key}`);
      await prisma.siteMeta.update({
        where: { key: meta.key },
        data: { value: meta.value }
      });
    } else {
      console.log(`Creating: ${meta.key}`);
      await prisma.siteMeta.create({ data: meta });
    }
  }

  console.log('\n=== Verification ===');
  const allMeta = await prisma.siteMeta.findMany({
    where: { key: { startsWith: 'homepage_videoSection' } }
  });

  for (const m of allMeta) {
    console.log(`  ${m.key}: ${m.value}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());