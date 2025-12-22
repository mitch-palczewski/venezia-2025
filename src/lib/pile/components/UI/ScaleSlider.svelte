<script>
	let { pileState } = $props();
	let count = $derived(pileState.getSelectedModelObject().uniformScale)


	$effect(() => {
    if(!count){
      count = 1
    }
    pileState.getSelectedModelObject().uniformScale = count
    //pileState.getSelectedModelObject() = count
	});
</script>

<input 
  bind:value={count}
  type="number" 
  min=".1"
  step=".5"
  />
