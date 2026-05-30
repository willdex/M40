import { getPrisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function seedAdminUser() {
  const prisma = getPrisma()

  console.log('=== Seeding Admin User ===\n')

  try {
    const adminPassword = await bcrypt.hash('manzana40admin', 10)
    
    const admin = await prisma.adminUser.upsert({
      where: { email: 'admin@manzana40.com' },
      update: {},
      create: {
        email: 'admin@manzana40.com',
        password: adminPassword,
        name: 'Administrador',
        role: 'admin'
      }
    })

    console.log(`✅ Admin user created/updated:`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Name: ${admin.name}`)
    console.log(`   Role: ${admin.role}`)
    console.log(`   Password: manzana40admin`)

  } catch (error) {
    console.error('❌ Error seeding admin user:', error)
  }

  await prisma.$disconnect()
}

seedAdminUser()
  .catch(console.error)
  .finally(() => process.exit())
