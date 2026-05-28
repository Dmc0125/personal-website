# personal-website

Personal portfolio site for Dominik Michal.

## About

A single-page portfolio with sections for an intro, about me, projects, open source contributions, and a contact form. The contributions section pulls live PR data from the GitHub API. The contact form sends email via Gmail/Nodemailer and is rate-limited using Upstash Redis.

## Features

- **Bilingual** — English and Slovak
- **Contact form** — Sends email via Gmail SMTP with per-IP rate limiting (3 requests/hour via Upstash Redis)
- **Open source contributions** — Fetches and displays PRs authored on GitHub at build/request time
- **Canvas mouse animation** — Particle effect following the cursor (respects `prefers-reduced-motion`, toggleable)
- **Sticky nav** with blur-on-scroll, responsive mobile hamburger menu

## Tech Stack

- [Astro](https://astro.build/) v6 with TypeScript — SSR mode via Cloudflare adapter
- Tailwind CSS v4 (via Vite plugin)
- Nodemailer — email sending
- Upstash Redis + `@upstash/ratelimit` — rate limiting
- Deployed on Cloudflare (Workers/Pages via `wrangler`)

## Getting Started

**Prerequisites:** Node.js >= 22.12.0, [Bun](https://bun.sh/)

```sh
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
GMAIL_PASSWORD=
EMAIL_USER=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
GITHUB_ACCESS_TOKEN=
```

| Variable | Description |
|---|---|
| `EMAIL_USER` | Gmail address used to send and receive contact form emails |
| `GMAIL_PASSWORD` | Gmail app password |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `GITHUB_ACCESS_TOKEN` | GitHub personal access token (for fetching PRs) |

### Running

```sh
bun dev       # dev server at localhost:4321
bun build     # production build to ./dist/
bun preview   # preview production build locally
```

## Project Structure

```
src/
├── actions/
│   ├── index.ts          # Astro server action: sendMail (contact form handler)
│   └── redis.ts          # Upstash Redis client + rate limiter
├── content/
│   ├── content.ts        # All UI strings in EN and SK
│   └── links.ts          # Social/contact links
├── components/
│   ├── Home.astro        # Main page layout with all sections + canvas animation
│   ├── Header.astro      # Desktop + mobile sticky nav
│   ├── Project.astro     # Project card (name, description, tech tags, image/video)
│   ├── Contributions.astro # Fetches and renders GitHub PRs
│   └── Icon.astro        # SVG sprite icon wrapper
├── layouts/
│   └── Layout.astro      # Base HTML shell (meta, fonts, body)
├── pages/
│   ├── index.astro       # Slovak route (default)
│   └── en/index.astro    # English route
└── styles/
    └── global.css        # Tailwind import + Inter font-face declarations
public/                   # Static assets: fonts, images, favicon, icons.svg sprite
`
