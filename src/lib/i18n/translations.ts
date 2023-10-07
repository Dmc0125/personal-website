export type Locale = 'en' | 'sk';
export type LocaleTranslations = {
	landingTitle: string;
	landingBody: string;
	landingExplore: string;

	projectsTitle: string;

	fundingArbitrageTitle: string;
	fundingArbitrageBody: string;

	anchorClientGenTitle: string;
	anchorClientGenBody: string;

	meteoraTitle: string;
	meteoraBody: string;

	sveegyBody: string;

	contactMeTitle: string;
	contactMeName: string;
	contactMeMessage: string;
};
export type Translations = Map<Locale, LocaleTranslations>;

export const translations: Translations = new Map();
translations.set('en', {
	landingTitle: 'Hello, my name is Dominik',
	landingBody:
		"I'm a hobbyist software engineer living in Slovakia with over four years of experience.",
	landingExplore: 'Explore my projects',

	projectsTitle: 'My projects',

	fundingArbitrageTitle: 'Funding Arbitrage Bot',
	fundingArbitrageBody: `
		This is a project that I'm currently working on, an arbitrage bot that captures differences between funding rates
		on two derivatives futures markets on on-chain exchanges on Solana blockchain - Mango Markets and Drift.
	`,

	anchorClientGenTitle: 'Anchor-client-gen',
	anchorClientGenBody: `Anchor client gen is a rust based tool for generating
		SDK packages from Anchor IDL. This project
		was largely inspired by existing anchor-gen tool,
		but supports more recent versions and features of Anchor.
	`,

	meteoraTitle: 'Meteora autocompounder bot',
	meteoraBody: `
		Meteora autocompounder is a bot, that
		connects to Solana blockchain, specifically Meteora
		application and based on specified time interval
		collects and reinvests rewards earned from providing
		liquidity in said app.
	`,

	sveegyBody: `
		Sveegy is a set of open-source svg icons set
		with MIT license. Icons are usable immediately
		without the need of installing anything. Just
		copy the svg code and paste it into your project.
	`,

	contactMeTitle: 'Contact me',
	contactMeName: 'Name',
	contactMeMessage: 'Message',
});

translations.set('sk', {
	landingTitle: 'Vitajte, volám sa Dominik',
	landingBody:
		'Som softfvérový programátor žijúci na Slovensku, programovanie je moje hobby posledné štyry roky.',
	landingExplore: 'Moje projekty',

	projectsTitle: 'Moje projekty',

	fundingArbitrageTitle: 'Funding Arbitráž Bot',
	fundingArbitrageBody: `
		Na tomto projekte práve pracujem, arbitráž bot, ktorý zachytáva rozdiely medzi mierami na dvoch derivátových futures
		trhoch na burzách Mango Markets a Drift na blockchaine Solana.
	`,

	anchorClientGenTitle: 'Anchor-client-gen',
	anchorClientGenBody: `
		Anchor client gen je nástroj na generovanie SDK balíkov pomocou Anchor IDL.
		Tento projekt bol značne inšpirovaný existujúcim nástrojom anchor-gen,
		ale podporuje novšie verzie Anchor.
	`,

	meteoraTitle: 'Meteora Autocompounder Bot',
	meteoraBody: `
		Meteora Autocompounder je bot, ktorý
		sa pripája k blockchainu Solana, konkrétne Meteora
		aplikácii a na základe špecifikovaného časového intervalu
		zbiera a reinvestuje odmeny získané z poskytovania
		likvidity v uvedenej aplikácii.
	`,

	sveegyBody: `
		Sveegy je sada open-source ikon svg
		s licenciou MIT. Ikony sú okamžite použiteľné
		bez nutnosti čokoľvek inštalovať. Len
		skopírujete svg kód a vložíte ho do svojho projektu.
	`,

	contactMeTitle: 'Kotaktujte ma',
	contactMeName: 'Meno',
	contactMeMessage: 'Správa',
});
