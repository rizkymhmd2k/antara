import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sectionHeadingSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
});

const site = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/site" }),
  schema: z.union([
    z.object({
      title: z.string(),
      description: z.string(),
    }),
    z.object({
      eyebrow: z.string(),
      headline: z.string(),
      button: z.string().optional(),
      href: z.string().optional(),
    }),
    z.object({
      headline: z.string(),
      button: z.string().optional(),
    }),
    sectionHeadingSchema,
    z.object({
      eyebrow: z.string(),
    }),
    z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtext: z.string(),
      button: z.string(),
    }),
    z.object({
      email: z.string().email(),
      eyebrow: z.string(),
      headline: z.string(),
      button: z.string(),
    }),
    z.object({
      logoAlt: z.string(),
    }),
    z.object({
      defaultTitle: z.string(),
      defaultDescription: z.string(),
    }),
    z.object({
      anchorText: z.string(),
    }),
  ]),
});

const stats = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/stats" }),
  schema: z.object({
    value: z.string(),
    number: z.number(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    label: z.string(),
    order: z.number(),
  }),
});

const numberedCard = z.object({
  number: z.string(),
  title: z.string(),
  body: z.string(),
  order: z.number(),
});

const differenceItems = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/difference-items" }),
  schema: numberedCard,
});

const audiences = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/audiences" }),
  schema: z.object({
    title: z.string(),
    body: z.string(),
    image: z.enum(["founders", "family", "sports", "executives"]),
    alt: z.string(),
    order: z.number(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const processSteps = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/process-steps" }),
  schema: numberedCard.extend({
    shape: z.enum(["clarify", "align", "evolve"]),
  }),
});

const values = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/values" }),
  schema: numberedCard,
});

const teamMembers = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/team-members" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.enum(["founders"]),
    order: z.number(),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/locations" }),
  schema: z.object({
    name: z.string(),
    address: z.string(),
    image: z.enum(["jakarta", "banjarmasin"]),
    alt: z.string(),
    order: z.number(),
  }),
});

const socialLinks = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/social-links" }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    icon: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  site,
  stats,
  "difference-items": differenceItems,
  audiences,
  services,
  "process-steps": processSteps,
  values,
  "team-members": teamMembers,
  locations,
  "social-links": socialLinks,
};
