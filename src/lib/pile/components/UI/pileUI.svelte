<script lang="ts">
	import { uploadDataFactory, deleteSelectedModel } from '../../util/uiActions';
	import AddNewModel from './AddNewModel.svelte';

	let { pileSceneRef } = $props();
</script>

<div class="absolute top-[93vh] left-[1vw]">
	<div class="grid grid-cols-8 gap-3">
		<button
			onclick={() => uploadDataFactory(pileSceneRef)}
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
			<button
				onclick={() => (pileSceneRef.pileApp.state.transformControlsMode = 'scale')}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Scale</button
			>
			<button
				onclick={() => deleteSelectedModel(pileSceneRef.pileApp.state)}
				class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
				>Delete</button
			>
		{/if}
		{#if pileSceneRef?.pileApp}
			<AddNewModel pileApp={pileSceneRef.pileApp} />
		{/if}
	</div>
</div>
