# How to add or change a Work entry

The master list of projects lives in Notion, in the database "Website: Work" (https://app.notion.com/p/5b102617b3e54cb7b5340c464558a82e). One page per project, with the photo, the tags and the page text. Set a page's Website property to "Ready to publish" and tell Claude "sync the website": Claude reads the Notion pages, writes the files in `src/content/work/`, copies the images into `src/assets/work/`, pushes, and marks the page Published. The Notion page "Website content: how it works" has the full routine.

The files in this repo are generated from Notion. Editing them directly still works, but the next sync overwrites them, so put the change in Notion instead.

## Other ways in, for when Notion is not to hand

1. **Send the material to Claude in Cowork.** Paste text, a programme note, a press release, a voice-note transcript, links, and attach the photo. Say which project it is. Claude fills in the template, shows you the page, commits and pushes. Best for new entries.

2. **Edit on github.com from your phone.** Open the repo, go to `src/content/work/`, tap the file, tap the pencil, change the text, tap "Commit changes". Good for fixing a typo or a date. Photos: in `src/assets/work/`, tap "Add file" then "Upload files", then name the file in the entry's `image:` line.

3. **Fill in a copy of the template yourself.** `src/content/work/_template.md` has every field explained. Copy it, rename it, fill it in, send it or commit it.

## Rules the build enforces

- Tags must be spelled exactly as in the lists in the template. A misspelled tag stops the build (you will get an email from Cloudflare saying the deploy failed; tell Claude and it is a one-word fix).
- `summary` must be 200 characters or fewer.
- The file name becomes the web address: `toto-kerblammo.md` is `/work/toto-kerblammo/`. Lower case, hyphens, no spaces.
- `imageAlt` is the description a screen reader gives instead of the picture. One sentence. Leave it empty ("") only while the placeholder is in use.

## Threads, lenses and tags (added 9 Nov 2026)

- **Tags** are links everywhere. Tapping one on a card or an entry page opens the Work page filtered to that tag; tapping one on the Work page toggles it. The web address carries the filters, so a filtered view can be sent to someone (e.g. `/work/?medium=puppetry`).
- **Threads** are the recurring questions that run across the work. Each is a file in `src/content/threads/` (copy `_template.md` there), with a short first-person text as the body. An entry joins a thread by listing the thread's file name under `thread:` (two at most). Threads have their own pages at `/work/threads/`.
- **Lenses** are ways in for different visitors: Casting, Programmers, Funders, Press. They are defined once in `src/content.config.ts` (`LENSES`) and need no work per entry beyond correct tags, `producedByNist` and `funders`. Send a lens as a link: `/work/?lens=casting`.
- **Studio**: `/studio` is a private status page listing every entry's gaps (no image, no quotes, no thread and so on). Nothing is edited there; it points back to Notion.

## What goes where

- Artistic output (shows, roles, films, installations, writing, commissions) goes in Work.
- Workshops, teaching, talks and facilitation do not go in Work. They are offers on the Work with me page.
