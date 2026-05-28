# MANZANA40 - ARCHITECTURAL DECISIONS

## Project Context

**Goal:** Visual fidelity to Manzana40.com without WordPress/Elementor architecture.

**Approach:** Clean React/Next.js with modern CSS while preserving visual appearance.

---

## Key Decisions

### 1. Server Components vs Client Components

**Decision:** Homepage as Server Component for CMS compatibility.

**Rationale:**
- Content from JSON at build time
- No hydration issues
- SEO friendly
- Future: ISR for content updates

**Files:**
- `src/app/page.tsx` - Server Component (async)

### 2. CMS Architecture

**Decision:** JSON-based content with API route.

**Rationale:**
- Non-technical users can edit content
- Version control friendly
- No database required

**Files:**
- `data/site-content.json` - Centralized content
- `src/app/api/content/route.ts` - GET/PUT API
- `src/lib/content.ts` - TypeScript loader

### 3. CSS Strategy

**Decision:** Scoped CSS files per page + globals.css.

**Rationale:**
- Preserve original Elementor CSS (when needed)
- Clean custom CSS for new components
- No CSS-in-JS complexity

**Files:**
- `src/app/globals.css` - Global resets, new components
- `src/app/homepage-desktop.css` - Desktop-specific
- `src/app/homepage-responsive.css` - Responsive overrides

### 4. Hero Video Architecture

**Decision:** Clean semantic structure with cinematic cover behavior.

**Rationale:**
- Original RevSlider structure was broken
- Elementor wrappers unnecessary for visual result
- True cover behavior like Netflix/Apple

**Structure:**
```jsx
<section className="homepage-hero">
  <div className="hero-media">
    <video className="hero-video" ... />
  </div>
</section>
```

**CSS Pattern:**
```css
.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
```

### 5. Header Structure

**Decision:** Clean Header component with minimal Elementor classes.

**Rationale:**
- Navigation needs to work
- Logo + menu + CTA structure
- Mobile responsive

**Files:**
- `src/components/Header.tsx`

### 6. Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Dark | #1B191A | Main background |
| Light Gray | #A4BDC1 | Secondary text |
| Accent Yellow | #FFCD00 | Highlights |

### 7. Visual Parity Rules

1. Hero video: Full-bleed cinematic
2. Services: 5 cards in row, hover effects
3. Amenities: 6 items in 2 rows
4. Footer: 3 columns (About, Services, Contact)
5. Spacing: Preserved from original

---

## What NOT To Do

- ❌ Recreate broken Elementor DOM nesting
- ❌ Use random CSS patches
- ❌ Apply global resets that break working sections
- ❌ Create loading states that cause layout shifts
- ❌ Import server-only code in client components

---

## Performance Considerations

1. **Static Generation:** Pages build at build time
2. **Minimal JS:** Server components ship less JS
3. **CSS:** External CSS files, not inline
4. **Images:** Next.js Image optimization available

---

## Future Enhancements

1. **ISR:** Incremental Static Regeneration for content updates
2. **Preview:** Draft content preview mode
3. **Media API:** Upload management
4. **i18n:** Spanish/English support
