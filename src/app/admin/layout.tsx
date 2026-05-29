'use client'

import Link from 'next/link'
import './admin.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <h2>Manzana40</h2>
          <span>Admin</span>
        </div>
        
        <nav className="admin-sidebar__nav">
          <Link href="/admin" className="admin-sidebar__link">
            Dashboard
          </Link>
          <Link href="/admin/homepage" className="admin-sidebar__link">
            Homepage
          </Link>
          <Link href="/admin/nosotros" className="admin-sidebar__link">
            Nosotros
          </Link>
          <Link href="/admin/services" className="admin-sidebar__link">
            Servicios
          </Link>
          <Link href="/admin/amenities" className="admin-sidebar__link">
            Amenidades
          </Link>
          <Link href="/admin/media" className="admin-sidebar__link">
            Medios
          </Link>
          <Link href="/admin/settings" className="admin-sidebar__link">
            Configuración
          </Link>
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <span>Admin</span>
            <button className="admin-sidebar__logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}
