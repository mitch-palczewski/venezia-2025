<script lang="ts">
	import { MODEL_PATHS, type ModelName } from '../models/modelPaths';
    import { addNewModel } from '../util/uiActions';

	let selectedModel: ModelName | null = $state(null);

	function handleAdd() {
        if(selectedModel){
            addNewModel(selectedModel)
        }
	}
</script>

<form onsubmit={handleAdd}>
	<div class="grid grid-cols-2 gap-5">
		<select bind:value={selectedModel}>
			{#each Object.entries(MODEL_PATHS) as [name, path] (name)}
				<option value={name}>
					{name}
				</option>
			{/each}
		</select>
		<button disabled={!selectedModel} type="submit"> Submit </button>
	</div>
</form>
