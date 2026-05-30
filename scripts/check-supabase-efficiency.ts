import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== Supabase EfficiencyItem Records ===\n');

  const items = await prisma.efficiencyItem.findMany({
    orderBy: { order: 'asc' }
  });

  console.log(`Found ${items.length} records:\n`);

  for (const item of items) {
    console.log(`ID: ${item.id}`);
    console.log(`Title: ${item.title}`);
    console.log(`Icon: ${item.icon}`);
    console.log(`Image: ${item.image}`);
    console.log(`ShortDesc: ${item.shortDesc}`);
    console.log(`Order: ${item.order}, Active: ${item.active}`);
    console.log('---');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
