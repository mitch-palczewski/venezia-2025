<script lang="ts">
	import CanvasPrimitive from './CanvasPrimitive.svelte';
	import CanvasButton from './CanvasButton.svelte';
	import type { Viewport } from '$lib/core';

	interface Props {
		viewport: Viewport;
		onZoomIn?: () => void;
		onZoomOut?: () => void;
		onReset?: () => void;
	}

	let { viewport, onZoomIn, onZoomOut, onReset }: Props = $props();
</script>

<CanvasPrimitive
	as="nav"
	{viewport}
	class="absolute bottom-[2em] left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md
	       p-[0.5em] rounded-[0.8em] flex items-center gap-[0.4em] 
	       shadow-[0_1em_3em_rgba(0,0,0,0.3)] border border-white/10"
>
	<CanvasButton {viewport} variant="secondary" onclick={onZoomOut} class="bg-transparent border-0 text-white hover:bg-white/10 p-[0.5em]">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[1.2em] h-[1.2em]">
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
		</svg>
	</CanvasButton>

	<CanvasButton {viewport} variant="secondary" onclick={onReset} class="text-xs bg-white/10 border-0 text-gray-300 hover:bg-white/20 py-[0.4em] px-[0.8em]">
		{Math.round((viewport.shortestEdge / 900) * 100)}%
	</CanvasButton>

	<CanvasButton {viewport} variant="secondary" onclick={onZoomIn} class="bg-transparent border-0 text-white hover:bg-white/10 p-[0.5em]">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-[1.2em] h-[1.2em]">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
	</CanvasButton>
</CanvasPrimitive>