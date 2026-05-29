import { NextResponse } from 'next/server'

interface AgendaFormData {
  nombre: string
  correo: string
  celular: string
  mensaje: string
  website?: string
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 1000

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return '127.0.0.1'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) {
    return true
  }

  entry.count++
  return false
}

function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 2000)
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9+\s\-()]{7,20}$/
  return phoneRegex.test(phone)
}

function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,100}$/
  return nameRegex.test(name)
}

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request)

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor intenta más tarde.' },
        { status: 429 }
      )
    }

    const body: AgendaFormData = await request.json()
    const { nombre, correo, celular, mensaje, website } = body

    if (website && website.trim() !== '') {
      console.log('Honeypot detected from IP:', clientIP)
      return NextResponse.json({
        success: true,
        message: 'Mensaje recibido correctamente'
      })
    }

    if (!nombre || !correo || !celular || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    const sanitizedNombre = sanitizeString(nombre)
    const sanitizedCorreo = sanitizeString(correo)
    const sanitizedCelular = sanitizeString(celular)
    const sanitizedMensaje = sanitizeString(mensaje)

    if (!validateName(sanitizedNombre)) {
      return NextResponse.json(
        { error: 'Nombre inválido' },
        { status: 400 }
      )
    }

    if (!validateEmail(sanitizedCorreo)) {
      return NextResponse.json(
        { error: 'Correo electrónico inválido' },
        { status: 400 }
      )
    }

    if (!validatePhone(sanitizedCelular)) {
      return NextResponse.json(
        { error: 'Número de celular inválido' },
        { status: 400 }
      )
    }

    if (sanitizedMensaje.length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres' },
        { status: 400 }
      )
    }

    console.log('=== Nueva solicitud de visita ===')
    console.log('Nombre:', sanitizedNombre)
    console.log('Correo:', sanitizedCorreo)
    console.log('Celular:', sanitizedCelular)
    console.log('Mensaje:', sanitizedMensaje)
    console.log('IP:', clientIP)
    console.log('================================')

    const adminEmail = process.env.CONTACT_EMAIL || 'info@manzana40.com'

    const emailContent = `
Nuevo mensaje desde el formulario "Agenda tu Visita":

Nombre: ${sanitizedNombre}
Correo: ${sanitizedCorreo}
Celular: ${sanitizedCelular}

Mensaje:
${sanitizedMensaje}

---
Enviado desde: ${process.env.NEXT_PUBLIC_BASE_URL || 'Manzana40'}
IP: ${clientIP}
`.trim()

    console.log('Destino del correo:', adminEmail)
    console.log('Contenido del correo preparado (SMTP pendiente de configuración)')

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido correctamente'
    })
  } catch (error) {
    console.error('Agenda visita error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
