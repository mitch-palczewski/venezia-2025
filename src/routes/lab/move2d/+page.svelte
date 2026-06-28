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


</script>

<div class="relative w-screen h-screen bg-slate-900 overflow-hidden text-white flex flex-col justify-between p-6 select-none">
    


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