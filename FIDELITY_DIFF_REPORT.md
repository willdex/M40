# FIDELITY_DIFF_REPORT.md

## Objective
Compare the current Next.js implementation against the original HTTrack mirror to identify fidelity issues in visual rendering.

## Method
Element-by-element comparison of HTML structure, CSS classes, and component nesting from HTTrack mirror vs current implementation.

---

## HOMEPAGE FIDELITY ANALYSIS

### 1. PRELOADER
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Container ID | `preloader` | Missing | ❌ MISSING |
| Animation div | `pace-progress`, `pace-activity` | Missing | ❌ MISSING |
| Skip link | `skip-preloader a13icon-cross` | Missing | ❌ MISSING |
| Classes | `indicator onReady` | Missing | ❌ MISSING |

### 2. HEADER STRUCTURE
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Logo link | Yes - `index.html` | Yes | ✅ OK |
| Nav items | 6 items in `<ul>` | 6 items | ✅ OK |
| Mobile toggle | `hfe-nav-menu__toggle` | Missing | ❌ MISSING |
| "Agenda una Visita" button | In 3rd column, hidden tablet/mobile | Missing from header | ❌ MISSING |
| Menu hover animations | Underline animation | Basic hover | ⚠️ DIFFERENT |

### 3. HERO SLIDER SECTION
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Container class | `wp-block-themepunch-revslider` | Same | ✅ OK |
| Video source | `//manzana40.com/wp-content/uploads/2024/09/slider.mp4` | `/uploads/2024/09/slider.mp4` | ⚠️ DIFFERENT |
| Poster image | `revslider/video-media/slider_1_layer.jpeg` | `/uploads/2024/09/slidernosotros.jpg` | ⚠️ DIFFERENT |
| Slider initialization | `SR7.PMH` script present | Video only | ❌ MISSING |
| SR7 module attributes | `data-alias`, `data-id` | Not preserved | ❌ MISSING |

### 4. "LA PLAZA EMPRESARIAL" SECTION (lines 320-358)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Section background | Not set (inherits) | `#1B191A` hardcoded | ⚠️ DIFFERENT |
| Column layout | 50/50 split | 50/50 | ✅ OK |
| Image width | 1024, height 1024 | Same | ✅ OK |
| Heading font | `elementor-size-default` | Inline style | ⚠️ DIFFERENT |
| Video controls | `controls=""` | `controls={true}` | ⚠️ SYNTAX |
| Video overlay | `slider_1_layer.jpg` | `slider_1_layer.jpg` | ✅ OK |
| Phone icon | 33x33 `choice-phn-icon.png` | Same | ✅ OK |
| Phone number style | Class-based | Inline styles | ⚠️ DIFFERENT |

### 5. SERVICES GRID SECTION (lines 359-489)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Section class | `elementor-element-64d9d144` | Same | ✅ OK |
| Background | `#1B191A` | Same | ✅ OK |
| Title | "UN ECOSISTEMA..." | Same | ✅ OK |
| 5-column grid | `elementor-col-20` each | CSS grid | ⚠️ DIFFERENT |
| Card backgrounds | Background image URLs | Same URLs | ✅ OK |
| Overlay | `rgba(0,0,0,0.4)` | Same | ✅ OK |
| Hover effects | Zoom in via Elementor | CSS transition | ⚠️ DIFFERENT |
| Border radius | Elementor-controlled | None | ❌ MISSING |

### 6. "UNA PLAZA EMPRESARIAL ÚNICA" SECTION (lines 490-570)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| First heading | "UNA PLAZA EMPRESARIAL ÚNICA" | Same | ✅ OK |
| Second heading | "Estructura Moderna" | MISSING | ❌ MISSING |
| Icon boxes | 6 total (3 per row) | 6 total | ✅ OK |
| Icons | `building-icono.png`, `ambienteok.png`, `ico3.png`, `ico4.png`, `ico5.png`, `icoi6.png` | Same | ✅ OK |
| Title case | Uppercase | Same | ✅ OK |
| Description alignment | Center | Same | ✅ OK |

### 7. YELLOW BANNER SECTION (lines 571-578)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Background | `#FFCD00` + `backi.jpg` | Same | ✅ OK |
| Height | `min-height` | `minHeight` | ✅ OK |
| Content | Empty widget-wrap | Empty | ⚠️ DIFFERENT |

### 8. "DESCUBRE TODAS NUESTRAS POSIBILIDADES" SECTION (lines 579-683)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Section structure | Nested inner-sections | Flat structure | ⚠️ DIFFERENT |
| Column backgrounds | `background_background: classic` | None | ❌ MISSING |
| Card images | `ofic33.jpg`, `ofici44.webp`, `ofici55.jpg` | Same | ✅ OK |
| Titles | "INVERSIÓN", "COMPRA O ALQUILER", "OFICINAS LLAVE EN MANO" | Same | ✅ OK |
| Button links | WhatsApp URLs | Same | ✅ OK |
| Descriptions | Multiple paragraphs | Single paragraph | ⚠️ DIFFERENT |

### 9. "¡ATRÉVETE A SOÑARLO!" SECTION (lines 684-729)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Structure | Inner section 50/50 | Full-width grid | ⚠️ DIFFERENT |
| Video type | YouTube embed | Image overlay | ❌ DIFFERENT |
| YouTube URL | `https://www.youtube.com/watch?v=XHOmBV4js_E` | Not used | ❌ MISSING |
| Overlay image | `hyperportada.jpg` | Same | ✅ OK |

### 10. FOOTER (Elementor Shortcode inside page)
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| Container | `elementor-shortcode` | Not rendered | ❌ MISSING |
| 3-column layout | Quienes Somos, Servicios, Contacto | Separate component | ❌ MISSING |
| Social icons | Facebook, Instagram | Separate component | ❌ MISSING |
| Copyright | Gray Hat link | Separate component | ❌ MISSING |

### 11. BODY-LEVEL ELEMENTS
| Aspect | HTTrack | Next.js | Status |
|--------|---------|---------|--------|
| `whole-layout` div | Wraps entire content | Missing | ❌ MISSING |
| `page-background` div | Before header | Missing | ❌ MISSING |
| `content-overlay` div | After footer | Missing | ❌ MISSING |
| `to-top` link placement | After footer | Inside main | ❌ WRONG |

---

## CRITICAL VISUAL DIFFERENCES

### A. Typography
- HTTrack uses Elementor widget classes for styling
- Next.js uses inline styles
- Font stack differs: HTTrack uses Google Fonts via WebFontConfig, Next.js uses `@import`

### B. Spacing
- HTTrack uses Elementor's gap system (`elementor-column-gap-default`, `elementor-column-gap-wider`, `elementor-column-gap-no`)
- Next.js uses custom CSS with different values

### C. Animations
- HTTrack slider has complex RevSlider initialization
- Hover effects use Elementor's built-in animations
- Next.js has basic CSS transitions

### D. Responsive Behavior
- HTTrack has Elementor breakpoint controls
- Next.js has custom media queries
- Breakpoints may not match exactly

---

## SUMMARY SCORES

| Category | Score | Issues |
|----------|-------|--------|
| Structure Preservation | 6/10 | Missing nested sections, simplified DOM |
| CSS Fidelity | 5/10 | Inline styles vs classes, different selectors |
| Component Fidelity | 7/10 | Main components present but simplified |
| Asset Paths | 8/10 | Mostly correct, some path differences |
| Animation Fidelity | 3/10 | Missing RevSlider, simplified transitions |
| Layout Fidelity | 7/10 | 50/50 grids correct, but gaps/spacing differ |

**OVERALL FIDELITY: ~55%**

---

## RECOMMENDATIONS

1. **Adopt HTTrack HTML structure verbatim** for complex sections
2. **Include original CSS classes** instead of inline styles where possible
3. **Preserve RevSlider initialization** even if just video element
4. **Match Elementor gap/spacing system** exactly
5. **Replicate footer-as-shortcode** structure within page content
6. **Add all missing wrapper divs** (whole-layout, page-background, etc.)