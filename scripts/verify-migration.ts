import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const dataDir = path.join(process.cwd(), 'scripts', 'migration-data');

async function getSupabaseCount(tableName: string): Promise<number> {
  try {
    return await (prisma as any)[tableName].count();
  } catch {
    return 0;
  }
}

async function getLocalhostCount(tableName: string): Promise<number> {
  const filePath = path.join(dataDir, `${tableName}.json`);
  if (!fs.existsSync(filePath)) return 0;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data.length;
}

async function main() {
  console.log('=== Migration Verification Report ===\n');

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

  console.log('| Table | Localhost | Supabase Before | Supabase After | Status |');
  console.log('|-------|-----------|-----------------|----------------|--------|');

  let allMatch = true;

  for (const table of tables) {
    const localhost = await getLocalhostCount(table);
    const supabaseAfter = await getSupabaseCount(table);

    let status = '✅';
    if (localhost > 0 && supabaseAfter < localhost) {
      status = '❌ PARTIAL';
      allMatch = false;
    } else if (localhost > 0 && supabaseAfter === 0) {
      status = '❌ FAILED';
      allMatch = false;
    } else if (localhost === 0 && supabaseAfter === 0) {
      status = '⚠️ N/A';
    }

    console.log(`| ${table} | ${localhost} | - | ${supabaseAfter} | ${status} |`);
  }

  console.log('\n=== End Report ===');

  if (allMatch) {
    console.log('\n✅ All data migrated successfully!');
  } else {
    console.log('\n⚠️ Some data may be missing. Check the migration report.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
