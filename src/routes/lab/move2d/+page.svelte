<script lang="ts">
	import { Viewport, VirtualStage } from "$lib/core";
	import Container from "$lib/features/canvas-2d/container/Container.svelte";
	import { ContainerModel } from "$lib/features/canvas-2d/container/containerModel.svelte";
	import EnterPile3DContainer from "$lib/features/pile-home/EnterPile3DContainer.svelte";
	import SpinningIbex from "$lib/features/pile-home/SpinningIbex.svelte";

    const viewport = new Viewport()
    const stage = new VirtualStage(viewport, .04)

    // 1. Instantiate a single model directly in local state
    const testContainer = new ContainerModel({
        x: 200,
        y: 200,
        width: 300,
        height: 200,
        zIndex: 10
    });
    const testContainer2 = new ContainerModel({
        x: 59,
        y: 446,
        width: 300,
        height: 200,
        zIndex: 10
    });


</script>

<div class="relative w-screen h-screen bg-slate-900 overflow-hidden text-white flex flex-col justify-between p-6 select-none">
    
    <div 
        class="absolute border-2 border-dashed border-emerald-500/30 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.6)] rounded-sm pointer-events-none"
        style="
            left: {stage.x}px; 
            top: {stage.y}px; 
            width: {stage.width}px; 
            height: {stage.height}px;
        "
    >
        <div class="absolute -top-6 left-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded font-mono">
            VIRTUAL STAGE CANVAS ({viewport.closestCommonRatio})
        </div>
    </div>


    <EnterPile3DContainer/>

    <SpinningIbex/>

    <Container 
        container={testContainer} 
        onSelect={() => {
            console.log('Container body or axis arrow was clicked!');
        }}
    >
        <div class="  z-50 bg-slate-900/90 backdrop-blur border border-slate-800 p-4 rounded-xl shadow-2xl text-xs space-y-2 pointer-events-none0">
        <h3 class="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">System Diagnostics</h3>
        <hr class="border-slate-800" />
        <div><span class="text-slate-400">Viewport:</span> {viewport.width}px × {viewport.height}px</div>
        <div><span class="text-slate-400">Raw Ratio:</span> {viewport.rawRatio.toFixed(3)}</div>
        <div><span class="text-slate-400">Orientation:</span> <span class="capitalize text-sky-400">{viewport.orientation}</span></div>
        <hr class="border-slate-800" />
        <div><span class="text-slate-400">Stage Snap Target:</span> <span class="font-bold text-yellow-400">{viewport.closestCommonRatio}</span></div>
        <div><span class="text-slate-400">Stage Bounds:</span> {Math.round(stage.width)}px × {Math.round(stage.height)}px</div>
        <div><span class="text-slate-400">Stage Offset:</span> X: {Math.round(stage.x)}px | Y: {Math.round(stage.y)}px</div>
    </div>
    </Container>
    <Container 
        container={testContainer2} 
        onSelect={() => {
            console.log('Container body or axis arrow was clicked!');
        }}
    >
        <div class="flex flex-col h-full justify-between p-1">
            <div>
                <h4 class="font-bold text-sm text-slate-100">Isolated Test Unit</h4>
                <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                    Test body dragging by pulling anywhere here. Test constrained axis alignment by pulling the red or green arrows.
                </p>
            </div>

            <div class="grid grid-cols-2 gap-2 bg-slate-950/60 p-2 rounded border border-slate-800 font-mono text-[11px]">
                <div class="text-slate-400">X: <span class="text-red-400 font-bold">{Math.round(testContainer2.x)}px</span></div>
                <div class="text-slate-400">Y: <span class="text-green-400 font-bold">{Math.round(testContainer2.y)}px</span></div>
            </div>
        </div>
    </Container>

</div>