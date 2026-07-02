<script lang="ts">
	import { useViewport } from "$lib/core";
	import { CoordinateProjector } from "$lib/core/viewport/coordinateProjector.svelte";

    // 1. Initialize your state
    let viewport = useViewport();
    let projector = new CoordinateProjector(viewport, 1000);

    // 2. Mouse tracking for live conversion demo
    let mouse = $state({ x: 0, y: 0 });
    let virtualPos = $derived(projector.toVirtual(mouse));

    // 3. Compute the step sizing based on a 20x20 grid matrix
    const gridCount = 20;
    const stepX = $derived(projector.virtualResolution / gridCount); // 1000 / 20 = 50 units
    const stepY = $derived(projector.virtualResolution / gridCount); // 1000 / 20 = 50 units

    // 4. Generate data array representing the 20x20 matrix structure
    const gridCells = Array.from({ length: gridCount * gridCount }, (_, i) => {
        const col = i % gridCount;
        const row = Math.floor(i / gridCount);
        return { col, row };
    });
</script>

<svelte:window onmousemove={(e) => mouse = { x: e.clientX, y: e.clientY }} />

<main class="relative h-screen w-screen overflow-hidden bg-slate-900 text-white font-sans select-none">
    
    <div class="absolute left-6 top-6 z-50 space-y-2 rounded-xl bg-slate-950/80 border border-slate-800 p-5 font-mono text-xs shadow-2xl backdrop-blur-md w-72">
        <h2 class="font-bold text-sm text-blue-400 flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            CoordinateProjector Monitor
        </h2>
        <div class="space-y-1 text-slate-400">
            <p><span class="text-slate-500">Viewport:</span> {viewport.width.toFixed(0)}px × {viewport.height.toFixed(0)}px</p>
            <p><span class="text-slate-500">Virtual Bounds:</span> 0 → {projector.virtualResolution}</p>
            <p><span class="text-slate-500">Scale X:</span> {projector.scaleX.toFixed(4)} px/unit</p>
            <p><span class="text-slate-500">Scale Y:</span> {projector.scaleY.toFixed(4)} px/unit</p>
        </div>
        <hr class="border-slate-800 my-2" />
        <div class="space-y-1">
            <p class="text-amber-400"><span class="text-slate-500">Mouse (Px):</span> X: {mouse.x}, Y: {mouse.y}</p>
            <p class="text-emerald-400 font-bold"><span class="text-slate-500">Virtual:</span> X: {virtualPos.x.toFixed(1)}, Y: {virtualPos.y.toFixed(1)}</p>
        </div>
    </div>

    <div 
        class="absolute inset-0 grid w-full h-full bg-slate-950/20"
        style="
            grid-template-columns: repeat({gridCount}, minmax(0, 1fr));
            grid-template-rows: repeat({gridCount}, minmax(0, 1fr));
        "
    >
        {#each gridCells as cell}
            {@const cellVirtualX = cell.col * stepX}
            {@const cellVirtualY = cell.row * stepY}
            
            <div class="group relative border border-slate-800/40 hover:border-blue-500/40 hover:bg-slate-800/20 transition-colors duration-150 flex flex-col box-border">
                
                <span class="text-[9px] font-mono text-slate-600 group-hover:text-blue-400 transition-colors pointer-events-none">
                    {cellVirtualX},{cellVirtualY}
                </span>


            </div>
        {/each}
    </div>

</main>