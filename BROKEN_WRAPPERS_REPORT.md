# BROKEN_WRAPPERS_REPORT.md

## DOM Structure Comparison: Current vs HTTrack

---

## ISSUE 1: Missing `data-element_type` Attributes

**Current:**
```jsx
<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-668cfc7d">
```

**HTTrack:**
```html
<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-668cfc7d" data-id="668cfc7d" data-element_type="column" data-e-type="column">
```

**Impact:** CSS selectors targeting `[data-element_type="column"]` don't match.

---

## ISSUE 2: Missing `data-settings` on Sections

**Current:**
```jsx
<section className="elementor-section elementor-top-section elementor-element elementor-element-51986d34 ...">
```

**HTTrack:**
```html
<section class="elementor-section elementor-top-section elementor-element elementor-element-51986d34 ..." data-id="51986d34" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
```

**Impact:** Background settings not applied, stretch section not working.

---

## ISSUE 3: Missing Footer Elementor HF Marker

**Current:** Footer uses `<Footer />` component

**HTTrack:** Footer is inside `#colophon` with elementor-231 embedded twice:
```html
<footer id="colophon">
  <div class='footer-width-fixer'>
    <div data-elementor-type="wp-post" data-elementor-id="231" class="elementor elementor-231">
      <!-- footer content -->
    </div>
  </div>
</footer>
```

**Impact:** Footer appears twice (once embedded in page content, once as separate footer element).

---

## ISSUE 4: Content Overlay Position

**Current (inside #mid):**
```jsx
<div id="content-overlay" className="to-move"></div>
```

**HTTrack (after #mid, before footer):**
```html
<div id="mid" class="to-move ...">...</div>
<div id="content-overlay" class="to-move"></div>
<footer id="colophon">...</footer>
```

**Impact:** Overlay appears over content, not behind.

---

## ISSUE 5: Missing `whole-layout` Closing Comment

**HTTrack:**
```html
</div><!-- .whole-layout -->
```

**Current:** Just `</div>` without comment (minor issue).

---

## ISSUE 6: RevSlider Video Structure

**Current:**
```jsx
<div className="rs-ov-hidden" data-version="6.7.18">
  <video className="slider-video" ...>
```

**HTTrack:**
```html
<sr7-module data-alias="slider-1" data-id="1" id="SR7_1_1" class="rs-ov-hidden" data-version="6.7.18">
  <sr7-adjuster></sr7-adjuster>
  <sr7-content>
    <sr7-slide id="SR7_1_1-1" data-key="1"></sr7-slide>
    <sr7-slide id="SR7_1_1-2" data-key="2"></sr7-slide>
  </sr7-content>
  <image_lists style="display:none">
    <img data-src="//manzana40.com/wp-content/uploads/2024/09/slider.mp4" .../>
  </image_lists>
</sr7-module>
<script>
  SR7.PMH ??={}; SR7.PMH["SR7_1_1"] = {cn:0, state:false, fn: function() {...}};
</script>
```

**Impact:** RevSlider initialization script missing - may cause slider to not function.

---

## ISSUE 7: Missing `wp-block-themepunch-revslider` Wrapper

**Current:**
```jsx
<div className="wp-block-themepunch-revslider">
  <p className="rs-p-wp-fix"></p>
  <video className="slider-video" ...>
</div>
```

**HTTrack:**
```html
<div class="wp-block-themepunch-revslider">
  <p className="rs-p-wp-fix"></p>
  <sr7-module ...>...</sr7-module>
</div>
```

**Impact:** The video should be inside sr7-module, not directly in wp-block-themepunch-revslider.

---

## ISSUE 8: Header Elementor Wrapper

**Current:** `<Header />` component is React component

**HTTrack:**
```html
<header id="masthead" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
  <div data-elementor-type="wp-post" data-elementor-id="63" class="elementor elementor-63">
    <section class="elementor-section elementor-top-section elementor-element elementor-element-31cc5c4 ...">
      ...
    </section>
  </div>
</header>
```

**Impact:** Header styling from elementor-63 not applied (header uses separate elementor-hf).

---

## ISSUE 9: Video Overlay Image Path

**Current:**
```jsx
style={{ backgroundImage: 'url(/uploads/revslider/video-media/slider_1_layer.jpg)' }}
```

**HTTrack:**
```html
style="background-image: url(wp-content/uploads/revslider/video-media/slider_1_layer.jpg);"
```

**Impact:** Path mismatch - original doesn't have leading slash.

---

## ISSUE 10: Footer Duplicate in Page Content

**Current:** Page has footer embedded at end of content:
```jsx
<div className="elementor-shortcode">
  <div data-elementor-type="wp-post" data-elementor-id="231" ...>
    <!-- footer content -->
  </div>
</div>
```

**HTTrack:** Footer is BOTH embedded in page AND as separate `<footer>` element:
```html
<!-- Inside #mid -->
<div class="elementor-shortcode">
  <div data-elementor-id="231" ...>...</div>
</div>

<!-- After #mid, as actual footer -->
<footer id="colophon">
  <div data-elementor-id="231" ...>...</div>
</footer>
```

**Impact:** Footer content appears twice.

---

## WRAPPER HIERARCHY COMPARISON

### Current (Simplified):
```
whole-layout
├── #preloader
├── .page-background
├── Header (component)
├── #mid
│   └── elementor-54
│       └── sections...
├── .elementor-shortcode (footer embedded)
├── #content-overlay
├── Footer (component)
├── #to-top
```

### HTTrack (Original):
```
whole-layout
├── #preloader
├── .page-background
├── header#masthead
│   └── elementor-63 (header)
├── #mid
│   └── elementor-54 (page content)
│       └── sections...
│       └── elementor-shortcode (footer embedded)
├── #content-overlay
├── footer#colophon
│   └── elementor-231 (footer)
├── #to-top
```

---

## RECOMMENDATIONS

1. **Add data-element_type attributes** to all elementor columns and sections
2. **Fix RevSlider structure** - use sr7-module instead of plain video
3. **Remove duplicate footer** - keep only one (preferably in footer component)
4. **Fix content-overlay position** - move outside #mid, before footer
5. **Fix background image paths** - remove leading slash for relative paths
6. **Import post-54a1d3.css** - contains all homepage-specific styles that rely on elementor-54 class

---

## CRITICAL CSS SELECTOR BREAKAGE

The CSS file `post-54a1d3.css` uses selectors like:
```css
.elementor-54 .elementor-element.elementor-element-51986d34
.elementor-54 .elementor-element.elementor-element-3f049f0a:not(.elementor-motion-effects-element-type-background)
```

These require `.elementor-54` class on a parent element. **Current page.tsx does NOT have `elementor-54` class on the wrapper.**

**Fix:** Add `elementor elementor-54` class to the page wrapper div or import the CSS properly.