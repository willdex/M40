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
                  <div className="elementor-container elementor-column-gap-default">
                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-56bf3c2f">
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-4572164c elementor-widget__width-initial elementor-widget elementor-widget-image">
                          <div className="elementor-widget-container">
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
                        </div>
                      </div>
                    </div>

                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-403a4d88">
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-6afc2782 elementor-widget__width-auto hfe-submenu-icon-arrow hfe-submenu-animation-none hfe-link-redirect-child hfe-nav-menu__breakpoint-tablet elementor-widget elementor-widget-navigation-menu">
                          <div className="elementor-widget-container">
                            <nav className="hfe-nav-menu hfe-layout-horizontal hfe-nav-menu-layout horizontal hfe-pointer__underline hfe-animation__slide">
                              <ul id="menu-1" className="hfe-nav-menu">
                                {navItems.map((item) => (
                                  <li key={item.href} className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                                    <Link href={item.href} className="hfe-menu-item">
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-6d004cfd elementor-hidden-tablet elementor-hidden-mobile">
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-703b2ab4 elementor-align-center elementor-widget elementor-widget-button">
                          <div className="elementor-widget-container">
                            <div className="elementor-button-wrapper">
                              <a className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                <span className="elementor-button-content-wrapper">
                                  <span className="elementor-button-text">Agenda una Visita</span>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                  </button>
                </section>

                <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
                  <nav>
                    <ul className="mobile-nav-list">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link 
                            href={item.href} 
                            className="mobile-nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a href="#" className="mobile-cta-button">Agenda una Visita</a>
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
