# LAYOUT FLOW ANALYSIS

## Date: 2026-05-27
## Purpose: Analyze layout structure for footer visibility issues

---

## PAGE STRUCTURE

```
HTML Structure:
└── body#top (has many WordPress/Elementor classes)
    └── div.whole-layout
        ├── #preloader
        ├── .page-background
        ├── header#masthead (Header component)
        ├── #mid (main content wrapper)
        │   └── .elementor.elementor-54
        │       └── [All homepage sections]
        ├── #content-overlay
        ├── Footer component
        └── #to-top
```

---

## KEY CSS RULES BY FILE

### globals.css

```css
/* Line 40-43 */
.whole-layout {
  min-height: 100vh;
  position: relative;
}

/* Line 46-49 */
#mid {
  position: relative;
  z-index: 1;
}

/* Line 51-59 */
body {
  background-color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
  visibility: visible;
  opacity: 1;
}

/* Line 62-65 */
.whole-layout > * {
  visibility: visible !important;
  opacity: 1 !important;
}

/* Line 67-70 */
#preloader {
  display: none !important;
}

/* Footer rules (added) */
#colophon {
  background: #222;
  color: #fff;
  padding: 40px 0 20px;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
```

### homepage-desktop.css

```css
/* Key section that may affect layout */
.elementor-section {
  position: relative;  /* Line 99-101 */
}
```

---

## POST-2314649.CSS (Footer CSS)

Key rules that should apply to footer:
- `.elementor-231 .elementor-element.elementor-element-a85534` - background #14212A
- `.elementor-231 .elementor-element.elementor-element-393115bb` - border-bottom, padding 60px

---

## POTENTIAL ISSUES

### 1. #mid z-index: 1
```css
#mid {
  position: relative;
  z-index: 1;
}
```
**Issue**: If footer has z-index < 1, it could render behind #mid content.

### 2. .whole-layout > * visibility: visible
```css
.whole-layout > * {
  visibility: visible !important;
  opacity: 1 !important;
}
```
This should force everything visible, but may not apply if footer is nested deeper.

### 3. Stacking Context Issues
The body has multiple classes that may create stacking contexts:
```html
class="home wp-singular page-template page-template-elementor_header_footer page page-id-54 wp-custom-logo wp-theme-posterity ehf-header ehf-footer ehf-template-posterity ehf-stylesheet-posterity header-horizontal site-layout-full elementor-default elementor-template-full-width elementor-kit-55 elementor-page elementor-page-54"
```

---

## DIAGNOSTIC CHECKLIST

Run in browser DevTools:

### Step 1: Check if footer exists
```javascript
document.getElementById('colophon')
// If null → React not rendering footer
// If element found → DOM exists
```

### Step 2: Check computed styles on footer
```javascript
getComputedStyle(document.getElementById('colophon')).display
getComputedStyle(document.getElementById('colophon')).visibility
getComputedStyle(document.getElementById('colophon')).opacity
getComputedStyle(document.getElementById('colophon')).position
getComputedStyle(document.getElementById('colophon')).zIndex
getComputedStyle(document.getElementById('colophon')).height
getComputedStyle(document.getElementById('colophon')).width
```

### Step 3: Check bounding rect
```javascript
document.getElementById('colophon').getBoundingClientRect()
// Check: top, left, width, height, bottom
```

### Step 4: Check #mid overflow
```javascript
getComputedStyle(document.getElementById('mid')).overflow
getComputedStyle(document.getElementById('mid')).height
getComputedStyle(document.getElementById('mid')).minHeight
```

### Step 5: Check .whole-layout
```javascript
getComputedStyle(document.querySelector('.whole-layout')).minHeight
getComputedStyle(document.querySelector('.whole-layout')).position
```

---

## MOST LIKELY CULPRITS

1. **#mid overflow:hidden** - Content section may be clipping footer
2. **#mid z-index:1** - Footer may be positioned behind content
3. **Footer position:absolute** - Could be pulled out of flow
4. **Parent min-height collapse** - Container not expanding for footer

---

## RECOMMENDED FIX SEQUENCE

1. First: Remove z-index from #mid (temporary test)
2. Second: Add explicit position:relative and z-index to footer
3. Third: Check if #mid overflow is hidden
4. Fourth: Verify .whole-layout min-height is not collapsing