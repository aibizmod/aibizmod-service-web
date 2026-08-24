# Accessibility Audit Report

**Project**: aibizmod (Next.js, React, Tailwind CSS)  
**Date**: July 24, 2026  
**Standard**: WCAG 2.2 (AA)  
**Tool**: Static code analysis

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 8 |
| High | 8 |
| Medium | 5 |
| Low | 4 |
| **Total** | **25** |

---

## Critical Issues

### C1. FAQ accordion uses `<div>` instead of `<button>` — keyboard trap

| | |
|---|---|
| **File** | `src/components/ui/faq-sections.tsx:46` |
| **Issue** | `<div className="...cursor-pointer" onClick={...}>` — not focusable, no keyboard handler |
| **WCAG** | 2.1.1 Keyboard (A) |
| **Fix** | Replace with `<button>` or add `role="button" tabIndex={0} onKeyDown` |

### C2. Focus indicators removed on critical inputs

| | |
|---|---|
| **File** | `src/components/sections/AIVisibilityHero.tsx:121` |
| **Issue** | `focus:outline-none focus:ring-0` on domain input — no visible focus |
| **WCAG** | 2.4.7 Focus Visible (AA) |
| **Fix** | Replace with `focus:ring-2 focus:ring-cyan-500` |

| | |
|---|---|
| **File** | `src/components/ui/google-gemini-effect.tsx:464` |
| **Issue** | Same — `outline-none focus:ring-0` on domain input |
| **Fix** | Same as above |

### C3. Pages missing `<h1>`

| | |
|---|---|
| **File** | `src/app/comparisons/page.tsx:32` |
| **File** | `src/app/topics/page.tsx:38` |
| **Issue** | `<SectionHeading>` renders `<h2>` — no `<h1>` on page |
| **WCAG** | 1.3.1 Info and Relationships (A) |
| **Fix** | Add a visually hidden `<h1>` or update `SectionHeading` to render `<h1>` |

### C4. Form inputs missing labels

| File | Input | Fix |
|------|-------|-----|
| `src/components/blog/BlogPageContent.tsx:154` | Search `<input>` | Add `aria-label="Search articles"` |
| `src/components/blog/BlogPageContent.tsx:276` | Subscribe email `<input>` | Add `aria-label="Email address for newsletter"` |
| `src/components/clients/ClientsPageContent.tsx:773` | Search `<input>` | Add `aria-label="Search client showcase"` |
| `src/app/automation-roi-calculator/page.tsx:73,86,99,112` | 4x range sliders | Add `aria-label` to each |

---

## High Issues

### H1. Skipped heading levels in Footer

| | |
|---|---|
| **File** | `src/components/layout/Footer.tsx:176,195,214,235` |
| **Issue** | `<h2>` followed by `<h5>` — skips H3, H4 |
| **WCAG** | 1.3.1 Info and Relationships (A) |
| **Fix** | Change `<h5>` to `<h3>` or restructure hierarchy |

### H2. Non-semantic interactive controls (dropdowns, selectors)

| File | Element | Fix |
|------|---------|-----|
| `src/components/layout/RotatingContact.tsx:47-53` | `<div onClick>` country options | Use `<button>` or add `role="button"` + keyboard |
| `src/components/contact/ContactPageContent.tsx:232,241` | `<li onClick>` dropdown options | Same |
| `src/components/contact/ContactPageContent.tsx:225` | Backdrop `<div onClick>` | Add Escape key handler |

### H3. Missing focus-visible on interactive containers

| | |
|---|---|
| **File** | `src/components/ui/card-stack.tsx:224` |
| **File** | `src/components/ui/focus-rail.tsx:101` |
| **Issue** | `focus:outline-none` / `outline-none` on elements with `tabIndex={0}` |
| **Fix** | Add `focus-visible:ring-2 focus-visible:ring-cyan-500` |

---

## Medium Issues

### M1. Low color contrast

| Class | Ratio on white | Status |
|-------|---------------|--------|
| `text-slate-300` (#cbd5e1) | ~3.3:1 | **Fails** AA normal text |
| `text-slate-400` (#94a3b8) | ~4.9:1 | Passes AA, fails AAA |
| `text-stone-400` | ~4.9:1 | Passes AA, fails AAA |

**Affected files (partial list):**
- `src/app/ai-visibility-audit-report/page.tsx` — lines 941, 957, 1276
- `src/components/ui/blog-post-card.tsx` — line 86
- `src/components/sections/CapabilityShowcase.tsx` — line 974
- `src/components/ui/feature-carousel.tsx` — lines 208, 262

### M2. Multiple `<h1>` rendered simultaneously (audit page)

| | |
|---|---|
| **File** | `src/app/ai-visibility-audit-report/page.tsx:936,1395,1539` |
| **Issue** | 3 `<h1>` tags — conditionally rendered but risk of overlap |
| **Fix** | Ensure only one `<h1>` visible at any time |

### M3. Tab panel `aria-controls` not wired

| | |
|---|---|
| **File** | `src/components/sections/HeroSwitcher.tsx:33-51,80-83` |
| **Issue** | Tab buttons use `aria-controls="hero-panel-..."` but panels lack matching `id` |
| **Fix** | Add `id="hero-panel-original"` and `id="hero-panel-ai-visibility"` to panels |

### M4. Placeholder-only labels on inputs

| File | Input |
|------|-------|
| `src/components/blog/BlogPageContent.tsx:159` | Search input |
| `src/components/blog/BlogPageContent.tsx:282` | Subscribe email |
| `src/components/clients/ClientsPageContent.tsx:781` | Search input |

---

## Low Issues

### L1. Skip link present but `#main-content` anchor missing on some pages

**Fix**: Add `id="main-content"` to `<main>` elements across all page layouts.

### L2. `outline-none` on links without `focus-visible` fallback

- `src/components/ui/hover-brand-logo.tsx:76` — `<a>` with `focus:outline-none`

### L3. Region landmark without accessible name

- `src/components/layout/Navbar.tsx:358` — `<div role="region">` missing `aria-label`

---

## Strengths (already well-implemented)

1. **Skip-to-content link** present in `layout.tsx`
2. **`lang="en"`** set on `<html>`
3. **`aria-describedby`** on contact form error fields
4. **`aria-hidden="true"`** on decorative SVGs
5. **`role="search"`, `role="alert"`, `role="tablist"`, `role="tab"`** used correctly
6. **`aria-label`** on breadcrumbs, social links, carousel controls
7. **All `<img>` elements have alt text** — no empty/missing alt found
8. **Contact form labels properly associated** via `<label htmlFor>`
9. **`focus-visible:ring-2`** pattern used extensively in Navbar

---

## Recommended Priority

1. **C1** — Fix FAQ accordion keyboard trap
2. **C2** — Restore focus indicators on hero inputs
3. **C3** — Add `<h1>` to comparisons/topics pages
4. **C4** — Add labels to all unlabelled inputs
5. **H1** — Fix heading hierarchy in Footer
6. **H2** — Fix non-semantic dropdown controls
7. **H3** — Add focus-visible to interactive containers
8. **M1-M4** — Contrast, H1 duplication, tab panels, placeholder labels
9. **L1-L3** — Low-priority fixes