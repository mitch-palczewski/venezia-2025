<script lang="ts">
	import { useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, ProjectedElementFrameModel } from '$lib/features';
	import ElementFrame from '$lib/features/element-frame/ElementFrame.svelte';

	const viewport = useViewport();
	const vpProjector = useViewportProjector();
	const aspectStage = new AspectStageModel(viewport, 0.03);
	const aspectProjector = new CoordinateProjector(aspectStage.bounds);

	const element = new ProjectedElementFrameModel(
		{
			x: 100,
			y: 100,
			anchor: 'NE'
		},
		aspectProjector
	);
	const element2 = new ProjectedElementFrameModel(
		{
			x: 100,
			y: 1100,
			anchor: 'SW'
		},
		aspectProjector
	);
</script>

<AspectStage model={aspectStage} class="bg-slate-500" clipContent={false}>
	<ElementFrame projectorModel={element} class="bg-blue-500 ">hello world</ElementFrame>

	<ElementFrame projectorModel={element2} class="bg-red-500 ">hello world2</ElementFrame>
</AspectStage>
