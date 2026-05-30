import { getPrisma } from '@/lib/prisma'

async function checkEditorialSections() {
  const prisma = getPrisma()
  const sections = await prisma.homepageEditorial.findMany()
  console.log('Editorial sections in DB:')
  console.log(JSON.stringify(sections, null, 2))
}

checkEditorialSections()
  .catch(console.error)
  .finally(() => getPrisma().$disconnect())
