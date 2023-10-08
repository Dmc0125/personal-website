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

<a
	href={url}
	target="_blank"
	rel="noopener noreferrer"
	aria-label="{title} link"
	class="
		grid min-[500px]:grid-cols-2 gap-y-4 gap-x-6 p-4 sm:px-12 sm:py-8 rounded-md
    	xl:grid-rows-[min-content_min-content_min-content] hover:shadow-sm shadow-none transition-all
		bg-slate-300 dark:bg-gray-900
		ring-2 ring-slate-200 hover:ring-sky-400 ring-offset-4 ring-offset-slate-200
		dark:ring-offset-gray-800 dark:ring-gray-800 dark:hover:ring-sky-400
		focus:ring-sky-400 dark:focus:ring-sky-400
    "
>
	<header class="min-[500px]:col-[1/3] flex items-center justify-between top-0 w-full h-fit">
		<div>
			<h2 class="font-medium text-lg text-slate-800 dark:text-slate-200">
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

		<a
			href={repository}
			class="url-new-page ml-auto hover:text-sky-500 dark:hover:text-sky-300 text-gray-600 dark:text-slate-500"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="{title} github repository"
		>
			<img
				class="w-7 h-7 sm:hidden"
				src="/github-mark.png"
				alt="Funding arbitrage repository"
				aria-hidden="true"
			/>
			<p class="ml-auto hidden sm:flex items-center gap-x-2 font-medium transition-all">
				Github
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
			</p>
		</a>
	</header>

	<div
		style="background-image: url({imageUrl});"
		class="w-full aspect-video rounded-md shadow-md bg-cover bg-center"
	/>

	<p class="text-gray-700 dark:text-slate-400">
		{body}
	</p>

	<div class="flex gap-x-2 items-center text-slate-600 border-separate">
		{#each tools as tool}
			<span class="{tool.toLowerCase()} px-3 py-1 rounded-full font-medium text-sm">{tool}</span>
		{/each}
	</div>
</a>
