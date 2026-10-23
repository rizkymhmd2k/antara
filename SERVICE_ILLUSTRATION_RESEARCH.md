# Service Illustration — Linear Reference Study

Research date: 24 October 2026. Scope: findings and proposed direction; no component changes.

## Recommendation

Replace the five flat diagrams with a consistent family of original isometric objects: layered planes, grouped volumes, and restrained outlines. Keep Antara’s blue background and service meanings. The biggest improvement is spatial composition and depth, followed by consistent visual weight across the set.

## What the reference demonstrates

**Observed in the user-supplied screenshot:** three isolated objects occupy spacious columns on a near-black surface. The first uses stacked plates with a lifted top; the second groups blocks of different heights; the third repeats upright planes into a rising and falling profile. Each uses a shared angled projection, fine outlines, subdued internal edges, and substantial empty space. Slight corner rounding softens the industrial geometry. Small `FIG` labels and quiet separators make the objects read as a designed series.

Depth comes primarily from overlap, spacing, and edge hierarchy. The silhouette is clearer than interior detail. Repetition creates complexity while keeping the vocabulary small. These are visual observations from the supplied image, not measurements of Linear’s CSS.

**Verified on the live site:** Linear’s homepage still includes a three-figure section, labeled Fig 0.1–0.3, alongside the themes “Purpose-built,” “Powered by agents,” and “Designed for speed.” This supports treating each illustration as a visual companion to one idea. The page extraction does not establish animation behavior or whether those objects use SVG, canvas, WebGL, or raster assets. [Source: Linear homepage](https://linear.app/).

## What differs in Antara today

The current component already provides a useful foundation: inline SVG, a shared `360 × 360` viewBox, restrained monochrome strokes, a decorative accessibility treatment, and motion gated by reduced-motion preferences. Its five drawings are a rising route, circular allocation, ledger sheets, family tree, and house/cash exchange. Their projection and density vary, so they feel more like individual explanatory diagrams than a single sculptural family. [Source: ServiceIllustration.astro](src/components/services/ServiceIllustration.astro).

Main strokes are currently white at 72% opacity, secondary strokes at 25%, with a non-scaling 0.75px width. Antara’s background is blue (`#004cbb`); copying the screenshot’s very dark edge contrast directly could make the artwork disappear. Preserve the restrained hierarchy, then tune it against the actual blue. [Sources: illustration styles](src/components/services/ServiceIllustration.astro), [theme](src/styles/global.css).

## Five proposed illustrations

| Service | Original object concept | Meaning and optional motion |
| --- | --- | --- |
| Wealth Planning | A shared foundation with three offset plan plates and one lifted plate carrying a small route with decision points. | A living plan built around connected needs. Plates settle into alignment once; avoid an upward performance curve. [Service](src/content/services/wealth-planning.md) |
| Investment Management | A compact arrangement of differently sized modules on one common base, with deliberate gaps between groups. | Different portfolio assignments considered together. Modules move a short distance into position; sizes are symbolic, not allocation data. [Service](src/content/services/investment-management.md) |
| Reporting & Balance Sheet Clarity | Several thin record planes align beneath a single overview plate with sparse rows. | Many accounts and holdings become one readable view. Misaligned planes gently consolidate. [Service](src/content/services/reporting-balance-sheet.md) |
| Legacy Coordination | A central foundation connects to several smaller platforms at two levels using quiet structural links. | People and structures remain connected across generations. Links reveal once; avoid suggesting a fixed legal or family hierarchy. [Service](src/content/services/legacy-coordination.md) |
| Lending & Liquidity | A substantial anchored block with a shallow plate partially extended from its base. | Access to flexibility while the main structure remains intact. The plate slides outward once; no implied guaranteed cash release. [Service](src/content/services/lending-liquidity.md) |

## Shared construction and layout

Use one consistent isometric-like projection, matching corner treatment, comparable occupied area, and three edge strengths: silhouette, internal structure, and faint guides. Use background-colored opaque faces to hide rear edges; uncontrolled transparency would make overlapping solids look like tangled wireframes. Start with a small number of repeated layers and add detail only if it survives at the actual rendered size.

Inline SVG fits the existing component and can produce this direction without new dependencies. Keep the final static pose complete, reuse the existing reveal observer, and add restrained one-time movement only after the still compositions work. These are implementation recommendations, not claims about Linear’s implementation. [Sources: component](src/components/services/ServiceIllustration.astro), [reveal handling](src/components/services/Details.astro).

The current desktop illustration occupies five of twelve columns inside the right two-thirds of the stage, with further padding. Its `25rem` maximum width does not guarantee that much available space. Check tablet and narrow desktop widths especially: repeated edges can merge even when non-scaling strokes remain visible. Simplify geometry or adjust its immediate column only if a rendered check demonstrates the need. Preserve normal mobile flow and reduced-motion behavior. [Sources: Details layout](src/components/services/Details.astro), [existing page plan](SERVICES_PAGE_PLAN.md).

Before implementation is accepted, inspect all five silhouettes together, then verify narrow mobile, tablet, desktop, reduced motion, and page navigation. This study reviewed the source and reference; it did not render or test a proposed replacement.
