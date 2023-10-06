import { derived, type Readable } from 'svelte/store';
import { currentTranslations } from './i18n/translator';

type ProjectContent = {
	title: string;
	body: string;
	tools: string[];
	repository: string;
};

export const projects: Readable<ProjectContent[]> = derived(
	currentTranslations,
	($currentTranslations) => {
		return [
			{
				title: $currentTranslations.fundingArbitrageTitle,
				body: $currentTranslations.fundingArbitrageBody,
				tools: ['Rust', 'Solana'],
				repository: 'https://github.com/dmc0125/funding-arbitrage',
			},
			{
				title: $currentTranslations.anchorClientGenTitle,
				body: $currentTranslations.anchorClientGenBody,
				tools: ['Rust', 'Anchor'],
				repository: 'https://github.com/dmc0125/anchor-client-gen-rs',
			},
			{
				title: $currentTranslations.meteoraTitle,
				body: $currentTranslations.meteoraBody,
				tools: ['Typescript', 'Nodejs'],
				repository: 'https://github.com/AlgoTrdng/meteora-autocompounder',
			},
			{
				title: 'Sveegy',
				body: $currentTranslations.sveegyBody,
				tools: ['Typescript', 'Svelte', 'SvelteKit'],
				repository: 'https://github.com/dmc0125/sveegy',
			},
		];
	},
);
