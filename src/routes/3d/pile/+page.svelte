<script lang="ts">
	import { page } from '$app/state';
	import CanvasPortal from '$lib/3d/core/3d-canvas/CanvasPortal.svelte';
	import { DeviceContext, type PerformanceTier } from '$lib/dom/core';
	import { PileScene, type PileData } from '$lib/pile';
	import MiniMap from '$lib/pile/components/mini-map/MiniMap.svelte';
	import Pile2DElements from '$lib/pile/core/Pile2DElements.svelte';
	import { PilePerformance } from '$lib/pile/util/pilePerformance.svelte';
	import { UiState } from '$lib/pile/util/ui/uiState.svelte.js';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		data: PileData;
	};
	let { data }: Props = $props();
	let pileSceneRef = $state<PileScene>();

	let query = $derived(page.url.searchParams.get('p'));
	let override: PerformanceTier | undefined = undefined
	// svelte-ignore state_referenced_locally
	if(query){
		switch(query){
			case '0':
				override = 0
				break
			case '1':
				override = 1
				break;
			case '2':
				override = 2
				break
			case '3':
				override = 3
				break
			case '4': 
				override = 4
				break
			
		}
	}

	const deviceContext = new DeviceContext(override);
	const performance = new PilePerformance(deviceContext)
	const uiState = new UiState(deviceContext);

	onMount(() => {
		if (!deviceContext.isInitialized) {
			deviceContext.initalize();
		}
		uiState.performance = deviceContext.performance.performanceTier
	});
	onDestroy(() => {
		uiState.showCursor = true;
		deviceContext.destroy();
	});
</script>

<div bind:this={uiState.canvasContainer}>
	<CanvasPortal>
		<PileScene bind:this={pileSceneRef} {data} {uiState} {performance} objectControls="drag"/>
	</CanvasPortal>
</div>

<MiniMap pileObjects={data.pileObjects} {uiState}/>

<Pile2DElements {pileSceneRef} {uiState} />

<style>
	:global(body.no-cursor),
	:global(body.no-cursor *) {
		cursor: none !important;
	}
</style>
