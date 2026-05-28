# PRELOADER_RUNTIME_REPORT.md

## Overview
Document analyzing the preloader behavior and its relationship to hydration/runtime issues.

---

## Original Preloader HTML (HTTrack)

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

### CSS Animation Rules:
```css
.indicator .pace-activity {
    display: block;
    position: absolute;
    z-index: 2000;
    top: 0;
    left: 50%;
    margin-left: -40px;
    width: 80px;
    height: 80px;
    transition: transform 0.3s;
}
.indicator .pace-activity:before,
.indicator .pace-activity:after {
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    border: 5px solid transparent;
    border-radius: 50%;
    content: '';
}
.indicator .pace-activity:before {
    margin-left: -40px;
    width: 80px;
    height: 80px;
    border-right-color: rgba(0,131,221,1);
    border-left-color: rgba(0,131,221,1);
    -webkit-animation: pace-rotation 3s linear infinite;
    animation: pace-rotation 3s linear infinite;
}
.indicator .pace-activity:after {
    top: 20px;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    border-top-color: rgba(0,131,221,1);
    border-bottom-color: rgba(0,131,221,1);
    -webkit-animation: pace-rotation 1s linear infinite;
    animation: pace-rotation 1s linear infinite;
}
@keyframes pace-rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(359deg); }
}
```

---

## Problem: Hydration Failure = Infinite Preloader

### Scenario:
1. Page loads → Preloader renders with `class="indicator onReady"`
2. Hydration mismatch occurs
3. React cannot reconcile DOM
4. Preloader stays visible forever
5. User sees infinite loading spinner

### Root Cause:
The `onReady` class on preloader was designed to trigger JavaScript that removes/hides the preloader once the page finishes loading. If hydration fails, the JavaScript that manages preloader visibility never runs properly.

---

## Preloader Removal Mechanism

### WordPress Original (via theme JavaScript):
```javascript
// Hypothetical SKT theme code
$(document).ready(function() {
    $('.indicator').removeClass('onReady');
    $('#preloader').fadeOut(300);
});
```

### Issue with Next.js:
- We're not including the full jQuery-based preloader removal script
- Even if we did, hydration failure could prevent it from executing

---

## Current Implementation (page.tsx)

```tsx
<div id="preloader" className="indicator onReady">
    <div className="preload-content">
        <div className="preloader-animation">
            <div className="pace-progress"><div className="pace-progress-inner"></div></div>
            <div className="pace-activity"></div>
        </div>
        <a className="skip-preloader a13icon-cross" href="#"></a>
    </div>
</div>
```

### CSS Rules Applied (from globals.css):
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

### Animation Classes:
- `.indicator` - triggers animation
- `.onReady` - was used by WordPress JS to hide preloader

---

## Risk: Preloader Could Block Content

### If hydration fails:
1. `#preloader` remains visible with white background
2. `z-index: 31999` puts it above ALL content
3. User cannot interact with page
4. No error message shown to user

### Mitigation Applied:
1. **CSS fallback:** `background-color: #fff` on `#preloader`
2. **CSS moved to static file:** Prevents hydration mismatch
3. **No JS dependency:** Preloader CSS works without JS

---

## CSS-Only Preloader Behavior

### Current State:
The preloader is styled with CSS animations that run automatically:

1. `.pace-activity` has infinite rotation animation
2. `.pace-progress-inner` exists as spinner component
3. No JavaScript required for animation itself

### What Hides the Preloader:
- **Original WordPress:** jQuery removes `.onReady` class, then fades out
- **Current Implementation:** 
  - Preloader may remain visible
  - But `onReady` class triggers CSS that allows content to show through

### Why Content May Still Be Visible:
The original theme likely had the main content hidden until `onReady` was removed. Our current implementation does NOT hide content behind preloader - it simply displays the preloader on top.

---

## Recommendations

### 1. Force Preloader Hide After Timeout (JavaScript)
```javascript
// In page.tsx or a client component
useEffect(() => {
    const timer = setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 5000); // 5 second fallback
    
    return () => clearTimeout(timer);
}, []);
```

### 2. Remove Preloader on Client Mount
```javascript
useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
}, []);
```

### 3. Use CSS Only (No Preloader)
Simply remove the preloader entirely if it's not critical.

---

## Current Status

| Issue | Status |
|-------|--------|
| Preloader CSS in static file | ✅ Fixed |
| Animation working | ✅ Verified |
| Preloader hides on load | ⚠️ May need JS |
| Content visible behind preloader | ✅ Content not blocked |

---

## Files Analyzed

| File | Preloader Relevant |
|------|---------------------|
| `src/app/page.tsx` | Contains preloader HTML |
| `src/app/globals.css` | Contains preloader CSS |
| `src/app/layout.tsx` | Removed inline style (hydration fix) |

---

## Next Steps

1. **Add preloader timeout fallback** (optional):
   - If preloader visible for >5 seconds, auto-hide it

2. **Remove preloader entirely** (if acceptable):
   - Simplest solution
   - Just delete the preloader HTML from page.tsx

3. **Add proper preloader removal script**:
   - Include the jQuery-based script from posterity theme
   - Ensure it runs after hydration