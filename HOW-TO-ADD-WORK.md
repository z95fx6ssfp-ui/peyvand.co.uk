# How to add or change a Work entry

Every project on the Work page is one text file in `src/content/work/`. Change the file and the site rebuilds itself within a few minutes of the change reaching GitHub.

## Three ways to do it, pick whichever suits the moment

1. **Send the material to Claude in Cowork.** Paste text, a programme note, a press release, a voice-note transcript, links, and attach the photo. Say which project it is. Claude fills in the template, shows you the page, commits and pushes. Best for new entries.

2. **Edit on github.com from your phone.** Open the repo, go to `src/content/work/`, tap the file, tap the pencil, change the text, tap "Commit changes". Good for fixing a typo or a date. Photos: in `src/assets/work/`, tap "Add file" then "Upload files", then name the file in the entry's `image:` line.

3. **Fill in a copy of the template yourself.** `src/content/work/_template.md` has every field explained. Copy it, rename it, fill it in, send it or commit it.

## Rules the build enforces

- Tags must be spelled exactly as in the lists in the template. A misspelled tag stops the build (you will get an email from Cloudflare saying the deploy failed; tell Claude and it is a one-word fix).
- `summary` must be 200 characters or fewer.
- The file name becomes the web address: `toto-kerblammo.md` is `/work/toto-kerblammo/`. Lower case, hyphens, no spaces.
- `imageAlt` is the description a screen reader gives instead of the picture. One sentence. Leave it empty ("") only while the placeholder is in use.

## What goes where

- Artistic output (shows, roles, films, installations, writing, commissions) goes in Work.
- Workshops, teaching, talks and facilitation do not go in Work. They are offers on the Work with me page.
