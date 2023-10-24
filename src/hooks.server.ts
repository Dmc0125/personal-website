import type { Handle } from '@sveltejs/kit';

import { getLocaleFromUrl } from '$lib/i18n/translator';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = getLocaleFromUrl(event.url.pathname);

	if (locale) {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', `lang=${locale}`),
		});
	}

	return resolve(event);
};
