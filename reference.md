# SONA UI — Loader & Header Animation Reference-test

> Extracted from `test.html` + `one.css`. Color-agnostic — adapt to your palette freely.

---

## 1. Page Loader (`js-i-mask`)

### Structure

```html
<!-- Outer full-screen cover -->
<div class="fixed inset-0 z-[9999] bg-white overflow-hidden js-i-mask">

  <!-- Inner centered logo wrapper — starts invisible -->
  <div class="absolute inset-0 flex items-center justify-center invisible js-i-mask-mask">

    <!-- SVG logo with individually animated paths -->
    <svg class="w-[20rem] s:w-[42.3rem] h-auto" viewBox="0 0 423 83">
      <path class="js-i-path" d="..." />
      <path class="js-i-path" d="..." />
      <path class="js-i-path" d="..." />
      <path class="js-i-path" d="..." />
    </svg>

  </div>
</div>

<!-- Dark overlay used during page transitions -->
<div class="fixed inset-0 z-[1000] bg-black invisible js-mask"></div>
```

### How the Loader Sequence Works

The loader is driven by **GSAP** (implied by the class naming convention and transition complexity). The sequence:

1. **Overlay visible** — `.js-i-mask` covers the full viewport (white background, `z-9999`)
2. **Logo draws in** — each `.js-i-path` animates from `opacity: 0` / slight `translateY` up to full visibility, staggered per path
3. **Logo wrapper fades** — `.js-i-mask-mask` transitions from `invisible` → visible using opacity
4. **Overlay exits** — `.js-i-mask` slides or fades out, revealing the page beneath
5. **Page intro fires** — elements with `.js-i-fade` and `.js-i-scale` animate in

### CSS to replicate (no JS library)

```css
/* --- Loader overlay --- */
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Logo container */
.loader__logo {
  opacity: 0;
  animation: loaderLogoIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
}

/* Each SVG path draws in staggered */
.loader__path {
  opacity: 0;
  transform: translateY(12px);
  animation: loaderPathIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}
.loader__path:nth-child(1) { animation-delay: 0.1s; }
.loader__path:nth-child(2) { animation-delay: 0.2s; }
.loader__path:nth-child(3) { animation-delay: 0.3s; }
.loader__path:nth-child(4) { animation-delay: 0.4s; }

/* Overlay exit — triggered by adding .is-leaving class */
.loader.is-leaving {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
}

@keyframes loaderLogoIn {
  to { opacity: 1; }
}

@keyframes loaderPathIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### JS trigger (vanilla)

```js
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');

  // Give logo time to show, then exit
  setTimeout(() => {
    loader.classList.add('is-leaving');
    loader.addEventListener('transitionend', () => {
      loader.remove();
    }, { once: true });
  }, 1800);
});
```

---

## 2. Page Transition Overlay (`js-mask`)

A full-screen black overlay that sits at `z-1000`, used between page navigations.

```css
.page-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: black;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1),
    visibility 0s 0.5s;
}

.page-mask.is-entering {
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1),
    visibility 0s;
}
```

---

## 3. Header — Initial (Transparent, `.js-i-fade`)

### Structure

```html
<header class="absolute top-0 left-0 w-full z-[1000] pt-30 text-white pointer-events-none js-i-fade">
  <div class="...flex items-center">

    <!-- Logo -->
    <a href="/" class="pointer-events-auto">
      <img src="logo-light.svg" alt="Logo" />
    </a>

    <!-- Menu toggle button -->
    <button class="ml-auto flex items-center pointer-events-auto transition-colors duration-500 ease-in-out js-menu-toggle">
      <div class="menu-toggle-text relative text-[16px] overflow-hidden">Menu</div>
      <svg class="h-[32px] w-[32px]" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15.5" class="stroke-current" />
        <rect x="8" y="18" width="16" height="1" class="fill-current" />
        <rect x="8" y="13" width="16" height="1" class="fill-current" />
      </svg>
    </button>

  </div>
</header>
```

### Intro animation (`.js-i-fade`)

The header fades + slides in after the loader exits:

```css
.js-i-fade {
  opacity: 0;
  transform: translateY(-10px);
  transition:
    opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.js-i-fade.is-loaded {
  opacity: 1;
  transform: translateY(0);
}
```

### Menu Toggle Button Animations

The button text uses a "slide out" text swap on open/close:

```css
/* "Menu" / "Close" text swap */
.menu-toggle-text {
  position: relative;
  overflow: hidden;
}

/* Normal label */
.menu-toggle-text .label-default {
  display: block;
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
}

/* Alt label sits below, slides up when open */
.menu-toggle-text .label-open {
  position: absolute;
  top: 100%;
  left: 0;
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
}

/* When menu is open: slide both up */
.is-menu-open .menu-toggle-text .label-default,
.is-menu-open .menu-toggle-text .label-open {
  transform: translateY(-100%);
}

/* Button color transition */
.js-menu-toggle {
  transition: color 500ms ease-in-out;
}
```

---

## 4. Sticky Header (`js-sh`) — Scroll-triggered

A second header that appears fixed on scroll with a backdrop blur:

### Structure

```html
<div class="fixed top-0 left-0 w-full z-[1003] py-25 text-white
            will-change-transform pointer-events-none invisible
            backdrop-blur-md bg-black/70
            js-sh">
  <!-- same logo + menu toggle as initial header -->
</div>
```

### Transition

```css
.sticky-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1003;
  backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.7);
  will-change: transform;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-100%);
  transition:
    opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    visibility 0s 0.5s;
}

.sticky-header.is-visible {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    visibility 0s;
}
```

```js
const stickyHeader = document.querySelector('.sticky-header');
const threshold = 80; // px from top

window.addEventListener('scroll', () => {
  if (window.scrollY > threshold) {
    stickyHeader.classList.add('is-visible');
  } else {
    stickyHeader.classList.remove('is-visible');
  }
}, { passive: true });
```

---

## 5. Full-Screen Menu (`js-menu`)

### Structure

```html
<aside class="fixed inset-0 z-[1002] invisible js-menu">

  <!-- Dark background overlay -->
  <div class="absolute inset-0 opacity-0 bg-black js-menu-bg"></div>

  <!-- Content panel -->
  <div class="absolute inset-0 s:inset-[3rem] overflow-hidden js-menu-mask">
    <div class="absolute inset-0 overflow-hidden">

      <!-- Left panel: gradient/brand area -->
      <div class="absolute ... bg-black js-menu-gradient">
        <img src="gradient.webp" class="absolute inset-0 w-full h-full object-cover" />
      </div>

      <!-- Right panel: navigation links -->
      <div class="relative ... flex flex-col justify-end js-menu-nav">
        <ul class="text-40 font-serif font-light leading-[1.1]">
          <li class="pb-25 overflow-hidden js-item">
            <a href="/" class="js-menu-link">
              <!-- Dual-text hover effect -->
              <div class="js-text">About</div>
              <div class="absolute inset-0 italic js-text js-mnav-hidden" aria-hidden="true">About</div>
            </a>
          </li>
          <!-- ... more items -->
        </ul>
      </div>

    </div>
  </div>
</aside>
```

### Menu Open/Close Animations

**Three-layer sequence:**

```css
/* 1. Background overlay fades in */
.menu-bg {
  position: absolute;
  inset: 0;
  background: black;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.menu.is-open .menu-bg {
  opacity: 1;
}

/* 2. Content panel slides in from right (or clips) */
.menu-panel {
  position: absolute;
  inset: 0 0 0 auto;
  width: 100%;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.menu.is-open .menu-panel {
  clip-path: inset(0 0% 0 0);
}

/* 3. Nav items stagger up from below */
.menu-item {
  overflow: hidden;
}
.menu-item .js-text {
  display: block;
  transform: translateY(110%);
  transition: transform 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}
.menu.is-open .menu-item:nth-child(1) .js-text { transform: translateY(0); transition-delay: 0.2s; }
.menu.is-open .menu-item:nth-child(2) .js-text { transform: translateY(0); transition-delay: 0.3s; }
.menu.is-open .menu-item:nth-child(3) .js-text { transform: translateY(0); transition-delay: 0.4s; }
.menu.is-open .menu-item:nth-child(4) .js-text { transform: translateY(0); transition-delay: 0.5s; }
.menu.is-open .menu-item:nth-child(5) .js-text { transform: translateY(0); transition-delay: 0.6s; }

/* Close: reverse — items fall back */
.menu.is-closing .menu-item .js-text {
  transform: translateY(110%);
  transition-delay: 0s;
}
```

### Nav Link Italic Hover Effect (`.js-mnav-hidden`)

Each nav link has two text layers stacked. On hover, the italic version slides up:

```css
.nav-link {
  position: relative;
  overflow: hidden;
  display: block;
}

/* Normal text */
.nav-link .text-normal {
  display: block;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

/* Italic text: hidden below */
.nav-link .text-italic {
  position: absolute;
  top: 100%;
  left: 0;
  font-style: italic;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

/* On hover: slide both up */
@media (hover: hover) {
  .nav-link:hover .text-normal,
  .nav-link:hover .text-italic {
    transform: translateY(-100%);
  }
}
```

### Submenu Reveal

```css
/* Submenu container fades in */
.menu-sub {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease-out;
}

/* Left border line grows down */
.menu-sub::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10rem;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

li:hover .menu-sub {
  opacity: 1;
  pointer-events: auto;
}

li:hover .menu-sub::before {
  transform: scaleY(1);
}
```

---

## 6. Link Underline Animations

### Double underline (`ulinedouble`)

Two pseudo-elements create layered underlines with offset timing:

```css
.ulinedouble {
  position: relative;
}

.ulinedouble::before,
.ulinedouble::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.4s;
}

.ulinedouble::after {
  bottom: -4px;
  transition-delay: 0.15s;
}

.ulinedouble:hover::before,
.ulinedouble:hover::after {
  transform: scaleX(0);
  transform-origin: right;
}
```

### Single underline (`uline`) — slide in from left

```css
.uline {
  position: relative;
}

.uline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
}

.uline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

---

## 7. Image Hover Scale

```css
/* Container */
.h-img-scale {
  overflow: hidden;
}

/* Image zooms in slightly on hover */
.h-img-scale img {
  transition: transform 1.1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
}

.h-img-scale:hover img {
  transform: scale(1.075);
}

/* Inverse: image zooms OUT on hover (used in project tiles) */
.project-tile__inset img {
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
}

.project-tile__inset:hover img {
  transform: scale(0.85);
}
```

---

## 8. Social Icon Opacity Fade

```css
.social-icon {
  opacity: 0.4;
  transition: opacity 500ms ease-out;
}

.social-icon:hover {
  opacity: 1;
}
```

---

## 9. Easing Cheat Sheet

All easing values used in this UI:

| Name | Value | Feel |
|---|---|---|
| **Smooth decelerate** | `cubic-bezier(0.19, 1, 0.22, 1)` | Fast start, long graceful ease-out. Used for most UI motion. |
| **Strong in-out** | `cubic-bezier(0.77, 0, 0.175, 1)` | Sharp acceleration & deceleration. Used for progress/form elements. |
| **Ease-out standard** | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Smooth out. Used for overlays and fades. |
| **Quick snap** | `ease-out` | Standard CSS ease-out for simple transitions. |

---

## 10. Visibility Pattern

This site consistently uses a **three-property visibility toggle** instead of `display: none`:

```css
/* Hidden state */
.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Visible state */
.is-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
```

To animate the transition between states:

```css
.toggleable {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    visibility 0s 0.5s; /* visibility delays until after opacity fades */
}

.toggleable.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    visibility 0s; /* visibility snaps immediately when showing */
}
```

---

## 11. Scroll-Reveal Pattern

Elements with `.js-i-scale`, `.js-i-fade` classes animate in on scroll/load:

```css
/* Items start invisible and slightly offset */
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}

.reveal-up.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
```

---

## Summary

| Component | Key technique | Duration | Easing |
|---|---|---|---|
| Page loader | Per-path `translateY` + `opacity` stagger | 1s per path | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Loader exit | Full overlay `opacity` fade | 0.6s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Header intro | `translateY(-10px)` → 0 + opacity | 0.8s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Sticky header | `translateY(-100%)` → 0 + backdrop blur | 0.5s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Menu open | Background fade + clip-path + item stagger | 0.6–0.9s | `cubic-bezier(0.77, 0, 0.175, 1)` |
| Nav link hover | Dual-layer `translateY` text swap | 0.5s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Submenu border | `scaleY(0→1)` from top | 2s | `cubic-bezier(0.165, 0.84, 0.44, 1)` |
| Image hover | `scale(1.075)` or `scale(0.85)` | 1.1s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Underline hover | `scaleX` from left/right | 0.4–0.75s | `cubic-bezier(0.19, 1, 0.22, 1)` |
| Social icons | `opacity 0.4 → 1` | 0.5s | `ease-out` |
