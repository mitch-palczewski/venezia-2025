<script lang="ts">
	import { DeviceContext } from '$lib/core';
	const deviceContext = new DeviceContext();
</script>

{#snippet viewport()}
	<p>Viewport</p>
	<div class="flex flex-wrap gap-4">
		<div class="border p-1">
			<p>Size</p>
			<p>Width: {deviceContext.viewport.width}</p>
			<p>Height: {deviceContext.viewport.height}</p>
            <p>Area: {deviceContext.viewport.area}</p>
		</div>

		<div class="border p-1">
			<p>Break Points</p>
			
		</div>
        <p>Orientation: {deviceContext.viewport.orientation}</p>
		<div class="grid grid-cols-2 border p-1">
		
		</div>
	</div>
{/snippet}

<div class="p-4">
	{@render viewport()}
</div>
