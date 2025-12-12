<!--
Pile webpage. Combines PileUI and PileScene.
-->

<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene } from '$lib/pile';
	import PileUI from '$lib/pile/components/pileUI.svelte';

	//export let data; Where the +page.server.ts returns when the load() function is called
	export let data; 
	let pileSceneRef: PileScene;

</script>

<PileUI pileSceneRef={pileSceneRef}/>

<CanvasPortal>
		<PileScene 
			bind:this={pileSceneRef} 
			rawPositionData = {data}
		/>
</CanvasPortal>
