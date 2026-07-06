<script lang="ts">
	import { useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, ProjectedFrameModel } from '$lib/features';
	import Frame from '$lib/features/frame/Frame.svelte';

	const viewport = useViewport();
	const vpProjector = useViewportProjector();
	const aspectStage = new AspectStageModel(viewport, 0.03);
	const aspectProjector = new CoordinateProjector(aspectStage.bounds);

	const element = new ProjectedFrameModel(
		{
			x: 100,
			y: 100,
			anchor: 'NE'
		},
		aspectProjector
	);
	const element2 = new ProjectedFrameModel(
		{
			x: 100,
			y: 1100,
			anchor: 'SW'
		},
		aspectProjector
	);
</script>

<AspectStage model={aspectStage} class="bg-slate-500" clipContent={false}>
	<Frame projectorModel={element} class="bg-blue-500 ">hello world</Frame>
	<Frame projectorModel={element2} class="bg-red-500 ">hello world2</Frame>
</AspectStage>
