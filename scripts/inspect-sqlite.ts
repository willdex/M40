import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');

console.log('=== SQLite Schema Inspection ===\n');

const db = new Database(dbPath);

// Get all table names
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables in database:');
tables.forEach((t: any) => console.log('  -', t.name));

// For each table, show its schema
console.log('\n=== Table Schemas ===\n');
for (const t of tables) {
  const info = db.prepare(`PRAGMA table_info(${t.name})`).all();
  console.log(`${t.name}:`);
  info.forEach((col: any) => {
    console.log(`  ${col.name}: ${col.type} (null: ${col.notnull ? 'NOT NULL' : 'NULL'}, default: ${col.dflt_value})`);
  });
  console.log('');
}

db.close();
