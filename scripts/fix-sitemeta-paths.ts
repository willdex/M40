import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixSiteMetaPaths() {
  console.log('=== Fixing SiteMeta Paths ===\n');

  const siteMetaRecords = await prisma.siteMeta.findMany();
  console.log(`Found ${siteMetaRecords.length} SiteMeta records\n`);

  for (const record of siteMetaRecords) {
    if (record.value.includes('/uploads/')) {
      const newValue = record.value.replace('/uploads/', '/static-assets/');
      console.log(`Updating ${record.key}:`);
      console.log(`  From: ${record.value}`);
      console.log(`  To: ${newValue}`);

      await prisma.siteMeta.update({
        where: { id: record.id },
        data: { value: newValue }
      });
    }
  }

  console.log('\n=== Done ===');
}

fixSiteMetaPaths()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
