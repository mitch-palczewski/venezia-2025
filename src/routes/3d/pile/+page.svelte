<script lang="ts">
	import CanvasPortal from '$lib/components/3d-canvas/CanvasPortal.svelte';
	import { PileScene, type PileData } from '$lib/pile';
	import Pile2DElements from '$lib/pile/components/Pile2DElements.svelte';
	import type { PileDatabaseObj } from '$lib/pile/util/api/pileDatabase';
	import { UiState } from '$lib/pile/util/ui/uiState.svelte.js';
	import { onDestroy } from 'svelte';

	type Props = {
		data: PileData
	};
	let { data }: Props = $props();
	let pileSceneRef = $state<PileScene>();
	const uiState = new UiState();
	onDestroy(() => {
		uiState.showCursor = true;
	});
</script>

<div bind:this={uiState.canvasContainer}>
	<CanvasPortal>
		<PileScene bind:this={pileSceneRef} {data} {uiState} />
	</CanvasPortal>
</div>

<Pile2DElements {pileSceneRef} {uiState} />

<style>
	:global(body.no-cursor),
	:global(body.no-cursor *) {
		cursor: none !important;
	}
</style>
