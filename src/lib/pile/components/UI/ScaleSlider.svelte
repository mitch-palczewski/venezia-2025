<script lang="ts">
	import type { PileState } from "$lib/pile/util/pileState.svelte";


	let { pileState }: {pileState:PileState} = $props();
	let count = $derived(pileState.getSelectedObject()?.uniformScale);

	$effect(() => {
		if (!count) {
			count = 1;
		}
		const selectedObject = pileState.getSelectedObject()
		if (selectedObject) selectedObject.uniformScale = count;
	});
</script>

<input bind:value={count} type="number" min=".01" step=".5" />
