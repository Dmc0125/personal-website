// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: cloudflare(),
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
        },
    },
});
