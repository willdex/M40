import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'site-content.json')

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    const content = JSON.parse(fileContents)
    
    if (slug === 'sliders') {
      return NextResponse.json(content.sliders)
    } else if (slug === 'services') {
      return NextResponse.json(content.services)
    } else if (slug === 'amenities') {
      return NextResponse.json(content.amenities)
    } else if (slug === 'footer') {
      return NextResponse.json(content.footer)
    } else if (slug === 'homepage') {
      return NextResponse.json(content.homepage)
    } else if (slug === 'meta') {
      return NextResponse.json(content.meta)
    }
    
    return NextResponse.json({ error: 'Unknown slug' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}
