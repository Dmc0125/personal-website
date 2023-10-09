<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	import { currentTranslations } from '$lib/i18n/translator';
	import Menu from './menu.svelte';
	import { projects } from '$lib/projects';
	import ContactMe from './contact-me.svelte';
	import type { CommitsTimestampsRes } from './last-commits/+server';
	import CardWithImage from './projects/card-with-image.svelte';
	import Card from './projects/card.svelte';

	let commits: CommitsTimestampsRes = {};

	onMount(async () => {
		try {
			commits = await (await fetch('/last-commits')).json();
		} catch (error) {
			console.log(error);
		}
	});
</script>

<svelte:head>
	<title>Dominik Michal</title>
	<meta
		name="description"
		content="Dominik Michal is a hobbyist software engineer living in Slovakia with over four years of experience."
	/>
	<meta name="image" content="" />
	<meta name="og:title" content="Dominik Michal" />
	<meta name="og:site_name" content="Dominik Michal" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://dominikmichal.com" />
	<meta name="og:image" content="/dominikmichal.png" />
	<meta name="theme-color" content="#7dd3fc" />
	<meta
		name="og:description"
		content="Dominik Michal is a hobbyist software engineer living in Slovakia with over four years of experience."
	/>
</svelte:head>

<Menu />

<section
	id="landing"
	class="py-32 px-4 xl:px-0 sm:grid gap-x-8 xl:gap-x-32 grid-cols-2 w-full xl:max-w-[1200px] sm:w-full sm:max-w-[800px] mx-auto"
>
	<div class="relative">
		<div class="sticky top-12 h-fit">
			<h1 class="text-3xl font-semibold text-slate-950 dark:text-slate-100">
				{$currentTranslations.landingTitle}
			</h1>
			<p class="text-lg mt-4 max-w-xl text-slate-800 dark:text-slate-300">
				{$currentTranslations.landingBody}
			</p>

			<div class="mt-4 text-slate-800 dark:text-slate-300 flex items-center gap-x-4">
				<a
					href="https://github.com/dmc0125"
					target="_blank"
					rel="noopener noreferrer"
					class="w-8 h-8"
					aria-label="Github"
				>
					<svg
						aria-hidden="true"
						class="h-full aspect-square"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M20 5C11.7163 5 5 11.5035 5 19.5248C5 25.9432 9.2975 31.3865 15.2585 33.3067C16.0083 33.4397 16.2821 32.9911 16.2821 32.6081C16.2821 32.2623 16.2683 31.117 16.261 29.9042C12.0898 30.7819 11.2082 28.1914 11.2082 28.1914C10.5252 26.5141 9.54283 26.0673 9.54283 26.0673C8.17962 25.1666 9.64625 25.1844 9.64625 25.1844C11.1523 25.2854 11.9452 26.6808 11.9452 26.6808C13.2837 28.9007 15.4571 28.2588 16.3104 27.8865C16.4468 26.9503 16.8349 26.3085 17.2626 25.9468C13.9328 25.5798 10.43 24.3333 10.43 18.7677C10.43 17.1808 11.015 15.8865 11.9727 14.8697C11.8198 14.5009 11.3034 13.023 12.121 11.0239C12.121 11.0239 13.3789 10.6339 16.2463 12.5133C17.442 12.1897 18.7246 12.0301 20 12.0248C21.2744 12.0301 22.5579 12.1915 23.7555 12.5151C26.6174 10.6339 27.8772 11.0257 27.8772 11.0257C28.6975 13.0266 28.1812 14.5026 28.0273 14.8697C28.9886 15.8865 29.5691 17.1808 29.5691 18.7677C29.5691 24.3475 26.0608 25.5762 22.7191 25.9361C23.2593 26.3865 23.7372 27.2695 23.7372 28.6241C23.7372 30.5656 23.717 32.1312 23.717 32.6099C23.717 32.9964 23.9899 33.4485 24.7498 33.3067C30.7062 31.3829 35 25.9397 35 19.5248C35 11.5035 28.2837 5 20 5Z"
							fill="currentColor"
						/></svg
					>
				</a>
				<a href="mailto:contact@dominikmichal.com" aria-label="Email">
					<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="currentColor"
							d="M4.5 8.5V7.5C4.5 6.94772 4.94772 6.5 5.5 6.5H18.5C19.0523 6.5 19.5 6.94772 19.5 7.5V8.5M4.5 8.5V16.5C4.5 17.0523 4.94772 17.5 5.5 17.5H18.5C19.0523 17.5 19.5 17.0523 19.5 16.5V8.5M4.5 8.5L12 13L19.5 8.5"
						/>
					</svg>
				</a>
				<a
					href="/cv.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-x-2 url-new-page"
				>
					{$currentTranslations.landingViewCV}
					<svg
						class="w-5 h-5 transition-all"
						viewBox="0 0 24 24"
						fill="none"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="currentColor"
							d="M4.5 12L19.5 12M19.5 12L13 5.5M19.5 12L13 18.5"
						/>
					</svg>
				</a>
			</div>
			<a
				href="#projects"
				class="mt-4 w-fit px-4 py-2 bg-sky-300 rounded-md flex items-center justify-center gap-x-2 font-medium text-slate-800"
			>
				{$currentTranslations.landingExplore}
				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke-width="1.5" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="currentColor"
						d="M12 4.5L12 19.5M12 19.5L18.5 13M12 19.5L5.5 13"
					/>
				</svg>
			</a>
		</div>
	</div>

	<div class="mt-16 mb-8 sm:m-0">
		<h1 class="text-xl xl:text-2xl font-semibold mb-4 text-gray-950 dark:text-slate-200">
			{$currentTranslations.aboutMeTitle}
		</h1>

		<div class="flex flex-col gap-4 text-slate-700 dark:text-slate-300">
			{@html $currentTranslations.aboutMeBody}
		</div>
	</div>
</section>

<section
	id="projects"
	class="
		w-full xl:max-w-[1200px] sm:w-[600px] xl:w-full mx-auto sm:mt-12 px-4 sm:px-0 grid
		gap-10 xl:grid-cols-[repeat(2,1fr)] xl:grid-rows-[repeat(auto-fill,min-content)] xl:gap-y-24
	"
>
	<h1
		class="text-2xl xl:text-3xl font-semibold mb-8 xl:mb-0 text-gray-950 dark:text-slate-200 xl:col-[1/3]"
	>
		{$currentTranslations.projectsTitle}
	</h1>

	{#each $projects as { title, body, repository, tools, image, url, id }, i}
		{#if image && url}
			<CardWithImage
				{...{ title, body, repository, tools, url }}
				imageUrl={image}
				lastCommit={commits[id]}
			/>
		{:else}
			<Card {...{ title, body, repository, tools }} lastCommit={commits[id]} />
		{/if}
	{/each}
</section>

<ContactMe />

<footer
	class="w-full mt-16 sm:mt-32 py-4 text-center font-medium text-sm text-slate-600 dark:text-slate-500"
>
	&#169; 2023 Dominik Michal &bull; Built with <a
		href="https://tailwindcss.com"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-sky-600 url">TailwindCSS</a
	>
	and
	<a
		href="https://kit.svelte.dev"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:text-red-600 url">SvelteKit</a
	>
</footer>

<style lang="postcss">
	@font-face {
		src: url('/RedHatDisplay-VariableFont_wght.ttf');
		font-weight: 100 1000;
		font-family: 'RedHatDisplay';
	}

	:global(html, body) {
		scroll-behavior: smooth;
	}

	:global(*) {
		font-family: 'RedHatDisplay';
	}

	:global(*:focus) {
		outline: none;
		@apply ring-2 ring-blue-600;
	}

	:global(.svelte) {
		@apply bg-red-400/30 text-red-600;
	}

	:global(.dark .svelte) {
		@apply bg-red-600/70 text-red-300;
	}

	:global(.sveltekit) {
		@apply bg-red-400/30 text-red-600;
	}

	:global(.dark .sveltekit) {
		@apply bg-red-600/70 text-red-300;
	}

	:global(.rust) {
		@apply bg-amber-800/30 text-amber-700;
	}

	:global(.dark .rust) {
		@apply bg-amber-700/70 text-amber-300;
	}

	:global(.anchor) {
		@apply bg-sky-600/30 text-sky-800;
	}

	:global(.dark .anchor) {
		@apply bg-sky-600/70 text-sky-300;
	}

	:global(.typescript) {
		@apply bg-blue-400/50 text-blue-600;
	}

	:global(.dark .typescript) {
		@apply bg-blue-600/60 text-blue-300;
	}

	:global(.nodejs) {
		@apply bg-green-600/30 text-green-700;
	}

	:global(.dark .nodejs) {
		@apply bg-green-400/30 text-green-300;
	}

	:global(.solana) {
		@apply bg-gradient-to-r from-indigo-800/30 to-green-500/30 text-indigo-800;
	}

	:global(.dark .solana) {
		@apply bg-gradient-to-r from-indigo-400/60 to-green-300/60 text-indigo-950;
	}
</style>
