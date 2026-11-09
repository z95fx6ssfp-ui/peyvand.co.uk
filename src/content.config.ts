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

export const STATUSES = ["R&D", "in development", "produced", "touring", "archived"] as const;

const roleValues = [...ROLES.Performer, ...ROLES.Maker] as const;

// Lenses (9 Nov 2026): audience access points above the tags. A lens is a saved
// view of the one catalogue: preset filters, extra facts on the cards, one line of
// introduction, the right contact route. Named for people, never for forms.
// The filter and the extra facts are read from here by the Work index and the Card,
// so a lens changes in one place. URL: /work/?lens=casting
export type LensKey = "everyone" | "casting" | "programmers" | "funders" | "press";
export const LENSES: Record<
  LensKey,
  {
    label: string;
    intro: string;
    roles?: readonly string[]; // any of these roles
    statuses?: readonly string[]; // any of these statuses
    nist?: boolean; // only Produced by Nist
    press?: boolean; // only entries with press quotes
    facts: readonly ("character" | "director" | "venue" | "company" | "funders" | "press" | "touring")[];
  }
> = {
  everyone: { label: "Everyone", intro: "Stage, screen, installation, puppetry, film and writing. Browse by tag or thread.", facts: [] },
  casting: {
    label: "Casting",
    intro: "Screen and stage roles. Reel, headshots and agent details are above the catalogue.",
    roles: ROLES.Performer,
    facts: ["character", "director"],
  },
  programmers: {
    label: "Programmers",
    intro: "Work I have made or co-made, with what is available to tour or commission.",
    roles: ROLES.Maker,
    statuses: ["produced", "touring"],
    facts: ["venue", "company", "touring"],
  },
  funders: {
    label: "Funders",
    intro: "Projects produced through Nist, with partners and funders credited, plus work in research and development.",
    nist: true,
    statuses: ["R&D", "in development", "produced", "touring"],
    facts: ["funders", "company"],
  },
  press: {
    label: "Press",
    intro: "Work that has been reviewed, with press quotes and sources.",
    press: true,
    facts: ["press", "venue"],
  },
};
export const LENS_KEYS = Object.keys(LENSES) as LensKey[];

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
      thread: z.array(reference("threads")).max(2).default([]),
      featured: z.boolean().default(false),
      producedByNist: z.boolean().default(false),
      // Facts line is assembled from these, never typed by hand.
      character: z.string().optional(),
      venue: z.string().optional(),
      company: z.string().optional(),
      with: z.string().optional(), // collaborators, replaces a "collaborator" tag
      director: z.string().optional(),
      funders: z.array(z.string()).default([]), // added 9 Nov 2026 for the Funders lens
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
