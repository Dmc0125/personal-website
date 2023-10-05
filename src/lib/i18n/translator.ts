import { derived, writable, type Readable } from 'svelte/store';

import { translations, type Locale, type LocaleTranslations } from './translations';

export const locale = writable<Locale>('en');
export const currentTranslations: Readable<LocaleTranslations> = derived(locale, ($locale) => {
	// No need to type check
	// Translations are static
	return translations.get($locale)!;
});
