import { derived, type Readable } from 'svelte/store';
import { currentTranslations } from './i18n/translator';

export const projectsRepos: { owner: string; repo: string }[] = [
	{ owner: 'dmc0125', repo: 'funding-arbitrage' },
	{ owner: 'dmc0125', repo: 'anchor-client-gen-rs' },
	{ owner: 'AlgoTrdng', repo: 'meteora-autocompounder' },
	{ owner: 'dmc0125', repo: 'sveegy' },
];

type ProjectContent = {
	id: string;
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
				id: `${projectsRepos[0].owner}-${projectsRepos[0].repo}`,
				repository: `https://github.com/${projectsRepos[0].owner}/${projectsRepos[0].repo}`,
			},
			{
				title: 'Anchor-client-gen',
				body: $currentTranslations.anchorClientGenBody,
				tools: ['Rust', 'Anchor'],
				id: `${projectsRepos[1].owner}-${projectsRepos[1].repo}`,
				repository: `https://github.com/${projectsRepos[1].owner}/${projectsRepos[1].repo}`,
			},
			{
				title: 'Meteora Autocompounder',
				body: $currentTranslations.meteoraBody,
				tools: ['Typescript', 'Nodejs'],
				id: `${projectsRepos[2].owner}-${projectsRepos[2].repo}`,
				repository: `https://github.com/${projectsRepos[2].owner}/${projectsRepos[2].repo}`,
			},
			{
				title: 'Sveegy',
				body: $currentTranslations.sveegyBody,
				tools: ['Typescript', 'Svelte', 'SvelteKit'],
				id: `${projectsRepos[3].owner}-${projectsRepos[3].repo}`,
				repository: `https://github.com/${projectsRepos[3].owner}/${projectsRepos[3].repo}`,
				image: '/sveegy.png',
				url: 'https://sveegy.vercel.app',
			},
		];
	},
);
