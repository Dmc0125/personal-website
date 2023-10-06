<script lang="ts">
	import '../app.css';
	import { currentTranslations } from '$lib/i18n/translator';
	import Menu from './menu.svelte';
</script>

<Menu />

<section
	id="landing"
	class="w-full px-4 md:px-0 md:w-1/3 mx-auto h-screen flex align-middle justify-center flex-col"
>
	<h1 class="text-3xl font-semibold text-center">{$currentTranslations.landingTitle}</h1>
	<p class="text-2xl font-light mt-4 max-w-xl text-center">{$currentTranslations.landingBody}</p>
	<a
		href="#projects"
		class="w-60 h-12 mt-6 mx-auto px-4 flex items-center justify-center gap-x-2 bg-gray-700 text-slate-300 rounded-md"
	>
		{$currentTranslations.landingExplore}
		<span class="h-fit">
			<svg class="w-8 h-8 stroke-current" viewBox="0 0 24 24" fill="none">
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
	<h1 class="text-2xl font-semibold mb-4">My projects</h1>

	<section id="funding-arbitrage" class="grid md:grid-cols-2">
		<div class="w-full h-40 bg-gray-400 rounded-md">
			<h2 class="mt-2 ml-2 font-medium text-lg">Funding arbitrage bot</h2>
		</div>
		<p class="mt-4">
			I'm currently working on this project, and arbitrage bot that captures differences between
			funding rates on two on-chain exchanges on Solana, Mango markets and Drift.
		</p>
	</section>
</section>
