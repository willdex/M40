import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const dataDir = path.join(process.cwd(), 'scripts', 'migration-data');

function convertPath(uploadsPath: string): string {
  if (!uploadsPath || uploadsPath === '') return uploadsPath;
  if (uploadsPath.startsWith('/uploads/')) {
    return uploadsPath.replace('/uploads/', '/static-assets/');
  }
  return uploadsPath;
}

function convertJsonField(jsonStr: string): string {
  if (!jsonStr || jsonStr === '') return jsonStr;
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return JSON.stringify(parsed.map(convertPath));
    }
  } catch {}
  return convertPath(jsonStr);
}

async function importTable(tableName: string, records: any[]): Promise<{ imported: number; skipped: number; errors: number }> {
  const result = { imported: 0, skipped: 0, errors: 0 };

  for (const record of records) {
    try {
      const existing = await (prisma as any)[tableName].findUnique({
        where: { id: record.id }
      });

      if (existing) {
        result.skipped++;
        continue;
      }

      const data: any = { ...record };

      if (data.image) data.image = convertPath(data.image);
      if (data.icon) data.icon = convertPath(data.icon);
      if (data.images) data.images = convertJsonField(data.images);
      if (data.videoSrc) data.videoSrc = convertPath(data.videoSrc);
      if (data.posterSrc) data.posterSrc = convertPath(data.posterSrc);
      if (data.url) data.url = convertPath(data.url);

      if (data.active !== undefined) {
        data.active = data.active === 1 || data.active === true;
      }

      delete data.createdAt;
      delete data.updatedAt;

      await (prisma as any)[tableName].create({ data });
      result.imported++;
    } catch (error: any) {
      console.log(`    Error importing ${record.id}: ${error.message}`);
      result.errors++;
    }
  }

  return result;
}

async function main() {
  console.log('=== Import to Supabase ===\n');

  const backupPath = path.join(dataDir, 'supabase-backup.json');
  if (!fs.existsSync(backupPath)) {
    console.error('ERROR: Backup file not found. Run backup-supabase.ts first.');
    return;
  }

  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));

  const tables = [
    'HomepageEditorial',
    'Media',
    'SiteMeta',
    'Hero',
    'ContentBlock',
    'Feature',
    'EfficiencyItem',
    'FooterContent'
  ];

  const report: Record<string, { before: number; imported: number; skipped: number; errors: number; after: number }> = {};

  for (const table of tables) {
    const dataPath = path.join(dataDir, `${table}.json`);
    if (!fs.existsSync(dataPath)) {
      console.log(`${table}: No data file found, skipping`);
      continue;
    }

    const records = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`${table}:`);
    console.log(`  Localhost records: ${records.length}`);
    console.log(`  Supabase before: ${backup[table]?.before || 0}`);

    if (records.length === 0) {
      console.log(`  No records to import\n`);
      report[table] = { before: backup[table]?.before || 0, imported: 0, skipped: 0, errors: 0, after: backup[table]?.before || 0 };
      continue;
    }

    const result = await importTable(table, records);

    const afterCount = await (prisma as any)[table].count();

    report[table] = {
      before: backup[table]?.before || 0,
      imported: result.imported,
      skipped: result.skipped,
      errors: result.errors,
      after: afterCount
    };

    console.log(`  Imported: ${result.imported}, Skipped (duplicates): ${result.skipped}, Errors: ${result.errors}`);
    console.log(`  Supabase after: ${afterCount}\n`);
  }

  const reportPath = path.join(dataDir, 'migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nMigration report saved to: ${reportPath}`);

  console.log('\n=== Import Complete ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
