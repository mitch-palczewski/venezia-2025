<script lang="ts">
	import Container from "$lib/features/canvas-2d/container/Container.svelte";
	import { ContainerModel } from "$lib/features/canvas-2d/container/containerModel.svelte";
	import EnterPile3DContainer from "$lib/features/pile-home/EnterPile3DContainer.svelte";
	import SpinningIbex from "$lib/features/pile-home/SpinningIbex.svelte";


    // 1. Instantiate a single model directly in local state
    const testContainer = new ContainerModel({
        x: 200,
        y: 200,
        width: 300,
        height: 200,
        zIndex: 10
    });
    const testContainer2 = new ContainerModel({
        x: 500,
        y: 200,
        width: 300,
        height: 200,
        zIndex: 10
    });

    // 2. Track gizmo visibility locally
    let showGizmo = $state(true);
</script>

<div class="relative w-screen h-screen bg-slate-900 overflow-hidden text-white flex flex-col justify-between p-6 select-none">
    
    <div class="z-999 bg-slate-800/80 p-4 rounded-xl border border-slate-700 backdrop-blur shadow-xl max-w-sm">
        <h3 class="font-bold text-sm tracking-wide text-sky-400 uppercase mb-2">⚡ Quick Test Bench</h3>
        
        <label class="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-200 bg-slate-900/50 p-2 rounded border border-slate-700/50 hover:bg-slate-900 transition-colors">
            <input 
                type="checkbox" 
                bind:checked={showGizmo} 
                class="accent-sky-500 rounded"
            />
            Show Transform Gizmo Axis Arrows
        </label>
    </div>

    <EnterPile3DContainer/>

    <SpinningIbex/>

    <Container 
        container={testContainer} 
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
                <div class="text-slate-400">X: <span class="text-red-400 font-bold">{Math.round(testContainer.x)}px</span></div>
                <div class="text-slate-400">Y: <span class="text-green-400 font-bold">{Math.round(testContainer.y)}px</span></div>
            </div>
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