export type Locale = 'en_EN' | 'sk_SK';

type PageSection = {
	url?: string;
	urlWithHash: string;
	name: string;
};

export type LocaleTranslations = {
	sections: PageSection[];

	landingTitle: string;
	landingBody: string;
	landingExplore: string;
	landingViewCV: string;

	aboutMeTitle: string;
	aboutMeBody: string;

	projectsTitle: string;

	contactMeTitle: string;
	contactMeName: string;
	contactMeSurname: string;
	contactMeMessage: string;
	contactMeSend: string;

	tooLongErrorIt: string;
	tooShortErrorIt: string;
	tooLongErrorMessage: string;
	tooShortErrorMessage: string;
	invalidEmailError: string;
	sendEmailSuccess: string;
	sendEmailError: string;

	commit: string;
	months: string[];

	footer: string;
};
export type Translations = Map<Locale, LocaleTranslations>;

export const translations: Translations = new Map();
translations.set('en_EN', {
	sections: [
		{ urlWithHash: '/en#home', name: 'Home', url: '/en' },
		{ urlWithHash: '/en#about-me', name: 'About me' },
		{ urlWithHash: '/en#projects', name: 'Projects' },
		{ urlWithHash: '/en#contact', name: 'Contact' },
	],
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
			However, things changed when we had a project assigned to create a website about something we liked.
			I discovered my passion for coding when I used proper tools, learned HTML and CSS,
			and created my first website for the assignment. That's when I realized I had a knack for it.
		</p>
		<p>
			I started learning, starting with HTML and CSS, then delving into JavaScript, Typescript,
			and exploring frameworks like VueJS and Svelte. I eventually built my first project, a snake game.
			Later, I got intrigued by blockchain technology, especially Solana. To automate tasks I was doing with blockchains,
			I began working on bots using Node.js initially, but later I started learning Rust for Solana development.
			After a few weeks, I successfully deployed a simple program and now focus on building a bot using this technology.
		</p>
		<p>
			I'm passionate about expanding my skills and exploring the possibilities of technology.
			I'm always eager to take on new challenges.
		</p>
	`,

	projectsTitle: 'My projects',

	contactMeTitle: 'Contact me',
	contactMeName: 'Name',
	contactMeSurname: 'Surname',
	contactMeMessage: 'Message',
	contactMeSend: 'Send',

	tooLongErrorIt: 'is too long.',
	tooShortErrorIt: 'is too short.',
	tooLongErrorMessage: 'Message is too long.',
	tooShortErrorMessage: 'Message is too short.',
	invalidEmailError: 'Email is invalid.',
	sendEmailError: 'Unable to send email.',
	sendEmailSuccess: 'Email sent successfully.',

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

	footer: `
	Built with <a
		href="https://tailwindcss.com"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-sky-600 url">TailwindCSS</a
	> and <a
		href="https://kit.svelte.dev"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-red-600 url">SvelteKit</a>
	`,
});

translations.set('sk_SK', {
	sections: [
		{ urlWithHash: '/sk#home', name: 'Domov', url: '/sk' },
		{ urlWithHash: '/sk#about-me', name: 'O mne' },
		{ urlWithHash: '/sk#projects', name: 'Projekty' },
		{ urlWithHash: '/sk#contact', name: 'Kontakt' },
	],

	landingTitle: 'Vitajte, volám sa Dominik',
	landingBody:
		'Som softvérový programátor žijúci na Slovensku, programovanie je moje hobby posledné štyry roky.',
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
			najmä Solana. Aby som automatizoval úlohy, začal som pracovať na botoch spočiatku pomocou Node.js, ale kvôli tomu, že
			Solana používa Rust na vytváranie programov som sa začal učiť Rust. Po niekoľkých týždňoch som úspešne vytvoril
			jednoduchý program a momentálne pracujem na vytvorení bota, ktorý využíva tento program.
		</p>
		<p>
			Baví ma rozširovať svoje zručnosti a objavovať možnosti technológií. Vždy sa teším na nové výzvy.
		</p>
	`,

	projectsTitle: 'Moje projekty',

	contactMeTitle: 'Kotaktujte ma',
	contactMeName: 'Meno',
	contactMeSurname: 'Priezvisko',
	contactMeMessage: 'Správa',
	contactMeSend: 'Odoslať',

	tooLongErrorIt: 'príliš dlhé.',
	tooShortErrorIt: 'príliš krátke.',
	tooLongErrorMessage: 'Správa je príliš dlhá.',
	tooShortErrorMessage: 'Správa je príliš krátká.',
	invalidEmailError: 'Email je neplatný',
	sendEmailError: 'Email sa nepodarilo odoslať.',
	sendEmailSuccess: 'Email bol úspešne odoslaný.',

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

	footer: `Vytvorené pomocou <a
		href="https://tailwindcss.com"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-sky-600 url">TailwindCSS</a
	> a <a
		href="https://kit.svelte.dev"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-red-600 url">SvelteKit</a>
	`,
});
