import type { Handle } from '@sveltejs/kit';

import type { Locale } from '$lib/i18n/translations';

export function getLocaleFromUrl(path: string): Locale | null {
	if (path.startsWith('/sk')) {
		return 'sk_SK';
	} else if (path.startsWith('/en')) {
		return 'en_EN';
	}
	return null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const locale = getLocaleFromUrl(event.url.pathname);

	if (locale) {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', `lang=${locale}`),
		});
	}

	return resolve(event);
};
