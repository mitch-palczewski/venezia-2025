<script lang="ts">
	import CanvasNode from '$lib/components/CanvasNode.svelte';
	import CanvasButton from '$lib/components/CanvasButton.svelte';
	import CanvasToolbar from '$lib/components/CanvasToolbar.svelte';
	import { useViewport } from '$lib/core/viewport/viewport.context.svelte';
	

	const canvasViewport = useViewport()
</script>

<div class="relative w-screen h-screen bg-gray-50 overflow-hidden font-sans">
	
	<div class="p-10 flex flex-wrap gap-8">
		<CanvasNode viewport={canvasViewport} title="Database Node" status="active">
			<p class="mb-[1em]">This entire element scales smoothly down on mobile viewports and scales up on ultra-wide screens.</p>
			<CanvasButton viewport={canvasViewport} variant="primary" class="w-full">
				View Metrics
			</CanvasButton>
		</CanvasNode>

		<CanvasNode viewport={canvasViewport} title="Auth Service" status="error">
			<p>Connection timed out while trying to reach authorization cluster handshake parameters.</p>
		</CanvasNode>
	</div>

	<CanvasToolbar 
		viewport={canvasViewport} 
		onZoomIn={() => console.log('zoom+')} 
		onZoomOut={() => console.log('zoom-')}
	/>
</div>