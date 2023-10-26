<script lang="ts">
	import Github from '$lib/icons/github.svelte';

	export let i: number;
	export let title: string;
	export let commitMsg: string | undefined;
	export let description: string;
	export let githubOwner: string;
	export let githubRepo: string;
	export let tags: string[];
	export let isFinished: boolean;
</script>

<div
	style="grid-area: p{i + 1};"
	class="p-4 bg-bg-2-light dark:bg-bg-2-dark rounded-md border border-stroke-light dark:border-stroke-dark relative [&>.wip-flag]:hover:opacity-100"
>
	{#if !isFinished}
		<div
			class="absolute top-0 left-0 w-full py-1 text-center bg-yellow-500 dark:bg-yellow-600 rounded-tl-md rounded-tr-md opacity-0 transition-all wip-flag dark:shadow-md"
		>
			<p class="text-font-1-light font-medium text-sm">Work in progress</p>
		</div>
	{/if}

	<header class="flex items-center justify-between">
		<div>
			<h2 class="text-xl font-medium text-font-1-light dark:text-font-1-dark">
				{title}
			</h2>
			{#if commitMsg}
				<p class="text-xs font-medium text-font-2-light dark:text-font-2-dark">
					{commitMsg}
				</p>
			{/if}
		</div>
		<a
			href="https://github.com/{githubOwner}/{githubRepo}"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="{title} github"
			class="h-10 text-font-1-light dark:text-font-1-dark"
		>
			<Github />
		</a>
	</header>

	<p class="mt-3 text-font-2-light dark:text-font-2-dark">
		{description}
	</p>

	<div class="flex items-center flex-wrap gap-x-4 gap-y-4 mt-8">
		{#each tags as tag}
			<div class="bg-theme/[15%] dark:bg-theme/30 px-3 py-1 rounded-full">
				<span class="text-theme text-sm font-medium">{tag}</span>
			</div>
		{/each}
	</div>
</div>
