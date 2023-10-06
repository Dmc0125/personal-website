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
		}
	) {
		const t = e.target as HTMLSelectElement;
		// only allowed option are from select
		// no need to validate
		$locale = t.value as unknown as Locale;
		html.lang = t.value;
	}

	let showMenu = false;
</script>

<button
	on:click={() => (showMenu = !showMenu)}
	class="absolute top-4 right-4 rounded-full w-12 h-12 p-2 z-10 border border-slate-500"
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

{#if showMenu}
	<header
		class="absolute right-4 top-4 flex align-middle justify-center h-12 p-1 pr-14 pl-2 gap-x-2 z-0 rounded-full border border-slate-500 transition-all"
		in:fade={{ delay: 150, duration: 150, easing: cubicInOut }}
		out:fade={{ delay: 0, duration: 150, easing: cubicInOut }}
	>
		<a
			href="https://github.com/dmc0125"
			target="_blank"
			rel="noopener noreferrer"
			class="block h-full"
		>
			<svg
				class="h-full aspect-square"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M20 5C11.7163 5 5 11.5035 5 19.5248C5 25.9432 9.2975 31.3865 15.2585 33.3067C16.0083 33.4397 16.2821 32.9911 16.2821 32.6081C16.2821 32.2623 16.2683 31.117 16.261 29.9042C12.0898 30.7819 11.2082 28.1914 11.2082 28.1914C10.5252 26.5141 9.54283 26.0673 9.54283 26.0673C8.17962 25.1666 9.64625 25.1844 9.64625 25.1844C11.1523 25.2854 11.9452 26.6808 11.9452 26.6808C13.2837 28.9007 15.4571 28.2588 16.3104 27.8865C16.4468 26.9503 16.8349 26.3085 17.2626 25.9468C13.9328 25.5798 10.43 24.3333 10.43 18.7677C10.43 17.1808 11.015 15.8865 11.9727 14.8697C11.8198 14.5009 11.3034 13.023 12.121 11.0239C12.121 11.0239 13.3789 10.6339 16.2463 12.5133C17.442 12.1897 18.7246 12.0301 20 12.0248C21.2744 12.0301 22.5579 12.1915 23.7555 12.5151C26.6174 10.6339 27.8772 11.0257 27.8772 11.0257C28.6975 13.0266 28.1812 14.5026 28.0273 14.8697C28.9886 15.8865 29.5691 17.1808 29.5691 18.7677C29.5691 24.3475 26.0608 25.5762 22.7191 25.9361C23.2593 26.3865 23.7372 27.2695 23.7372 28.6241C23.7372 30.5656 23.717 32.1312 23.717 32.6099C23.717 32.9964 23.9899 33.4485 24.7498 33.3067C30.7062 31.3829 35 25.9397 35 19.5248C35 11.5035 28.2837 5 20 5Z"
					fill="currentColor"
				/></svg
			>
		</a>
		<ColorModeSwitch />
		<select
			on:change={updateLocale}
			name="locale"
			id="locale-select"
			class="h-full px-4 rounded-md bg-transparent"
		>
			<option value="en">English</option>
			<option value="sk">Slovak</option>
		</select>
	</header>
{/if}
