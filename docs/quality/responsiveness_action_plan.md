# Responsiveness Action Plan — Step-by-Step by Priority

**Target breakpoints:** 320px · 480px · 640px (sm) · 768px (md) · 1024px (lg) · 1280px (xl)

---

## 🔴 PRIORITY 1 — Critical (Fix Before Any Deployment)

---

### STEP 1 — `src/app/globals.css`
**Issue:** No horizontal overflow guard. Absolutely-positioned elements can cause page-wide horizontal scroll on mobile.

**Change A:** In the `body` block, add:
```css
overflow-x: hidden;
```

**Change B:** In the `html` block, add:
```css
overflow-x: hidden;
```

**Change C:** After the `body` block, add a new rule:
```css
img, video {
  max-width: 100%;
  height: auto;
}
```

---

### STEP 2 — `src/components/layout/Navbar.tsx`
**Issue A:** Hamburger button uses `p-1.5` → only ~35px tap area. WCAG minimum is 44px.
**Issue B:** Desktop country dropdown (`w-[335px]`) has no max-width guard — overflows viewport on narrow laptops.
**Issue C:** Mobile menu panel has no `overflow-x-hidden` — inner content can bleed.

**Change A:** Find the hamburger `<button>`:
```
className={`md:hidden p-1.5 rounded-full ...`}
```
→ Change `p-1.5` to `p-2.5`

**Change B:** Find the desktop country dropdown `<motion.div>`:
```
className="absolute right-0 top-[calc(100%+8px)] z-50 w-[335px] rounded-2xl ..."
```
→ Add `max-w-[calc(100vw-2rem)]` after `w-[335px]`

**Change C:** Find the mobile menu `<motion.div id="mobile-menu">`:
```
className={`md:hidden z-50 pointer-events-auto origin-top mt-2 w-[92%] max-w-sm rounded-2xl shadow-2xl p-2 backdrop-blur-md ...`}
```
→ Add `overflow-x-hidden` to the className

---

### STEP 3 — `src/components/layout/Footer.tsx`
**Issue A:** "Start Today" CTA buttons don't go full-width on 320px–480px phones — they sit side-by-side and may overflow.
**Issue B:** Footer links column items ("Custom Software Development", "Customer Experience Management") have no overflow protection.

**Change A:** Find the CTA buttons wrapper:
```
<div className="flex flex-wrap items-center gap-4 shrink-0">
```
→ On each `<Link>` inside, add `w-full sm:w-auto` to its className

**Change B:** Find the 3-column links grid (`grid-cols-2 sm:grid-cols-3`). On each column `<div>`, add `min-w-0` to the className so text can truncate cleanly.

---

### STEP 4 — `src/components/sections/WhyChooseUs.tsx`
**Issue:** Right column uses `md:pl-24` but the two-column layout only activates at `lg:` (1024px). At tablet (768px–1023px) the layout is still single-column, so `md:pl-24` creates an unwanted 96px left indent.

**Change:** Find the right column div:
```
className="lg:col-span-7 relative space-y-8 md:pl-24"
```
→ Change `md:pl-24` to `lg:pl-24`

---

### STEP 5 — `src/components/sections/GlobalPresence.tsx`
**Issue:** Globe widget hardcoded at `h-[520px]` on all screens. On mobile this creates a ~600px tall section below the text, making the page feel broken.

**Change:** Find the `<Globe ... className="h-[520px]">`:
```
className="h-[520px]"
```
→ Change to `className="h-[280px] sm:h-[380px] lg:h-[520px]"`

---

### STEP 6 — `src/components/ServicePageLayout.tsx`
**Issue A:** Hero image column `min-h-[420px]` is very tall on mobile — stacks below all text and makes the hero section excessively long.
**Issue B:** Bullet points card uses `max-w-2xl` but not `w-full` — on 320px it may not fill the container.
**Issue C:** FAQ `<summary>` rows use `py-4` — touch target may fall below 44px minimum.

**Change A:** Find the hero image container div:
```
className="relative min-h-[420px] overflow-hidden rounded-[32px] ..."
```
→ Change `min-h-[420px]` to `min-h-[220px] sm:min-h-[320px] lg:min-h-[420px]`

**Change B:** Find the bullet card div:
```
className="mt-6 max-w-2xl rounded-2xl border border-white/70 ..."
```
→ Add `w-full` before `max-w-2xl`

**Change C:** Find each FAQ `<summary>` element:
```
className="flex items-center justify-between px-5 py-4 gap-4 ..."
```
→ Change `py-4` to `py-3.5 min-h-[52px]`

---

### STEP 7 — `src/components/SubservicePageLayout.tsx`
**Issue:** Same issues as `ServicePageLayout.tsx` above — apply the same three changes.

**Action:** Open the file and apply:
- Hero image `min-h` responsive values
- Bullet card `w-full`
- FAQ summary `min-h-[52px]`

---

## 🟡 PRIORITY 2 — High (Fix Within 24 Hours of Deploy)

---

### STEP 8 — `src/components/sections/HeroSection.tsx`
**Issue:** Search input uses `pr-36` (144px right padding). On phones under 380px, the "Check Visibility" button text gets clipped inside this padded area.

**Change A:** Find the search `<input>`:
```
className="w-full h-14 pl-12 pr-36 text-base ..."
```
→ Change `pr-36` to `pr-28 sm:pr-36`

**Change B:** Find the inactive state button `<span>`:
```
className="inline-flex h-10 items-center gap-2 rounded-xl bg-stone-900/50 px-5 text-sm font-semibold ..."
```
→ Change `text-sm` to `text-xs sm:text-sm`

---

### STEP 9 — `src/components/sections/Testimonials.tsx`
**Issue:** `<CardStack cardWidth={560} cardHeight={380}>` — although the component has an internal resize handler, the base values produce a card that is too tall relative to the viewport on small phones.

**Change:** Find the `<CardStack>` usage:
```
cardWidth={560}
cardHeight={380}
```
→ Change to `cardWidth={520} cardHeight={340}`

---

### STEP 10 — `src/components/ui/glass-cards.tsx`
**Issue:** Each stacked service card uses `h-[320px]` fixed height — on 320px phones with `p-6` padding the text inside may overflow the card.

**Change A:** Find the card inner div:
```
className="relative h-[320px] w-full overflow-hidden rounded-3xl border ... p-6 ... md:p-8"
```
→ Change `h-[320px]` to `h-[280px] sm:h-[320px]`
→ Change `p-6 ... md:p-8` to `p-4 sm:p-6 md:p-8`

---

### STEP 11 — `src/components/sections/FAQSection.tsx`
**Issue:** FAQ question row `py-4` — the touch target can be under 44px on mobile.

**Change:** Find the question row div:
```
className="flex items-center justify-between px-5 py-4 gap-4"
```
→ Change `py-4` to `py-3.5 min-h-[52px]`

---

### STEP 12 — `src/components/about/AboutPageContent.tsx`
**Issue:** Mission/Vision cards use `p-8 md:p-10` — on 320px phones `p-8` (32px) eats into card content space. Logo cloud wrapper also uses `p-8` which is too generous for small phones.

**Change A:** Find Mission card div:
```
className="h-full bg-ink rounded-card p-8 md:p-10"
```
→ Change to `p-5 sm:p-8 md:p-10`

**Change B:** Find Vision card div:
```
className="h-full card-royal p-8 md:p-10"
```
→ Change to `p-5 sm:p-8 md:p-10`

**Change C:** Find logo cloud wrapper:
```
className="rounded-2xl border border-border/60 bg-white/60 p-8 shadow-sm backdrop-blur-sm"
```
→ Change `p-8` to `p-4 sm:p-8`

---

### STEP 13 — `src/components/contact/ContactPageContent.tsx`
**Issue:** Contact detail list items contain concatenated phone + email strings that have no word-break protection — on 320px these can overflow the card.

**Change:** Find each contact value `<a>` and `<p>` inside the `<ul className="mt-7 space-y-4">`:
```
className="mt-1 block text-sm font-semibold text-[#0F172A] ..."
```
→ Add `break-all` to the className on the `<a>` tag that shows `value` (phone · email string)

---

### STEP 14 — `src/app/faq/FAQAccordion.tsx`
**Action:** Open the file. Find the accordion trigger button or div. Ensure it has `min-h-[48px]` and `py-3` minimum so the touch target is always ≥44px on mobile.

---

### STEP 15 — `src/components/blog/BlogPageContent.tsx`
**Issue:** Category filter pill row uses `flex items-center gap-2 overflow-x-auto` — on mobile the left edge of the scroll area is flush with the section edge, making it obvious the content is cut.

**Change:** Find the category filter wrapper div:
```
className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0"
```
→ Change to `flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 -mx-6 px-6`

This makes the horizontal scroll area extend edge-to-edge on mobile.

---

### STEP 16 — `src/components/blog/BlogCard.tsx`
**Action:** Open the file and confirm:
- Card root element uses `w-full` (not a fixed pixel width)
- `<Image>` uses either `fill` prop with a sized parent, or explicit `width` + `height`
- No `overflow: visible` that could cause text to clip

If any fixed `w-[Xpx]` is found → replace with `w-full max-w-sm`

---

## 🟢 PRIORITY 3 — Medium (Fix Before Going Live)

---

### STEP 17 — `src/app/topics/page.tsx`
**Issue:** Grid uses `md:grid-cols-3` — at exactly 768px, three topic hub cards are very cramped (~220px each).

**Change:** Find the cards grid:
```
className="mt-16 grid gap-8 md:grid-cols-3"
```
→ Change to `mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3`

---

### STEP 18 — `src/app/comparisons/page.tsx`
**Issue:** Tag pill row `<div className="flex gap-2">` containing `optionA`, `vs`, `optionB` spans — on 320px phones with long option names these overflow the card header.

**Change A:** Find tag row wrapper:
```
<div className="flex gap-2">
```
→ Change to `<div className="flex flex-wrap gap-1.5">`

**Change B:** Find each option `<span>`:
```
className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100"
```
→ Add `max-w-[90px] truncate` to the className

---

### STEP 19 — `src/app/careers/page.tsx`
**Issue:** "Get in Touch" button is `inline-flex` centered — on small phones this might not fill the available space, looking too small to tap.

**Change:** Find the "Get in Touch" `<Link>`:
```
className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-sm ..."
```
→ Add `w-full sm:w-auto justify-center` to the className

---

### STEP 20 — `src/app/privacy/page.tsx`
**Issue:** Long email addresses and legal text can overflow on 320px without word-break rules.

**Change:** Find section content `<p>` elements:
```
className="text-base leading-7 text-slate-600"
```
→ Add `break-words` to the className

---

### STEP 21 — `src/app/terms/page.tsx`
**Action:** Open the file. Apply the same `break-words` fix to all body text `<p>` elements. Confirm layout uses `max-w-3xl mx-auto` container.

---

## ⬜ PRIORITY 4 — Audit & Fix (Before Final QA Sign-off)

---

### STEP 22 — `src/components/sections/ai-automation-hero.tsx`
**Action:** Open and audit. Check:
- Hero heading uses `clamp()` or responsive text classes
- CTA buttons use `flex-col gap-3 sm:flex-row`
- No fixed `w-[Xpx]` on any container

Apply fixes where issues are found.

---

### STEP 23 — `src/components/sections/HowWeWork.tsx`
**Action:** Open and audit. Check:
- Step layout stacks to single column on mobile
- Step number/icon is visible at 320px
- No horizontal overflow from step connectors

Apply fixes where issues are found.

---

### STEP 24 — `src/components/sections/ClientsSection.tsx`
**Action:** Open and audit. Check:
- Marquee wrapper has `overflow-hidden` to clip logos cleanly
- Logo images have a consistent height cap (e.g. `h-8 w-auto object-contain`)
- `--duration` CSS variable is set appropriately

Apply fixes where issues are found.

---

### STEP 25 — `src/components/ServiceCardsSection.tsx`
**Action:** Open and audit. Check:
- Cards grid uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Card content doesn't overflow at 320px
- Icons and titles are visible at small sizes

Apply fixes where issues are found.

---

### STEP 26 — `src/app/comparisons/[slug]/page.tsx`
**Action:** Open and audit the comparison detail page. Check:
- Any `<table>` elements are wrapped in `<div className="overflow-x-auto">`
- Side-by-side comparison columns stack with `flex-col sm:flex-row` or `grid-cols-1 md:grid-cols-2`
- Heading uses `clamp()` sizing

Apply fixes where issues are found.

---

### STEP 27 — `src/app/topics/[slug]/page.tsx`
**Action:** Open and audit. Check:
- Article/resource list uses responsive grid
- Topic hero heading uses `clamp()` sizing
- No fixed widths on content panels

Apply fixes where issues are found.

---

### STEP 28 — `src/app/blog/[slug]/page.tsx`
**Action:** Open and audit the blog post detail page. Check:
- Post body text has `max-w-3xl mx-auto` or `prose` class for line-length control
- All `<img>` tags inside post body have `w-full h-auto rounded-lg`
- Code blocks have `overflow-x-auto` wrapper
- No fixed `w-[Xpx]` on post containers

Apply fixes where issues are found.

---

### STEP 29 — `src/app/ai-visibility-audit-report/page.tsx`
**Action:** Open and audit this full page. Check:
- Result score cards use `w-full` not fixed widths
- Data tables or grid layouts stack on mobile
- Chart/visualization containers have `overflow-x-auto` where needed
- CTA buttons stack vertically with `flex-col sm:flex-row`

Apply fixes where issues are found.

---

### STEP 30 — `src/app/automation-roi-calculator/page.tsx`
**Action:** Open and audit the calculator page. Check:
- Input fields are `w-full`
- Range sliders scale correctly on mobile (check `<input type="range">` styling)
- Results panel is placed below inputs on mobile (`flex-col lg:flex-row`)
- Number outputs don't overflow on 320px

Apply fixes where issues are found.

---

## 🧪 STEP 31 — Final Cross-Device Test Checklist

After all steps above are complete, test each page at these widths in Chrome DevTools:

| Width | Device | What to check |
|---|---|---|
| 320px | iPhone SE | No horizontal scroll · text readable · buttons tappable |
| 375px | iPhone 14 | Hero fits · navbar hamburger works |
| 414px | iPhone Plus | Cards don't clip |
| 768px | iPad portrait | 2-col layouts correct · nav not crowded |
| 1024px | iPad landscape | 3-col layouts · sticky nav pill |
| 1280px | Desktop | Full layout correct |
| 1536px | Wide desktop | Content contained in `max-w-7xl` |

**Browsers to check:**
- Chrome (DevTools device emulation)
- Safari (iOS simulator or real device) — especially `backdrop-blur` + `clamp()` support
- Firefox — check `clamp()` and custom property fallbacks

---

## Quick Reference — Priority Order

| Step | File | Priority |
|---|---|---|
| 1 | `src/app/globals.css` | 🔴 Critical |
| 2 | `src/components/layout/Navbar.tsx` | 🔴 Critical |
| 3 | `src/components/layout/Footer.tsx` | 🔴 Critical |
| 4 | `src/components/sections/WhyChooseUs.tsx` | 🔴 Critical |
| 5 | `src/components/sections/GlobalPresence.tsx` | 🔴 Critical |
| 6 | `src/components/ServicePageLayout.tsx` | 🔴 Critical |
| 7 | `src/components/SubservicePageLayout.tsx` | 🔴 Critical |
| 8 | `src/components/sections/HeroSection.tsx` | 🟡 High |
| 9 | `src/components/sections/Testimonials.tsx` | 🟡 High |
| 10 | `src/components/ui/glass-cards.tsx` | 🟡 High |
| 11 | `src/components/sections/FAQSection.tsx` | 🟡 High |
| 12 | `src/components/about/AboutPageContent.tsx` | 🟡 High |
| 13 | `src/components/contact/ContactPageContent.tsx` | 🟡 High |
| 14 | `src/app/faq/FAQAccordion.tsx` | 🟡 High |
| 15 | `src/components/blog/BlogPageContent.tsx` | 🟡 High |
| 16 | `src/components/blog/BlogCard.tsx` | 🟡 High |
| 17 | `src/app/topics/page.tsx` | 🟢 Medium |
| 18 | `src/app/comparisons/page.tsx` | 🟢 Medium |
| 19 | `src/app/careers/page.tsx` | 🟢 Medium |
| 20 | `src/app/privacy/page.tsx` | 🟢 Medium |
| 21 | `src/app/terms/page.tsx` | 🟢 Medium |
| 22 | `src/components/sections/ai-automation-hero.tsx` | ⬜ Audit |
| 23 | `src/components/sections/HowWeWork.tsx` | ⬜ Audit |
| 24 | `src/components/sections/ClientsSection.tsx` | ⬜ Audit |
| 25 | `src/components/ServiceCardsSection.tsx` | ⬜ Audit |
| 26 | `src/app/comparisons/[slug]/page.tsx` | ⬜ Audit |
| 27 | `src/app/topics/[slug]/page.tsx` | ⬜ Audit |
| 28 | `src/app/blog/[slug]/page.tsx` | ⬜ Audit |
| 29 | `src/app/ai-visibility-audit-report/page.tsx` | ⬜ Audit |
| 30 | `src/app/automation-roi-calculator/page.tsx` | ⬜ Audit |
| 31 | Cross-device test checklist | ✅ Final QA |
