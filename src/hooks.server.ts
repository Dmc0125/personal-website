import type { Handle } from '@sveltejs/kit';

function getLocale(path: string) {
	if (path.startsWith('/sk')) {
		return 'sk_SK';
	} else if (path.startsWith('/en')) {
		return 'en_EN';
	}
	return null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const locale = getLocale(event.url.pathname);

	if (locale) {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', `lang=${locale}`),
		});
	}

	return resolve(event);
};
