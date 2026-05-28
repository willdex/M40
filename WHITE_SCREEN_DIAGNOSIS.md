# WHITE_SCREEN_DIAGNOSIS.md

## Issue Summary
**Problem:** Homepage renders a completely white screen with NO console errors
**Root Cause:** CSS visibility and overlay issues blocking content from displaying

---

## Initial Symptoms
- White screen on homepage
- No React hydration errors (hydration appears fixed)
- No JavaScript console errors
- DOM exists in developer tools but visually invisible

---

## Diagnosis Process

### Step 1: Verified DOM Exists
- Page HTML structure renders correctly in DevTools
- All React components mount properly
- Element hierarchy intact

### Step 2: Identified Visibility Blockers

#### Primary Issue: Preloader Overlay
**Original CSS:**
```css
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 31999;
}
```

**Problem:** The preloader had:
1. `position: fixed` covering entire viewport
2. `z-index: 31999` extremely high, covering ALL content
3. `background-color: #fff` white background
4. NO mechanism to hide/remove itself after loading

#### Secondary Issue: Globals.css @import Conflicts
```css
/* PROBLEMATIC - causes 404 errors */
@import url('/css/posterity.css');
@import url('/uploads/elementor/css/post-54.css');
@import url('/uploads/elementor/css/post-63.css');
@import url('/uploads/elementor/css/post-231.css');
```

**Problem:** These @import URLs may not exist or conflict with CSS loaded via `<link>` tags in layout.tsx

#### Tertiary Issue: Body Defaults Missing
```css
/* Missing from globals.css */
body {
  background-color: #fff;
  color: #333;
  visibility: visible;
  opacity: 1;
}
```

---

## Fixes Applied

### 1. Added Preloader Auto-Hide Animation
```css
#preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 31999;
  animation: preloader-fade-out 0.5s ease-out 2s forwards;
}

@keyframes preloader-fade-out {
  to {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
```
**Effect:** Preloader automatically hides after 2 seconds

### 2. Removed Problematic @import Statements
**Before:**
```css
@import url('/css/posterity.css');
@import url('/uploads/elementor/css/post-54.css');
/* ... more imports */
```

**After:**
```css
/* CSS files now loaded via <link> tags in layout.tsx */
```

### 3. Added Body and Layout Visibility Rules
```css
body {
  background-color: #fff;
  color: #333;
  margin: 0;
  padding: 0;
  visibility: visible;
  opacity: 1;
}

.whole-layout > * {
  visibility: visible !important;
  opacity: 1 !important;
}
```

---

## Potential Remaining Causes (If White Screen Persists)

### 1. Elementor Animations
**Check:** Does `elementor-animated-content` or `elementor-invisible` class exist?
**Fix:** Disable entrance animations in globals.css

### 2. CSS Specificity Conflicts
**Check:** Are Elementor CSS selectors being overridden?
**Fix:** Add `!important` to visibility rules temporarily

### 3. Font Loading Blocking Render
**Check:** Are Google Fonts loading slowly, causing FOUC?
**Fix:** Add font-display: swap to Google Fonts

### 4. Image Dimensions
**Check:** Hero image `slidernosotros.jpg` dimensions
**Fix:** Add explicit width/height or aspect-ratio

---

## Verification Steps

1. Run `npm run dev`
2. Open browser to homepage
3. Wait 3 seconds
4. Check if content appears
5. If still white, open DevTools and:
   - Inspect `body` element - should have `background-color: #fff`
   - Inspect `#preloader` - should have `animation: preloader-fade-out`
   - Check computed styles on `.whole-layout` children

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/globals.css` | Added preloader auto-hide animation |
| `src/app/globals.css` | Added visibility rules for body and layout |
| `src/app/globals.css` | Removed problematic @import statements |

---

## Next Steps If Issue Persists

1. **Temporarily disable preloader** in page.tsx:
   ```tsx
   // Remove or comment out preloader div
   ```

2. **Add debug visibility**:
   ```css
   * { visibility: visible !important; }
   ```

3. **Check for `display: none`** applied via Elementor JS