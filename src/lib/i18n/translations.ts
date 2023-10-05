export type Locale = 'en' | 'sk';
export type LocaleTranslations = {
	title: string;
	welcome: string;
};
export type Translations = Map<Locale, LocaleTranslations>;

export const translations: Translations = new Map();

translations.set('en', {
	title: 'Hello',
	welcome: 'my name is Dominik Michal'
});

translations.set('sk', {
	title: 'Vitajte',
	welcome: 'volám sa Dominik Michal'
});
