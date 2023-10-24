<script lang="ts">
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	@font-face {
		src: url('/RobotoCondensed-VariableFont_wght.ttf');
		font-weight: 100 1000;
		font-family: 'RobotoCondensed';
	}

	@font-face {
		src: url('/Inter-VariableFont_slnt,wght.ttf');
		font-weight: 100 1000;
		font-family: 'Inter';
	}

	:global(*) {
		@apply font-[Inter];
	}

	:global(h1, h2, h3, h4, h5, h6) {
		@apply font-[RobotoCondensed];
	}
</style>
