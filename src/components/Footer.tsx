'use client'

import Link from 'next/link'

const serviceLinks = [
  { href: '/oficinas', label: 'Oficinas' },
  { href: '/centro-de-negocios', label: 'Centro de Negocios' },
  { href: '/hub-40', label: 'Hub 40' },
  { href: '/boca', label: 'Boca Mixtura' },
  { href: '/amenidades', label: 'Amenidades' },
]

export default function Footer() {
  return (
    <footer itemType="https://schema.org/WPFooter" id="colophon" role="contentinfo">
      <div className='footer-width-fixer'>
        <div className="elementor elementor-231" data-elementor-post-type="elementor-hf">
          <section className="elementor-section elementor-top-section elementor-element elementor-element-a85534 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7e5e1c8">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-393115bb elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-7d4cae43">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-7a3936e4 elementor-widget elementor-widget-heading">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Quienes Somos</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-f08852c elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container">
                              <p>Somos el epicentro de la innovación y el progreso. Hemos creado un ecosistema donde las ambiciones se hacen realidad y las empresas prosperan.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-1e7519c1">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-7b4225ec elementor-widget elementor-widget-heading">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Servicios</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-3b8d20a2 taxi-banner-button elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                            <div className="elementor-widget-container">
                              <ul className="elementor-icon-list-items">
                                {serviceLinks.map((link) => (
                                  <li key={link.href} className="elementor-icon-list-item">
                                    <Link href={link.href}>
                                      <span className="elementor-icon-list-text">{link.label}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-3d420c23">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-7086a90b elementor-widget elementor-widget-heading">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">Contacto</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-6c817c75 elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container">
                              <p>Dirección Av. San Martín, Calle J.</p>
                              <p>Teléfono: +591 713-69822</p>
                              <p><a href="mailto:info@manzana40.com">info@manzana40.com</a></p>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-3c299b2f elementor-shape-rounded elementor-grid-0 e-grid-align-center elementor-widget elementor-widget-social-icons">
                            <div className="elementor-widget-container">
                              <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook" href="https://www.facebook.com/M40PlazaEmpresarial" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Facebook</span>
                                    <i aria-hidden="true" className="fab fa-facebook"></i>
                                  </a>
                                </span>
                                <span className="elementor-grid-item" role="listitem">
                                  <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram" href="https://www.instagram.com/manzana40.bo/" target="_blank" rel="noopener noreferrer">
                                    <span className="elementor-screen-only">Instagram</span>
                                    <i aria-hidden="true" className="fab fa-instagram"></i>
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-9f4561f elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-6ec6eaed">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-44d8455b elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container">
                              <p><a href="https://grayhatcorp.com/">© {new Date().getFullYear()} Gray Hat — Todos los derechos reservados</a></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </footer>
  )
}
