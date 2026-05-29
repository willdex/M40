import { redirect } from 'next/navigation'
import Link from 'next/link'
import { checkAdminAuth } from '@/lib/admin-auth'
import AdminLogoutButton from './logout-button'

export default async function AdminDashboard() {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard">
        <div className="admin-page-header">
          <h1>Acceso Restringido</h1>
          <p>Necesitas iniciar sesión para acceder al panel de administración.</p>
        </div>
        <div className="admin-card">
          <Link href="/admin/login" className="admin-login-link">
            Ir a Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al panel de administración de Manzana40</p>
          </div>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="admin-dashboard__grid">
        <Link href="/admin/homepage" className="admin-card">
          <h3 className="admin-card__title">Gestión de Homepage</h3>
          <p>Editar hero, servicios, amenities y más</p>
        </Link>

        <div className="admin-card">
          <h3 className="admin-card__title">Gestión de Páginas</h3>
          <p>Modificar contenido de todas las páginas</p>
        </div>

        <div className="admin-card">
          <h3 className="admin-card__title">Biblioteca de Medios</h3>
          <p>Subir y gestionar imágenes y videos</p>
        </div>

        <div className="admin-card">
          <h3 className="admin-card__title">Configuración</h3>
          <p>Ajustes generales del sitio</p>
        </div>
      </div>
    </div>
  )
}
