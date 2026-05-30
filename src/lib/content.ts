import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'site-content.json')

export interface Slider {
  id: string
  type: 'video' | 'image'
  src: string
  poster?: string
  alt?: string
}

export interface Service {
  id: string
  title: string
  description: string
  image: string
  href: string
}

export interface Amenity {
  id: string
  icon: string
  title: string
  description: string
}

export interface HomePageContent {
  heroTitle: string
  heroSubtitle: string
  mainVideo: {
    src: string
    poster?: string
  }
  contactPhone: string
  featuresTitle: string
  amenitiesTitle: string
}

export interface ServicesContent {
  services: Service[]
}

export interface AmenitiesContent {
  amenities: Amenity[]
}

export interface FooterContent {
  aboutTitle: string
  aboutText: string
  servicesTitle: string
  contactTitle: string
  address: string
  phone: string
  email: string
  facebook: string
  instagram: string
}

export interface MetaContent {
  siteName: string
  description: string
  phone: string
}

export interface SiteContent {
  sliders?: Slider[]
  homepage: HomePageContent
  videoSection1: {
    url: string
    poster: string
  }
  videoSection2: {
    url: string
    poster: string
  }
  services: Service[]
  amenities: Amenity[]
  footer: FooterContent
  meta: MetaContent
}

export interface HomepageEditorialSection {
  id: string
  type: 'lifestyle' | 'community'
  title: string
  subtitle: string
  paragraph: string
  image: string
  images?: string[]
  active: boolean
  order: number
}

let cachedContent: SiteContent | null = null

export async function getContent(): Promise<SiteContent> {
  if (cachedContent) {
    return cachedContent
  }

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    cachedContent = JSON.parse(fileContents)
    return cachedContent!
  } catch (error) {
    console.error('Failed to load content:', error)
    return getDefaultContent()
  }
}

export function getContentSync(): SiteContent {
  if (cachedContent) {
    return cachedContent
  }

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    cachedContent = JSON.parse(fileContents)
    return cachedContent!
  } catch (error) {
    console.error('Failed to load content:', error)
    return getDefaultContent()
  }
}

export function getDefaultContent(): SiteContent {
  return {
    homepage: {
      heroTitle: 'LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS.',
      heroSubtitle: 'Un ecosistema de posibilidades, un mundo de oportunidades para tu negocio.',
      mainVideo: {
        src: '/static-assets/2024/09/Hyperlapse-Manzana-40.mp4',
        poster: '/static-assets/revslider/video-media/slider_1_layer.jpg'
      },
      contactPhone: '+591 71369822',
      featuresTitle: 'UN ECOSISTEMA DE POSIBILIDADES, UN MUNDO DE OPORTUNIDADES PARA TU NEGOCIO',
      amenitiesTitle: 'UNA PLAZA EMPRESARIAL ÚNICA'
    },
    services: [],
    amenities: [],
    footer: {
      aboutTitle: 'Quienes Somos',
      aboutText: 'Somos el epicentro de la innovación y el progreso.',
      servicesTitle: 'Servicios',
      contactTitle: 'Contacto',
      address: 'Av. San Martín, Calle J.',
      phone: '+591 713-69822',
      email: 'info@manzana40.com',
      facebook: 'https://www.facebook.com/M40PlazaEmpresarial',
      instagram: 'https://www.instagram.com/manzana40.bo/'
    },
    meta: {
      siteName: 'Manzana40',
      description: 'La Plaza Empresarial más importante del país',
      phone: '+591 71369822'
    }
  }
}

export function clearContentCache(): void {
  cachedContent = null
}

export function getServiceById(id: string): Service | undefined {
  const content = getContentSync()
  return content.services.find(s => s.id === id)
}

export function getAmenityById(id: string): Amenity | undefined {
  const content = getContentSync()
  return content.amenities.find(a => a.id === id)
}

export function getAllServiceIds(): string[] {
  const content = getContentSync()
  return content.services.map(s => s.id)
}

export function getAllAmenityIds(): string[] {
  const content = getContentSync()
  return content.amenities.map(a => a.id)
}