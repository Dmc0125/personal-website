This is my personal portfolio site.

## Tech Stack

- [Astro](https://astro.build/) with TypeScript
- Tailwind CSS v4 (via Vite plugin)
- Deployed on Vercel

## Getting Started

**Prerequisites:** Node.js >= 22.12.0, [Bun](https://bun.sh/)

```sh
bun install
bun dev       # dev server at localhost:4321
bun build     # production build to ./dist/
bun preview   # preview production build locally
```

## Project Structure

```
src/
├── actions/       # Astro server actions (contact form / sendMail)
├── assets/        # SVG icons
├── components/    # Astro components (Project card)
├── layouts/       # Base HTML layout
├── pages/         # Route pages (index.astro)
└── styles/        # Global CSS + font imports
public/            # Static assets (fonts, images, favicon)
```

## Credits

- Icons:
    - Heroicons: https://heroicons.com
    - untitledui: https://www.untitledui.com
