<script lang="ts">
	import { CanvasScaler, useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, MovableFrame, ScalerStage } from '$lib/features';
	import MovableImageFrame from '$lib/features/frame/moveable-frame/MovableImageFrame.svelte';
	import BoxView from '$lib/features/pile-home/BoxView.svelte';
	import Grid from '$lib/features/pile-home/Grid.svelte';
	import ProjectedStage from '$lib/features/stages/projected-stage/ProjectedStage.svelte';

	const viewportProjector = useViewportProjector();
	const viewport = useViewport();
	const canvasScaler = new CanvasScaler(viewport);
	const aspectStage = new AspectStageModel(viewport, 0.02 * viewport.areaTier);
	const aspectProjector = new CoordinateProjector(aspectStage);
</script>

<div class="fixed inset-0 h-screen w-screen overflow-x-hidden">
	<MovableFrame
		position={{ x: 854, y: 30 }}
		showTransformGizmo={false}
		anchor="NW"
		class="text-7xl text-cyan-800"
		projector={viewportProjector}
		>Pile Pile Pile
	</MovableFrame>
	<MovableFrame
		position={{ x: 863, y: 455 }}
		showTransformGizmo={false}
		anchor="NW"
		class="text-7xl text-cyan-950"
		projector={viewportProjector}
		>Pile Pile Pile
	</MovableFrame>
	<AspectStage model={aspectStage}>
		<ProjectedStage projector={aspectProjector}>
			<MovableImageFrame
				position={{ x: 600, y: 600 }}
				anchor="SW"
				width={200 * canvasScaler.scale}
				src={'/gifs/Ibix_01_preview2.gif'}
			></MovableImageFrame>
			<MovableImageFrame
				src="/media/Cover_v4.1.png"
				alt="cover"
				position={{ x: 40, y: -10 }}
				width={400 * canvasScaler.scale}
				class='border-10 border-b-cyan-600 border-t-cyan-800 border-l-cyan-700 border-r-cyan-700 p-2'
			>
				<div class="flex h-full w-full items-center justify-center pt-30 ml-20 mt-20">
					<a
						href="/3d/pile"
						target="_blank"
						rel="noopener noreferrer"
						class="shadow-2xl shadow-blue-950 pointer-events-auto inline-flex cursor-pointer items-center justify-center border-3 border-stone-400 bg-pink-800/90 p-5 text-lg font-semibold text-white transition-colors duration-200 hover:bg-neutral-700 sm:text-4xl"
					>
						Enter Pile 3D
					</a>
				</div>
			</MovableImageFrame>
		</ProjectedStage>
		<Grid></Grid>
	</AspectStage>


	<MovableFrame
		position={{ x: 860, y: 200}}
		projector={viewportProjector}
		showTransformGizmo={false}
		anchor="NW"
		class="text-7xl text-cyan-300"
		>Pile Pile Pile
	</MovableFrame>

	<BoxView 
	resolution={200} 
	backImg={'/media/veniceBW.JPG'}
	bottomImg={'/media/waterBW2.JPG'}
	/>
	<div class="w-screen h-5 bg-neutral-700"></div>
	<BoxView 
	resolution={200} 
	backImg={'/media/veniceBW.JPG'}
	bottomImg={'/media/waterBW2.JPG'}
	/>
</div>
