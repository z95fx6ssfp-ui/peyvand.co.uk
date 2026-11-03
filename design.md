# peyvand.co.uk: design.md

Design tokens and rules for the Astro build. Decided 29 Oct 2026 (Direction C, "the archive", type pairing 2), written up 3 Nov 2026. Everything here is the reference for `src/styles/tokens.css` and for every layout decision. When something here and the build disagree, fix the build.

Sources: Design canvas "peyvand.co.uk visual direction", Nist brand guide ("Nist Ltd: Brand Identity & Strategy Guide" and the "Nist colours" sheet), Squarespace Site Styles set on 29 Oct, and `claude/rebuild-progress.md`.

## 1. The idea in one paragraph

The site looks like a working archive: paper, ink, typewritten facts, a stamp of colour where something matters. It borrows from photocopied zines, passport and permit paperwork, rehearsal-room notices and contact sheets. The existing halftone portrait logo already sits in that world. Colour is scarce and does a job each time it appears. Type is big, dark and confident for headings, plain and readable for everything else. Nothing moves unless the visitor asks it to.

## 2. Colour

Six colours. Four names come from Peyvand's palette, two are quiet supports.

| Token | Name | Hex | Role |
| --- | --- | --- | --- |
| `--ink` | Ink (Nist Absence Black) | `#1A1A1A` | All body text, headings, borders, dark sections |
| `--paper` | Paper | `#F1ECE2` | Default page background, text on dark sections |
| `--saffron` | Saffron (Nist Zine Yellow) | `#FFD700` | Fill only: primary buttons, highlights, link colour on dark sections |
| `--firoozeh` | Firoozeh (Nist Teal Flux, deepened) | `#0B6B6B` | Links and labels on light sections, focus ring |
| `--pomegranate` | Pomegranate | `#9E2A3C` | Stamp red: thread tags, "Produced by Nist" lines, one accent per screen at most |
| `--rose` | Rose | `#F4DEE6` | Background for quiet blocks: quotes, access notes, asides |

Firoozeh is the Nist Teal Flux `#008080` darkened so it reads as text on Paper at AA. Pomegranate is not in either Nist brand document; it was added for the stamp role and Peyvand has not objected to it, but it is not confirmed. If it goes, thread tags and Produced by Nist lines fall back to Ink on Rose.

### Contrast, measured (WCAG 2.2 ratios)

| Pair | Ratio | Use |
| --- | --- | --- |
| Ink on Paper | 14.8:1 | Body text everywhere |
| Ink on Saffron | 12.4:1 | Button labels |
| Ink on Rose | 13.6:1 | Quiet blocks |
| Firoozeh on Paper | 5.4:1 | Links, labels, any size |
| Firoozeh on Rose | 4.9:1 | Links inside quiet blocks, any size |
| Pomegranate on Paper | 6.3:1 | Tags and stamp lines, any size |
| Pomegranate on Rose | 5.8:1 | Tags inside quiet blocks |
| Paper on Ink | 14.8:1 | Text on dark sections, header, footer |
| Saffron on Ink | 12.4:1 | Links and buttons on dark sections |
| Paper on Firoozeh | 5.4:1 | Filled teal block, if ever used |
| Firoozeh on Ink | 2.8:1 | FAILS. Never use teal text on dark sections; links there are Saffron |
| Saffron on Paper | 1.2:1 | FAILS. Saffron is never text, never a thin rule on Paper |

Rule: 4.5:1 minimum for all text, 3:1 for icons, borders and focus rings. The table above is the whole set of permitted text pairs. Anything else gets measured before it ships.

### Section themes

Three themes, each a set of CSS custom properties switched on a `<section>` by a `data-theme` attribute, so components never pick colours themselves.

| Theme | Background | Text | Links | Button |
| --- | --- | --- | --- | --- |
| `light` (default) | Paper | Ink | Firoozeh | Saffron fill, Ink label |
| `quiet` | Rose | Ink | Firoozeh | Saffron fill, Ink label |
| `dark` | Ink | Paper | Saffron | Saffron fill, Ink label |

Header and footer are `dark`. Page bodies are `light` with `quiet` blocks for quotes, access information and asides. Avoid two `dark` sections touching.

### The Nist page exception

The Nist page (`/nist`) uses the Nist colours at full strength, and nowhere else does: Signal Pink `#FF33CC`, Teal Flux `#008080`, Zine Yellow `#FFD700`, on Curious White `#F9F9F9` or Paper. Pink and Teal are fills, never text on light backgrounds (Pink on white is 3.2:1, Teal on white 4.8:1 so teal text is allowed but pink is not). Black text on Pink is 5.5:1 and passes; black text on Teal is 3.7:1 and fails for body text, so use white or Paper text on a Teal fill (4.8:1). The Nist logo (black block, pink, teal and yellow arcs, "Nist" wordmark) appears on this page and inside "Produced by Nist" lines on Work entries. It never appears in the site header. The Nist page must not say "Ltd" or show a company number.

## 3. Type

Four typefaces, all open licence and self-hosted from `/public/fonts/` as woff2 (no Google Fonts request at runtime, for speed and privacy).

| Token | Family | Weights | Role |
| --- | --- | --- | --- |
| `--font-display` | Bricolage Grotesque | 800 (headings), 700 (buttons) | H1 to H4, buttons, the name in the header |
| `--font-body` | Source Sans 3 | 400, 400 italic, 600 | Everything that is read |
| `--font-mono` | Courier Prime | 400, 700 | Facts lines, captions, tags, dates, credits, "Last updated" |
| `--font-farsi` | Vazirmatn | 400, 700 | Any Farsi passage, with `lang="fa" dir="rtl"` on that element |

Newsreader (serif) was the alternative and is not used.

Fallback stacks: display `"Bricolage Grotesque", "Arial Black", Impact, sans-serif`; body `"Source Sans 3", "Helvetica Neue", Arial, sans-serif`; mono `"Courier Prime", "Courier New", Courier, monospace`; farsi `Vazirmatn, Tahoma, sans-serif`.

### Scale

Rem-based, root 16px. Body copy is 18px on desktop and 17px under 600px wide.

| Token | Size | Line height | Letter spacing | Weight | Use |
| --- | --- | --- | --- | --- | --- |
| `--h1` | 3.5rem (3.25rem under 600px, or 2.75rem if a title still wraps to three lines) | 1.05 | -0.02em | 800 | Page title, one per page |
| `--h2` | 2rem | 1.05 | -0.02em | 800 | Section headings |
| `--h3` | 1.5rem | 1.1 | -0.02em | 800 | Card titles, sub-sections |
| `--h4` | 1.25rem | 1.15 | -0.01em | 700 | Small headings, labels above lists |
| `--p-large` | 1.25rem | 1.5 | 0 | 400 | Lead paragraph, the one sentence on the homepage |
| `--p` | 1.125rem (1.0625rem under 600px) | 1.5 | 0 | 400 | Body default |
| `--p-small` | 1rem | 1.5 | 0 | 400 | Credits, footer text, form hints |
| `--button` | 1rem | 1 | 0 | 700 | Button labels, display face |
| `--mono` | 0.9rem | 1.4 | 0 | 400 | Facts lines, captions, tags |

Measure: body text maximum 68 characters a line (`max-width: 68ch`). Headings may run wider. Paragraph spacing 1em, no first-line indents. Headings keep a top margin of 1.5 times their size and a bottom margin of 0.5em so they attach to what follows.

### Typographic details

- Headings in sentence case. Never all caps, except the mono tags, which may be caps at 0.9rem with 0.05em tracking.
- Links in body text are Firoozeh, underlined (1px, offset 3px), underline thickens to 2px on hover and focus. Links are never colour only.
- Mono facts line format, in this order, separated by a middle dot with spaces: `Form · Year · Venue or platform · Role`. Example: `Installation · 2026 · Leicester · Lead artist · Produced by Nist`. "Produced by Nist" is Pomegranate; the rest Ink.
- Numbers in facts lines use the mono face, so dates and years align down a list.
- Pull quotes: Source Sans 3 italic at `--p-large` on a `quiet` block, attribution in mono below.

## 4. Spacing and layout

Spacing scale on a 4px base: `--s-1` 4px, `--s-2` 8px, `--s-3` 12px, `--s-4` 16px, `--s-6` 24px, `--s-8` 32px, `--s-12` 48px, `--s-16` 64px, `--s-24` 96px.

- Page gutter 16px under 600px, 24px to 1024px, then a centred column with `max-width: 1200px`. Text columns cap at 68ch inside it.
- Section padding `--s-12` on phones, `--s-24` on desktop. Sections are separated by padding and theme changes, not rules, except one 1px Ink rule above the footer.
- Grid: 12 columns on desktop with `--s-6` gaps; 2 columns from 600px to 900px; 1 column under 600px. Cards keep the same shape at every width.
- Tap targets at least 44 by 44px. Buttons have 12px vertical and 24px horizontal padding, 2px corner radius, no shadow.
- Corner radius is 2px everywhere, or 0. Nothing is pill-shaped or rounded enough to look like an app.

What happens on mobile, as a rule: everything stacks to one column in document order, images go above their text, the menu becomes a drawer behind a "Menu" button with the word visible (not an icon alone), and the facts line is allowed to wrap onto two lines with the middle dots left in place.

## 5. Components

The build should have exactly these, each a single Astro component, each taking its colours from the section theme.

- **Header**: halftone portrait logo at 56px (44px on phones), "Peyvand Sadeghian" as live text beside it in the display face, menu Work · Work with me · Nist · About · Contact. Dark theme. Alt text on the logo: "Peyvand Sadeghian". The name links home.
- **Facts line**: mono, as in section 3.
- **Thread tag**: mono caps, Pomegranate text on a 1px Pomegranate border, 2px radius, 4px by 8px padding. Up to two per entry.
- **Produced by Nist line**: mono, Pomegranate, with the Nist logo at 20px to its left. Only where true.
- **Button**: display 700 at 1rem, Saffron fill, Ink label, 2px radius; secondary button is a 2px Ink border with Ink label and transparent fill. On dark sections the secondary border is Paper.
- **Card** (Work grid): image at 3:2, cropped with `object-fit: cover`, 1px Ink border, title in H3 below, facts line under it. Whole card is the link, one focus ring around it.
- **Quiet block**: Rose background, `--s-6` padding, used for quotes, access notes, content notes.
- **Stamp**: a Pomegranate rotated label (minus 3 degrees) for one-word states such as "Touring", "New", "Archive". At most one per screen. Rotation is purely decorative and removed when `prefers-reduced-motion` is set, since the tilt alone does not move but the convention keeps everything calm.
- **Figure**: image with mono caption below carrying the description and the photographer credit, "Photo: Ali Wright".
- **Video embed**: Vimeo or YouTube iframe at 16:9 inside a Paper frame, `loading="lazy"`, captions on by default, autoplay off, a visible title above it and a plain link below ("Watch on Vimeo") for anyone who blocks embeds.
- **Footer**: dark theme, four short columns on desktop and one stack on phones: contact routes, links (Spotlight, IMDb, Instagram, TikTok, LinkedIn as text), newsletter, Access statement and "Last updated: Month Year" in mono.

## 6. Imagery and texture

- Photographs are the colour in this site. They are shown without filters, duotones or tints.
- Where there is no photograph, the fallback is Paper with a mono caption, never a stock image or a decorative illustration.
- One texture is allowed: a faint paper grain on `dark` sections, as a small tiled PNG under 20KB at 4 to 6 per cent opacity, and a halftone treatment for the logo only. No grain over text on light sections.
- The halftone portrait logo is the only halftone image on the site.
- Image sizes: content images exported at 1600px wide maximum, cards at 800px, served as AVIF with JPEG fallback through Astro's `<Image>` component, which also sets width and height so nothing jumps while loading.
- Every image has alt text written for the specific picture. Decorative texture images use empty alt.

## 7. Motion

None by default. Permitted: colour and underline changes on hover and focus (150ms), the mobile menu drawer sliding in (200ms). Both are removed under `prefers-reduced-motion: reduce`. No parallax, no scroll-triggered reveals, no carousels, no video autoplay, no animated GIFs.

## 8. Accessibility rules

These are part of the brief, not a check at the end. The build meets WCAG 2.2 AA.

- Contrast as in section 2; 4.5:1 text, 3:1 everything else.
- Every page has one H1 and headings in order with no skipped levels.
- Keyboard: every interactive element reachable with Tab in a sensible order; a "Skip to content" link as the first focusable element; focus ring 3px Firoozeh outline with 2px offset on light sections, 3px Saffron on dark, never removed.
- Target size 44 by 44px minimum (WCAG 2.5.8 asks for 24; 44 is the house rule).
- Images: specific alt text; photographer credit in the caption, not the alt.
- Video: captions on every video, uploaded on Vimeo or YouTube; a transcript or description link where there is speech; autoplay off; no sound starts without a click.
- Farsi: `lang="fa" dir="rtl"` on the element, Vazirmatn, and a Latin transliteration or translation beside it so screen readers without a Farsi voice still convey the meaning.
- Forms (contact and newsletter): visible labels above fields, not placeholders alone; errors in text next to the field, not colour alone; the button says what it does ("Send message", "Join the list").
- Language of the page set to `en-GB`.
- Text can be zoomed to 200 per cent without loss; nothing is fixed in px except borders and the logo.
- Reduced motion respected (section 7).
- An Access statement page at `/access` saying what the site does and does not do, how to report a barrier, and when it was last reviewed (step 9 of the plan; does not exist yet).
- Link text says where it goes: "Watch the DUAL trailer", not "click here".

## 9. Where it lives in the build

```
src/styles/tokens.css      all custom properties in sections 2 to 4
src/styles/global.css      resets, base type, themes, focus ring, reduced motion
src/components/            one file per component in section 5
public/fonts/              woff2 files for the four families
public/textures/grain.png  the one texture
design.md                  this file, at the repo root
```

## 10. Still to confirm

- Pomegranate `#9E2A3C`: keep or drop (section 2).
- "Work with me" as the menu label.
- The exact H1 size on a phone, checked on a real device once the first page exists.
- Whether Firoozeh should also be the link colour inside Rose blocks (4.9:1, passes) or links there switch to Ink underlined for more contrast.
