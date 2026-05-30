import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('=== HomepageEditorial File Verification ===\n');

  const records = await prisma.homepageEditorial.findMany({
    orderBy: { order: 'asc' }
  });

  console.log(`Found ${records.length} HomepageEditorial records\n`);

  let allValid = true;

  for (const record of records) {
    console.log(`Record: ${record.id}`);
    console.log(`  Type: ${record.type}`);
    console.log(`  Title: ${record.title.substring(0, 50)}...`);

    const imagePath = path.join(process.cwd(), 'public', record.image);
    const imageExists = fs.existsSync(imagePath);
    console.log(`  image: ${record.image || '(empty)'}`);
    console.log(`    exists: ${imageExists ? '✅' : '❌ MISSING'}`);

    if (record.images && record.images !== '[]') {
      try {
        const images: string[] = JSON.parse(record.images);
        console.log(`  images[]: ${images.length} items`);
        for (let i = 0; i < images.length; i++) {
          const imgPath = path.join(process.cwd(), 'public', images[i]);
          const imgExists = fs.existsSync(imgPath);
          console.log(`    [${i}]: ${images[i]}`);
          console.log(`        exists: ${imgExists ? '✅' : '❌ MISSING'}`);
          if (!imgExists) allValid = false;
        }
      } catch {
        console.log(`  images[]: (invalid JSON: ${record.images})`);
      }
    } else {
      console.log(`  images[]: (empty)`);
    }

    if (!imageExists && record.image) allValid = false;
    console.log('');
  }

  console.log('=== Summary ===');
  if (allValid) {
    console.log('✅ All files exist');
  } else {
    console.log('❌ Some files are missing');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
