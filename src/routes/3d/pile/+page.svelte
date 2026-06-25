<script lang="ts">
	import CanvasPortal from '$lib/components/3d-canvas/CanvasPortal.svelte';
	import { DeviceContext } from '$lib/core';
	import { PileScene, type PileData } from '$lib/pile';
	import Pile2DElements from '$lib/pile/components/Pile2DElements.svelte';
	import { PilePerformance } from '$lib/pile/util/pilePerformance.svelte';
	import { UiState } from '$lib/pile/util/ui/uiState.svelte.js';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		data: PileData;
	};
	let { data }: Props = $props();
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
		<PileScene bind:this={pileSceneRef} {data} {uiState} {performance} />
	</CanvasPortal>
</div>

<Pile2DElements {pileSceneRef} {uiState} />

<style>
	:global(body.no-cursor),
	:global(body.no-cursor *) {
		cursor: none !important;
	}
</style>
