import { derived, writable, type Readable } from 'svelte/store';
import { page } from '$app/stores';

import { translations, type Locale, type LocaleTranslations } from './translations';
import { browser } from '$app/environment';

export const locale = writable<Locale>('en_EN');

export function getLocaleFromUrl(path: string): Locale | null {
	if (path.startsWith('/sk')) {
		return 'sk_SK';
	} else if (path.startsWith('/en')) {
		return 'en_EN';
	}
	return null;
}

if (browser) {
	page.subscribe(($page) => {
		if ($page.url) {
			const l = getLocaleFromUrl($page.url.pathname);
			if (l) {
				locale.set(l);
			}
		}
	});
}

export const currentTranslations: Readable<LocaleTranslations> = derived(locale, ($locale) => {
	// No need to type check
	// Translations are static
	return translations.get($locale)!;
});
