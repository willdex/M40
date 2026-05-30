import Database from 'better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';

const dbPath = path.join(process.cwd(), 'dev.db');
const outputDir = path.join(process.cwd(), 'scripts', 'migration-data');

console.log('=== SQLite to JSON Export ===\n');
console.log('Database path:', dbPath);
console.log('Output directory:', outputDir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const db = new Database(dbPath);

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

const exportData: Record<string, any[]> = {};

for (const table of tables) {
  try {
    const rows = db.prepare(`SELECT * FROM ${table}`).all();
    exportData[table] = rows;
    console.log(`${table}: ${rows.length} records`);
  } catch (error: any) {
    console.log(`${table}: ERROR - ${error.message}`);
    exportData[table] = [];
  }
}

for (const [table, data] of Object.entries(exportData)) {
  const filePath = path.join(outputDir, `${table}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Exported ${table} to ${filePath}`);
}

const allDataPath = path.join(outputDir, 'all-data.json');
fs.writeFileSync(allDataPath, JSON.stringify(exportData, null, 2));
console.log(`\nExported all data to ${allDataPath}`);

db.close();

console.log('\n=== Export Complete ===');
