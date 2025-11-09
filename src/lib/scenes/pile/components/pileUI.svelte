<script lang="ts">
	import { PileScene, pileState, uploadData, type PileDataDTO } from '$lib/scenes/pile';

	let { pileSceneRef } = $props();
	async function uploadDataFactory() {
		const positions: PileDataDTO = pileSceneRef.getPositions();
		uploadData(positions);
	}
</script>

<div class="absolute top-[93vh] left-[1vw]">
	<div class="grid grid-cols-4 gap-6">
		<button
			onclick={uploadDataFactory}
			class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Upload Position Data</button
		>
		<button
			onclick={() => (pileState.transformControlsMode = 'translate')}
			class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Translate</button
		>
		<button
			onclick={() => (pileState.transformControlsMode = 'rotate')}
			class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Rotate</button
		>
		<button
			onclick={() => (pileState.transformControlsMode = 'scale')}
			class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Scale</button
		>
		<button
			class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
			>Add Model</button
		>
	</div>
</div>
