# Performance Action Plan

**Project**: aibizmod (Next.js)  
**Date**: July 24, 2026

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 0 |
| Medium | 4 |
| Low | 1 |
| **Total** | **7** |

---

### C1. Render-blocking `@import` in globals.css

| | |
|---|---|
| **File** | `src/app/globals.css:1` |
| **Issue** | `@import url('https://api.fontshare.com/...')` loads Satoshi font — blocks CSSOM construction |
| **Fix** | Replace `@import` with `<link rel="preload">` in layout.tsx `<head>` using `onload="this.rel='stylesheet'"` pattern |

### C2. Native `<img>` tags missing width/height (CLS)

| File | Line |
|------|------|
| `src/components/SubservicePageLayout.tsx` | 624 |
| `src/components/ui/3d-marquee.tsx` | 95 |
| `src/components/sections/ServicesGrid.tsx` | 489 |
| `src/components/ui/focus-rail.tsx` | 165 |
| `src/components/ui/faq-sections.tsx` | 34 |
| `src/components/ui/card-stack.tsx` | 400 |
| `src/components/ui/integration-hero.tsx` | 206 |
| `src/app/ai-visibility-audit-report/page.tsx` | 934 |

**Fix**: Add `width` and `height` attributes to each `<img>` to reserve space and prevent CLS.

### M1. Missing `loading="lazy"` on below-fold images

Images in the files listed in C2 (and others) lack `loading="lazy"` for below-fold images.

**Fix**: Add `loading="lazy"` to below-fold images, `loading="eager"` on hero/LCP images.

### M2. Inline Poppins font style without loading the font

| | |
|---|---|
| **File** | `src/components/ui/faq-sections.tsx:27-31` |
| **Issue** | `<style>* { font-family: 'Poppins', sans-serif; }</style>` — Poppins is never loaded |
| **Fix** | Remove the inline style block or load Poppins via `next/font` |

### M3. Unsplash images not using `next/image`

Service page images use raw `<img>` tags with Unsplash URLs, bypassing Next.js optimization (WebP conversion, responsive srcSet, lazy loading).

**Fix**: Replace `<img>` with `<Image>` from `next/image` using `remotePatterns` already configured.

### M4. Missing preconnect/preload for critical resources

**Fix**: Add `<link rel="preconnect">` for `https://images.unsplash.com` and preload LCP font.

### L1. Missing `fetchpriority="high"` on LCP images

**Fix**: Identify hero/LCP image and add `fetchpriority="high"`.