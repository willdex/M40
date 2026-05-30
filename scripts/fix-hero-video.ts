const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres.satvrvsgtfakwpyjmhzf:zFaGWwXrDo7VOWer@aws-1-us-west-2.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1'
    }
  }
});

async function fix() {
  console.log('Fixing homepage_heroVideo to use static video...\n');

  const result = await prisma.siteMeta.update({
    where: { key: 'homepage_heroVideo' },
    data: { value: '/static-assets/videos/VideoHomeage.mp4' }
  });

  console.log('Updated:', result);

  await prisma.$disconnect();
}

fix().catch(console.error);