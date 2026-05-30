import Database from 'better-sqlite3';
import * as path from 'path';

const dbPath = path.join(process.cwd(), 'dev.db');

console.log('Checking:', dbPath);

const db = new Database(dbPath);

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();

console.log('Tables found:', tables.length);

for (const t of tables as any[]) {
  const count = (db.prepare(`SELECT COUNT(*) as c FROM ${t.name}`).get() as any);
  console.log(`  ${t.name}: ${count.c} records`);
}

db.close();
