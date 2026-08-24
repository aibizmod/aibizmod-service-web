# Web Quality Action Plan

Audit based on the [web-quality-audit skill](https://github.com/addyosmani/web-quality-skills) — covering Performance, Accessibility, SEO, and Best Practices. Findings prioritized by severity.

---

## Critical (0 found)

No critical issues.

---

## High Priority (3 found)

### H1. Replace CSS `@import` with `next/font`

| | |
|---|---|
| **Category** | Performance |
| **File** | `src/components/ui/faq-sections.tsx:28` |
| **Issue** | Poppins font loaded via `@import url('...')` inside a `<style>` tag. This blocks CSS rendering and is a render-blocking resource. |
| **Fix** | Import Poppins via `next/font/google` like the other fonts in `layout.tsx`. |

```diff
- @import url('https://fonts.googleapis.com/css2?family=Poppins:...&display=swap');
+ import { Poppins } from 'next/font/google';
+ const poppins = Poppins({ subsets: ['latin'], display: 'swap' });
```

### H2. Add skip-to-content link

| | |
|---|---|
| **Category** | Accessibility |
| **Files** | `src/app/layout.tsx` |
| **Issue** | No skip-to-content link exists. Keyboard and screen reader users must tab through all navigation before reaching main content. |
| **Fix** | Add a hidden skip link as the first focusable element in `layout.tsx`. |

```tsx
// In layout.tsx, inside <body>:
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  Skip to main content
</a>
// Wrap <SmoothScroll> children or add id="main-content" to <main> elements
```

### H3. Add keyboard handlers to interactive components

| | |
|---|---|
| **Category** | Accessibility |
| **Files** | `src/components/ui/focus-rail.tsx`, `src/components/ui/card-stack.tsx` |
| **Issue** | Interactive cards and carousels have `onClick` but no `onKeyDown` handlers. Non-mouse users cannot activate them. |
| **Fix** | Add `onKeyDown` handlers for `Enter`/`Space` on interactive elements, or use native `<button>`/`<a>` elements. |

```diff
- <div onClick={...} className="...">
+ <div onClick={...} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { ... } }} tabIndex={0} role="button" className="...">
```

---

## Medium Priority (4 found)

### M1. Fix empty alt text on favicon image

| | |
|---|---|
| **Category** | Accessibility / SEO |
| **File** | `src/app/ai-visibility-audit-report/page.tsx:934` |
| **Issue** | Favicon `<img>` has `alt=""` — should describe the image or the domain. |
| **Fix** | Provide descriptive alt text. |

```diff
- {favicon && <img src={favicon} alt="" ... />}
+ {favicon && <img src={favicon} alt={`${displayDomain} favicon`} ... />}
```

### M2. Review low-contrast text

| | |
|---|---|
| **Category** | Accessibility |
| **Files** | Multiple pages |
| **Issue** | `text-slate-400` (#94a3b8) and `text-slate-500` (#64748b) used on white backgrounds in breadcrumbs, subtitles, and metadata text. These likely fail WCAG AA minimum contrast ratio (4.5:1). `text-slate-500` on white is ~4.0:1 — below threshold. |
| **Fix** | Use `text-slate-600` or darker for body text; reserve `text-slate-400`/`text-slate-500` for disabled or decorative elements only. |

### M3. Add Content Security Policy headers

| | |
|---|---|
| **Category** | Best Practices (Security) |
| **Files** | Server config / `next.config.js` |
| **Issue** | No CSP headers detected. Without CSP, XSS attacks can inject malicious scripts. |
| **Fix** | Add CSP via `next.config.js` headers or reverse proxy config. |

```js
// next.config.js
async headers() {
  return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https:;" }] }]
}
```

### M4. Add `aria-hidden` to decorative SVGs

| | |
|---|---|
| **Category** | Accessibility |
| **Files** | Multiple components |
| **Issue** | Some inline SVGs used for icons or decorative backgrounds lack `aria-hidden="true"`. Screen readers may announce meaningless visual elements. |
| **Fix** | Add `aria-hidden="true"` to all purely decorative SVGs. |

---

## Low Priority (2 found)

### L1. Explicit cache headers

| | |
|---|---|
| **Category** | Performance |
| **Files** | Server config |
| **Issue** | No explicit `Cache-Control` headers in codebase. Relies on Next.js defaults. |
| **Fix** | Verify CDN cache TTLs are configured in production for static assets. |

### L2. Expand ARIA labels across app

| | |
|---|---|
| **Category** | Accessibility |
| **Files** | All pages |
| **Issue** | Only 6 `aria-label` attributes across the entire app. Icon-only buttons and navigation links should have accessible names. |
| **Fix** | Audit interactive elements and add `aria-label` where the action is not clear from context alone. |

---

## Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| **Performance** | 0 | 1 | 0 | 1 | 2 |
| **Accessibility** | 0 | 2 | 2 | 1 | 5 |
| **SEO** | 0 | 0 | 1 | 0 | 1 |
| **Best Practices** | 0 | 0 | 1 | 0 | 1 |
| **Total** | **0** | **3** | **4** | **2** | **9** |

## Recommended priority order

1. **H1** — Fix `@import` in `faq-sections.tsx` (render-blocking, easy win)
2. **H2** — Add skip-to-content link in `layout.tsx` (high impact for a11y)
3. **H3** — Add keyboard handlers to interactive components (WCAG requirement)
4. **M1** — Fix empty alt text on favicon (quick fix)
5. **M2** — Review low-contrast text (systematic find/replace)
6. **M3** — Add CSP headers (security best practice)
7. **M4** — Add `aria-hidden` to decorative SVGs
8. **L1** — Verify cache headers
9. **L2** — Expand ARIA labels