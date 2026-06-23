<script lang="ts">
	import { DeviceContext } from '$lib/core';
	const deviceContext = new DeviceContext();
    const viewport = deviceContext.viewport
</script>

{#snippet viewportSection()}
	<p>Viewport</p>
	<div class="flex flex-wrap gap-4">
		<div class="border p-1">
			<p>Size</p>
			<p>Width: {viewport.width}</p>
			<p>Height: {viewport.height}</p>
            <p>Area: {viewport.area}</p>
		</div>
		<div class="border p-1">
			<p>Area Tier: {viewport.areaTier}</p>
            <p>Shortest Edge Tier: {viewport.shortestEdgeTier}</p>
            <p>Width Tier: {viewport.widthTier}</p>
		</div>
        <p>Orientation: {viewport.orientation}</p>
		<div class="border p-1">
            <p>Raw Ratio: {viewport.rawRatio}</p>
            <p>Closest Common Ratio: {viewport.closestCommonRatio}</p>
		</div>
	</div>
{/snippet}

<div class="p-4">
	{@render viewportSection()}
</div>
