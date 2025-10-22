<script lang="ts">
	import { View } from '@threlte/extras';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene } from '$lib/scenes/pile';
	import { uploadTestData, uploadData } from '$lib/scenes/pile/hooks/uploadPositions';

	let sceneRef: PileScene;
	let pileSceneDom: any;

	async function uploadDataBuilder(){
		const positions = sceneRef.getPositions()
		uploadData(positions)
	}
</script>

<div class="relative">
	<button
		on:click={uploadDataBuilder}
		class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
		>Upload Test Data</button
	>
</div>

<div bind:this={pileSceneDom} class="relative h-[200px] w-[400px] p-10"></div>

<CanvasPortal>
	<View dom={pileSceneDom}>
		<PileScene bind:this={sceneRef} />
	</View>
</CanvasPortal>
