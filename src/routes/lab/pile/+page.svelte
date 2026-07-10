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
		class="text-4xl text-cyan-800 sm:text-7xl"
		projector={viewportProjector}
		>pile pile pile
	</MovableFrame>
	<MovableFrame
		position={{ x: 863, y: 455 }}
		showTransformGizmo={false}
		anchor="NW"
		class="text-4xl text-cyan-950 sm:text-7xl"
		projector={viewportProjector}
		>POUR OUT OF THE ABYSS
	</MovableFrame>
	<AspectStage model={aspectStage}>
		<ProjectedStage projector={aspectProjector}>
			<MovableImageFrame
				position={{ x: 600, y: 450 }}
				anchor="SW"
				width={250 * canvasScaler.scale}
				src={'/gifs/Ibix_01_preview2.gif'}
			></MovableImageFrame>
			<MovableImageFrame
				position={{ x: 190, y: 800 }}
				anchor="SW"
				showTransformGizmo={false}
				width={80 * canvasScaler.scale}
				src={'/media/VEN_Stock_01_preview1.png'}
			></MovableImageFrame>

			<MovableFrame
				position={{ x: 360, y: 80 }}
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
				src="/gifs/pileflythrough.gif"
				alt="cover"
				position={{ x: -10, y: -10 }}
				width={500 * canvasScaler.scale}
				showTransformGizmo={false}
				class="border-10 border-t-cyan-950 border-r-cyan-800 border-b-cyan-600 border-l-cyan-800 hover:border-cyan-300"
			>
				<a href="/3d/pile" target="_blank" rel="noopener noreferrer">
					<img src="/gifs/portal.gif" alt="" class="h-full w-full object-contain opacity-30" />
					<div class="absolute top-0 h-full w-full p-5 text-4xl text-white">
						Enter <br /> PILE PILE PILE
					</div>
				</a>
			</MovableImageFrame>
			<MovableImageFrame
				position={{ x: 400, y: 300 }}
				anchor="SW"
				showTransformGizmo={false}
				width={100 * canvasScaler.scale}
				src={'/media/VEN_Stock_02_preview1.png'}
			></MovableImageFrame>
		</ProjectedStage>
	</AspectStage>

	<MovableFrame
		position={{ x: 300, y: 1800 }}
		showTransformGizmo={false}
		anchor="NW"
		class=""
		projector={viewportProjector}
	>
		<div class="border-5 border-cyan-900 bg-white mr-3">
			<div class="text-xl text-cyan-950 sm:text-4xl">Prints</div>
			<div>
				The digital print series recasts the Pile objects, collapsed into the forced perspective of architecture as still images.  They invoke the involution and compression felt when walking the innards of Venice, where memory and movement become tightly woven.
			</div>
		</div>
	</MovableFrame>

	{#each Array.from({ length: 9 }) as _, i}
		<MovableImageFrame
			position={{
				x: Math.floor(Math.random() * 850 - 90),
				y: Math.floor(Math.random() * 1500) + 1200
			}}
			anchor="SW"
			projector={viewportProjector}
			showTransformGizmo={false}
			width={400 * canvasScaler.scale}
			src={`/images/prints/${i + 1}_LOD2.avif`}
			class="border-3 sm:border-15 border-black/50"
		></MovableImageFrame>
	{/each}

	<MovableFrame
		position={{ x: 860, y: 200 }}
		projector={viewportProjector}
		showTransformGizmo={false}
		anchor="NW"
		class="text-4xl text-cyan-300 sm:text-7xl"
		>PILE PILE PILE
	</MovableFrame>

	<BoxView resolution={200} backImg={'/media/veniceBW.JPG'} bottomImg={'/media/waterBW2.JPG'} />
	<div class=" h-[200%] bg-cyan-950" style={`background-image: url('/media/waterBW2.JPG');`}></div>
	<div
		class=" h-[150%] bg-cyan-950"
		style={`background-image: url('/media/waterBW-shield-man.JPG');`}
	></div>
</div>
