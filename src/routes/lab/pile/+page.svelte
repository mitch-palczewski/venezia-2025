<script lang="ts">
	import { useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, MovableFrame } from '$lib/features';
	import MovableImageFrame from '$lib/features/frame/moveable-frame/MovableImageFrame.svelte';
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
		<MovableImageFrame
			position={{ x: 600, y: 600 }}
			anchor="SW"
			width={150}
			src={'/gifs/Ibix_01_preview2.gif'}
		></MovableImageFrame>
		<MovableImageFrame
			src="/media/Cover_v4.1.png"
			alt="cover"
			position={{ x: 60, y: 110 }}
			width={300}
		>
			<div class="flex h-full w-full items-center justify-center pt-30">
				<a
					href="/3d/pile"
					target="_blank"
					rel="noopener noreferrer"
					class="pointer-events-auto inline-flex cursor-pointer items-center justify-center border-3 border-amber-600 bg-pink-800 px-5 py-3 text-4xl font-semibold text-white shadow-md transition-colors duration-200 hover:bg-neutral-700"
				>
					Enter Pile 3D
				</a>
			</div>
		</MovableImageFrame>
		<MovableFrame
			position={{ x: 5, y: -55 }}
			showTransformGizmo={false}
			anchor="NW"
			class="text-7xl text-slate-800"
			>Pile Pile Pile
		</MovableFrame>
		<MovableFrame
			position={{ x: 0, y: -50 }}
			showTransformGizmo={false}
			anchor="NW"
			class="text-7xl text-amber-300"
			>Pile Pile Pile
		</MovableFrame>
	</ProjectedStage>
	<Grid></Grid>
</AspectStage>

<BoxView></BoxView>
