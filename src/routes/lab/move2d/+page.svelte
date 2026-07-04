<script lang="ts">
	import EnterPile3DContainer from '$lib/features/pile-home/EnterPile3DContainer.svelte';
	import SpinningIbex from '$lib/features/pile-home/SpinningIbex.svelte';
	import AspectStage from '$lib/features/stages/aspect-stage/AspectStage.svelte';
	import { AspectStageModel } from '$lib/features/stages/aspect-stage/aspectStageModel.svelte';
	import { CanvasScaler, type ScalerConfig } from '$lib/core/viewport/canvasScaler.svelte';
	import ScalerStage from '$lib/features/stages/ScalerStage.svelte';
	import { useViewport } from '$lib/core';
	import { MovableElementFrame, MovableElementFrameModel } from '$lib/features';

	const viewport = useViewport();
	const stage = new AspectStageModel(viewport, 0.04);
	const scalorConfig: ScalerConfig = {
		referenceWidth: 1280,
		referenceHeight:720
	}
	const canvasScaler = new CanvasScaler(viewport,scalorConfig);

	const testContainer = new MovableElementFrameModel({
		x: 200,
		y: 200,
		width: 300,
		height: 200,
		zIndex: 10,
	});
	const testContainer2 = new MovableElementFrameModel({
		x: 59,
		y: 446,
		width: 300,
		height: 200,
		zIndex: 10,
	});
const gridCells = Array.from({ length: 400 }, (_, i) => i);
</script>

<div
	class="relative flex h-screen w-screen flex-col justify-between overflow-hidden bg-slate-800 p-6 text-white select-none"
>
	<AspectStage {stage} clipContent={false}>
	<div 
        class="grid w-full h-full gap-0" 
        style="grid-template-columns: repeat(20, 1fr); grid-template-rows: repeat(20, 1fr);"
    >
        {#each gridCells as cellId}
            <div 
                class="border-[0.5px] border-slate-800/50 hover:bg-sky-500/20 transition-colors duration-150 flex items-center justify-center text-[10px] text-slate-500 select-none"
            >
                {cellId}
            </div>
        {/each}
    </div>
	</AspectStage>

	<ScalerStage scaler={canvasScaler}>
		<EnterPile3DContainer />

		<SpinningIbex />

		<MovableElementFrame
			movableElement={testContainer}
			onSelect={() => {
				console.log('Container body or axis arrow was clicked!');
			}}
		>
			<div
				class="  pointer-events-none0 z-50 space-y-2 rounded-xl border border-slate-800 bg-slate-900/90 p-4 text-xs shadow-2xl backdrop-blur"
			>
				<h3 class="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
					System Diagnostics
				</h3>
				<hr class="border-slate-800" />
				<div>
					<span class="text-slate-400">Viewport:</span>
					{viewport.width}px × {viewport.height}px
				</div>
				<div><span class="text-slate-400">Raw Ratio:</span> {viewport.rawRatio.toFixed(3)}</div>
				<div>
					<span class="text-slate-400">Orientation:</span>
					<span class="text-sky-400 capitalize">{viewport.orientation}</span>
				</div>
				<hr class="border-slate-800" />
				<div>
					<span class="text-slate-400">Stage Snap Target:</span>
					<span class="font-bold text-yellow-400">{viewport.closestCommonRatio}</span>
				</div>
				<div>
					<span class="text-slate-400">Stage Bounds:</span>
					{Math.round(stage.width)}px × {Math.round(stage.height)}px
				</div>
				<div>
					<span class="text-slate-400">Stage Offset:</span> X: {Math.round(stage.x)}px | Y: {Math.round(
						stage.y
					)}px
				</div>
			</div>
		</MovableElementFrame>
		<MovableElementFrame
			movableElement={testContainer2}
			onSelect={() => {
				console.log('Container body or axis arrow was clicked!');
			}}
		>
			<div class="flex h-full flex-col justify-between p-1">
				<div>
					<h4 class="text-sm font-bold text-slate-100">Isolated Test Unit</h4>
					<p class="mt-1 text-xs leading-relaxed text-slate-400">
						Test body dragging by pulling anywhere here. Test constrained axis alignment by pulling
						the red or green arrows.
					</p>
				</div>

				<div
					class="grid grid-cols-2 gap-2 rounded border border-slate-800 bg-slate-950/60 p-2 font-mono text-[11px]"
				>
					<div class="text-slate-400">
						X: <span class="font-bold text-red-400">{Math.round(testContainer2.x)}px</span>
					</div>
					<div class="text-slate-400">
						Y: <span class="font-bold text-green-400">{Math.round(testContainer2.y)}px</span>
					</div>
				</div>
			</div>
		</MovableElementFrame>
	</ScalerStage>
</div>
