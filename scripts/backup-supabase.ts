import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function backupTable(tableName: string): Promise<{ before: number; data: any[] }> {
  const count = await (prisma as any)[tableName].count();
  const data = await (prisma as any)[tableName].findMany();

  console.log(`  ${tableName}: ${count} records`);

  return { before: count, data };
}

async function main() {
  console.log('=== Supabase Backup Script ===\n');
  console.log('Creating backup of tables before migration...\n');

  const tables = [
    'HomepageEditorial',
    'Hero',
    'ContentBlock',
    'Feature',
    'EfficiencyItem',
    'Media',
    'FooterContent',
    'SiteMeta'
  ];

  const backup: Record<string, { before: number; data: any[] }> = {};

  for (const table of tables) {
    try {
      backup[table] = await backupTable(table);
    } catch (error: any) {
      console.log(`  ${table}: ERROR - ${error.message}`);
      backup[table] = { before: 0, data: [] };
    }
  }

  const backupPath = './scripts/migration-data/supabase-backup.json';
  const fs = require('fs');
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

  console.log(`\nBackup saved to: ${backupPath}`);
  console.log('\n=== Backup Complete ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
