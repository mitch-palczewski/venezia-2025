<script lang="ts">
	import { CanvasScaler, useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { useViewportProjector } from '$lib/core/projector/projector.context.svelte';
	import { AspectStage, AspectStageModel, Frame, MovableFrame, ScalerStage } from '$lib/features';
	import MovableImageFrame from '$lib/features/frame/moveable-frame/MovableImageFrame.svelte';
	import ArrowGizmo from '$lib/features/frame/moveable-frame/transform-gizmo/ArrowGizmo.svelte';
	import BoxView from '$lib/features/pile-home/BoxView.svelte';
	import Grid from '$lib/features/pile-home/Grid.svelte';
	import ProjectedStage from '$lib/features/stages/projected-stage/ProjectedStage.svelte';

	const viewportProjector = useViewportProjector();
	const viewport = useViewport();
	const canvasScaler = new CanvasScaler(viewport);
	const aspectStage = new AspectStageModel(viewport, 0.02 * viewport.areaTier);
	const aspectProjector = new CoordinateProjector(aspectStage);

	let hasPulled = $state(false);
	let hasClicked1 = $state(false);
    let hasClicked2 = $state(false);

	function setHasPulled() {
		setTimeout(() => {
			hasPulled = true;
		}, 3000);
	}
	function setHasClicked() {
		setTimeout(() => {
			hasClicked1 = true;
		}, 1000);
        setTimeout(() => {
			hasClicked2 = true;
		}, 2000);
	}
</script>

<div class="fixed inset-0 h-screen w-screen overflow-x-hidden overflow-y-hidden">
	

	<MovableFrame
		position={{ x: 360, y: 850 }}
		showTransformGizmo={true}
		anchor="NW"
		class=""
		draggable={false}
		projector={viewportProjector}
		onSelect={setHasPulled}
		transformGizmoOptions={{
			arrowGizmoProps: {
				length: 20,
				width: 5,
				padding: 3,
				headSize: 20
			}
		}}
	>
		<div class="max-w-[30dvw] border-5 border-cyan-900 bg-white">
			<div class="pb-3 text-xl text-cyan-950 sm:text-4xl">What if i pull on this arrow thingy?</div>
			<div>
				You are lucky it is only text that rises out of the abyss. It could have been much worse.
				What if you pulled out an anglerfish, a spooky device or worse pure dispair. What would you
				do then? probably freak out I think. Good guess right. They say it is unlucky to freak out
				when surfing the internet. Why are you here any way and still reading this you should be
				clicking more buttons and I should be telling you which buttons to click. this is a tutorial
				for gods sake. get it together.
			</div>
		</div>
	</MovableFrame>

	{#if hasPulled}
		<MovableFrame
			position={{ x: 100, y: 450 }}
			togglableTransformGizmo={true}
			showTransformGizmo={false}
			draggable={false}
			anchor="NW"
			class=""
			projector={viewportProjector}
			onSelect={setHasClicked}
			transformGizmoOptions={{
				arrowGizmoProps: {
					length: 20,
					width: 5,
					padding: 3,
					headSize: 20
				}
			}}
		>
			<div class="max-w-[30dvw] border-5 border-cyan-900 bg-white">
				<div class="pb-3 text-xl text-cyan-950 sm:text-xl">
					Why are there no arrows to yank on this one? Maybe I should click this ? hmmmm
				</div>
				<div>
					Another lucky pull. No mosters, no freak object. You are lucky and should feel lucky.
				</div>
				{#if hasClicked1}
					<div>
						Who would design this without transform gizmos. seems cruel to make your users click
						this click that. who knows what they will have to click next. How about the user writes
						the program and be done with all this.That seems reasonable
					</div>
				{/if}
			</div>
		</MovableFrame>
	{/if}

    <AspectStage model={aspectStage}>
		<ProjectedStage projector={aspectProjector}>
			{#if hasClicked2}
				<MovableImageFrame
					position={{ x: 20, y: 90 }}
                    showTransformGizmo={false}

					draggable={false}
					anchor="SW"
					width={400 * canvasScaler.scale}
					src={'/gifs/Misc_05_preview2.gif'}
				></MovableImageFrame>
                <MovableImageFrame
					position={{ x: 400, y: 60 }}
					draggable={false}
                    			showTransformGizmo={false}

					anchor="SW"
					width={350 * canvasScaler.scale}
					src={'/gifs/Shield_Man_preview2.gif'}
				></MovableImageFrame>
                <MovableImageFrame
					position={{ x: 750, y: 50 }}
					draggable={false}
					anchor="SW"
					width={250 * canvasScaler.scale}
					src={'/gifs/Ibix_01_preview2.gif'}
				></MovableImageFrame>
                {/if}
                {#if hasClicked1}
                    <MovableImageFrame
					position={{ x: 150, y: 600 }}
					draggable={false}
					anchor="SW"
					showTransformGizmo={true}
					width={60 * canvasScaler.scale}
					src={'/media/VEN_Stock_01_preview1.png'}
				></MovableImageFrame>
				<MovableImageFrame
					position={{ x: 10, y: 200 }}
					draggable={false}
					anchor="SW"
					showTransformGizmo={true}
					width={80 * canvasScaler.scale}
					src={'/media/VEN_Stock_02_preview1.png'}
				></MovableImageFrame>
                {/if}
				
			
		</ProjectedStage>
	</AspectStage>

	{#if hasClicked1}
		<MovableFrame
			position={{ x: 650, y: 250 }}
			togglableTransformGizmo={true}
			showTransformGizmo={true}
			draggable={false}
			anchor="NW"
			class=""
			projector={viewportProjector}
			onSelect={setHasClicked}
			transformGizmoOptions={{
				arrowGizmoProps: {
					length: 20,
					width: 5,
					padding: 3,
					headSize: 20
				}
			}}
		>
			<div class="max-w-[30dvw] border-5 border-cyan-900 bg-white">
				<div class="pb-3 text-xl text-cyan-950 sm:text-2xl">
					Ahhh the Monsters have finally arrived. Hey Now ! Time to boogy out of here. Jump through
					
				</div>
				<div
					class="relative border-10 border-black/50 opacity-90 hover:border-black hover:opacity-100 max-h-[30dvw]"
				>
					<a href="/3d/pile" target="_blank" rel="noopener noreferrer">
						<img
							src="/gifs/portal.gif"
							alt=""
							class="absolute h-full w-full rounded border-6 border-black/70 object-contain opacity-20 "
						/>
						<img src="/gifs/pileflythrough.gif" alt="" class="h-full w-full" />

						<div class="absolute top-0 h-full w-full p-5 text-2xl text-white md:text-4xl">
							Enter <br /> PILE PILE PILE
						</div>
					</a>
				</div>
			</div>
		</MovableFrame>
	{/if}

	<BoxView
		resolution={200}
		backImg={'/resources/sculpt-wall02.png'}
		bottomImg={'/media/waterBW2.JPG'}
	/>
</div>
