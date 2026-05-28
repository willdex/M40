'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import './Header.css'

const navItems = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/oficinas', label: 'Oficinas' },
  { href: '/centro-de-negocios', label: 'Centro de Negocios' },
  { href: '/hub-40', label: 'HUB 40' },
  { href: '/boca', label: 'Boca Mixtura' },
  { href: '/amenidades', label: 'Amenidades' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="m40-header">
      <div className="m40-header-inner">
        <Link href="/" className="m40-logo">
          <Image 
            src="/uploads/2024/09/LOGOoficial-300x257-1.png"
            alt="Manzana40 Logo"
            width={180}
            height={154}
            priority
          />
        </Link>

        <nav className="m40-nav">
          <ul className="m40-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="m40-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#" className="m40-cta-button">Agenda una Visita</a>

        <button 
          className={`m40-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`m40-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav>
          <ul className="m40-mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="m40-mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#" className="m40-mobile-cta">Agenda una Visita</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
