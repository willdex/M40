# VISIBILITY_BLOCKERS_REPORT.md

## Overview
Comprehensive audit of CSS and runtime factors that could block content visibility.

---

## CSS VISIBILITY BLOCKERS

### 1. PRELOADER (#preloader)

| Property | Value | Impact |
|----------|-------|--------|
| position | fixed | Removed from document flow, covers viewport |
| top/left/right/bottom | 0 | Covers entire screen |
| z-index | 31999 | Above ALL elements |
| background-color | #fff | White background hides content |
| animation | preloader-fade-out (added) | Auto-hides after 2s |

**Original State:** Preloader permanently visible
**Fixed State:** Auto-hides via CSS animation

---

### 2. ELEMENTOR ANIMATION CLASSES

| Class | Effect | Blocking |
|-------|--------|----------|
| `.elementor-animated-content` | Entrance animations | Possible if animation-delay infinite |
| `.elementor-animated-item--grow` | Scale/grow animation | Possible if transform persists |
| `.e-con.e-parent:nth-of-type(n+4)` | Lazy load backgrounds | Could cause white flash |

**Original CSS (from elementor):**
```css
.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload),
.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
  background-image: none !important;
}
```

**Impact:** If `.e-lazyloaded` class never added, images won't show

---

### 3. BODY DEFAULTS

| Property | Original | Expected |
|----------|----------|----------|
| background-color | (browser default) | #fff |
| color | (browser default) | #333 |
| visibility | visible | visible |
| opacity | 1 | 1 |

**Issue:** Missing explicit body styles could cause unexpected rendering

---

### 4. OVERLAY CLASSES

| Class | Effect | Blocking |
|-------|--------|----------|
| `.to-move` | Used with JS for parallax effects | Could move content off-screen |
| `.content-overlay` | Overlay div | High z-index could cover content |

**Original CSS:**
```css
#content-overlay {
  position: fixed;
  /* Likely z-index that covers content */
}
```

---

### 5. THEME CSS SELECTORS

| Selector | Potential Issue |
|----------|-----------------|
| `.whole-layout > *` | Children visibility could be overridden |
| `#mid` | Layout centering could fail |
| `.page-background` | Could have wrong z-index |

---

## RUNTIME VISIBILITY BLOCKERS

### 1. JavaScript-Managed Classes

| Class | JS Behavior | Issue |
|-------|-------------|-------|
| `.indicator.onReady` | Preloader shows until page ready | JavaScript might not remove it |
| `.e-lazyloaded` | Elementor lazy load trigger | Never added, images hidden |
| `.hfe-scroll-to-top-hide` | Scroll-to-top visibility | Could cause overlay |

---

### 2. Elementor Frontend JS

**File:** `elementor/assets/js/frontend.minfb3d.js`

**Potential Issues:**
- Entrance animations applied via JS
- Elements hidden until animation completes
- Responsive visibility handled by JS

**Impact:** If frontend JS fails to load or execute, elements stay invisible

---

### 3. RevSlider Initialization

**File:** `revslider/public/js/sr7efd5.js`

**Potential Issues:**
- `SR7.PMH` module handler not initialized
- Slider overlay covers content
- Animation conflicts with page content

**Impact:** RevSlider JS could block content rendering

---

## CSS LOAD ORDER CONFLICTS

### Original WordPress Load Order:
```
1. Plugin CSS (HFE, RevSlider, SKT)
2. Elementor Core
3. Elementor Widgets
4. Elementor Pro
5. Page-Specific (post-54a1d3.css)
6. Header/Footer CSS
7. Font Awesome
8. Theme CSS
9. Google Fonts
```

### Our Current Load Order (in layout.tsx):
```
1. Google Fonts (preconnect)
2. Favicon
3. Plugin CSS (HFE, RevSlider, SKT) - CORRECT
4. Elementor Icons - CORRECT
5. Elementor Frontend - CORRECT
6. Global Kit - CORRECT
7. Widget CSS - CORRECT
8. Elementor Pro - CORRECT
9. Page-Specific - CORRECT
10. Font Awesome - CORRECT
11. Theme CSS - CORRECT
12. Google Fonts local - CORRECT
```

**Issue:** Load order looks correct, but some CSS files may be duplicates or conflicts

---

## DUPLICATE CSS FILES

| CSS | Duplicated In |
|-----|---------------|
| `widget-icon-list.min44b4.css` | Also `widget-icon-list.minfb3d.css` |
| `widget-social-icons.min2401.css` | Also `widget-social-icons.minfb3d.css` |
| `elementor-icons.min705c.css` | Also `elementor-icons.mindff9.css` |

**Potential Conflict:** Different versions loaded, last one wins

---

## IMMEDIATE DEBUG STEPS

### 1. Browser DevTools Console:
```javascript
// Run in console to force visibility
document.querySelectorAll('*').forEach(el => {
  el.style.visibility = 'visible';
  el.style.opacity = '1';
});
```

### 2. Disable Preloader:
- Add `display: none` to `#preloader` temporarily

### 3. Check Body Styles:
- Verify `document.body.style.visibility === 'visible'`

### 4. Inspect Z-Index Stack:
- Use DevTools to view stacking context

---

## RECOMMENDED FIXES

### 1. Add Visibility Reset to globals.css:
```css
/* EMERGENCY VISIBILITY RESET */
*, *::before, *::after {
  visibility: visible !important;
  opacity: 1 !important;
}
```

### 2. Add Debug Preloader Disable:
```css
#preloader {
  display: none !important;
}
```

### 3. Remove Elementor Lazy Load Blocking:
```css
.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
  background-image: none !important;
}
```
Should become:
```css
.e-con.e-parent {
  background-image: none !important;
}
```

---

## STATUS SUMMARY

| Blocker | Status |
|---------|--------|
| Preloader | ✅ Fixed - auto-hide animation added |
| Body defaults | ✅ Fixed - explicit styles added |
| Globals @import | ✅ Fixed - removed problematic imports |
| Elementor animations | ⚠️ May still block |
| Lazy load conflicts | ⚠️ May still block |
| JS-managed visibility | ⚠️ Unknown - needs runtime check |

---

## NEXT STEPS

1. Run `npm run dev`
2. If white screen persists, add emergency visibility CSS:
   ```css
   #preloader { display: none !important; }
   ```
3. Check if content appears
4. If content appears, gradually re-enable preloader animation