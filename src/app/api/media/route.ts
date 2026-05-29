import { NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm'],
  icon: ['image/png', 'image/svg+xml', 'image/webp']
}

const MAX_SIZE = {
  image: 10 * 1024 * 1024,
  video: 100 * 1024 * 1024,
  icon: 2 * 1024 * 1024
}

const CATEGORIES = ['homepage', 'heroes', 'services', 'icons', 'videos', 'nosotros', 'efficiency', 'editorial', 'oficinas'] as const

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = formData.get('category') as string || 'homepage'
    const alt = formData.get('alt') as string || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!CATEGORIES.includes(category as typeof CATEGORIES[number])) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const type = file.type.startsWith('video/') ? 'video' : 
                 category === 'icons' ? 'icon' : 'image'

    if (!ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES].includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_SIZE[type as keyof typeof MAX_SIZE]) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || `.${file.type.split('/')[1]}`
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '-')
    const timestamp = Date.now()
    const fileName = `${baseName}-${timestamp}${ext}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category)
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${category}/${fileName}`

    const media = await prisma.media.create({
      data: {
        filename: fileName,
        originalName: file.name,
        url: publicUrl,
        category,
        mimeType: file.type,
        size: file.size,
        alt
      }
    })

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      media
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    
    if (category && CATEGORIES.includes(category as typeof CATEGORIES[number])) {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { filename: { contains: search } },
        { alt: { contains: search } }
      ]
    }

    const media = await prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Media fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const id = searchParams.get('id')

    if (!url && !id) {
      return NextResponse.json({ error: 'No file URL or ID provided' }, { status: 400 })
    }

    let media
    if (id) {
      media = await prisma.media.findUnique({ where: { id } })
    } else {
      media = await prisma.media.findFirst({ where: { url: url! } })
    }

    if (media) {
      const filePath = path.join(process.cwd(), 'public', media.url)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
      await prisma.media.delete({ where: { id: media.id } })
    } else if (url) {
      const filePath = path.join(process.cwd(), 'public', url)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, alt } = body

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const media = await prisma.media.update({
      where: { id },
      data: { alt }
    })

    return NextResponse.json({ success: true, media })
  } catch (error) {
    console.error('Media update error:', error)
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 })
  }
}