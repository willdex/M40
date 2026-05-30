const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function check() {
  console.log('Checking Hero and SiteMeta for homepage...\n');

  const heroes = await prisma.hero.findMany({ where: { page: 'homepage' } });
  console.log('Heroes:', JSON.stringify(heroes, null, 2));

  const meta = await prisma.siteMeta.findMany({ where: { key: { startsWith: 'homepage_hero' } } });
  console.log('\nHero Meta:', JSON.stringify(meta, null, 2));

  await prisma.$disconnect();
}

check().catch(console.error);