<script lang="ts">
	import Pile from '$lib/pile/pile.svelte';
	import type { EnvironmentMap, EnvironmentMapInventory } from '$lib/pile/util/assetInventory/environmentMap';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import { changeEnvironment } from '$lib/pile/util/ui/uiActions';

	interface Props {
		pileApp: PileApp;
		inventory: EnvironmentMapInventory;
	}
	let { pileApp, inventory }: Props = $props();
	let selectedEnvironment: EnvironmentMap | null = $state(null);

	function handleEnvironmentSelection() {
		if (selectedEnvironment) {
			changeEnvironment(selectedEnvironment, pileApp)
		}
	}
</script>

<form onsubmit={handleEnvironmentSelection}>
	<div class="grid grid-cols-2 gap-5">
		<select bind:value={selectedEnvironment}>
			{#if inventory}
				{#each inventory.getAll() as environmentMap}
					<option value={environmentMap}>
						{environmentMap.displayName}
					</option>
				{/each}
			{/if}
		</select>
		<button disabled={!selectedEnvironment} type="submit"> Submit </button>
	</div>
</form>
