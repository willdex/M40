import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Updating Video Section Meta ===\n');

  const updates = [
    { key: 'homepage_videoSection1_url', value: '/static-assets/videos/hyperlapse.mp4' },
    { key: 'homepage_videoSection1_poster', value: '/static-assets/2024/09/hyperportada.jpg' },
    { key: 'homepage_videoSection2_url', value: 'https://www.youtube.com/embed/pLA2_VdjU7g' },
    { key: 'homepage_videoSection2_poster', value: '/static-assets/2024/09/hyperportada.jpg' }
  ];

  for (const meta of updates) {
    await prisma.siteMeta.upsert({
      where: { key: meta.key },
      update: { value: meta.value },
      create: { key: meta.key, value: meta.value }
    });
    console.log(`Updated: ${meta.key} = ${meta.value}`);
  }

  console.log('\nDone!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());