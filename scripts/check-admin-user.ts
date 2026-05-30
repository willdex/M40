import { getPrisma } from '../src/lib/prisma'

async function checkAdminUser() {
  const prisma = getPrisma()

  console.log('=== Admin User Check ===\n')

  try {
    const adminUsers = await prisma.adminUser.findMany()
    
    console.log(`Found ${adminUsers.length} admin user(s):\n`)
    
    adminUsers.forEach((user, i) => {
      console.log(`--- User ${i + 1} ---`)
      console.log(`  ID: ${user.id}`)
      console.log(`  Email: ${user.email}`)
      console.log(`  Name: ${user.name}`)
      console.log(`  Role: ${user.role}`)
      console.log(`  Password Hash: ${user.password.substring(0, 30)}...`)
      console.log(`  Created: ${user.createdAt}`)
      console.log('')
    })

    const admin = await prisma.adminUser.findUnique({
      where: { email: 'admin@manzana40.com' }
    })

    if (admin) {
      console.log('✅ admin@manzana40.com EXISTS in database')
    } else {
      console.log('❌ admin@manzana40.com NOT FOUND in database')
    }
  } catch (error) {
    console.error('Error checking admin user:', error)
  }

  await prisma.$disconnect()
}

checkAdminUser()
  .catch(console.error)
  .finally(() => process.exit())
