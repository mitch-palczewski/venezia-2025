<script>
	
	let {pileState} = $props()
  let count = $state(0);
  $effect(() => {
    console.log(`The count is now: ${count}`);
	const selectedObject = pileState.getSelectedModelObject
	selectedObject.uniformScale = count
  });
</script>

<input type="number" bind:value={count} />

<p>The number is: {count}</p>
