<script lang="ts">
	import CanvasPortal from '$lib/3d/core/3d-canvas/CanvasPortal.svelte';
	import { DeviceContext } from '$lib/dom/core';
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
	console.log("This is data" + data.pileObjects)
	let pileSceneRef = $state<PileScene>();

	const deviceContext = new DeviceContext();
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
		<PileScene bind:this={pileSceneRef} {data} {uiState} {performance} databaseName={'pile_objects_test'}/>
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
