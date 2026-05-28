# MANZANA40 - CSS DEPENDENCY MAP
Generated: 2026-05-26

## PURPOSE
This document maps CSS dependencies before cleanup, ensuring no layout-critical CSS is removed.

---

## CRITICAL LAYOUT CSS (DO NOT REMOVE)

### 1. post-54.css (Homepage #54)
```
.elementor-54 .elementor-element.elementor-element-3f049f0a {
  background-color: #1B191A;  /* Section background */
  padding: 80px 0px 80px 0px;  /* Section padding */
}

.elementor-54 .elementor-element.elementor-element-de1818e .elementor-heading-title {
  font-family: "Roboto", Sans-serif;
  font-size: 30px;            /* Title size */
  font-weight: 700;
  text-transform: uppercase;
  color: #A4BDC1;              /* Title color */
}

.elementor-54 .elementor-element.elementor-element-64d9d144 {
  background-color: #1B191A;  /* Services section bg */
  padding: 70px 0px 70px 0px; /* Services padding */
}

.elementor-54 .elementor-element.elementor-element-471822f6 {
  background-color: #FFCD00;    /* Yellow banner bg */
  background-image: url("../../2024/09/backi.jpg");
  min-height: 500px;
  padding: 50px 0px 50px 0px;
}

.elementor-54 .elementor-element.elementor-element-bed5b32 .elementor-image-box-description {
  font-family: "Poppins", Sans-serif;
  font-size: 35px;             /* Phone number size */
  font-weight: 600;
  color: #A4BDC1;
}
```

### 2. post-634649.css (Header/Footer #63, #231)
```
.elementor-63 .elementor-element.elementor-element-31cc5c4 {
  background-color: #1B191A;  /* Header background */
  padding: 0px 0px 20px 0px;
}

.elementor-63 .elementor-element.elementor-element-6afc2782 .menu-item a.hfe-menu-item {
  padding-left: 12px;
  padding-right: 12px;
  color: #A4BDC1;             /* Nav link color */
  font-family: "Roboto", Sans-serif;
  font-weight: 600;
  text-transform: uppercase;
}

.elementor-63 .elementor-element.elementor-element-703b2ab4 .elementor-button {
  background-color: #A4BDC1; /* Visit button bg */
}
```

### 3. post-266343f.css (Nosotros #266)
Similar structure - preserves page-specific colors and spacing.

### 4. post-2985258.css (Oficinas #298)
Similar structure - preserves page-specific colors and spacing.

---

## LAYOUT-CRITICAL SELECTORS

| Selector | Property | Value | Purpose |
|----------|----------|-------|---------|
| `.elementor-section-full_width` | width | 100% | Full-width sections |
| `.elementor-element-3f049f0a` | background-color | #1B191A | Dark section bg |
| `.elementor-element-471822f6` | background-color | #FFCD00 | Yellow banner bg |
| `.elementor-cta__bg-overlay` | background | rgba(0,0,0,0.4) | Service card overlay |
| `.elementor-heading-title` | text-transform | uppercase | All titles |
| `services-grid` | display | grid | Services grid layout |
| `services-grid` | grid-template-columns | repeat(5, 1fr) | 5-column services |

---

## RESPONSIVE BREAKPOINTS (From Elementor)

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Mobile | max-width: 767px | Phone vertical |
| Tablet | 768px - 1024px | Tablet/phone horizontal |
| Laptop | 1025px - 1366px | Small laptop |
| Widescreen | 1366px+ | Desktop |

---

## ANIMATION PRESERVATION

- `.elementor-animated-item--grow` - Scale animation on hover
- `.elementor-bg-transform-zoom-in` - Background zoom on hover  
- `.elementor-cta:hover .elementor-cta__bg` - Transform scale 1.05 on card hover
- Transitions: `transition: transform 0.3s ease`

---

## ELEMENTOR PLUGIN CSS (SAFE TO REMOVE AFTER MIGRATION)

| File | Status | Can Remove |
|------|--------|------------|
| `widget-*.css` | Used for styling | NO (layout) |
| `frontend.minfb3d.css` | Elementor core | PARTIAL |
| `conditionals/*.css` | Browser-specific | YES |
| `animations/*.css` | Animation effects | PARTIAL |

---

## FONTS CSS (PRESERVE)

| File | Font | Usage |
|------|------|-------|
| `robotoc199.css` | Roboto Regular | Headers, navigation |
| `robotoslab3a4c.css` | Roboto Slab | Alternative headers |
| `poppins8c72.css` | Poppins | Body text, descriptions |

---

## SUMMARY: CRITICAL VS REMOVABLE

### CRITICAL (Do Not Remove)
- Section background colors (#1B191A, #FFCD00)
- Text colors (#A4BDC1, #D3D3D3)
- Padding values (80px, 70px, 50px)
- Font families (Poppins, Roboto, Roboto Slab)
- Service card overlay (rgba(0,0,0,0.4))
- Grid layouts (services-grid, elementor-row)

### SAFE TO REMOVE (After visual parity confirmed)
- `conditionals/apple-webkit*.css` - Safari only
- `widget-icon-list.min*.css` - If not used
- Unused Elementor widget CSS (unused widgets)
- Old browser compatibility hacks

---

## NEXT STEPS
1. Copy all Elementor CSS to frontend
2. Build responsively with mobile-first overrides
3. After parity confirmed, safely remove unused CSS
