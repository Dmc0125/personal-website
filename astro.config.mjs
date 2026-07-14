// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: "https://dmnk.app",
    integrations: [sitemap()],
    adapter: cloudflare(),
    output: "server",
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
            UPSTASH_REDIS_REST_URL: envField.string({ context: "server", access: "secret" }),
            UPSTASH_REDIS_REST_TOKEN: envField.string({ context: "server", access: "secret" }),
            GITHUB_ACCESS_TOKEN: envField.string({ context: "server", access: "secret" }),
        },
    },
});
