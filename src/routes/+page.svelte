<script lang="ts">
	import '../app.css';
	import { currentTranslations } from '$lib/i18n/translator';
	import Menu from './menu.svelte';
	import { projects } from '$lib/projects';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	let inputs: (HTMLInputElement | HTMLTextAreaElement)[] = [];
	let inputsActive = {
		name: false,
		email: false,
		message: false,
	};

	function updateInputs(id: string, value: string) {
		if (id in inputsActive) {
			if (value.length) {
				inputsActive[id as keyof typeof inputsActive] = true;
			} else {
				inputsActive[id as keyof typeof inputsActive] = false;
			}
		}
	}

	onMount(() => {
		inputs.forEach((el) => {
			updateInputs(el.id, el.value);
		});
	});

	function onFormInput(
		e: Event & {
			currentTarget: EventTarget & HTMLFormElement;
		},
	) {
		if (!e.target) {
			return;
		}

		const t = e.target as HTMLInputElement | HTMLTextAreaElement;
		updateInputs(t.id, t.value);
	}

	function sendEmailActionResultHandler(result: ActionResult) {
		// sadfas
		console.log(result);
	}
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

<section id="contact" class="mt-8 px-4">
	<h1 class="text-2xl font-semibold text-gray-950">{$currentTranslations.contactMeTitle}</h1>

	<form
		method="POST"
		class="mt-8 flex flex-col gap-y-4"
		use:enhance={() => {
			return async ({ result }) => {
				sendEmailActionResultHandler(result);
			};
		}}
		on:input={onFormInput}
	>
		<label for="name" class="w-full h-fit relative group-empty:bg-red-600">
			<span
				class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 transition-all pointer-events-none"
				class:active={inputsActive.name}>{$currentTranslations.contactMeName}</span
			>
			<input
				bind:this={inputs[0]}
				name="name"
				id="name"
				type="text"
				class="w-full h-12 rounded-md px-4"
				required
				minlength="2"
			/>
		</label>

		<label for="email" class="w-full h-fit relative">
			<span
				class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 transition-all pointer-events-none"
				class:active={inputsActive.email}>Email</span
			>
			<input
				bind:this={inputs[1]}
				name="email"
				id="email"
				type="email"
				class="w-full h-12 rounded-md px-4"
				required
			/>
		</label>

		<label for="message" class="w-full h-fit relative">
			<span
				class="absolute left-4 top-6 -translate-y-1/2 text-slate-700 transition-all pointer-events-none"
				class:active={inputsActive.message}>{$currentTranslations.contactMeMessage}</span
			>
			<textarea
				bind:this={inputs[2]}
				name="message"
				id="message"
				rows="10"
				class="w-full min-h-[10rem] p-4 rounded-md"
				required
				minlength="2"
			/>
		</label>

		<button
			class="w-full rounded-md h-10 flex items-center justify-center gap-x-2 bg-slate-600 text-slate-300"
		>
			Send
			<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke-width="0.9">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="currentColor"
					d="M19.5 12L4.5 5.5L9.5 12L4.5 18.5L19.5 12Z"
				/>
			</svg></button
		>
	</form>
</section>

<style lang="postcss">
	label:focus-within span,
	.active {
		@apply text-sm;
		transform: translateY(-135%);
	}
</style>
