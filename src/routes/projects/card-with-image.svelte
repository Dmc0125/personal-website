<script ipt lang="ts">
	import Github from '$lib/icons/github.svelte';

	type Img = {
		asset: { _ref: string };
	};

	export let i: number;
	export let title: string;
	export let commitMsg: string | undefined;
	export let img: Img;
	export let imgBgClr: string;
	export let imgBgClrMiddle: string;
	export let description: string;
	export let githubOwner: string;
	export let githubRepo: string;
	export let websiteUrl: string;
	export let tags: string[];
	export let isFinished: boolean;
</script>

<div
	style="grid-area: p{i + 1};"
	class="
		p-4 bg-bg-2-light dark:bg-bg-2-dark rounded-md border border-stroke-light dark:border-stroke-dark
		md:grid md:grid-cols-[35%_1fr] md:grid-rows-[auto_1fr_auto] gap-x-10 relative [&>.wip-flag]:hover:opacity-100
	"
>
	{#if !isFinished}
		<div
			class="absolute top-0 left-0 w-full py-1 text-center bg-yellow-500 dark:bg-yellow-600 rounded-tl-md rounded-tr-md opacity-0 transition-all wip-flag dark:shadow-md"
		>
			<p class="text-font-1-light font-medium text-sm">Work in progress</p>
		</div>
	{/if}

	<header class="mb-5 md:mb-3 md:col-[2/3]">
		<h2 class="text-xl font-medium text-font-1-light dark:text-font-1-dark">
			{title}
		</h2>
		{#if commitMsg}
			<p class="text-xs font-medium text-font-2-light dark:text-font-2-dark">
				{commitMsg}
			</p>
		{/if}
	</header>

	<div
		class="w-full h-[180px] md:h-full py-4 rounded-md grid place-items-center md:row-[1/3]"
		style="background: radial-gradient({imgBgClrMiddle}, {imgBgClr});"
	>
		<img
			class="mx-auto"
			src="https://cdn.sanity.io/images/w6zzmq4u/production/{img.asset._ref}"
			alt={title}
			loading="lazy"
		/>
	</div>

	<div class="grid grid-rows-[1fr_auto] gap-y-5 md:gap-y-3 mt-5 md:mt-0">
		<p class="text-font-2-light dark:text-font-2-dark">
			{description}
		</p>

		<div class="flex gap-x-6">
			<a
				href={websiteUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="h-10 px-10 bg-theme text-font-1-light font-medium rounded-md flex items-center justify-center"
			>
				Visit
			</a>
			<a
				href="https://github.com/{githubOwner}/{githubRepo}"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="{title} github"
				class="h-10 text-font-1-light dark:text-font-1-dark"
			>
				<Github />
			</a>
		</div>
	</div>

	<div class="flex items-center flex-wrap gap-x-4 gap-y-4 col-[1/3] mt-8">
		{#each tags as tag}
			<div class="bg-theme/[15%] dark:bg-theme/30 px-3 py-1 rounded-full">
				<span class="text-theme text-sm font-medium">{tag}</span>
			</div>
		{/each}
	</div>
</div>
