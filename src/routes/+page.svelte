<script lang="ts">
	import '../app.css';
	import { currentTranslations } from '$lib/i18n/translator';
	import Menu from './menu.svelte';
	import { projects } from '$lib/projects';
	import ContactMe from './contact-me.svelte';
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
		class="w-60 h-12 mt-6 mx-auto px-4 flex items-center justify-center gap-x-2 bg-gray-700 text-slate-300 rounded-md"
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

<section id="projects" class="w-full px-4">
	<h1 class="text-2xl font-semibold mb-16 text-gray-950">{$currentTranslations.projectsTitle}</h1>

	{#each $projects as { title, body, repository, tools }}
		<section class="grid md:grid-cols-2 mb-24 last:mb-0">
			<div class="w-full h-40 bg-gray-400 rounded-md shadow-xl">
				<header class="flex px-2 mt-2 items-center justify-between">
					<h2 class="font-medium text-lg text-gray-900">
						{title}
					</h2>
					<a href={repository} class="block ml-auto" target="_blank" rel="noopener noreferrer">
						<img class="w-8 h-8" src="/github-mark.png" alt="Funding arbitrage repository" />
					</a>
				</header>
			</div>

			<div class="mt-4 flex gap-x-2 items-center text-slate-600 border-separate">
				{#each tools as tool}
					<span>{tool}</span>
				{/each}
			</div>

			<p class="mt-2 text-gray-800">
				{body}
			</p>
		</section>
	{/each}
</section>

<ContactMe />

<footer class="w-full mt-8 py-4 text-center font-medium text-sm text-slate-600">
	&#169; 2023 Dominik Michal
</footer>
