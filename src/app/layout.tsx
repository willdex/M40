import './globals.css'
import './homepage-desktop.css'
import './homepage-responsive.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manzana40 - La Plaza Empresarial más importante del país" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Elementor Core CSS */}
        <link rel="stylesheet" href="/plugins/elementor/assets/css/frontend.minfb3d.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/lib/eicons/css/elementor-icons.min705c.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-image.minfb3d.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-heading.minfb3d.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-video.minfb3d.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-image-box.minfb3d.css" />

        {/* Header & Footer CSS */}
        <link rel="stylesheet" href="/static-assets/elementor/css/post-634649.css" />
        <link rel="stylesheet" href="/static-assets/elementor/css/post-2314649.css" />

        {/* Homepage CSS */}
        <link rel="stylesheet" href="/static-assets/elementor/css/post-54a1d3.css" />

        {/* Typography Fonts */}
        <link rel="stylesheet" href="/static-assets/elementor/google-fonts/css/robotoc199.css" />
        <link rel="stylesheet" href="/static-assets/elementor/google-fonts/css/robotoslab3a4c.css" />

        {/* Call-to-Action Widget CSS */}
        <link rel="stylesheet" href="/plugins/elementor-pro/assets/css/widget-call-to-action.mine92f.css" />

        {/* Icon List & Social Icons */}
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-icon-list.min44b4.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/css/widget-social-icons.min2401.css" />

        {/* Header Footer Elementor CSS */}
        <link rel="stylesheet" href="/wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementora489.css" />
        <link rel="stylesheet" href="/wp-content/plugins/header-footer-elementor/inc/widgets-css/frontenda489.css" />

        {/* LightGallery CSS */}
        <link rel="stylesheet" href="/wp-content/themes/posterity/js/light-gallery/css/lightgallery.min544c.css" />

        {/* Font Awesome CSS */}
        <link rel="stylesheet" href="/plugins/elementor/assets/lib/font-awesome/css/all.minfb3d.css" />
        <link rel="stylesheet" href="/plugins/elementor/assets/lib/font-awesome/css/fontawesome.min52d5.css" />

        {/* Posterity Theme CSS */}
        <link rel="stylesheet" href="/wp-content/themes/posterity/style5152.css" />

        <link rel="icon" href="/static-assets/2025/07/cropped-favicon-32x32-1-1-32x32.png" />
      </head>
      <body id="top" className="home wp-singular page-template page-template-elementor_header_footer page page-id-54 wp-custom-logo wp-theme-posterity ehf-header ehf-footer ehf-template-posterity ehf-stylesheet-posterity header-horizontal site-layout-full elementor-default elementor-template-full-width elementor-kit-55 elementor-page elementor-page-54">
        <a className="skip-link" href="#content">Saltar al contenido</a>
        {children}
      </body>
    </html>
  )
}