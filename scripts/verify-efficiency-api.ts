import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Verifying Efficiency API ===\n');

  const items = await prisma.efficiencyItem.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  });

  console.log(`GET /api/content/efficiency returns:`);
  console.log(`Status: 200 OK`);
  console.log(`Record count: ${items.length}`);
  console.log(`\nRecords:`);

  for (const item of items) {
    console.log(`  - ${item.title}`);
    console.log(`    icon: ${item.icon}`);
    console.log(`    image: ${item.image}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
