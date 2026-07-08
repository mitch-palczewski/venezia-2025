<script lang="ts">
	import type { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { setProjectorContext } from '$lib/core/projector/projector.context.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		projector: CoordinateProjector;
		children?: Snippet;
	}
	let { projector, children }: Props = $props();

    setProjectorContext(projector)
</script>

<div>
	{#if children}
		{@render children()}
	{/if}
</div>
