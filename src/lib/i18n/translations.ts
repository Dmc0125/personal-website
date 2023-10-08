export type Locale = 'en' | 'sk';
export type LocaleTranslations = {
	landingTitle: string;
	landingBody: string;
	landingExplore: string;
	landingViewCV: string;

	aboutMeTitle: string;
	aboutMeBody: string;

	projectsTitle: string;

	fundingArbitrageTitle: string;
	fundingArbitrageBody: string;

	anchorClientGenBody: string;
	meteoraBody: string;
	sveegyBody: string;

	contactMeTitle: string;
	contactMeName: string;
	contactMeMessage: string;
	contactMeSend: string;

	commit: string;
	months: string[];
};
export type Translations = Map<Locale, LocaleTranslations>;

const createAnchorTag = (body: string, className: string, url: string) => {
	return `
		<a href="${url}" class="${className} url" target="_blank" rel="noopener noreferrer">
			${body}
		</a>
	`;
};

const mangoMarketsTag = createAnchorTag('Mango Markets', 'mango-markets', 'https://mango.markets/');
const driftTag = createAnchorTag('Drift', 'drift', 'https://www.drift.trade/#');
const anchorTag = createAnchorTag('Anchor', 'anchor-url', 'https://www.anchor-lang.com/');
const meteoraTag = createAnchorTag('Meteora', 'meteora', 'https://www.meteora.ag/');

export const translations: Translations = new Map();
translations.set('en', {
	landingTitle: 'Hello, my name is Dominik',
	landingBody:
		"I'm a hobbyist software engineer living in Slovakia with over four years of experience.",
	landingExplore: 'Explore my projects',
	landingViewCV: 'View CV',

	aboutMeTitle: 'About me',
	aboutMeBody: `
		<p>
			My journey into programming began in 2018 during high school.
			Initially, I wasn't very interested as we were working on basic websites
			with minimal HTML and CSS using Notepad as our code editor.
		</p>
		<p>
			However, things changed when we had a project to create a website about something we liked.
			I discovered my passion for coding when I used proper tools, learned HTML and CSS,
			and created my first website for the assignment. That's when I realized my talent for it.
		</p>
		<p>
			I started learning, starting with HTML and CSS, then delving into JavaScript, Typescript,
			and exploring frameworks like VueJS and Svelte. I eventually built my first project, a snake game.
			Later, I got intrigued by blockchain technology, especially Solana. To automate tasks,
			I began creating bots using Node.js initially, but then I learned Rust for Solana development.
			After a few weeks, I successfully deployed a simple program and now focus on building a bot using this technology.
		</p>
		<p>
			I'm passionate about expanding my skills and exploring the possibilities of technology.
			I'm always eager to take on new challenges.
		</p>
	`,

	projectsTitle: 'My projects',

	fundingArbitrageTitle: 'Funding Arbitrage Bot',
	fundingArbitrageBody: `
		I'm currently working on this project, an arbitrage bot that captures differences between funding rates
		on two derivatives futures markets - ${mangoMarketsTag} and ${driftTag}.
	`,

	anchorClientGenBody: `
		Rust tool for generating
		SDK packages from ${anchorTag} IDL. This project
		was largely inspired by existing anchor-gen tool,
		but supports more recent versions and features of Anchor.
	`,

	meteoraBody: `
		A bot that automatically collects rewards earned from providing liquidity to
		${meteoraTag} pools based on specified time interval. All the collected rewards are
		then reinvested again to the pool.
	`,

	sveegyBody: `
		Sveegy is a set of open-source svg icons set
		with MIT license. Icons are usable immediately
		without the need of installing anything.
	`,

	contactMeTitle: 'Contact me',
	contactMeName: 'Name',
	contactMeMessage: 'Message',
	contactMeSend: 'Send',

	commit: 'Last commit on',
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
});

translations.set('sk', {
	landingTitle: 'Vitajte, volám sa Dominik',
	landingBody:
		'Som softfvérový programátor žijúci na Slovensku, programovanie je moje hobby posledné štyry roky.',
	landingExplore: 'Moje projekty',
	landingViewCV: 'Pozrieť CV',

	aboutMeTitle: 'O mne',
	aboutMeBody: `
		<p>
			Moja cesta k programovaniu sa začala v roku 2018 počas strednej školy.
			Spočiatku ma to veľmi nezaujímalo, pretože sme pracovali na základných webových stránkach
			s minimálnym používaním HTML a CSS a ako editor sme používali Notepad.
		</p>
		<p>
			Veci sa však zmenili, keď sme dostali vytvoriť webovú stránku o niečom, čo máme radi.
			Pri používaní správnych nástrojov som zistil, že programovanie ma baví, naučil som sa HTML a CSS,
			a vytvoril som svoju prvú webovú stránku pre túto úlohu..
		</p>
		<p>
			Začal som sa učiť, spočiatku HTML a CSS, potom som sa ponoril do JavaScriptu, Typescriptu a do frameworkov
			ako VueJS a Svelte. Nakoniec som vytvoril svoj prvý projekt, hru hada. Neskôr ma zaujala technológia blockchain,
			najmä Solana. Aby som automatizoval úlohy, začal som spočiatku vytvárať botov pomocou Node.js, ale kvôli tomu, že
			Solana používa Rust na vytváranie programov, začal som sa učiť Rust. Po niekoľkých týždňoch som úspešne vytvoril
			jednoduchý program a momentálne pracujem na vytvorení bota, ktorý využíva tento program.
		</p>
		<p>
			Baví ma rozširovať svoje zručnosti a objavovať možnosti technológií. Vždy sa teším na nové výzvy.
		</p>
	`,

	projectsTitle: 'Moje projekty',

	fundingArbitrageTitle: 'Funding Arbitráž Bot',
	fundingArbitrageBody: `
		Na tomto projekte práve pracujem, arbitráž bot, ktorý zachytáva rozdiely medzi mierami na dvoch derivátových futures
		burzách - ${mangoMarketsTag} a ${driftTag}.
	`,

	anchorClientGenBody: `
		Nástroj na generovanie SDK balíkov pomocou ${anchorTag} IDL.
		Tento projekt bol značne inšpirovaný existujúcim nástrojom anchor-gen,
		ale podporuje novšie verzie Anchor.
	`,

	meteoraBody: `
		Meteora Autocompounder je bot, ktorý
		sa pripája k blockchainu Solana, konkrétne ${meteoraTag}
		aplikácii a na základe špecifikovaného časového intervalu
		zbiera a reinvestuje odmeny získané z poskytovania
		likvidity v uvedenej aplikácii.
	`,

	sveegyBody: `
		Sveegy je sada open-source ikon svg
		s licenciou MIT. Ikony sú okamžite použiteľné
		bez nutnosti čokoľvek inštalovať.
	`,

	contactMeTitle: 'Kotaktujte ma',
	contactMeName: 'Meno',
	contactMeMessage: 'Správa',
	contactMeSend: 'Odoslať',

	commit: 'Posledný commit -',
	months: [
		'január',
		'február',
		'marec',
		'apríl',
		'máj',
		'jún',
		'júl',
		'august',
		'september',
		'október',
		'november',
		'december',
	],
});
