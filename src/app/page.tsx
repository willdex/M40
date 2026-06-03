import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesSection from '@/components/ServicesSection'
import HomepageEditorials from '@/components/HomepageEditorials'
import HomePhoneCTA from '@/components/HomePhoneCTA'
import VideoOverlayClient from '@/components/VideoOverlayClient'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { getHomepageContent } from '@/lib/db-content'
import type { SiteContent } from '@/lib/content'

const STATIC_FALLBACK: SiteContent = {
  sliders: [{ id: 'slider-1', type: 'video', src: '/static-assets/videos/VideoHomeage.mp4', poster: '/static-assets/revslider/video-media/slider_1_layer.jpg', alt: 'Manzana40 Hero' }],
  homepage: {
    heroTitle: 'LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS.',
    heroSubtitle: 'Un ecosistema de posibilidades, un mundo de oportunidades para tu negocio.',
    mainVideo: { src: '/static-assets/videos/VideoHomeage.mp4', poster: '/static-assets/revslider/video-media/slider_1_layer.jpg' },
    contactPhone: '+591 71369822',
    featuresTitle: 'UN ECOSISTEMA DE POSIBILIDADES, UN MUNDO DE OPORTUNIDADES PARA TU NEGOCIO',
    amenitiesTitle: 'UNA PLAZA EMPRESARIAL ÚNICA'
  },
  services: [
    { id: 'oficinas', title: 'OFICINAS', description: 'En venta y alquiler', image: '/static-assets/elementor/thumbs/oficinam1-qubpyhacvcdu7b4d9f6lkfcw815jlau932kh7qgsc0.jpg', href: '/oficinas' },
    { id: 'centro-de-negocios', title: 'CENTRO DE NEGOCIOS', description: 'Eventos Corporativos', image: '/static-assets/2024/09/oficina2.jpg', href: '/centro-de-negocios' },
    { id: 'hub-40', title: 'HUB 40', description: 'Co-Work', image: '/static-assets/2024/09/oficina3.jpg', href: '/hub-40' },
    { id: 'boca', title: 'BOCA MIXTURA', description: 'Boulevard Gastronómico', image: '/static-assets/2024/09/oficina4.jpg', href: '/boca' },
    { id: 'amenidades', title: 'AMENIDADES', description: 'Pensadas en vos', image: '/static-assets/2024/09/boutique.jpg', href: '/amenidades' }
  ],
  amenities: [
    { id: 'leed', icon: '/static-assets/2024/09/building-icono.png', title: 'CERTIFICACIÓN LEED', description: 'Que garantiza contar con un edificio sostenible en el tiempo.' },
    { id: 'seguro', icon: '/static-assets/2024/09/ambienteok.png', title: 'AMBIENTE SEGURO', description: 'Seguridad proactiva y sustentada por tecnología avanzada.' },
    { id: 'climatizacion', icon: '/static-assets/2024/09/ico3.png', title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE', description: 'Esta tecnología permite generar un ahorro aproximado de 30% en el consumo eléctrico.' },
    { id: 'aire-exterior', icon: '/static-assets/2024/09/ico4.png', title: 'SISTEMA DE AIRE EXTERIOR', description: 'Necesario para la renovación de oxígeno de las oficinas, será suministrado y filtrado por medio de ventiladores de inyección de aire.' },
    { id: 'muro-cortina', icon: '/static-assets/2024/09/ico5.png', title: 'MURO CORTINA', description: 'Paneles de doble vidrio con cámara de aire por medio, para disminuir el ingreso del sol y optimizar el uso energético.' },
    { id: 'ascensores', icon: '/static-assets/2024/09/icoi6.png', title: '16 ASCENSORES', description: 'Los más rápidos del país.' }
  ],
  footer: { aboutTitle: 'Quienes Somos', aboutText: 'Somos el epicentro de la innovación y el progreso.', servicesTitle: 'Servicios', contactTitle: 'Contacto', address: 'Av. San Martín, Calle J.', phone: '+591 713-69822', email: 'info@manzana40.com', facebook: 'https://www.facebook.com/M40PlazaEmpresarial', instagram: 'https://www.instagram.com/manzana40.bo/' },
  meta: { siteName: 'Manzana40', description: 'La Plaza Empresarial más importante del país', phone: '+591 71369822' },
videoSection1: { url: '/static-assets/videos/hyperlapse.mp4', poster: '/static-assets/2024/09/manzn2.jpg' },
    videoSection2: { url: 'https://www.youtube.com/embed/pLA2_VdjU7g', poster: 'https://img.youtube.com/vi/pLA2_VdjU7g/maxresdefault.jpg' }
}

async function getContent(): Promise<SiteContent> {
  try {
    const dbContent = await getHomepageContent()

    return {
      sliders: [{ id: 'slider-1', type: 'video', src: dbContent.hero?.video || STATIC_FALLBACK.sliders![0].src, poster: dbContent.hero?.poster || STATIC_FALLBACK.sliders![0].poster, alt: 'Manzana40 Hero' }],
      homepage: {
        heroTitle: dbContent.hero?.title || STATIC_FALLBACK.homepage.heroTitle,
        heroSubtitle: dbContent.hero?.subtitle || STATIC_FALLBACK.homepage.heroSubtitle,
        mainVideo: { src: dbContent.hero?.video || STATIC_FALLBACK.homepage.mainVideo.src, poster: dbContent.hero?.poster || STATIC_FALLBACK.homepage.mainVideo.poster },
        contactPhone: dbContent.contactPhone || STATIC_FALLBACK.homepage.contactPhone,
        featuresTitle: dbContent.featuresTitle || STATIC_FALLBACK.homepage.featuresTitle,
        amenitiesTitle: dbContent.amenitiesTitle || STATIC_FALLBACK.homepage.amenitiesTitle
      },
      videoSection1: {
        url: dbContent.videoSection1?.url || STATIC_FALLBACK.videoSection1.url,
        poster: STATIC_FALLBACK.videoSection1.poster
      },
      videoSection2: {
        url: dbContent.videoSection2?.url || STATIC_FALLBACK.videoSection2.url,
        poster: STATIC_FALLBACK.videoSection2.poster
      },
      services: dbContent.services?.length ? dbContent.services : STATIC_FALLBACK.services,
      amenities: dbContent.amenities?.length ? dbContent.amenities : STATIC_FALLBACK.amenities,
      footer: dbContent.footer ? {
        aboutTitle: dbContent.footer.aboutTitle || STATIC_FALLBACK.footer.aboutTitle,
        aboutText: dbContent.footer.aboutText || STATIC_FALLBACK.footer.aboutText,
        servicesTitle: dbContent.footer.servicesTitle || STATIC_FALLBACK.footer.servicesTitle,
        contactTitle: dbContent.footer.contactTitle || STATIC_FALLBACK.footer.contactTitle,
        address: dbContent.footer.address || STATIC_FALLBACK.footer.address,
        phone: dbContent.footer.phone || STATIC_FALLBACK.footer.phone,
        email: dbContent.footer.email || STATIC_FALLBACK.footer.email,
        facebook: dbContent.footer.facebook || STATIC_FALLBACK.footer.facebook,
        instagram: dbContent.footer.instagram || STATIC_FALLBACK.footer.instagram
      } : STATIC_FALLBACK.footer,
      meta: { siteName: 'Manzana40', description: 'La Plaza Empresarial más importante del país', phone: dbContent.contactPhone || STATIC_FALLBACK.meta.phone }
    }
  } catch (error) {
    console.error('Failed to fetch from database, using static fallback:', error)
  }
  return STATIC_FALLBACK
}

export default async function HomePage() {
  const content = await getContent()
  const { homepage, services, amenities, sliders, videoSection1, videoSection2 } = content

  return (
    <div className="whole-layout">
      <div id="preloader" className="indicator onReady">
        <div className="preload-content">
          <div className="preloader-animation">
            <div className="pace-progress"><div className="pace-progress-inner"></div></div>
            <div className="pace-activity"></div>
          </div>
          <a className="skip-preloader a13icon-cross" href="#"></a>
        </div>
      </div>

<Header />

      <div id="mid" className="to-move layout-center layout-parted layout-no-edge layout-fixed no-sidebars">
        <div data-elementor-type="wp-page" data-elementor-id="54" className="elementor elementor-54" data-elementor-post-type="page">
          <section className="homepage-hero">
            <div className="hero-media">
              {sliders?.[0]?.type === 'video' ? (
                <video
                  className="hero-video"
                  src={sliders?.[0]?.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={sliders?.[0]?.poster || homepage.mainVideo.poster}
                />
              ) : (
                <img
                  className="hero-image"
                  src={sliders?.[0]?.poster || homepage.mainVideo.poster || '/static-assets/2024/09/slidernosotros.jpg'}
                  alt={sliders?.[0]?.alt || 'Manzana40 Hero'}
                />
              )}
            </div>
          </section>

          <section className="elementor-section elementor-top-section elementor-element elementor-element-3f049f0a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3f049f0a" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="elementor-container elementor-column-gap-wider">
              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2afbff53" data-id="2afbff53" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-6affac0a elementor-widget elementor-widget-image" data-id="6affac0a" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                    <div className="elementor-widget-container">
                      <img decoding="async" width="1024" height="1024" src="/static-assets/2024/09/manzn2.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-4bfe6ee8" data-id="4bfe6ee8" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-d038935 elementor-widget elementor-widget-heading" data-id="d038935" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">{homepage.heroTitle}</h2>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-465de400 elementor-widget elementor-widget-text-editor" data-id="465de400" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container">
                      <p>{homepage.heroSubtitle}</p>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-9898042 elementor-widget elementor-widget-video" data-id="9898042" data-element_type="widget" data-e-type="widget" data-widget_type="video.default">
                    <div className="elementor-widget-container">
                      <VideoOverlayClient
                        src={videoSection1.url}
                        poster={videoSection1.poster!}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

<HomePhoneCTA phone={homepage.contactPhone} />

<ServicesSection title={homepage.featuresTitle} services={services} />

          <HomepageEditorials />

          <section className="elementor-section elementor-top-section elementor-element elementor-element-65a4458b elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="65a4458b" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7be03aee" data-id="7be03aee" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-4628239b elementor-widget elementor-widget-heading" data-id="4628239b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">{homepage.amenitiesTitle}</h2>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-5ce39c63 elementor-widget elementor-widget-heading" data-id="5ce39c63" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Estructura Moderna</h2>
                    </div>
                  </div>
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-338adee1 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="338adee1" data-element_type="section" data-e-type="section">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-4145955" data-id="4145955" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-251d3e4b elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="251d3e4b" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[0]?.icon || '/static-assets/2024/09/building-icono.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[0]?.title || 'CERTIFICACIÓN LEED'}</h3>
                                  <p className="elementor-image-box-description">{amenities[0]?.description || 'Que garantiza contar con un edificio sostenible en el tiempo.'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-3501c5a3" data-id="3501c5a3" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-cca3426 elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="cca3426" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[1]?.icon || '/static-assets/2024/09/ambienteok.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[1]?.title || 'AMBIENTE SEGURO'}</h3>
                                  <p className="elementor-image-box-description">
                                    {amenities[1]?.description || 'Seguridad proactiva y sustentada por tecnología avanzada.'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-4348e22f" data-id="4348e22f" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-b16dfeb elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="b16dfeb" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[2]?.icon || '/static-assets/2024/09/ico3.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[2]?.title || 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE'}</h3>
                                  <p className="elementor-image-box-description">{amenities[2]?.description || 'Esta tecnología permite generar un ahorro aproximado de 30% en el consumo eléctrico.'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-ecd4ddf elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="ecd4ddf" data-element_type="section" data-e-type="section">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-5b0d491" data-id="5b0d491" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-6decf9e elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="6decf9e" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[3]?.icon || '/static-assets/2024/09/ico4.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[3]?.title || 'SISTEMA DE AIRE EXTERIOR'}</h3>
                                  <p className="elementor-image-box-description">{amenities[3]?.description || 'Necesario para la renovación de oxígeno de las oficinas, será suministrado y filtrado por medio de ventiladores de inyección de aire.'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-a15969c" data-id="a15969c" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-fe2e502 elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="fe2e502" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[4]?.icon || '/static-assets/2024/09/ico5.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[4]?.title || 'MURO CORTINA'}</h3>
                                  <p className="elementor-image-box-description">{amenities[4]?.description || 'Paneles de doble vidrio con cámara de aire por medio, para disminuir el ingreso del sol y optimizar el uso energético.'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-81860a3" data-id="81860a3" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-701f1ae elementor-widget-mobile__width-inherit elementor-position-top elementor-widget elementor-widget-image-box" data-id="701f1ae" data-element_type="widget" data-e-type="widget" data-widget_type="image-box.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-image-box-wrapper">
                                <figure className="elementor-image-box-img">
                                  <img loading="lazy" decoding="async" width="106" height="82" src={amenities[5]?.icon || '/static-assets/2024/09/icoi6.png'} alt="" />
                                </figure>
                                <div className="elementor-image-box-content">
                                  <h3 className="elementor-image-box-title">{amenities[5]?.title || '16 ASCENSORES'}</h3>
                                  <p className="elementor-image-box-description">{amenities[5]?.description || 'Los más rápidos del país.'}</p>
                                </div>
                              </div>
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

          <section className="elementor-section elementor-top-section elementor-element elementor-element-471822f6 elementor-section-full_width elementor-section-height-min-height elementor-section-height-default elementor-section-items-middle" data-id="471822f6" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-51ec9d3b" data-id="51ec9d3b" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap"></div>
              </div>
            </div>
          </section>

          <section className="elementor-section elementor-top-section elementor-element elementor-element-1796b641 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="1796b641" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1aa098ac" data-id="1aa098ac" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <div className="elementor-element elementor-element-5a0df5a2 elementor-widget elementor-widget-heading" data-id="5a0df5a2" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">DESCUBRE TODAS NUESTRAS POSIBILIDADES</h2>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-ae6ab8 elementor-widget elementor-widget-heading" data-id="ae6ab8" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Espacios de trabajo desde un escritorio hasta pisos completos. Entregados en obra gris, obra fina o llave en mano.</h2>
                    </div>
                  </div>
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-41653b0e elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="41653b0e" data-element_type="section" data-e-type="section">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-2a3557fb" data-id="2a3557fb" data-element_type="column" data-e-type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-301458fe elementor-widget elementor-widget-image" data-id="301458fe" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                            <div className="elementor-widget-container">
                              <img loading="lazy" decoding="async" width="500" height="500" src="/static-assets/2024/09/ofic33.jpg" alt="" />
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-589d8b34 elementor-widget elementor-widget-heading" data-id="589d8b34" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">INVERSIÓN</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-8381426 elementor-widget elementor-widget-text-editor" data-id="8381426" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                            <div className="elementor-widget-container">
                              <p style={{ textAlign: 'center' }}>Compra una oficina con alquiler garantizado y un rendimiento anual superior al promedio del mercado.</p>
                              <p style={{ textAlign: 'center' }}>La mejor inversión.</p>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-10e436ab elementor-align-center taxi-banner-button elementor-widget elementor-widget-button" data-id="10e436ab" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-button-wrapper">
                                <a className="elementor-button elementor-button-link elementor-size-sm" href="https://api.whatsapp.com/send?phone=59171369822&text=Quiero%20m%C3%A1s%20informaci%C3%B3n">
                                  <span className="elementor-button-content-wrapper">
                                    <span className="elementor-button-text">Más información</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-41c5e1ff" data-id="41c5e1ff" data-element_type="column" data-e-type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-6f3248b1 elementor-widget elementor-widget-image" data-id="6f3248b1" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                            <div className="elementor-widget-container">
                              <img loading="lazy" decoding="async" width="800" height="800" src="/static-assets/2024/09/ofici44.webp" alt="" />
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-573a9bb7 elementor-widget elementor-widget-heading" data-id="573a9bb7" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">COMPRA O ALQUILER</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-b606770 elementor-widget elementor-widget-text-editor" data-id="b606770" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-element elementor-element-286835d elementor-widget elementor-widget-text-editor" data-id="286835d" data-widget_type="text-editor.default">
                                <div className="elementor-widget-container">
                                  <p style={{ textAlign: 'center' }}>En M40 encontrarás la oficina que estás buscando, que se ajusta a tus necesidades, desde 56m2 a pisos completos. También tienes opciones de espacios de coworking y oficinas privadas en Hub40.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-624a1e2f elementor-align-center taxi-banner-button elementor-widget elementor-widget-button" data-id="624a1e2f" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-button-wrapper">
                                <a className="elementor-button elementor-button-link elementor-size-sm" href="https://bit.ly/oficinasm40">
                                  <span className="elementor-button-content-wrapper">
                                    <span className="elementor-button-text">Más información</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-33 elementor-inner-column elementor-element elementor-element-3b3b1840" data-id="3b3b1840" data-element_type="column" data-e-type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-41bff692 elementor-widget elementor-widget-image" data-id="41bff692" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                            <div className="elementor-widget-container">
                              <img loading="lazy" decoding="async" width="500" height="500" src="/static-assets/2024/09/ofici55.jpg" alt="" />
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-71da11a1 elementor-widget elementor-widget-heading" data-id="71da11a1" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">OFICINAS LLAVE EN MANO</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-d6e42e1 elementor-widget elementor-widget-text-editor" data-id="d6e42e1" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                            <div className="elementor-widget-container">
                              <p style={{ textAlign: 'center' }}>Deja en nuestras manos el diseño, desarrollo e implementación de tu oficina. Accede a opciones de financiamiento.</p>
                              <p>&nbsp;</p>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-1ea01bb9 elementor-align-center taxi-banner-button elementor-widget elementor-widget-button" data-id="1ea01bb9" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-button-wrapper">
                                <a className="elementor-button elementor-button-link elementor-size-sm" href="https://bit.ly/oficinasm40">
                                  <span className="elementor-button-content-wrapper">
                                    <span className="elementor-button-text">Más información</span>
                                  </span>
                                </a>
                              </div>
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

          <section className="elementor-section elementor-top-section elementor-element elementor-element-c1f5d57 elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="c1f5d57" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="elementor-container elementor-column-gap-default">
              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e6d31f8" data-id="e6d31f8" data-element_type="column" data-e-type="column">
                <div className="elementor-widget-wrap elementor-element-populated">
                  <section className="elementor-section elementor-inner-section elementor-element elementor-element-ea06f71 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="ea06f71" data-element_type="section" data-e-type="section">
                    <div className="elementor-container elementor-column-gap-default">
                      <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-ce5e5cf" data-id="ce5e5cf" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-7125814 elementor-widget elementor-widget-heading" data-id="7125814" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                            <div className="elementor-widget-container">
                              <h2 className="elementor-heading-title elementor-size-default">¡Atrévete a Soñarlo!</h2>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-299d3bf elementor-align-center taxi-banner-button elementor-mobile-align-center elementor-widget elementor-widget-button" data-id="299d3bf" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                            <div className="elementor-widget-container">
                              <div className="elementor-button-wrapper">
                                <a className="elementor-button elementor-button-link elementor-size-sm" href="https://api.whatsapp.com/send?phone=59171369822&text=Gracias%20por%20comunicarse%20con%20Manzana40.%20En%20que%20podemos%20ayudarte%3F">
                                  <span className="elementor-button-content-wrapper">
                                    <span className="elementor-button-text">Más Información</span>
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-83d6e3f" data-id="83d6e3f" data-element_type="column" data-e-type="column">
                        <div className="elementor-widget-wrap elementor-element-populated">
                          <div className="elementor-element elementor-element-f2895a8 elementor-widget elementor-widget-video" data-id="f2895a8" data-element_type="widget" data-e-type="widget" data-widget_type="video.default">
                            <div className="elementor-widget-container">
                              <YouTubeEmbed
                                url={videoSection2.url}
                                poster={videoSection2.poster || ''}
                              />
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

        <div id="content-overlay" className="to-move"></div>
      </div>

      <Footer />

      <a href="#top" id="to-top" className="to-top fa fa-angle-up"></a>
    </div>
  )
}