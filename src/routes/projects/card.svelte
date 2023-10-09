<script lang="ts">
	import { currentTranslations } from '$lib/i18n/translator';

	export let title: string;
	export let lastCommit: number | undefined;
	export let repository: string;
	export let body: string;
	export let tools: string[];
</script>

<section
	class="grid xl:grid-rows-[min-content_min-content_min-content] gap-y-4 bg-slate-300 dark:bg-gray-900 p-4 sm:px-12 sm:py-8 rounded-md"
>
	<header class="flex items-center justify-between top-0 w-full">
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
			class="url-new-page ml-auto text-gray-600 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-300"
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
			<p class="ml-auto hidden sm:flex items-center gap-x-2 transition-all font-medium">
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

	<p class="text-gray-700 dark:text-slate-400">
		{@html body}
	</p>

	<div class="flex gap-x-2 items-center border-separate">
		{#each tools as tool}
			<span class="{tool.toLowerCase()} px-3 py-1 rounded-full font-medium text-sm">{tool}</span>
		{/each}
	</div>
</section>

<style lang="postcss">
	:global(.url-new-page:hover svg, .url-new-page:focus svg) {
		transform: rotate(-45deg);
	}

	:global(.url) {
		@apply underline decoration-dotted transition-all;
	}

	:global(.mango-markets:hover) {
		@apply text-orange-600;
	}

	:global(.drift:hover) {
		@apply text-purple-600;
	}

	:global(.anchor-url:hover) {
		@apply text-blue-500;
	}

	:global(.meteora:hover) {
		@apply text-amber-600;
	}
</style>
