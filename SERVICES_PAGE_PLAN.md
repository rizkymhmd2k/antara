# Antara Services Page — Copy & Implementation Plan

## 1. New Services page

### Proposed route

`/services/` via `src/pages/services.astro`.

### Page purpose

Expand the five services currently introduced in the home-page `Service.astro` section into a dedicated, more considered service journey. Page should explain Antara’s connected approach: planning first, then coordinated investment, reporting, liquidity, and legacy decisions.

### Proposed structure

1. Services hero
2. Services overview / point-of-view introduction
3. Detailed service sections
4. Connected approach / supporting process section
5. Audience relevance or “who this is for” support section
6. Contact CTA
7. Footer

### Reuse

- Reuse `Layout.astro` for metadata, page transitions, Lenis, fonts, and global grid background.
- Reuse `Service.astro` patterns and service content collection as source for the overview.
- Reuse `Contact.astro` unchanged for final CTA.
- Reuse `Footer.astro` unchanged for social links, animated footer lines, and logo.
- Reuse `Step.astro` if detailed inspection confirms its process content is suitable as the page’s supporting “how we work” section.
- Reuse `Serve.astro` only if the audience section materially helps users understand service fit; otherwise keep it home-page-specific to avoid page length and repetition.
- Reuse `Eyebrow`, `SectionHeading`, `Button`, `ScrollLine`, and existing line/decorative assets.

### New components

- `src/components/services/Hero.astro`: dedicated services-page opening treatment, using existing typography, grid, and scroll-line language.
- `src/components/services/Overview.astro`: concise service philosophy plus linked/high-level service list; can be omitted if `Service.astro` is extended to own this role.
- `src/components/services/Detail.astro`: reusable service-detail presentation for one service entry, avoiding five duplicated page blocks.
- `src/components/services/Details.astro`: collection-driven service detail composition and section rhythm.
- Optional `src/components/services/Approach.astro`: only if existing `Step.astro` cannot support the required contextual content without awkward conditionals.

## 2. Content structure

### Hero

- Eyebrow: `Services` or `Our Services`.
- Headline: position Antara as a partner bringing clarity and coordination to significant wealth decisions.
- Supporting copy: explain that services work together around the client’s full financial life, rather than operating as isolated products.
- Optional primary CTA: anchor to contact (`#contact`) or use the existing contact button pattern.
- Visual treatment: restrained, spacious opening with existing `ScrollLine`/SVG line language; no new imagery required.

### Services overview

Use current `services` collection as canonical source, ordered by frontmatter `order`:

1. Wealth Planning
2. Investment Management
3. Reporting & Balance Sheet Clarity
4. Legacy Coordination
5. Lending & Liquidity

Show number, title, and shortened orientation copy in a navigable overview. Preserve existing numbered white badges and vertical-line motif from `Service.astro`. Overview should act as page navigation where practical, with anchors to detailed sections.

### Detailed service sections

Create one consistent detail block per collection entry. Each block should include:

- Existing service number.
- Service title.
- Full current description, lightly edited only for consistency if needed.
- Additional copy explaining outcomes, decisions supported, or coordination with outside professionals.
- Optional “related considerations” or supporting metadata only where content is available and useful.

Do not invent claims, performance promises, credentials, or product offerings. Keep copy advisory, contextual, and consistent with current Antara language.

Recommended narrative order remains Wealth Planning → Investment Management → Reporting & Balance Sheet Clarity → Legacy Coordination → Lending & Liquidity. This moves from context and intent to implementation, visibility, family coordination, and flexibility.

### Supporting sections

- Preferred: reuse `Step.astro` to explain Antara’s existing Align → Clarify → Evolve process after service details.
- Optional: reuse `Serve.astro` after the approach section only if page testing shows audience context improves conversion. Avoid duplicating all home-page content without a clear service-page role.
- Avoid adding new imagery or decorative modules unless existing assets clearly support them.

### CTA

Reuse `Contact.astro` as final conversion section. Keep current content source, button behavior, GA event tracking, and `#contact` anchor. If copy needs service-page context, add a page-specific content variant through content data rather than duplicating component markup.

### Footer

Reuse `Footer.astro` as final section. Keep social links, logo, animated lines, accessibility attributes, and reduced-motion behavior unchanged.

## 3. Existing component reuse

### `Service.astro`

Do not copy it wholesale into the new page. Refactor only if needed so shared service presentation can support both home overview and services details. Preferred direction:

- Keep home section’s compact sticky-scroll behavior and current visual output.
- Extract collection normalization or a small presentational subcomponent only if it reduces duplication cleanly.
- Add page-specific detail rendering in `src/components/services/`, not through fragile page-condition branches inside the home section.
- Preserve current desktop sticky frame, progress line, numbered badges, mobile normal-flow behavior, and reduced-motion-safe browser behavior.

### `Serve.astro`

No default change. Include on Services page only if needed as supporting service-fit context. Keep home usage unchanged.

### `Footer.astro`

Include unchanged. No new footer variant unless route-specific content proves necessary.

### Components that should remain unchanged

`Layout.astro`, `Contact.astro`, `Button.astro`, `Eyebrow.astro`, `SectionHeading.astro`, `ScrollLine.astro`, `FooterLines.astro`, global grid utilities, and existing content schemas should remain unchanged unless implementation reveals a concrete shared requirement.

## 4. Design consistency

### Typography

- Use existing Alte Haas Grotesk for primary UI/body type.
- Use existing utility scale: `display-text`, `headline-text`, `title-text`, `body-text`, `caption-text`.
- Match current tight headings, restrained body copy, white text, and white/80 supporting text.
- Avoid introducing another font, arbitrary type scale, or excessive text density.

### Colors

- Continue `#004cbb` / `--color-background` as page background.
- Continue white foreground and white alpha treatments.
- Use existing blue hover gradient only where an existing image-card pattern is reused.
- No new palette.

### Spacing

- Use `container-padding`, `hero-padding`, and existing `--spacing-*` tokens.
- Preserve generous section rhythm: approximately 56–96px mobile and 80–144px desktop depending on content density.
- Keep grid edges aligned to the global four-column decorative grid.

### Layout/grid

- Use existing three-column service composition where useful: eyebrow/supporting label, primary content, and detail track.
- Use `max-w-*`, `w-full`, and responsive Tailwind classes already present.
- Keep detailed content readable with a constrained text measure; avoid full-width paragraphs.
- Preserve page-level `bg-grid-3` background and `relative`/`z-index` layering around decorative lines.

### Cards/borders

- Prefer editorial sections and numbered list items over generic card UI.
- Reuse rounded-sm corners, white numbered badges, subtle `bg-white/20` rules, and existing button treatment.
- Avoid shadows, gradients, or card borders that create a new visual system.

### Animations

- Reuse sticky service track/progress behavior only where it improves scanning.
- Use `ScrollLine` for progressive SVG reveal where appropriate.
- Retain Astro page transition and Lenis behavior through `Layout.astro`.
- Respect `prefers-reduced-motion`; new scripts must disable or simplify motion under the existing media query.
- Avoid adding animation libraries or scroll-observer dependencies.

### Responsive/mobile behavior

- Mobile service details must remain normal document flow; no forced sticky/pinned layout.
- Keep minimum touch targets and readable line lengths.
- Collapse multi-column layouts at existing breakpoints (`sm`, `md`, `lg`).
- Ensure decorative lines do not cause horizontal overflow; existing mobile `overflow-x: clip` behavior remains fallback, not layout strategy.
- Test at narrow mobile, tablet, and desktop widths, plus reduced-motion mode.

## 5. Files to create/change

### New files

- `src/pages/services.astro` — route entry; loads Services page metadata and composes page sections.
- `src/components/services/Hero.astro` — dedicated Services hero.
- `src/components/services/Details.astro` — renders ordered service collection and detail rhythm.
- `src/components/services/Detail.astro` — reusable single-service detail block, if needed by `Details.astro`.
- `src/content/site/services-page.yml` — page title, description, hero eyebrow/headline/body, and any page-specific copy.
- `SERVICES_PAGE_PLAN.md` — this approved-plan artifact.

Potential, only if justified after implementation inspection:

- `src/components/services/Overview.astro` — separate overview component.
- `src/components/services/Approach.astro` — page-specific supporting approach content if `Step.astro` cannot be reused cleanly.

### Existing files to modify

- `src/components/sections/Service.astro` — only if extracting shared rendering/data logic is necessary; retain home behavior.
- `src/components/sections/Step.astro` — only if a small, backward-compatible prop/content extension enables reuse on Services page.
- `src/content/site/contact.yml` — only if approved page-specific CTA copy is required; preserve existing home content through a data-driven variant if needed.
- `src/content.config.ts` — only if new content collection fields require schema updates.

### Existing files expected unchanged

`src/pages/index.astro`, `src/pages/about.astro`, `src/layouts/Layout.astro`, `src/components/sections/Serve.astro`, `src/components/sections/Contact.astro`, `src/components/sections/Footer.astro`, shared UI components, global styles, service Markdown entries, image assets, and animation assets.

## 6. Implementation approach

1. Add Services page content entry and validate it against current Astro content schema.
2. Build `services.astro` using existing `Layout` composition and shared final `Contact`/`Footer` sections.
3. Add minimal Services hero matching existing page opening language.
4. Reuse current services collection and numbered ordering for overview and details.
5. Extract only genuinely shared service markup/data logic; avoid duplicating `Service.astro` or creating page-specific forks.
6. Reuse `Step.astro` where its current architecture fits; otherwise add one focused supporting component.
7. Keep dependencies unchanged. Use Astro, content collections, Tailwind utilities, existing SVG assets, and small local scripts only.
8. Verify type/content build, route generation, responsive layouts, sticky/mobile behavior, page transitions, CTA tracking, keyboard navigation, and reduced-motion behavior.
9. Review final diff to confirm home/about output remains unchanged and no unrelated working-tree edits are touched.

Implementation starts only after plan approval.
