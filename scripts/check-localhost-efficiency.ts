import Database from 'better-sqlite3';
import * as path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');

console.log('=== Localhost EfficiencyItem Records ===\n');
console.log('Database:', dbPath);

const db = new Database(dbPath);

try {
  const items = db.prepare('SELECT * FROM EfficiencyItem').all();
  console.log(`\nFound ${items.length} records:\n`);

  for (const item of items as any[]) {
    console.log(`ID: ${item.id}`);
    console.log(`Title: ${item.title}`);
    console.log(`Icon: ${item.icon}`);
    console.log(`Image: ${item.image}`);
    console.log(`ShortDesc: ${item.shortDesc}`);
    console.log(`Order: ${item.order}, Active: ${item.active}`);
    console.log('---');
  }
} catch (error: any) {
  console.log('Error:', error.message);
}

db.close();
