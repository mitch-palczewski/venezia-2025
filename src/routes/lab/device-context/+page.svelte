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
			<p>Area Tier: {viewport.areaTierText}</p>
            <p>Shortest Edge Tier: {viewport.shortestEdgeTierText}</p>
            <p>Width Tier: {viewport.widthTierText}</p>
		</div>
        
		<div class="border p-1">
            <p>Orientation: {viewport.orientation}</p>
            <p>Raw Ratio: {viewport.rawRatio}</p>
            <p>Closest Common Ratio: {viewport.closestCommonRatio}</p>
            <p>Closest Common Ratio Value: {viewport.closestCommonRatioValue}</p>
		</div>
	</div>
{/snippet}

<div class="p-4">
	{@render viewportSection()}
</div>
