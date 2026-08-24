# Technical Patterns Reference

Detailed implementation patterns, code recipes, and mobile-specific gotchas for small business marketing sites. Read this file when building Phase 4 (implementation) and Phase 5 (review cycles).

---

## Table of Contents

1. [HTML Head Template](#html-head-template)
2. [Navbar — Transparent to Solid](#navbar)
3. [Mobile Menu — Slide Panel](#mobile-menu)
4. [Hero Section](#hero-section)
5. [Featured Item Cards](#featured-item-cards)
6. [Hours Display — Responsive](#hours-display)
7. [Google Reviews Integration](#google-reviews)
8. [Scroll Reveal Animations](#scroll-reveal)
9. [Mobile Sticky CTA Bar](#mobile-sticky-cta)
10. [Grain Texture Overlay](#grain-texture)
11. [CSS Foundations](#css-foundations)
12. [WebKit Gotchas](#webkit-gotchas)

---

## HTML Head Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Business Name | Tagline with Local Keywords</title>
  <meta name="description" content="Include business type, location, signature offerings, rating. ~155 chars." />
  <meta name="keywords" content="business name city, business type city, neighborhood, key offerings" />

  <!-- Open Graph -->
  <meta property="og:title" content="Business Name | Short Tagline" />
  <meta property="og:description" content="Short pitch for social sharing" />
  <meta property="og:image" content="assets/images/hero-bg.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://domain.com" />

  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            /* 6 palette colors here */
          },
          fontFamily: {
            display: ['"Display Font"', 'serif'],
            body:    ['"Body Font"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Google Fonts (preconnect for speed) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />

  <link rel="stylesheet" href="css/styles.css" />
  <link rel="icon" type="image/jpeg" href="assets/logo.jpg" />
</head>
<body class="bg-[background] text-[text] font-body antialiased">
```

---

## Navbar

Transparent over the hero image, transitions to solid with backdrop-blur on scroll.

**HTML structure:**
```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
    <!-- Logo -->
    <a href="#" class="flex items-center gap-3 group">
      <img src="assets/logo.jpg" alt="Business logo" class="h-14 w-14 object-cover rounded-full" />
    </a>

    <!-- Desktop nav (hidden on mobile) -->
    <div class="hidden md:flex items-center gap-10">
      <a href="#about" class="nav-link text-sm tracking-wide transition-colors">About</a>
      <a href="#menu" class="nav-link text-sm tracking-wide transition-colors">Menu</a>
      <a href="#reviews" class="nav-link text-sm tracking-wide transition-colors">Reviews</a>
      <a href="#visit" class="nav-link text-sm tracking-wide transition-colors">Visit</a>
      <a href="[CTA_LINK]" target="_blank" rel="noopener"
         class="nav-cta text-sm px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105">
        Order Online
      </a>
    </div>

    <!-- Mobile hamburger (hidden on desktop) -->
    <button id="nav-toggle" class="md:hidden relative z-50 p-2.5 rounded-xl nav-toggle-btn"
            aria-label="Toggle menu" aria-expanded="false">
      <div class="hamburger-lines">
        <span class="ham-line ham-1 transition-all duration-300"></span>
        <span class="ham-line ham-2 transition-all duration-300"></span>
        <span class="ham-line ham-3 transition-all duration-300"></span>
      </div>
    </button>
  </div>
</nav>
```

**CSS for dual states:**
```css
/* Default: transparent over hero */
#navbar .nav-link { color: rgba(250, 246, 241, 0.7); }
#navbar .nav-link:hover { color: [highlight-hex]; }
#navbar .nav-cta {
  background: rgba(250, 246, 241, 0.12);
  color: [background-hex];
  backdrop-filter: blur(8px);
}

/* Scrolled: solid background */
#navbar.scrolled {
  background: rgba([bg-rgb], 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba([secondary-rgb], 0.5);
}
#navbar.scrolled .nav-link { color: rgba([text-rgb], 0.55); }
#navbar.scrolled .nav-link:hover { color: [accent-hex]; }
```

**JS scroll listener:**
```js
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // check initial state
}
```

---

## Mobile Menu

**CRITICAL: The mobile menu element MUST be placed OUTSIDE the `<nav>` element as a sibling.**

If you nest it inside `<nav>`, the navbar's `backdrop-filter: blur(12px)` (added when scrolled) creates a WebKit compositing context. This silently makes all descendant backgrounds transparent on iOS Safari and Chrome on iOS. The menu will look fine at the top of the page but become see-through once the user scrolls.

**HTML — placed immediately after `</nav>`:**
```html
</nav>

<!-- Mobile menu: OUTSIDE nav to avoid backdrop-filter compositing bug -->
<div id="mobile-menu" class="mobile-menu-closed md:hidden fixed inset-0" style="z-index:55;">
  <!-- Tap-to-close overlay -->
  <div class="mobile-menu-bg absolute inset-0"></div>

  <!-- Slide-in panel — use INLINE STYLE for background, not just Tailwind class -->
  <div class="mobile-menu-panel absolute right-0 top-0 bottom-0 w-72 flex flex-col shadow-2xl"
       style="background:[background-hex]; z-index:10;">

    <!-- Panel header: logo + close button -->
    <div class="flex items-center justify-between px-6 py-5"
         style="border-bottom:1px solid [secondary-hex];">
      <div class="flex items-center gap-3">
        <img src="assets/logo.jpg" alt="Logo" class="h-9 w-9 rounded-full object-cover" />
        <span class="font-display text-xl" style="color:[text-hex];">Business Name</span>
      </div>
      <button id="nav-close" class="w-9 h-9 flex items-center justify-center rounded-full"
              style="background:[muted-hex];" aria-label="Close menu">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Nav links with numbered labels -->
    <div class="flex-1 px-6 py-2">
      <a href="#about" class="mobile-link flex items-center gap-4 py-4 group"
         style="border-bottom:1px solid [secondary-hex];">
        <span class="text-xs font-medium w-5 flex-shrink-0" style="color:[accent-hex]; opacity:0.5;">01</span>
        <span class="font-display text-2xl" style="color:[text-hex];">About</span>
      </a>
      <!-- Repeat for each section -->
    </div>

    <!-- CTA + phone at bottom -->
    <div class="px-6 pb-8 pt-5 space-y-3" style="border-top:1px solid [secondary-hex];">
      <a href="[CTA_LINK]" target="_blank" rel="noopener"
         class="flex items-center justify-center gap-2 w-full font-medium py-4 rounded-2xl text-sm tracking-wide"
         style="background:[accent-hex]; color:[background-hex];">
        Order Online
      </a>
      <div class="flex items-center justify-center gap-3 text-xs" style="color:rgba([text-rgb],0.4);">
        <span>Open Daily</span>
        <a href="tel:+1XXXXXXXXXX" class="hover:text-[accent]">[Phone Number]</a>
      </div>
    </div>
  </div>
</div>
```

**CSS for the slide panel:**
```css
/* Closed state */
.mobile-menu-closed { pointer-events: none; visibility: hidden; }
.mobile-menu-closed .mobile-menu-bg { opacity: 0; transition: opacity 0.35s ease; }
.mobile-menu-closed .mobile-menu-panel { transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.mobile-menu-closed .mobile-link { opacity: 0; transform: translateX(16px); }

/* Open state */
.mobile-menu-open { pointer-events: auto; visibility: visible; }
.mobile-menu-open .mobile-menu-bg {
  opacity: 1;
  background: rgba(20, 12, 8, 0.70);
  transition: opacity 0.35s ease;
  /* NO backdrop-filter here — causes compositing bugs on mobile WebKit */
}

/* Panel — force own compositing layer */
.mobile-menu-panel {
  background-color: [background-hex] !important;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  isolation: isolate;
}
.mobile-menu-open .mobile-menu-panel {
  transform: translateX(0);
  transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Staggered link animation */
.mobile-menu-open .mobile-link {
  opacity: 1; transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-menu-open .mobile-link:nth-child(1) { transition-delay: 0.12s; }
.mobile-menu-open .mobile-link:nth-child(2) { transition-delay: 0.18s; }
.mobile-menu-open .mobile-link:nth-child(3) { transition-delay: 0.24s; }
.mobile-menu-open .mobile-link:nth-child(4) { transition-delay: 0.30s; }
```

**JS — three ways to close:**
```js
const toggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function closeMenu() {
  mobileMenu.classList.remove('mobile-menu-open');
  mobileMenu.classList.add('mobile-menu-closed');
  toggle.querySelector('.hamburger-lines').classList.remove('ham-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu-open');
    if (isOpen) { closeMenu(); }
    else {
      mobileMenu.classList.remove('mobile-menu-closed');
      mobileMenu.classList.add('mobile-menu-open');
      toggle.querySelector('.hamburger-lines').classList.add('ham-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close button
  document.getElementById('nav-close')?.addEventListener('click', closeMenu);
  // Tap overlay to close
  mobileMenu.querySelector('.mobile-menu-bg')?.addEventListener('click', closeMenu);
  // Close when nav link clicked
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}
```

---

## Hero Section

Bottom-aligned content (editorial feel), full-bleed background image with gradient overlay.

```html
<section id="hero" class="relative min-h-screen flex items-end overflow-hidden">
  <div class="absolute inset-0">
    <img src="assets/images/hero-bg.jpg" alt="Inside the business"
         class="w-full h-full object-cover scale-105 hero-img" />
    <div class="absolute inset-0 bg-gradient-to-t from-[text] via-[text]/50 to-[text]/10"></div>
  </div>

  <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 md:pb-28 pt-40">
    <div class="max-w-2xl">
      <p class="text-[highlight] text-sm tracking-[0.25em] uppercase mb-5">
        Business Type · Neighborhood
      </p>
      <h1 class="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[background] leading-[0.95] mb-8">
        Catchy<br/>Headline<br/>Here
      </h1>
      <p class="text-[background]/75 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
        One-sentence pitch using authentic language from reviews.
      </p>

      <!-- Trust badges -->
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-[background]/75 text-xs tracking-wide">Open Daily · Hours summary</span>
        </div>
        <div class="flex items-center gap-1.5">
          <!-- Star SVG --> <span class="text-[background]/75 text-xs">4.5 on Google · 600+ reviews</span>
        </div>
      </div>

      <!-- Dual CTAs -->
      <div class="flex flex-wrap gap-4">
        <a href="[CTA_LINK]" class="bg-[accent] text-[background] px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-[highlight] hover:text-[text] transition-all hover:scale-105">
          Order Online
        </a>
        <a href="#menu" class="border border-[background]/60 text-[background] px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-[background]/15 transition-all">
          Explore Menu
        </a>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
    <div class="scroll-indicator w-px h-12 bg-[background]/30 relative overflow-hidden rounded-full">
      <div class="scroll-dot absolute top-0 left-0 w-full h-3 bg-[highlight] rounded-full"></div>
    </div>
  </div>
</section>
```

---

## Featured Item Cards

Horizontal scroll on mobile, grid on desktop. The key rule: **do NOT use `touch-action: pan-x`** — it blocks vertical page scrolling.

```html
<div id="dish-scroll"
     class="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
  <!-- Each card -->
  <div class="dish-card flex-shrink-0 w-[72vw] max-w-[280px] md:w-auto md:max-w-none">
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-[secondary]/40 h-full flex flex-col">
      <div class="aspect-square overflow-hidden">
        <img src="assets/images/product.jpg" alt="Product Name"
             class="w-full h-full object-cover object-center" />
      </div>
      <div class="p-4 md:p-6 flex-1">
        <h3 class="font-display text-lg md:text-xl mb-1">Product Name</h3>
        <p class="text-[text]/50 text-xs md:text-sm leading-relaxed">Short description.</p>
      </div>
      <a href="[CTA_LINK]" class="mx-4 mb-4 md:mx-6 md:mb-6 flex items-center justify-center gap-2 bg-[secondary]/70 text-[text]/80 text-xs font-medium py-2.5 rounded-xl hover:bg-[accent] hover:text-[background] transition-all">
        Order this
      </a>
    </div>
  </div>
</div>
```

**CSS for horizontal scroll:**
```css
@media (max-width: 767px) {
  .dish-scroll {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .dish-scroll::-webkit-scrollbar { display: none; }
  .dish-card { scroll-snap-align: start; }
}

/* Desktop hover effects only */
@media (min-width: 768px) {
  .dish-card:hover { transform: translateY(-8px); }
  .dish-card:hover > div { box-shadow: 0 20px 48px rgba([text-rgb], 0.12); }
}
```

**Image cropping adjustments** — Apply per-image as needed:
- `object-center` — default, good for most images
- `object-top` — when the subject is at the top (e.g., tall items, faces)
- `object-top scale-110` — when there's a border in the image file to crop out

---

## Hours Display

Use separate layouts for mobile and desktop — the editorial large numbers that look great on desktop are hard to read on small screens.

**Mobile: compact card**
```html
<div class="md:hidden border-t border-[secondary] pt-6 mt-2">
  <div class="bg-[secondary]/30 rounded-2xl px-5 py-4">
    <div class="flex items-center gap-2 mb-3">
      <!-- Clock icon -->
      <span class="text-xs uppercase tracking-[0.2em] font-medium" style="color:[text]/45">Hours</span>
    </div>
    <div class="space-y-2.5">
      <div class="flex justify-between items-center">
        <span class="text-sm" style="color:[text]/60">Monday</span>
        <span class="text-sm font-medium" style="color:[text]">12 PM - 8 PM</span>
      </div>
      <div class="h-px" style="background:[secondary]/60"></div>
      <div class="flex justify-between items-center">
        <span class="text-sm" style="color:[text]/60">Tuesday - Sunday</span>
        <span class="text-sm font-medium" style="color:[text]">10 AM - 10:30 PM</span>
      </div>
    </div>
  </div>
</div>
```

**Desktop: editorial numbers**
```html
<div class="hidden md:block border-t border-[secondary] pt-7 mt-2 space-y-4">
  <div class="flex items-baseline gap-3">
    <span class="text-sm uppercase tracking-wider w-20 flex-shrink-0" style="color:[text]/40">Mon</span>
    <span class="font-display text-6xl leading-none" style="color:[accent]">12</span>
    <span class="text-sm self-end pb-1.5" style="color:[text]/40">PM</span>
    <span class="text-3xl leading-none self-end pb-1" style="color:[text]/25">-</span>
    <span class="font-display text-6xl leading-none" style="color:[accent]">8</span>
    <span class="text-sm self-end pb-1.5" style="color:[text]/40">PM</span>
  </div>
</div>
```

---

## Google Reviews

Use the Google Maps JavaScript API + Places API (New) to fetch live reviews.

```html
<!-- In <head> -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&loading=async&callback=initReviews" async defer></script>
```

```js
async function initReviews() {
  try {
    const { Place } = await google.maps.importLibrary('places');
    const { places } = await Place.searchByText({
      textQuery: 'Business Name Address City',
      fields: ['id', 'displayName', 'rating', 'userRatingCount', 'googleMapsURI'],
    });

    if (!places?.length) { showFallback(); return; }
    const place = places[0];
    renderRating(place);

    await place.fetchFields({ fields: ['reviews', 'photos'] });
    renderReviewCards(place.reviews || []);
  } catch (e) { showFallback(); }
}

function renderReviewCards(reviews) {
  const top = reviews.filter(r => r.rating >= 4).slice(0, 3);
  // Render as cards with author photo, name, stars, text
  // Use .review-clamp CSS class to limit text to 5 lines
}
```

Show loading skeletons while the API loads, and always have a graceful fallback if it fails.

---

## Scroll Reveal

```css
.reveal-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal-section.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
});
```

---

## Mobile Sticky CTA

```html
<div id="sticky-order" class="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none opacity-0 translate-y-4 transition-all duration-500">
  <a href="[CTA_LINK]" target="_blank" rel="noopener"
     class="pointer-events-auto flex items-center justify-center gap-3 bg-[accent] text-[background] font-medium text-base py-4 rounded-2xl shadow-xl hover:bg-[highlight] hover:text-[text] transition-colors">
    Order Online
  </a>
</div>
```

```css
#sticky-order { filter: drop-shadow(0 -4px 16px rgba([text-rgb], 0.10)); }
#sticky-order.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
@media (max-width: 767px) { body { padding-bottom: 80px; } }
```

Show/hide with IntersectionObserver watching the hero section.

---

## Grain Texture

Adds subtle warmth. Optional but recommended for cozy/artisanal vibes.

```css
.grain {
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none; opacity: 0.045;
  background-image: url('data:image/svg+xml,...'); /* fractalNoise SVG */
  background-repeat: repeat; background-size: 200px;
}
```

---

## CSS Foundations

```css
html { scroll-behavior: smooth; }

::selection { background: rgba([accent-rgb], 0.2); color: [text-hex]; }

a:focus-visible, button:focus-visible {
  outline: 2px solid [accent-hex];
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## WebKit Gotchas

### 1. backdrop-filter compositing context

**Problem:** Any element with `backdrop-filter` creates an isolated stacking/compositing context in WebKit. Child elements' solid backgrounds can render as transparent on iOS Safari and Chrome on iOS.

**Symptoms:** Mobile menu background is transparent when accessed from a scrolled position, but works fine at the top of the page (where the nav hasn't received `backdrop-filter` yet).

**Fix:** Move the affected element outside the `backdrop-filter` parent. Use inline `style="background:#HEX"` AND CSS `!important` for the background. Add GPU compositing hints: `-webkit-backface-visibility: hidden; will-change: transform; isolation: isolate;`

### 2. touch-action: pan-x

**Problem:** Setting `touch-action: pan-x` on a horizontally scrolling container blocks vertical page scrolling within that element's bounds.

**Symptoms:** Users can scroll horizontally through cards but can't scroll down past the section — they're trapped.

**Fix:** Don't use it. The browser naturally distinguishes horizontal container scroll from vertical page scroll. Remove `touch-action: pan-x` and also remove any hover-zoom effects on cards that might confuse touch handling.

### 3. Tailwind CDN custom classes

**Problem:** Custom color classes defined via the CDN config (`bg-linen`, `text-walnut`, etc.) sometimes don't render on mobile browsers, especially in dynamically created elements or elements with complex class lists.

**Fix:** For critical visual elements (especially the mobile menu panel), use inline `style=""` attributes with hardcoded hex values rather than relying solely on Tailwind custom classes.
