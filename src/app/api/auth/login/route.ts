import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      console.log('[Login] Missing email or password')
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    console.log('[Login] Attempting login for:', email)

    let prisma
    try {
      prisma = getPrisma()
      console.log('[Login] Prisma client initialized')
    } catch (prismaError) {
      console.error('[Login] Prisma initialization error:', prismaError)
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 })
    }

    let user
    try {
      user = await prisma.adminUser.findUnique({ where: { email } })
      console.log('[Login] User lookup result:', user ? `Found: ${user.email}` : 'Not found')
    } catch (dbError) {
      console.error('[Login] Database query error:', dbError)
      return NextResponse.json({ error: 'Database query error' }, { status: 500 })
    }

    if (!user) {
      console.log('[Login] No user found with email:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    let isValid
    try {
      isValid = await bcrypt.compare(password, user.password)
      console.log('[Login] Password validation result:', isValid)
    } catch (bcryptError) {
      console.error('[Login] Bcrypt error:', bcryptError)
      return NextResponse.json({ error: 'Authentication error' }, { status: 500 })
    }

    if (!isValid) {
      console.log('[Login] Invalid password for user:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = Buffer.from(`${user.id}:${user.role}`).toString('base64')
    console.log('[Login] Login successful for:', email)

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, name: user.name } 
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    })

    return response
  } catch (error) {
    console.error('[Login] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}