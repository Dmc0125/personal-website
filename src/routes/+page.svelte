<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	import { currentTranslations } from '$lib/i18n/translator';
	import Menu from './menu.svelte';
	import { projects } from '$lib/projects';
	import ContactMe from './contact-me.svelte';
	import type { CommitDates } from './last-commits/+server';
	import CardWithImage from './projects/card-with-image.svelte';
	import Card from './projects/card.svelte';

	let commits: CommitDates = {};

	onMount(async () => {
		try {
			commits = await (await fetch('/last-commits')).json();
		} catch (error) {
			console.log(error);
		}
	});
</script>

<Menu />

<section
	id="landing"
	class="w-full px-4 md:px-0 md:w-1/3 mx-auto h-screen flex align-middle justify-center flex-col"
>
	<h1 class="text-3xl font-semibold text-center text-gray-950">
		{$currentTranslations.landingTitle}
	</h1>
	<p class="text-xl font-normal mt-4 max-w-xl text-center text-gray-900">
		{$currentTranslations.landingBody}
	</p>
	<a
		href="#projects"
		class="w-60 h-12 mt-6 mx-auto px-4 flex items-center justify-center gap-x-2 bg-blue-600 text-slate-300 rounded-md"
	>
		{$currentTranslations.landingExplore}
		<span class="h-fit">
			<svg class="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none">
				<path
					stroke-width=".95"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="currentColor"
					d="M12 4.5L12 19.5M12 19.5L18.5 13M12 19.5L5.5 13"
				/>
			</svg>
		</span>
	</a>
</section>

<section
	id="projects"
	class="
		w-full xl:max-w-[1200px] sm:w-[600px] xl:w-full mx-auto px-4 sm:px-0 grid
		gap-10 xl:grid-cols-[repeat(2,1fr)] xl:grid-rows-[repeat(auto-fill,min-content)] xl:gap-y-24
	"
>
	<h1 class="text-2xl xl:text-3xl font-semibold mb-8 xl:mb-0 text-gray-950 xl:col-[1/3]">
		{$currentTranslations.projectsTitle}
	</h1>

	{#each $projects as { title, body, repository, tools, image, url }, i}
		{#if image && url}
			<CardWithImage
				{...{ title, body, repository, tools, url }}
				imageUrl={image}
				lastCommit={commits[i]}
			/>
		{:else}
			<Card {...{ title, body, repository, tools }} lastCommit={commits[i]} />
		{/if}
	{/each}
</section>

<ContactMe />

<footer class="w-full mt-32 py-4 text-center font-medium text-sm text-slate-600">
	&#169; 2023 Dominik Michal
</footer>

<style lang="postcss">
	:global(.svelte) {
		@apply bg-red-400/30 text-red-600;
	}

	:global(.sveltekit) {
		@apply bg-red-400/30 text-red-600;
	}

	:global(.rust) {
		@apply bg-amber-700/30 text-amber-900;
	}

	:global(.anchor) {
		@apply bg-sky-600/30 text-sky-800;
	}

	:global(.typescript) {
		@apply bg-blue-400/50 text-blue-700;
	}

	:global(.nodejs) {
		@apply bg-green-600/30 text-green-700;
	}

	:global(.solana) {
		@apply bg-gradient-to-r from-indigo-800/30 to-green-500/30 text-indigo-800;
	}
</style>
