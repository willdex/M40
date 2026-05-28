'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

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
    <header id="masthead" itemType="https://schema.org/WPHeader">
      <p className="main-title bhf-hidden" itemProp="headline">
        <Link href="/" title="Manzana40" rel="home">Manzana40</Link>
      </p>
      <div className="elementor elementor-63" data-elementor-post-type="elementor-hf">
        <section className="elementor-section elementor-top-section elementor-element elementor-element-31cc5c4 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default">
          <div className="elementor-background-overlay"></div>
          <div className="elementor-container elementor-column-gap-default">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6c36e717">
              <div className="elementor-widget-wrap elementor-element-populated">
                <section className="elementor-section elementor-inner-section elementor-element elementor-element-57274c4 elementor-section-boxed">
                  <div className="header-desktop-nav">
                    <div className="header-logo">
                      <Link href="/">
                        <Image 
                          src="/uploads/2024/09/LOGOoficial-300x257-1.png"
                          alt="Manzana40 Logo"
                          width={300}
                          height={257}
                          priority
                        />
                      </Link>
                    </div>
                    <nav className="header-nav-menu">
                      <ul className="header-nav-list">
                        {navItems.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="header-nav-link">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="header-cta">
                      <a href="#" className="header-cta-button">Agenda una Visita</a>
                    </div>
                  </div>
                  <button 
                    className={`header-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                  </button>
                </section>

                <div className={`header-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                  <nav>
                    <ul className="header-mobile-nav-list">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link 
                            href={item.href} 
                            className="header-mobile-nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a href="#" className="header-mobile-cta">Agenda una Visita</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  )
}
