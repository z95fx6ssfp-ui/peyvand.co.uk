import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Tag vocabularies. Decided with Peyvand, 5 Nov 2026. One word per tag,
// no combined labels. Threads stay optional and empty until she names them.

export const ROLES = {
  Performer: ["actor", "performer", "puppeteer", "voice"],
  Maker: [
    "lead artist",
    "co-creator",
    "writer",
    "deviser",
    "director",
    "dramaturg",
    "puppet maker",
  ],
} as const;

export const MEDIA = [
  "theatre",
  "installation",
  "puppetry",
  "stop-motion",
  "film",
  "television",
  "audio",
  "writing",
] as const;

export const SETTINGS = ["live", "recorded", "outdoor", "online", "gallery"] as const;

export const STATUSES = ["R&D", "in development", "produced", "touring", "archived"] as const;

const roleValues = [...ROLES.Performer, ...ROLES.Maker] as const;

const work = defineCollection({
  // Files starting with an underscore (the template) are not entries.
  loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().int(),
      endYear: z.number().int().optional(),
      role: z.array(z.enum(roleValues)).min(1),
      medium: z.array(z.enum(MEDIA)).min(1),
      setting: z.array(z.enum(SETTINGS)).min(1),
      status: z.enum(STATUSES).default("produced"),
      thread: z.array(z.string()).max(2).default([]),
      featured: z.boolean().default(false),
      producedByNist: z.boolean().default(false),
      // Facts line is assembled from these, never typed by hand.
      character: z.string().optional(),
      venue: z.string().optional(),
      company: z.string().optional(),
      with: z.string().optional(), // collaborators, replaces a "collaborator" tag
      director: z.string().optional(),
      summary: z.string().max(200),
      image: image().optional(),
      imageAlt: z.string().optional(),
      photographer: z.string().optional(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      connected: z.array(z.string()).default([]), // slugs of related work
    }),
});

export const collections = { work };
