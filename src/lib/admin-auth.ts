import { cookies } from 'next/headers'

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')
  return !!token
}

export function getAdminUserFromToken(token: string): { id: string; role: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [id, role] = decoded.split(':')
    return { id, role }
  } catch {
    return null
  }
}
