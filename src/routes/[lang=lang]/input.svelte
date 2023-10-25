<script lang="ts">
	export let label: string;
	export let id: string;
	export let inputType: 'text' | 'email';
	export let minLen: number | undefined = undefined;
	export let maxLen: number | undefined = undefined;
</script>

<div class="flex flex-col gap-y-2 w-full h-fit">
	<label for={id} class="font-medium text-sm text-font-2-light dark:text-font-2-dark">{label}</label
	>
	<input
		{id}
		name={id}
		type={inputType}
		required
		class="bg-bg-2-light dark:bg-bg-2-dark border border-stroke-light dark:border-stroke-dark rounded-md h-10 w-full px-4 text-font-1-light dark:text-font-1-dark"
		minlength={minLen}
		maxlength={maxLen}
	/>
</div>
