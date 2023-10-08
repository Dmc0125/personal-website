<script lang="ts">
	import { currentTranslations } from '$lib/i18n/translator';

	export let title: string;
	export let lastCommit: string | undefined;
	export let repository: string;
	export let body: string;
	export let tools: string[];
	export let imageUrl: string;
	export let url: string;
</script>

<section
	class="
        grid bg-slate-300 p-4 sm:px-12 sm:py-8 rounded-md
        min-[500px]:grid-cols-2 gap-y-4 gap-x-6
    	xl:grid-rows-[min-content_min-content_min-content]
    "
>
	<header class="min-[500px]:col-[1/3] flex items-center justify-between top-0 w-full h-fit">
		<div>
			<h2 class="font-medium text-lg text-slate-800">
				{title}
			</h2>
			{#if lastCommit}
				{@const d = new Date(lastCommit)}
				<p class="text-xs font-medium text-slate-500">
					{$currentTranslations.commit}
					{$currentTranslations.months[d.getMonth()]}
					{d.getDate()}, {d.getFullYear()}
				</p>
			{/if}
		</div>

		<a href={repository} class="github-url ml-auto" target="_blank" rel="noopener noreferrer">
			<img class="w-7 h-7 sm:hidden" src="/github-mark.png" alt="Funding arbitrage repository" />
			<p class="ml-auto hidden sm:flex items-center gap-x-2">
				Github
				<svg class="w-5 h-5 transition-all" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="currentColor"
						d="M4.5 12L19.5 12M19.5 12L13 5.5M19.5 12L13 18.5"
					/>
				</svg>
			</p>
		</a>
	</header>

	<a
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		style="background-image: url({imageUrl});"
		class="
            block w-full aspect-video rounded-md overflow-hidden shadow-md bg-slate-400
            bg-cover bg-center
        "
	>
		<span class="hidden">Sveegy</span>
		<!-- <img src={imageUrl} alt="Sveegy" class="h-full aspect-video" /> -->
	</a>

	<p class="text-gray-700">
		{body}
	</p>

	<div class="flex gap-x-2 items-center text-slate-600 border-separate">
		{#each tools as tool}
			<span class="{tool.toLowerCase()} px-3 py-1 rounded-full font-medium text-sm">{tool}</span>
		{/each}
	</div>
</section>
