<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { PileState } from '$lib/pile/util/pileState.svelte';
	import {deleteSelectedModel } from '../../util/uiActions';
	import AddNewModel from './AddNewModel.svelte';
	import SaveStatus from './SaveStatus.svelte';
	import ScaleSlider from './ScaleSlider.svelte';

	let { pileSceneRef } = $props();
	const pileApp:PileApp = $derived(pileSceneRef?.pileApp);
	const pileState: PileState = $derived(pileSceneRef?.pileApp.state)

</script>
{#if pileState && pileApp}
<div class="relative">
	<SaveStatus 
		status = {pileState.uploadStatus}
		onSave = {pileApp.attemptSave}
	/>
</div>
<div class="absolute top-[90vh] left-[3vw]">
	<div class="grid grid-cols-8 gap-3">
		{#if pileApp.state.selectedObjectID}
			<button
				onclick={() => (pileSceneRef.pileApp.state.transformControlsMode = 'translate')}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Translate</button
			>
			<button
				onclick={() => (pileSceneRef.pileApp.state.transformControlsMode = 'rotate')}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Rotate</button
			>
			<ScaleSlider pileState={pileApp.state} />
			<button
				onclick={() => deleteSelectedModel(pileApp.state)}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Delete</button
			>
		{/if}
		
			<AddNewModel
				pileApp={pileApp}
				inventory={pileApp.modelInventory}
			/>
			<AddNewModel
				pileApp={pileApp}
				inventory={pileApp.imageInventory}
			/>
		
	</div>
</div>
{/if}
