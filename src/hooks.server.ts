import type { Handle } from '@sveltejs/kit';

export function getLangFromUrl(path: string): string | null {
	if (path.startsWith('/sk')) {
		return 'sk';
	} else if (path.startsWith('/en')) {
		return 'en';
	}
	return null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const lang = getLangFromUrl(event.url.pathname);

	if (lang) {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', `lang=${lang}`),
		});
	}

	return resolve(event);
};
