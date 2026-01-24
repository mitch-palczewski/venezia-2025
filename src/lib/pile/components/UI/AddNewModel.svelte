<script lang="ts">
	import type { Object2DMap, Object2DMapInventory } from '$lib/pile/util/assetInventory/object2DMap';
	import { Object3DMap, Object3DMapInventory } from '$lib/pile/util/assetInventory/object3DMap';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import { addNewModel } from '$lib/pile/util/ui/uiActions';


	interface Props {
		pileApp: PileApp;
		inventory: Object2DMapInventory | Object3DMapInventory;
	}
	let { pileApp, inventory }: Props = $props();
	let selectedModel: Object2DMap | Object3DMap | null = $state(null);

	function handleAdd() {
		if (selectedModel) {
			addNewModel(selectedModel, pileApp);
		}
	}
</script>

<form onsubmit={handleAdd}>
	<div class="grid grid-cols-2 gap-5">
		<select bind:value={selectedModel}>
			{#if inventory}
				{#each inventory.getAll() as modelMap}
					<option value={modelMap}>
						{modelMap.displayName}
					</option>
				{/each}
			{/if}
		</select>
		<button disabled={!selectedModel} type="submit"> Submit </button>
	</div>
</form>
