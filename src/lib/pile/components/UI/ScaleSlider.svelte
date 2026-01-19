<script lang="ts">
	import { PileState } from '$lib/pile/util/pileState.svelte';

	let { pileState }: { pileState: PileState } = $props();
	let count = $derived.by(() => {
		const selectedObj = pileState.getSelectedObject();
		if (selectedObj && selectedObj.ref) {
			const scale = PileState.getObjScale(selectedObj.ref);
			return (scale.x + scale.y + scale.z) / (3);
		}
	});

	$effect(() => {
		if (!count) {
			count = 1;
		}
		const selectedObject = pileState.getSelectedObject();
		if (selectedObject && selectedObject.ref) {
			PileState.setScale(selectedObject.ref, count);
		}
	});
</script>

<input bind:value={count} type="number" min=".01" step=".5" />
