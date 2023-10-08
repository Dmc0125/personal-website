<script lang="ts">
	import type { Locale } from '$lib/i18n/translations';
	import { locale } from '$lib/i18n/translator';
	import { fade } from 'svelte/transition';
	import ColorModeSwitch from './color-mode-switch.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let html: HTMLHtmlElement;
	onMount(() => {
		html = document.querySelector('html')!;
	});

	function updateLocale(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		},
	) {
		const t = e.target as HTMLSelectElement;
		// only allowed option are from select
		// no need to validate
		$locale = t.value as unknown as Locale;
		html.lang = t.value;
	}

	let showMenu = false;
</script>

<header />

<button
	on:click={() => (showMenu = !showMenu)}
	class="fixed top-4 right-4 rounded-md w-12 h-12 p-2 z-20 bg-slate-400 dark:bg-gray-900 text-slate-800 dark:text-slate-400"
>
	<svg class="w-full aspect-square" viewBox="0 0 24 24" fill="none">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke="currentColor"
			d="M19.5 6H4.5M19.5 10H9.5M7.5 14H19.5M11.5 18H19.5"
		/>
	</svg>
</button>

<header
	class="fixed right-4 top-4 flex align-middle justify-center h-12 p-1 pr-14 pl-2 gap-x-2 z-10 rounded-md transition-all {showMenu
		? 'opacity-100'
		: 'opacity-0 pointer-events-none'}
		bg-slate-400 dark:bg-gray-900 text-slate-800 dark:text-slate-400"
>
	<ColorModeSwitch />
	<select
		on:change={updateLocale}
		name="locale"
		id="locale-select"
		class="h-full px-4 rounded-md bg-transparent"
	>
		<option value="en">English</option>
		<option value="sk">Slovensky</option>
	</select>
</header>
