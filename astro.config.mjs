// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel(),
    i18n: {
        locales: ["en", "sk"],
        defaultLocale: "sk",
        routing: {
            prefixDefaultLocale: true,
        },
    },
    env: {
        schema: {
            GMAIL_PASSWORD: envField.string({ context: "server", access: "secret" }),
            EMAIL_USER: envField.string({ context: "server", access: "secret" }),
        },
    },
});
