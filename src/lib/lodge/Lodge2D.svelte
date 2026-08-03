<script lang="ts">
	import type { Lodge } from "./Lodge.svelte";

	type Props = {
		lodge: Lodge;
	};
	let { lodge }: Props = $props();
</script>
