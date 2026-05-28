# MISSING_SECTIONS_REPORT.md

## Homepage (index.html) - Missing Sections

### 1. PRELOADER SECTION
- **Status**: NOT RENDERED
- **Original HTTrack** (lines 209-216):
  ```html
  <div id="preloader" class="indicator onReady">
      <div class="preload-content">
          <div class="preloader-animation">
              <div class="pace-progress"><div class="pace-progress-inner"></div></div>
              <div class="pace-activity"></div>
          </div>
          <a class="skip-preloader a13icon-cross" href="#"></a>
      </div>
  </div>
  ```
- **Current Implementation**: Missing entirely

### 2. HEADER "Agenda una Visita" BUTTON
- **Status**: MISSING
- **Original HTTrack** (lines 264-276):
  ```html
  <div class="elementor-column elementor-col-33 elementor-hidden-tablet elementor-hidden-mobile">
      <div class="elementor-widget-wrap elementor-element-populated">
          <div class="elementor-element elementor-element-703b2ab4 elementor-align-center popmake-757 elementor-widget elementor-widget-button">
              <div class="elementor-widget-container">
                  <div class="elementor-button-wrapper">
                      <a class="elementor-button elementor-button-link elementor-size-sm" href="#">
                          <span class="elementor-button-content-wrapper">
                              <span class="elementor-button-text">Agenda una Visita</span>
                          </span>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  </div>
  ```
- **Current Implementation**: Header component does not include "Agenda una Visita" button in right column

### 3. FOOTER IS EMBEDDED IN PAGE CONTENT
- **Status**: RENDERED INCORRECTLY (as separate component)
- **Original HTTrack** (lines 864-983): Footer HTML is embedded within the page's `#mid` div via Elementor shortcode
- **Current Implementation**: Footer is rendered as separate `<Footer />` component after `<main>`, not embedded within page content

### 4. ELEMENTOR SHORTSCODE FOOTER (elementor-231)
- **Status**: NOT RENDERED
- **Original HTTrack** (lines 736-856):
  - Contains 3-column footer grid: "Quienes Somos", "Servicios", "Contacto"
  - Social icons (Facebook, Instagram)
  - Copyright section with "Gray Hat" link
  - This is inside `elementor-shortcode` div in the page content, not a separate footer tag

### 5. TO-TOP LINK PLACEMENT
- **Status**: INCORRECTLY PLACED
- **Original HTTrack** (line 984): `<a href="#top" id="to-top" class="to-top fa fa-angle-up"></a>` - inside `<body>` after footer, before `</div><!-- .whole-layout -->`
- **Current Implementation**: Inside `<main>` element

### 6. CONTENT OVERLAY DIV
- **Status**: MISSING
- **Original HTTrack** (line 985): `<div id="content-overlay" class="to-move"></div>` - after to-top link

### 7. WRAPPER DIVS
- **Status**: MISSING
- **Original HTTrack**:
  - `<div class="whole-layout">` wraps entire page
  - `<div class="page-background to-move"></div>` before header

### 8. TRIPLE COLUMN CARD SECTION (Inversión, Compra o Alquiler, Llave en Mano)
- **Status**: DIFFERENT STRUCTURE
- **Original HTTrack** (lines 593-678):
  - Uses `elementor-inner-section` with `elementor-section-content-middle`
  - Background images on columns (data-settings background_background classic)
  - Text descriptions have multiple paragraphs
- **Current Implementation**: Uses flexbox grid, simplified structure

### 9. VIDEO OVERLAY STRUCTURE
- **Status**: PARTIALLY CORRECT
- **Original HTTrack** (line 712):
  - YouTube video with `show_image_overlay: yes`
  - Overlay image: `wp-content/uploads/2024/09/hyperportada.jpg`
  - YouTube URL: `https://www.youtube.com/watch?v=XHOmBV4js_E`
- **Current Implementation**: Uses hosted video fallback, not YouTube embed

### 10. SECOND CTA SECTION "¡Atrévete a Soñarlo!"
- **Status**: DIFFERENT STRUCTURE
- **Original HTTrack** (lines 684-729):
  - Uses `elementor-section-inner-section` structure
  - 50/50 split with heading left, video right
  - No border/background color on container
- **Current Implementation**: Full-width section with border

### 11. SLIDER REVOLUTION VIDEO SRC
- **Status**: DIFFERENT
- **Original HTTrack** (line 306):
  - Video src: `//manzana40.com/wp-content/uploads/2024/09/slider.mp4`
  - Poster: `slider_1_layer.jpeg` from revslider folder
- **Current Implementation**: Uses `/uploads/2024/09/slider.mp4` with slidernosotros.jpg poster

### 12. AMENITIES SECTION - "Estructura Moderna" HEADING
- **Status**: MISSING
- **Original HTTrack** (line 501): Contains second `<h2>` with "Estructura Moderna" text

### 13. CSS CLASSES NOT PRESERVED
- **Status**: MISSING
- Many original classes simplified or removed:
  - `elementor-section-stretched`
  - `elementor-section-height-min-height`
  - `elementor-section-items-middle`
  - `taxi-choice-section-phone`
  - `taxi-banner-button`
  - `popmake-757`

## Subpages - Missing Sections

### /nosotros
- Slider section with revslider HTML
- Full hero section structure
- Image/text alternating sections

### /oficinas
- Slider with video
- Property showcase grid
- Amenities icons

### /centro-de-negocios
- Revslider initialization code
- Event space imagery

### /hub-40
- Coworking specific imagery
- Pricing/plan tables

### /boca
- Restaurant directory/gallery
- Menu integration

### /amenidades
- Facility photos grid
- Booking/contact forms