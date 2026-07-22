<!--
	Portals Scenes onto a genaric Canvas. Maintains a singular Canvas Context.
-->
<script lang="ts">
	import CanvasPortalTarget from '$lib/components/3d-canvas/CanvasPortalTarget.svelte';
	import { initInputs } from '$lib/pile/components/controls/inputs/useInputs';
	import { Canvas } from '@threlte/core';
	import type { Snippet } from 'svelte';
	initInputs()
	let { children }: { children: Snippet } = $props();
</script>

<div id="canvasContainer">
	<Canvas>
      <CanvasPortalTarget />
	</Canvas>
</div>

{@render children()}

<style>
	#canvasContainer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
