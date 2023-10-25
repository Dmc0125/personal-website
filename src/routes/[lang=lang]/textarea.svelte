<script lang="ts">
	export let label: string;
	export let id: string;
	export let value: string;
	export let err: string | null;
</script>

<div class="flex flex-col gap-y-2 w-full h-fit relative">
	<label for={id} class="font-medium text-sm text-font-2-light dark:text-font-2-dark">{label}</label
	>
	<textarea
		name={id}
		{id}
		required
		minlength="10"
		maxlength="5000"
		class="
			min-h-[150px] bg-bg-2-light dark:bg-bg-2-dark border rounded-md w-full px-4 py-2 text-font-1-light dark:text-font-1-dark
			{err && err.length ? 'border-red-500' : 'border-stroke-light dark:border-stroke-dark'}
		"
		bind:value
	/>
	{#if err && err.length}
		<p
			class="absolute block w-full bottom-0 left-0 translate-y-[100%] text-red-500 font-medium text-sm"
		>
			{err}
		</p>
	{/if}
</div>
