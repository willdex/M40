import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const dataPath = path.join(process.cwd(), 'data', 'site-content.json')

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    const content = JSON.parse(fileContents)
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    const currentContent = JSON.parse(fileContents)
    
    const updatedContent = {
      ...currentContent,
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(updatedContent, null, 2))
    
    return NextResponse.json({ success: true, content: updatedContent })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
