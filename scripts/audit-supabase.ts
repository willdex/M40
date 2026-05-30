import { getPrisma } from '../src/lib/prisma'

async function auditSupabase() {
  const prisma = getPrisma()

  console.log('=== SUPABASE DATABASE AUDIT ===\n');

  const tables = [
    'AdminUser',
    'Service',
    'Amenity',
    'Hero',
    'ContentBlock',
    'Feature',
    'SiteMeta',
    'FooterContent',
    'HomepageEditorial',
    'EfficiencyItem',
    'Media'
  ];

  const results: Record<string, any[]> = {};

  for (const table of tables) {
    try {
      const model = (prisma as any)[table.charAt(0).toLowerCase() + table.slice(1)]
      if (model && typeof model.findMany === 'function') {
        const rows = await (model.findMany({}) as any[])
        results[table] = rows;
        console.log(`${table}: ${rows.length} records`);
      } else {
        results[table] = [];
        console.log(`${table}: 0 records (no model)`);
      }
    } catch (error: any) {
      console.log(`${table}: ERROR - ${error.message}`);
      results[table] = [];
    }
  }

  console.log('\n=== DETAILED RECORDS ===\n');

  // Service records
  console.log('--- Service ---');
  results.Service?.forEach((s, i) => {
    console.log(`  [${i+1}] ${s.title}`);
    console.log(`      ID: ${s.id}`);
    console.log(`      Image: ${s.image}`);
    console.log(`      Description: ${s.description}`);
    console.log('');
  });

  // Amenity records
  console.log('--- Amenity ---');
  results.Amenity?.forEach((a, i) => {
    console.log(`  [${i+1}] ${a.title}`);
    console.log(`      ID: ${a.id}`);
    console.log(`      Icon: ${a.icon}`);
    console.log(`      Description: ${a.description}`);
    console.log('');
  });

  // HomepageEditorial records
  console.log('--- HomepageEditorial ---');
  results.HomepageEditorial?.forEach((e, i) => {
    console.log(`  [${i+1}] Type: ${e.type}`);
    console.log(`      Title: ${e.title}`);
    console.log(`      Image: ${e.image}`);
    console.log(`      Images: ${e.images}`);
    console.log('');
  });

  // Hero records
  console.log('--- Hero ---');
  results.Hero?.forEach((h, i) => {
    console.log(`  [${i+1}] Page: ${h.page}`);
    console.log(`      Title: ${h.title}`);
    console.log(`      VideoSrc: ${h.videoSrc}`);
    console.log(`      PosterSrc: ${h.posterSrc}`);
    console.log(`      Active: ${h.active}`);
    console.log('');
  });

  // ContentBlock records
  console.log('--- ContentBlock ---');
  results.ContentBlock?.forEach((c, i) => {
    console.log(`  [${i+1}] Page: ${c.page}, Section: ${c.sectionId || 'none'}`);
    console.log(`      Title: ${c.title}`);
    console.log(`      Image: ${c.image}`);
    console.log('');
  });

  // EfficiencyItem records
  console.log('--- EfficiencyItem ---');
  results.EfficiencyItem?.forEach((e, i) => {
    console.log(`  [${i+1}] ${e.title}`);
    console.log(`      Image: ${e.image}`);
    console.log(`      Icon: ${e.icon}`);
    console.log('');
  });

  // Media records (limit to first 10)
  console.log('--- Media (first 10) ---');
  results.Media?.slice(0, 10).forEach((m, i) => {
    console.log(`  [${i+1}] ${m.originalName}`);
    console.log(`      URL: ${m.url}`);
    console.log(`      Category: ${m.category}`);
    console.log('');
  });
  if (results.Media && results.Media.length > 10) {
    console.log(`  ... and ${results.Media.length - 10} more records`);
  }

  // FooterContent
  console.log('\n--- FooterContent ---');
  if (results.FooterContent && results.FooterContent.length > 0) {
    console.log(JSON.stringify(results.FooterContent[0], null, 2));
  } else {
    console.log('  No records');
  }

  // SiteMeta
  console.log('\n--- SiteMeta (selected) ---');
  results.SiteMeta?.filter((m: any) => 
    m.key.includes('homepage_') || 
    m.key.includes('nosotros_') ||
    m.key.includes('footer_')
  ).forEach((m: any, i: number) => {
    console.log(`  ${m.key}: ${m.value.substring(0, 80)}...`);
  });

  await prisma.$disconnect();
  console.log('\n=== SUPABASE AUDIT COMPLETE ===');
}

auditSupabase().catch(console.error);
