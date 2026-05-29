'use client'

import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className="admin-sidebar__logout">
      Cerrar Sesión
    </button>
  )
}
