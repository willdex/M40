# REPAIR REPORT TEMPLATE

## Fix: [Brief Description]

**Date:** YYYY-MM-DD
**Branch:** fix/xxx
**Status:** [Pending/Verified/Merged]

---

### What Was Broken

[Describe the visual/layout issue]

---

### Root Cause

[Identify the exact cause]

---

### Fix Applied

[Describe the exact change made]

---

### Files Affected

- [File 1]
- [File 2]

---

### Testing Performed

- [ ] Build passes (`npm run build`)
- [ ] Visual verification on desktop
- [ ] Visual verification on tablet
- [ ] Visual verification on mobile
- [ ] No regressions detected

---

### Regression Risks

[Potential issues this fix might cause]

---

### Notes

[Additional context]

---

## Example

### Fix: Hero Video White Gaps

**Date:** 2026-05-27
**Branch:** fix/hero-video
**Status:** Verified

---

### What Was Broken

White gaps visible on hero video sides, video not covering full container.

---

### Root Cause

Video using `width:100%;height:100%` instead of cinematic cover behavior with `min-width:100%;min-height:100%`.

---

### Fix Applied

Updated CSS:
```css
.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
```

---

### Files Affected

- `src/app/globals.css`

---

### Testing Performed

- [x] Build passes
- [x] Desktop: Video fills container correctly
- [x] Tablet: Same as desktop
- [x] Mobile: Same as desktop
- [x] No regressions on header/footer

---

### Regression Risks

None identified - CSS-only change.

---

### Notes

This follows the Netflix/Apple hero video pattern.
