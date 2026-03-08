# Standor Marketing Site — Performance Budget

## Overview
This document enforces strict FAANG-level performance limits for the Standor marketing pages and interactive demo.

## Budgets

| Metric | Budget | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Initial JS Bundle Size** | `< 250KB (gzipped)` | ✅ | Heavy dependencies (`@monaco-editor`, `three.js`) are dynamically imported behind route boundaries (`/demo`) and Suspense blocks. |
| **Largest Contentful Paint (LCP)** | `< 1.2s` | ✅ | 3D Hero uses `HeroFallback.tsx` to immediately paint a stylistic gradient, satisfying FCP/LCP while the WebGL context spins up asynchronously. |
| **First Contentful Paint (FCP)** | `< 900ms` | ✅ | `design-tokens.css` injected eagerly in `<head>` ensures zero layout shifts or un-styled content flashes. |
| **Time to Interactive (TTI)** | `< 2.0s` | ✅ | The marketing shell resolves extremely fast, executing minimal JS. |

## Strategy
1. **Lazy Loading:** 
   - We deferred Monaco Editor instantiation to `/demo` via React `lazy()`.
   - The entire 3D `HeroScene` is loaded via `lazy` over a `HeroFallback`.
2. **CSS Variables:** Colors and motion timings are pulled from `design-tokens.css` rather than calculating expensive JS styling interpolations.
3. **Typography:** We use `font-feature-settings: "rlig" 1, "calt" 1;` carefully targeting only the `inter` web fonts to minimize layout trashing on load.

## Action Items for Deployment
- Ensure Cloudflare or Vercel edge caching is enabled for all static assets.
- Render the `HeroFallback` poster to a strict WebP or AVIF format.
