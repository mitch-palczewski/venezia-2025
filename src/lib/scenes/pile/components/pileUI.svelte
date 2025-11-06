<script lang="ts">
    import { PileScene, uploadData, type PilePositionData } from '$lib/scenes/pile';

    let {pileSceneRef} = $props()
    async function uploadDataFactory(){
		const positions:PilePositionData = pileSceneRef.getPositions()
		uploadData(positions)
	}
</script>

<div class="absolute top-[80vh]">
	<button
		onclick={uploadDataFactory}
		class="relative rounded bg-red-600 px-4 py-2 w-auto h-auto text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
		>Upload Position Data</button
	>
</div>