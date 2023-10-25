<script lang="ts">
	export let label: string;
	export let id: string;
	export let inputType: 'text' | 'email';
	export let minLen: number | undefined = undefined;
	export let maxLen: number | undefined = undefined;
	export let value: string;
	export let err: null | string;
</script>

<div class="flex flex-col gap-y-2 w-full h-fit relative">
	<label for={id} class="font-medium text-sm text-font-2-light dark:text-font-2-dark">{label}</label
	>
	{#if inputType === 'text'}
		<input
			{id}
			name={id}
			type="text"
			required
			class="
				bg-bg-2-light dark:bg-bg-2-dark border rounded-md h-10 w-full px-4 text-font-1-light dark:text-font-1-dark
				{err && err.length ? 'border-red-500' : 'border-stroke-light dark:border-stroke-dark'}
			"
			minlength={minLen}
			maxlength={maxLen}
			bind:value
		/>
	{:else}
		<input
			{id}
			name={id}
			type="email"
			required
			class="
				bg-bg-2-light dark:bg-bg-2-dark border rounded-md h-10 w-full px-4 text-font-1-light dark:text-font-1-dark
				{err && err.length ? 'border-red-500' : 'border-stroke-light dark:border-stroke-dark'}
			"
			minlength={minLen}
			maxlength={maxLen}
			bind:value
		/>
	{/if}
	{#if err && err.length}
		<p
			class="absolute block w-full bottom-0 left-0 translate-y-[100%] text-red-500 font-medium text-sm"
		>
			{err}
		</p>
	{/if}
</div>
