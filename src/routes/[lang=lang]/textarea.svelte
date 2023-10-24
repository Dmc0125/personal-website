<script lang="ts">
	export let label: string;
	export let id: string;
</script>

<div class="flex flex-col gap-y-2 w-full h-fit">
	<label for={id} class="font-medium text-sm text-font-2-light dark:text-font-2-dark">{label}</label
	>
	<textarea
		name={id}
		{id}
		required
		minlength="10"
		maxlength="5000"
		class="min-h-[150px] bg-bg-2-light dark:bg-bg-2-dark border border-stroke-light dark:border-stroke-dark rounded-md w-full"
	/>
</div>
