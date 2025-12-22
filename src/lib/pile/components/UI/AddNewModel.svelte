<script lang="ts">
    import { addNewModel } from '../../util/uiActions';

	let selectedModel: string | null = $state(null);
	let {pileApp} = $props()

	function handleAdd() {
        if(selectedModel){
            addNewModel(selectedModel, pileApp)
        }
	}
</script>

<form onsubmit={handleAdd}>
	<div class="grid grid-cols-2 gap-5">
		<select bind:value={selectedModel}>
			{#each pileApp.modelInventory.getAll() as modelMap}
				<option value={modelMap.name}>
					{modelMap.displayName}
				</option>
			{/each}
		</select>
		<button disabled={!selectedModel} type="submit"> Submit </button>
	</div>
</form>
