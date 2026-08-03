<script lang="ts">
	import CanvasPortal from '$lib/3d/core/3d-canvas/CanvasPortal.svelte';
	import { DeviceContext } from '$lib/dom/core';
	import { Lodge } from '$lib/lodge/Lodge.svelte';
	import Lodge2D from '$lib/lodge/Lodge2D.svelte';
	import Lodge3D from '$lib/lodge/Lodge3D.svelte';
	import { onDestroy, onMount } from 'svelte';


	let canvasContainer

	const deviceContext = new DeviceContext();
	const lodge = new Lodge();


	onMount(() => {
		if (!deviceContext.isInitialized) {
			deviceContext.initalize();
		}
	});
	onDestroy(() => {
		deviceContext.destroy();
	});
</script>

<div bind:this={canvasContainer}>
	<CanvasPortal>
		<Lodge3D {lodge}/>
	</CanvasPortal>
</div>

<Lodge2D {lodge}/>

<style>
	:global(body.no-cursor),
	:global(body.no-cursor *) {
		cursor: none !important;
	}
</style>
