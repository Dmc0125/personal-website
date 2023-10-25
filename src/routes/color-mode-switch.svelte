<script lang="ts">
	import { onMount } from 'svelte';

	let htmlElement: HTMLElement;

	type ColorMode = 'light' | 'dark';
	let colorMode: ColorMode = 'light';

	onMount(() => {
		let savedColorMode = localStorage.getItem('color-mode');
		if (savedColorMode == 'dark') {
			colorMode = 'dark';
		}

		htmlElement = document.querySelector('html')!;
	});

	function changeColorMode() {
		switch (colorMode) {
			case 'light': {
				colorMode = 'dark';
				htmlElement.classList.add('dark');
				break;
			}
			case 'dark': {
				colorMode = 'light';
				htmlElement.classList.remove('dark');
				break;
			}
		}

		localStorage.setItem('color-mode', colorMode);
	}
</script>

<button
	on:click={() => changeColorMode()}
	class="h-8 flex sm:hidden"
	aria-label="Color mode switch"
>
	<svg
		class="h-full aspect-square {colorMode === 'dark'
			? 'text-theme'
			: 'text-font-1-light dark:text-font-1-dark'}"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke="currentColor"
			d="M17 12.002c0-4.142-3-7.5-7.5-7.5-1.5 0-2.5.5-2.5.5s5 1.498 5 7-5 7-5 7 1 .5 2.5.5c4.5 0 7.5-3.358 7.5-7.5Z"
		/>
	</svg>
	<svg
		class="h-full aspect-square {colorMode === 'light'
			? 'text-theme'
			: 'text-font-1-light dark:text-font-1-dark'}"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke="currentColor"
			d="M12 4.5v2m5.5 5.5h2M12 17.5v2M6.5 12h-2m2.197-5.303L8.11 8.11m7.778 0 1.414-1.414m-1.414 9.192 1.414 1.414M8.111 15.89l-1.414 1.414M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
		/>
	</svg>
</button>

<button
	on:click={() => changeColorMode()}
	class="h-8 hidden sm:flex"
	aria-label="Color mode switch"
>
	{#if colorMode === 'dark'}
		<svg class="h-full aspect-square" viewBox="0 0 24 24" fill="none">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke="currentColor"
				d="M17 12.002c0-4.142-3-7.5-7.5-7.5-1.5 0-2.5.5-2.5.5s5 1.498 5 7-5 7-5 7 1 .5 2.5.5c4.5 0 7.5-3.358 7.5-7.5Z"
			/>
		</svg>
	{:else}
		<svg class="h-full aspect-square" viewBox="0 0 24 24" fill="none">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke="currentColor"
				d="M12 4.5v2m5.5 5.5h2M12 17.5v2M6.5 12h-2m2.197-5.303L8.11 8.11m7.778 0 1.414-1.414m-1.414 9.192 1.414 1.414M8.111 15.89l-1.414 1.414M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
			/>
		</svg>
	{/if}
</button>
