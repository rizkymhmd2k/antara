# Performance plan

## Baseline

Lighthouse 12.8.2, production `astro preview`, mobile preset, local run on 2026-08-27:

| Route | Perf | FCP | LCP | CLS | TBT | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 1.4 s | 1.6 s | 0.000 | 40 ms | 1,020 KiB |
| `/about` | 99 | 1.5 s | 1.5 s | 0.000 | 20 ms | 1,081 KiB |
| `/services` | 100 | 1.5 s | 1.5 s | 0.001 | 60 ms | 984 KiB |
| `/contact` | 99 | 1.6 s | 1.6 s | 0.009 | 40 ms | 1,241 KiB |

LCP is text (`h1` on home/about/services, contact details `h2` on contact), not an image. CLS is already excellent. Lighthouse has no lab INP value; validate field INP after each change, targeting p75 ≤200 ms. Local preview does not model production TTFB, CDN, compression, or device variance.

Desktop Lighthouse check, same preview and date: `/` 100 (LCP 0.4 s), `/about` 87 on first run (LCP 1.9 s), `/services` 100 (LCP 0.4 s), `/contact` 100 (LCP 0.5 s). Three `/about` repeats scored 95–97 with LCP 1.06–1.38 s, confirming run variance; desktop `/about` remains route to watch, not proof of a stable 87 score. Desktop CLS was 0 and TBT 0 ms across routes.

Current issues:

- Text compression is absent in preview; Lighthouse flags roughly 488–540 KiB potential savings. Production must serve Brotli/gzip for HTML, CSS, and JS.
- Every route loads Astro ClientRouter, Lenis, navigation code, animation initializers, and Google Analytics. GTM is ~170 KiB transferred and ~71 KiB unused in the trace. Client dev assets inflated earlier runs; always audit `dist`/deployed output.
- Two 144 KiB TTF fonts are shipped as TTF. Regular is preloaded globally; bold is discovered later. No font subsetting or WOFF2.
- Astro image transforms exist, but the built output contains many responsive variants and `/contact` is the heaviest route (1.24 MiB). Image budgets and actual rendered sizes need enforcement.
- Many continuous SVG/CSS and scroll `requestAnimationFrame` loops run site-wide or on long pages (`GravityRings`, `Step`, `Details`, `Service`, `ScrollLine`). Current TBT is low, but this is the main INP/battery risk on real phones.
- Lighthouse reports small forced-reflow findings on some routes. Navbar resize measurement and service/scroll measurements should stay off hot scroll paths.

## Ordered work

| Priority | Fix | Expected impact / acceptance |
| --- | --- | --- |
| P0 | Enable Brotli (gzip fallback), long immutable caching for hashed assets, and CDN/edge delivery. Re-run against deployed URL. | Largest cross-route transfer/TTFB win; clears compression and server-delivery findings. Target compressed initial route ≤200 KiB, TTFB ≤800 ms. |
| P0 | Keep hero text in initial HTML/CSS; remove only unnecessary render-blocking work. Verify production bundle has no Vite client/source-map overhead. | Protect LCP; target all routes LCP ≤2.5 s and FCP ≤1.8 s on Lighthouse mobile. |
| P1 | Load analytics after consent/idle (or after first interaction); keep event behavior. Avoid loading it before first paint. | Removes ~170 KiB third-party startup and ~71 KiB unused JS; improves LCP/INP without UX change. |
| P1 | Split optional client behavior by route/viewport. Initialize Lenis, scroll-line, counters, service observers, and page-transition handlers only where used; destroy listeners/observers on Astro swaps. | Less parse/execute work, lower battery/INP risk. Target TBT ≤100 ms and field INP p75 ≤200 ms. Preserve all interactions and animation timing. |
| P1 | Convert TTF to subset WOFF2 (Latin glyphs, exact weights), use `font-display: swap`, preload only above-fold regular font, and ensure bold has stable fallback metrics (`size-adjust`/metric overrides if needed). | ~50–70% font-byte reduction; faster text paint, no font-induced shift. Recheck LCP and CLS. |
| P1 | Establish image budgets: WebP/AVIF where supported, cap source width to rendered need, use `sizes` accurately, eager-load only an above-fold image if one becomes LCP, lazy-load below-fold images, retain explicit aspect ratios. | Reduce `/contact` and long-page transfers; preserve image appearance. Target ≤200 KiB per above-fold image and no offscreen image eager loads. |
| P2 | Make animation loops visibility-aware with `IntersectionObserver`; pause offscreen continuous SVG/canvas work. Batch scroll reads, then writes in one RAF; avoid layout reads inside repeated handlers. Keep transform/opacity animation and reduced-motion behavior. | Lower main-thread work, GPU/battery use, and forced reflow; no noticeable animation/UX change while visible. |
| P2 | Add `content-visibility: auto` plus `contain-intrinsic-size` only to long below-fold sections after visual regression testing. | Cuts initial layout/paint on home/services; must not alter scroll anchoring or reveal behavior. |
| P3 | Remove unused global imports/variants and minify production assets; keep source maps out of production responses if not needed. | Small JS/CSS transfer reduction after P0–P2; do not chase Lighthouse micro-savings before delivery and image/font work. |

## Verification order

1. Build with `npm run build`; inspect `dist` asset sizes and route HTML.
2. Audit deployed production URL with Lighthouse mobile, 3 runs per route; record median Perf, LCP, CLS, TBT.
3. Test Chrome DevTools Performance on low-end mobile emulation while scrolling, opening mobile nav, changing service panels, and navigating with transitions.
4. Check RUM p75 LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms; use field data as release gate.
5. Run visual regression and keyboard/reduced-motion checks after every animation or loading change.

Do not remove or materially retime existing animations. Do not lazy-load hero content. A Lighthouse 100 is a lab target; field metrics and unchanged UX remain release criteria.
