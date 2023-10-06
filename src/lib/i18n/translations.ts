export type Locale = 'en' | 'sk';
export type LocaleTranslations = {
	landingTitle: string;
	landingBody: string;
	landingExplore: string;
};
export type Translations = Map<Locale, LocaleTranslations>;

export const translations: Translations = new Map();
translations.set('en', {
	landingTitle: 'Hello, my name is Dominik Michal',
	landingBody:
		"I'm a hobbyist software engineer living in Slovakia with over four years of experience.",
	landingExplore: 'Explore my projects'
});

translations.set('sk', {
	landingTitle: 'Vitajte, volám sa Dominik Michal',
	landingBody:
		'Som softférový programátor žijúci na Slovensku, programovanie je moje hobby posledné štyry roky.',
	landingExplore: 'Moje projekty'
});
