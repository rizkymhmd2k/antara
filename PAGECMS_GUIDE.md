# How We Turned This Website Into PageCMS

Imagine website text is written directly inside page code. That works, but changing text means opening code.

We changed this so content lives in separate files. Now someone can change words without touching page design.

## Example: move one service into PageCMS

We will move this service:

```text
Wealth Planning
We build a living strategy around liquidity, lifestyle, family needs, and long-term independence.
```

### 1. Start with hard-coded content

Before PageCMS, component might contain text directly:

```
<h2>Wealth Planning</h2>
<p>We build a living strategy around liquidity, lifestyle, family needs, and long-term independence.</p>
```

Problem: content and design are mixed. To change description, someone must edit `Service.astro`.

### 2. Create content folder

Our content starts here:

```text
src/content/
```

This is our small, file-based CMS. Files act like CMS records.

### 3. Create folder for content type

Services are repeatable cards, so use:

```text
src/content/services/
```

One file inside this folder means one service.

### 4. Create one content file

Create `src/content/services/wealth-planning.md`:

```
---
number: "01"
title: Wealth Planning
description: We build a living strategy around liquidity, lifestyle, family needs, and long-term independence.
order: 1
---
```

This file is now service’s content record.

### 5. Understand fields

```text
number      number shown on card
title       service name
description words shown under name
order       position in list; 1 appears before 2
```

Keep field names exactly same. Website expects these names.

### 6. Tell Astro allowed fields

Open `src/content.config.ts`. The `services` rule says every service needs `number`, `title`, `description`, and `order`:

```
const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});
```

Think of this as form validator. It catches missing or incorrect content.

### 7. Tell component to read services

`src/components/sections/Service.astro` loads folder:

```
const servicesText = await getCollection("services");
```

Then it displays each service:

```
{servicesText.map((service) => (
  <article>
    <h2>{service.data.title}</h2>
    <p>{service.data.description}</p>
  </article>
))}
```

Component controls design. Markdown files control words.

### 8. Add another service

No page component change needed.

1. Copy `wealth-planning.md`.
2. Rename copy to `tax-planning.md`.
3. Change its values.
4. Give it new `order` number.

```
---
number: "05"
title: Tax Planning
description: We help organize tax decisions around your wider wealth plan.
order: 5
---
```

Component already reads every file in `services/`, so new service appears automatically.

## Same process for page sections

Some content is one thing, not list. Example: home page SEO title.

### 1. Create YAML file

Use `src/content/site/home-page.yml`:

```
title: Antara Private Wealth | Precisely Held
description: Antara Private Wealth brings order, intention, and confidence to decisions surrounding significant capital.
```

### 2. Read file in page

`src/pages/index.astro` does this:

```
const page = await getEntry("site", "home-page");
```

`site` means `src/content/site/`. `home-page` means `home-page.yml`.

### 3. Use its values

```
<Layout title={data.title} description={data.description}>
```

Change `home-page.yml`, and page title/description changes. No layout edit needed.

## Full process for adding content

1. Decide what you add: page setting, service, team member, location, statistic, or another item.
2. Find matching folder inside `src/content/`.
3. Copy existing file from that folder.
4. Rename copy using lowercase and hyphens.
5. Change content values; keep field names unchanged.
6. Set `order` if content appears in list.
7. Save file.
8. Run `npm run dev` and check website.
9. Run `npm run build` to check content rules.

## Folder cheat sheet

```text
src/content/site/             page and section text (.yml)
src/content/services/         service cards (.md)
src/content/process-steps/    process cards (.md)
src/content/team-members/     team cards (.md)
src/content/locations/        location cards (.md)
src/content/stats/            number cards (.md)
src/content/values/           value cards (.md)
src/content/audiences/        audience cards (.md)
src/content/social-links/     social links (.md)
```

Simple rule: `.astro` files decide how content looks. Files inside `src/content/` decide what content says.
