# peyvand.co.uk

Astro static site for Peyvand Sadeghian, hosted on Cloudflare Workers (static assets).

- `design.md` is the design reference. `src/styles/tokens.css` and `src/styles/global.css` follow it.
- Fonts are self-hosted in `public/fonts` (SIL Open Font Licence; licences in `public/fonts/licences`).
- `public/_redirects` maps old Squarespace URLs (Workers static assets read this file).
- Build: `npm run build`, then `npx wrangler deploy` (the Cloudflare default) publishes `dist`. Cloudflare Workers Builds runs both on every push to `main`. `wrangler.jsonc` points at `dist`.
