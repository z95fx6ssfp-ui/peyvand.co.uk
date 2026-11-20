import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

// Tag vocabularies. Decided with Peyvand, 5 Nov 2026. One word per tag,
// no combined labels. Threads became their own collection on 9 Nov 2026
// (placeholders until Peyvand names them in her words).

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
  "animation",
  "film",
  "television",
  "audio",
  "writing",
  "drag",
  "performance art",
] as const;

export const SETTINGS = ["live", "recorded", "outdoor", "online", "gallery"] as const;

// Themes (20 Nov 2026): what a work is about. An open list: add a word here and in Notion
// (Website: WORKS, "Themes") at the same time. Iran was a thread and Peyvand moved it here:
// a thread is a way of looking that runs across work ("Diasporic"); a theme is a subject.
export const THEMES = ["Iran"] as const;

export const STATUSES = ["R&D", "in development", "produced", "touring", "archived"] as const;

const roleValues = [...ROLES.Performer, ...ROLES.Maker] as const;

// Lenses (9 Nov to 20 Nov 2026) are gone: visitors are not asked who they are.
// What each lens pinned now lives on the page it belongs to (About, Work with me, Nist).

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
      themes: z.array(z.enum(THEMES)).default([]),
      thread: z.array(reference("threads")).max(2).default([]),
      featured: z.boolean().default(false),
      producedByNist: z.boolean().default(false),
      // Facts line is assembled from these, never typed by hand.
      character: z.string().optional(),
      venue: z.string().optional(),
      company: z.string().optional(),
      with: z.string().optional(), // collaborators, replaces a "collaborator" tag
      director: z.string().optional(),
      funders: z.array(z.string()).default([]), // credited on the entry page and the Nist page
      access: z.string().optional(), // what access is part of this work, a sentence or two; shown on its page and gathered on /access
      summary: z.string().max(200),
      image: image().optional(),
      imageAlt: z.string().optional(),
      photographer: z.string().optional(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      // Added 6 Nov 2026 for the bold entry template (design.md section 5).
      video: z.string().url().optional(), // Vimeo or YouTube page URL; embedded after the hero
      videoTitle: z.string().optional(), // visible title above the embed, e.g. "Trailer"
      strapline: z.string().max(60).optional(), // one line at display size, e.g. "Autobiographical agitprop."
      audienceQuotes: z.array(z.string()).default([]), // short, unattributed, shown as a wall
      pressQuotes: z
        .array(z.object({ quote: z.string(), source: z.string() }))
        .default([]),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            photographer: z.string().optional(),
          }),
        )
        .default([]),
      connected: z.array(z.string()).default([]), // slugs of related work
    }),
});

// Threads (9 Nov 2026): recurring questions or materials that cross-link work the
// medium tags keep apart. One file per thread; the body is a short first-person text
// by Peyvand. Entries join a thread through their `thread` field.
const threads = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/threads" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().int().default(99),
      placeholder: z.boolean().default(false), // true until Peyvand has named and written the thread
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { work, threads };
