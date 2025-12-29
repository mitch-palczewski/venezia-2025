<script lang="ts">
	import { uploadDataFactory, deleteSelectedModel } from '../../util/uiActions';
	import AddNewModel from './AddNewModel.svelte';
	import ScaleSlider from './ScaleSlider.svelte';

	let { pileSceneRef } = $props();
</script>
{#if pileSceneRef?.pileApp}
<div class="absolute top-[90vh] left-[1vw]">
	<div>
		<p>{pileSceneRef.pileApp?.state.uploadStatus}</p>
	</div>
	<div class="grid grid-cols-8 gap-3">
		<button
			onclick={() => pileSceneRef.pileApp?.attemptSave()}
			class="relative h-auto w-auto rounded bg-red-600 px-1 py-2 text-sm text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Upload Position Data</button
		>
		{#if pileSceneRef?.pileApp?.state.selectedObjectID}
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
			<ScaleSlider pileState={pileSceneRef.pileApp.state} />
			<button
				onclick={() => deleteSelectedModel(pileSceneRef.pileApp.state)}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Delete</button
			>
		{/if}
		
			<AddNewModel
				pileApp={pileSceneRef.pileApp}
				inventory={pileSceneRef?.pileApp.modelInventory}
			/>
			<AddNewModel
				pileApp={pileSceneRef.pileApp}
				inventory={pileSceneRef?.pileApp.imageInventory}
			/>
		
	</div>
</div>
{/if}
