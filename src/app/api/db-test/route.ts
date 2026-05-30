import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    console.log('[DB Test] Starting database connection test')
    console.log('[DB Test] DATABASE_URL:', process.env.DATABASE_URL ? 'Set (value hidden)' : 'NOT SET')

    const prisma = getPrisma()
    console.log('[DB Test] Prisma client created')

    const adminCount = await prisma.adminUser.count()
    console.log('[DB Test] AdminUser count:', adminCount)

    const services = await prisma.service.findMany({ take: 1 })
    console.log('[DB Test] Service count:', services.length)

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      adminUserCount: adminCount,
      sampleService: services[0] || null,
      databaseUrl: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
    })
  } catch (error: any) {
    console.error('[DB Test] Error:', error.message)
    console.error('[DB Test] Full error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      name: error.name
    }, { status: 500 })
  }
}
