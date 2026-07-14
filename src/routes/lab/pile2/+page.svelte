<script lang="ts">
	import { CanvasScaler, useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, Frame, MovableFrame, ScalerStage } from '$lib/features';
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
	
	<AspectStage model={aspectStage}>
		<ProjectedStage projector={aspectProjector}>
			<MovableImageFrame
				position={{ x: 750, y: 50 }}
				anchor="SW"
				width={250 * canvasScaler.scale}
				src={'/gifs/Ibix_01_preview2.gif'}
			></MovableImageFrame>
			<MovableImageFrame
				position={{ x: 150, y: 600 }}
				anchor="SW"
				showTransformGizmo={false}
				width={60 * canvasScaler.scale}
				src={'/media/VEN_Stock_01_preview1.png'}
			></MovableImageFrame>

			<MovableFrame
				position={{ x: 360, y: 1010 }}
				showTransformGizmo={false}
				anchor="NW"
				class=""
				projector={viewportProjector}
			>
				<div class="border-5 border-cyan-900 bg-white">
					<div class="text-xl text-cyan-950 sm:text-4xl">POUR OUT OF THE ABYSS</div>
					<div>
						Pilepilepile is a projected, participatory web 3D open-world, where visitors are invited
						to wander and edit a digital community garden, building spaces and reconstituting unique
						stories from the artists’ growing bootleg collection, an archive of accumulated
						iconography and assets. The journey is unconstrained by scale and weight, yet its
						objects become familiar through available actions. A personal map evolves out of
						floating translations.
					</div>
				</div>
			</MovableFrame>
		
			<MovableImageFrame
				position={{ x: 10, y: 200 }}
				anchor="SW"
				showTransformGizmo={false}
				width={80 * canvasScaler.scale}
				src={'/media/VEN_Stock_02_preview1.png'}
			></MovableImageFrame>
			
		</ProjectedStage>
	</AspectStage>





	<BoxView resolution={200} backImg={'/resources/sculpt-wall02.png'} bottomImg={'/media/waterBW2.JPG'} />
	<div class=" h-[200%] bg-cyan-950" style={`background-image: url('/media/waterBW2.JPG');`}></div>
	<div
		class=" h-[150%] bg-cyan-950"
		style={`background-image: url('/media/waterBW-shield-man.JPG');`}
	></div>
</div>
