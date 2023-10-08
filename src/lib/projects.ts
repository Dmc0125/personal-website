import { derived, type Readable } from 'svelte/store';
import { currentTranslations } from './i18n/translator';

export const projectsRepos = [
	'dmc0125/funding-arbitrage',
	'dmc0125/anchor-client-gen-rs',
	'AlgoTrdng/meteora-autocompounder',
	'dmc0125/sveegy',
];

type ProjectContent = {
	title: string;
	body: string;
	tools: string[];
	repository: string;
	image?: string;
	url?: string;
};

export const projects: Readable<ProjectContent[]> = derived(
	currentTranslations,
	($currentTranslations) => {
		return [
			{
				title: $currentTranslations.fundingArbitrageTitle,
				body: $currentTranslations.fundingArbitrageBody,
				tools: ['Rust', 'Solana'],
				repository: `https://github.com/${projectsRepos[0]}`,
			},
			{
				title: 'Anchor-client-gen',
				body: $currentTranslations.anchorClientGenBody,
				tools: ['Rust', 'Anchor'],
				repository: `https://github.com/${projectsRepos[1]}`,
			},
			{
				title: 'Meteora Autocompounder',
				body: $currentTranslations.meteoraBody,
				tools: ['Typescript', 'Nodejs'],
				repository: `https://github.com/${projectsRepos[2]}`,
			},
			{
				title: 'Sveegy',
				body: $currentTranslations.sveegyBody,
				tools: ['Typescript', 'Svelte', 'SvelteKit'],
				repository: `https://github.com/${projectsRepos[3]}`,
				image: '/Capture.png',
				url: 'https://sveegy.vercel.app',
			},
		];
	},
);
