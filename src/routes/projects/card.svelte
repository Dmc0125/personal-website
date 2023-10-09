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
			class="ml-auto text-gray-600 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-300"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="{title} github repository"
		>
			<svg
				aria-hidden="true"
				class="w-7 h-7 sm:hidden"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M20 5C11.7163 5 5 11.5035 5 19.5248C5 25.9432 9.2975 31.3865 15.2585 33.3067C16.0083 33.4397 16.2821 32.9911 16.2821 32.6081C16.2821 32.2623 16.2683 31.117 16.261 29.9042C12.0898 30.7819 11.2082 28.1914 11.2082 28.1914C10.5252 26.5141 9.54283 26.0673 9.54283 26.0673C8.17962 25.1666 9.64625 25.1844 9.64625 25.1844C11.1523 25.2854 11.9452 26.6808 11.9452 26.6808C13.2837 28.9007 15.4571 28.2588 16.3104 27.8865C16.4468 26.9503 16.8349 26.3085 17.2626 25.9468C13.9328 25.5798 10.43 24.3333 10.43 18.7677C10.43 17.1808 11.015 15.8865 11.9727 14.8697C11.8198 14.5009 11.3034 13.023 12.121 11.0239C12.121 11.0239 13.3789 10.6339 16.2463 12.5133C17.442 12.1897 18.7246 12.0301 20 12.0248C21.2744 12.0301 22.5579 12.1915 23.7555 12.5151C26.6174 10.6339 27.8772 11.0257 27.8772 11.0257C28.6975 13.0266 28.1812 14.5026 28.0273 14.8697C28.9886 15.8865 29.5691 17.1808 29.5691 18.7677C29.5691 24.3475 26.0608 25.5762 22.7191 25.9361C23.2593 26.3865 23.7372 27.2695 23.7372 28.6241C23.7372 30.5656 23.717 32.1312 23.717 32.6099C23.717 32.9964 23.9899 33.4485 24.7498 33.3067C30.7062 31.3829 35 25.9397 35 19.5248C35 11.5035 28.2837 5 20 5Z"
					fill="currentColor"
				/></svg
			>
			<p
				class="ml-auto hidden sm:flex items-center gap-x-2 transition-all font-medium url-new-page"
			>
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
