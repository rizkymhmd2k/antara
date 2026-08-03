# Lighthouse Optimization Plan

## Goal

Raise mobile and desktop Lighthouse scores while keeping Antara’s current blue, typography, image treatment, motion, and layout intact.

## Completed in this pass

- Use descriptive page titles and meta descriptions on `/` and `/about/`.
- Add `theme-color` for browser UI consistency.
- Preload above-the-fold Alte Haas regular font; use `font-display: swap` to prevent invisible text.
- Keep Astro responsive image generation, explicitly compress generated WebP assets at quality 75.
- Add intrinsic dimensions, lazy loading, and async decoding to footer logo to prevent layout shift and defer non-critical work.
- Confirm production build succeeds with Astro image optimization.

## Next measurement pass

Run Lighthouse against production preview, both routes, mobile and desktop. Record LCP, CLS, INP, transfer size, accessibility, SEO, and Best Practices. Test on throttled CPU/network, not localhost alone.

Local production-preview smoke test: both `/` and `/about/` reached 99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. CLS measured 0; LCP measured 2.0s. Lighthouse identified hero heading render delay as remaining Performance deduction.

## Remaining high-value work

1. Convert local TTF fonts to WOFF2 after visual regression check. Keep only used weights; expected lower font transfer.
2. Add explicit `width`/`height` or `aspect-ratio` to every remaining replaced element, then verify CLS stays near zero.
3. Inspect generated WebP candidates with real viewport captures. Reduce widths where 960/1536px candidates exceed rendered size; preserve quality where image detail matters.
4. Audit JS with Lighthouse Coverage. Keep Lenis, Astro transitions, and scroll animations only where they affect the current experience; defer non-critical enhancement until idle/interaction.
5. Check animation frames with Chrome Performance. Reduce scroll handlers to compositor-friendly transforms and verify no long tasks on mid-tier mobile.
6. Add production caching/compression headers at hosting layer: immutable long-cache for `/_astro/*`, Brotli for HTML/CSS/JS/SVG, and short cache for HTML.
7. Run accessibility/SEO checks: heading order, link names, focus visibility, contrast, reduced-motion behavior, canonical URLs, and sitemap/robots metadata.

## Acceptance criteria

- No visible design regression at mobile, tablet, and desktop breakpoints.
- LCP target under 2.5s, CLS under 0.1, INP under 200ms on Lighthouse mobile.
- No image request larger than rendered need without documented reason.
- Production build remains clean; Lighthouse run includes both routes.
