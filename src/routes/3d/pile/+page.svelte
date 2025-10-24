<script lang="ts">
	import { View } from '@threlte/extras';
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene, type ObjectPositions, type PilePositionData } from '$lib/scenes/pile';
	import { uploadData } from '$lib/scenes/pile/hooks/uploadPositions';

	//export let data; Where the +page.server.ts returns when the load() function is called
	export let data; 
	let sceneRef: PileScene;
	let pileSceneDom:HTMLDivElement;

	async function uploadDataBuilder(){
		//Retrieves position data from Pile Scene and uploads that Data
		const positions:PilePositionData = sceneRef.getPositions()
		uploadData(positions)
	}
</script>

<div class="relative">
	<button
		onclick={uploadDataBuilder}
		class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
		>Upload Test Data</button
	>
</div>

<div bind:this={pileSceneDom} class="relative h-[200px] w-[400px] p-10"></div>

<CanvasPortal>
	<View dom={pileSceneDom}>
		<PileScene 
			bind:this={sceneRef} 
			rawPositionData = {data}
		/>
	</View>
</CanvasPortal>
