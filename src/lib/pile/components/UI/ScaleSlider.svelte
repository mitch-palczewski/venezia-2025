<script>
	let { pileState } = $props();
	let count = $derived(pileState.getSelectedModelObject().uniformScale);

	$effect(() => {
		if (!count) {
			count = 1;
		}
    //console.log(`${count}`)
		pileState.getSelectedModelObject().uniformScale = count;
	});
</script>

<input bind:value={count} type="number" min=".1" step=".5" />
