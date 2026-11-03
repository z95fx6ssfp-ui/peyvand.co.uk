# peyvand.co.uk

Astro static site for Peyvand Sadeghian, hosted on Cloudflare Pages.

- `design.md` is the design reference. `src/styles/tokens.css` and `src/styles/global.css` follow it.
- Fonts are self-hosted in `public/fonts` (SIL Open Font Licence; licences in `public/fonts/licences`).
- `public/_redirects` maps old Squarespace URLs.
- Build: `npm run build`, output `dist`. Cloudflare Pages builds on every push to `main`.
