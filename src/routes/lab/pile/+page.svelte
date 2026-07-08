<script lang="ts">
	import { useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, MovableFrame } from '$lib/features';
	import BoxView from '$lib/features/pile-home/BoxView.svelte';
	import Grid from '$lib/features/pile-home/Grid.svelte';
	import ProjectedStage from '$lib/features/stages/projected-stage/ProjectedStage.svelte';

	const viewportProjector = useViewportProjector();
	const viewport = useViewport();
	const aspectStage = new AspectStageModel(viewport, 0.1);
	const aspectStage2 = new AspectStageModel(viewport, 0.3);
	const aspectProjector = new CoordinateProjector(aspectStage);
</script>

<AspectStage model={aspectStage}>
	<ProjectedStage projector={aspectProjector}>
		<MovableFrame position={{ x: 20, y: 110 }}  anchor="NW" width={300}>
			<img src="/media/Cover_v4.1.png" alt="cover" />
		</MovableFrame>
		<MovableFrame position={{ x: 0, y: -50 }} showTransformGizmo={false} anchor="NW" class="text-7xl text-amber-300"
			>Pile Pile Pile
		</MovableFrame>
	</ProjectedStage>
	<Grid></Grid>
</AspectStage>

<BoxView></BoxView>
