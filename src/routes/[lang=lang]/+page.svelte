<script lang="ts">
	import type { Unsubscriber } from 'svelte/motion';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	import Mail from '$lib/icons/mail.svelte';
	import Github from '$lib/icons/github.svelte';
	import Arrow from '$lib/icons/arrow.svelte';
	import Hamburger from '$lib/icons/hamburger.svelte';
	import Close from '$lib/icons/close.svelte';
	import Input from './input.svelte';
	import Textarea from './textarea.svelte';
	import { translations } from '$lib/i18n/translations';
	import ColorModeSwitch from '../color-mode-switch.svelte';

	export let data: PageData;

	let t = translations.get(data.locale)!;

	let scroll: number;
	let menuOpen = false;
	let unsub: Unsubscriber | null = null;

	if (browser) {
		unsub = page.subscribe(() => {
			menuOpen = false;
			t = translations.get(data.locale)!;
		});
	}

	onDestroy(() => {
		if (unsub) {
			unsub();
		}
	});

	function routeOnLangChange(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		},
	) {
		const t = e.target as HTMLSelectElement;
		goto(`/${t.value}`, {
			noScroll: true,
			invalidateAll: true,
		});
	}
</script>

<svelte:window bind:scrollY={scroll} />

<header
	class="z-10 fixed top-0 h-14 w-full flex items-center justify-between px-5 bg-bg-1-light dark:bg-bg-1-dark transition-all {scroll >
	0
		? 'backdrop-blur-sm bg-bg-1-light/10 dark:bg-bg-1-dark/10'
		: ''}"
>
	<h1 class="text-xl font-semibold text-font-1-light dark:text-font-1-dark">Dominik Michal</h1>

	<button
		class="h-10 w-h10 text-font-1-light dark:text-font-1-dark sm:hidden"
		on:click={() => (menuOpen = !menuOpen)}
	>
		{#if !menuOpen}
			<Hamburger />
		{:else}
			<Close />
		{/if}
	</button>

	{#if menuOpen}
		<nav
			class="w-[110px] absolute bg-bg-2-light dark:bg-bg-2-dark rounded-md border border-stroke-light dark:border-stroke-dark right-5 top-14 py-2 sm:hidden"
		>
			<ul class="w-full flex flex-col justify-between">
				{#each t.sections as section}
					<li class="w-full">
						<a
							class="text-font-1-light dark:text-font-1-dark hover:!text-theme hover:bg-bg-1-light/50 dark:hover:bg-bg-1-dark/50 block w-full px-4 py-1 {$page.url.href.endsWith(
								section.hash,
							)
								? '!text-theme'
								: ''}"
							href={section.hash}>{section.name}</a
						>
					</li>
				{/each}
				<li class="px-4 w-full mt-1">
					<ColorModeSwitch />
				</li>
				<li class="px-4 w-full h-8 mt-2">
					<select
						class="w-full h-full block bg-transparent text-font-1-light dark:text-font-1-dark"
						name="lang"
						id="lang"
						on:change={routeOnLangChange}
					>
						<option value="en" selected={data.locale === 'en_EN'}> EN </option>
						<option value="sk" selected={data.locale === 'sk_SK'}> SK </option>
					</select>
				</li>
			</ul>
		</nav>
	{/if}

	<nav class="w-fit hidden sm:block">
		<ul class="w-full flex gap-x-4 lg:gap-x-10 items-center justify-between">
			{#each t.sections as section}
				<li>
					<a
						class="text-font-1-light dark:text-font-1-dark hover:!text-theme {$page.url.href.endsWith(
							section.hash,
						)
							? '!text-theme'
							: ''}"
						href={section.hash}>{section.name}</a
					>
				</li>
			{/each}
			<li class="text-font-1-light dark:text-font-1-dark">
				<ColorModeSwitch />
			</li>
			<li>
				<select
					class="w-full h-full block bg-transparent text-font-1-light dark:text-font-1-dark"
					name="lang"
					id="lang"
					on:change={routeOnLangChange}
				>
					<option value="en" selected={data.locale === 'en_EN'}> EN </option>
					<option value="sk" selected={data.locale === 'sk_SK'}> SK </option>
				</select>
			</li>
		</ul>
	</nav>
</header>

<section
	id="home"
	class="max-w-[1200px] mx-auto pt-[130px] px-5 scroll-mt-16 flex flex-col md:flex-row gap-y-[150px] gap-x-16"
>
	<div class="w-full max-w-[500px] mx-auto relative">
		<div class="flex gap-y-5 flex-col sticky top-32 h-fit">
			<h1 class="text-font-1-light dark:text-font-1-dark text-4xl font-bold">
				{t.landingTitle}
			</h1>
			<p class="text-font-2-light dark:text-font-2-dark text-xl">
				{t.landingBody}
			</p>

			<dl class="flex gap-x-8 items-center text-font-1-light dark:text-font-1-dark">
				<a
					href="https://github.com/dmc0125"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="github"
				>
					<div class="w-10 h-10">
						<Github />
					</div>
				</a>
				<a
					href="mailto:contact@dominikmichal.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="mail"
				>
					<div class="w-10 h-10">
						<Mail />
					</div>
				</a>
				<a
					href="https://cdn.sanity.io/files/w6zzmq4u/production/17888b01d4676d73195bf58095c70ec5c380dc71.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="flex gap-x-2 items-center"
				>
					{t.landingViewCV}
					<div class="w-5 h-5">
						<Arrow />
					</div>
				</a>
			</dl>

			<a
				href="#projects"
				class="px-4 w-fit h-10 bg-theme text-font-1-light rounded-md font-medium flex items-center"
				>{t.landingExplore}</a
			>
		</div>
	</div>

	<div id="about-me" class="w-full max-w-[500px] scroll-mt-16 mx-auto">
		<h1 class="text-xl font-bold dark:text-font-1-dark text-font-1-light">
			{t.aboutMeTitle}
		</h1>

		<div class="mt-5 flex flex-col gap-y-5 text-font-2-light dark:text-font-2-dark">
			{@html t.aboutMeBody}
		</div>
	</div>
</section>

<section
	id="projects"
	class="mx-auto w-full max-w-[420px] md:max-w-[1200px] px-5 mt-[150px] scroll-mt-16"
>
	<h1 class="text-xl font-bold dark:text-font-1-dark text-font-1-light">
		{t.projectsTitle}
	</h1>

	<div class="w-fit mx-auto mt-5 gap-y-10 grid gap-x-10 xl:gap-x-14 projects-container">
		{#each data.projects as project, i}
			<div
				style="grid-area: p{i + 1};"
				class="p-4 bg-bg-2-light dark:bg-bg-2-dark rounded-md border border-stroke-light dark:border-stroke-dark"
			>
				<header class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-medium text-font-1-light dark:text-font-1-dark">
							{project.title}
						</h2>
						{#if project.commitMsg}
							<p class="text-xs font-medium text-font-2-light dark:text-font-2-dark">
								{project.commitMsg}
							</p>
						{/if}
					</div>
					{#if !project.isWebsite}
						<a
							href="https://github.com/{project.githubOwner}/{project.githubRepo}"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="{project.title} github"
							class="h-10 text-font-1-light dark:text-font-1-dark"
						>
							<Github />
						</a>
					{/if}
				</header>

				{#if project.isWebsite && project.img && project.imgBgClr}
					<div
						class="w-full h-[180px] mb-5 py-4 rounded-md mt-5 grid place-items-center"
						style="background: radial-gradient({project.imgBgClrMiddle}, {project.imgBgClr});"
					>
						<img
							class="mx-auto"
							src="https://cdn.sanity.io/images/w6zzmq4u/production/{project.img.asset._ref}"
							alt={project.title}
						/>
					</div>
				{/if}

				<p class="mt-3 text-font-2-light dark:text-font-2-dark">
					{project.description}
				</p>

				{#if project.isWebsite && project.websiteUrl}
					<div class="flex gap-x-6 mt-5">
						<a
							href={project.websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="h-10 px-10 bg-theme text-font-1-light font-medium rounded-md flex items-center justify-center"
						>
							Visit
						</a>
						<a
							href="https://github.com/{project.githubOwner}/{project.githubRepo}"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="{project.title} github"
							class="h-10 text-font-1-light dark:text-font-1-dark"
						>
							<Github />
						</a>
					</div>
				{/if}

				<div class="flex items-center flex-wrap gap-x-4 gap-y-4 mt-8">
					{#each project.tags as tag}
						<div class="bg-theme/30 px-3 py-1 rounded-full">
							<span class="text-theme text-sm font-medium">{tag}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<section id="contact" class="px-5 mt-[100px] max-w-[700px] mx-auto">
	<h1 class="text-xl font-bold dark:text-font-1-dark text-font-1-light">
		{t.contactMeTitle}
	</h1>

	<form class="mt-5 flex flex-col gap-y-7" on:submit|preventDefault>
		<div class="w-full flex flex-col sm:flex-row gap-x-10 gap-y-7">
			<Input minLen={2} maxLen={30} label={t.contactMeName} id="name" inputType="text" />
			<Input minLen={2} maxLen={30} label={t.contactMeSurname} id="surname" inputType="text" />
		</div>

		<Input label="Email" id="email" inputType="email" />
		<Textarea label={t.contactMeMessage} id="email" />

		<button type="submit" class="h-10 w-full sm:w-fit px-8 text-font-1-light bg-theme rounded-md"
			>{t.contactMeSend}</button
		>
	</form>
</section>

<footer
	class="w-full mt-[60px] flex items-center flex-col sm:flex-row sm:justify-between gap-y-2 text-sm text-font-2-light dark:text-font-2-dark/50 px-5 pb-5"
>
	<p>© 2023 Dominik Michal</p>
	<p>
		{@html t.footer}
	</p>
</footer>

<style>
	.projects-container {
		grid-template-areas: 'p1' 'p2' 'p3' 'p4' 'p5';
	}

	@media (min-width: 1024px) {
		.projects-container {
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: auto auto;
			grid-template-areas: 'p1 p1 p1 p2 p2 p2' 'p3 p3 p4 p4 p5 p5';
		}
	}
</style>
