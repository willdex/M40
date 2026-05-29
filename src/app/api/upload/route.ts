import { NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm'],
  icon: ['image/png', 'image/svg+xml', 'image/webp']
}

const MAX_SIZE = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  icon: 2 * 1024 * 1024 // 2MB
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = formData.get('category') as string || 'homepage'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
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

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName,
      category,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fileUrl = searchParams.get('url')

    if (!fileUrl) {
      return NextResponse.json({ error: 'No file URL provided' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'public', fileUrl)
    
    if (existsSync(filePath)) {
      await unlink(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}