<script lang="ts">
    import { useViewport } from "$lib/core";
    import { CoordinateProjector } from "$lib/core/viewport/coordinateProjector.svelte";
	import { MovableElementFrame, MovableElementFrameModel } from "$lib/features";
    import ProjectedElement from "$lib/features/element-frame/projected-element-frame/ProjectedElementFrame.svelte";
    import { ProjectedElementFrameModel } from "$lib/features/element-frame/projected-element-frame/projectedElementFrameModel.svelte";
    


    // 1. Initialize your projector state
    let viewport = useViewport();
    let projector = new CoordinateProjector(viewport, 1000);

    // 2. Mouse tracking for live conversion demo
    let mouse = $state({ x: 0, y: 0 });
    let virtualPos = $derived(projector.toVirtual(mouse));

    // 3. TARGETING STATE
    let targetElement = new ProjectedElementFrameModel({
        x: 250,
        y: 250,
        width: 0,
        height: 0,
        projectDimensions: false,
        anchor: 'C'
    }, projector);

    // 4. TEST MOVABLE ELEMENT: Instantiate with virtual coordinate boundaries (e.g. 0 to 1000)
    // Placed at virtual x: 500, y: 500 with a virtual box size of 200x150 units
    let testMovable = new MovableElementFrameModel({
        x: 500,
        y: 500,
        width: 200,
        height: 150,
        zIndex: 10,
        draggable: true,
        showTransformGizmo: true
    });

    // 5. Compute the step sizing based on a 20x20 grid matrix
    const gridCount = 20;
    const stepX = $derived(projector.virtualResolution / gridCount);
    const stepY = $derived(projector.virtualResolution / gridCount);

    // 6. Generate data array representing the 20x20 matrix structure
    const gridCells = Array.from({ length: gridCount * gridCount }, (_, i) => {
        const col = i % gridCount;
        const row = Math.floor(i / gridCount);
        return { col, row };
    });

    // Helper to snap target to the nearest cell when clicking on the grid
    function handleGridClick() {
        targetElement.x = Math.round(virtualPos.x);
        targetElement.y = Math.round(virtualPos.y);
    }
</script>

<svelte:window onmousemove={(e) => mouse = { x: e.clientX, y: e.clientY }} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main 
    onclick={handleGridClick}
    class="relative h-screen w-screen overflow-hidden bg-slate-900 text-white font-sans select-none cursor-crosshair"
>
    
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute left-6 top-6 z-50 space-y-2 rounded-xl bg-slate-950/80 border border-slate-800 p-5 font-mono text-xs shadow-2xl backdrop-blur-md w-72" onclick={(e) => e.stopPropagation()}>
        <h2 class="font-bold text-sm text-blue-400 flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            CoordinateProjector Monitor
        </h2>
        <div class="space-y-1 text-slate-400">
            <p><span class="text-slate-500">Viewport:</span> {viewport.width.toFixed(0)}px × {viewport.height.toFixed(0)}px</p>
            <p><span class="text-slate-500">Virtual Bounds:</span> 0 → {projector.virtualResolution}</p>
            <p><span class="text-slate-500">Scale X:</span> {projector.scaleX.toFixed(4)} px/u</p>
            <p><span class="text-slate-500">Scale Y:</span> {projector.scaleY.toFixed(4)} px/u</p>
        </div>
        <hr class="border-slate-800 my-2" />
        <div class="space-y-1 mb-2">
            <p class="text-amber-400"><span class="text-slate-500">Mouse (Px):</span> X: {mouse.x}, Y: {mouse.y}</p>
            <p class="text-emerald-400"><span class="text-slate-500">Virtual Mouse:</span> X: {virtualPos.x.toFixed(1)}, Y: {virtualPos.y.toFixed(1)}</p>
        </div>
        <hr class="border-slate-800 my-2" />
        <div class="space-y-1">
            <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">Live Testing Status</p>
            <p class="text-indigo-400 font-bold"><span class="text-slate-500">Virtual Target:</span> X: {targetElement.x}, Y: {targetElement.y}</p>
            <p class="text-amber-500 font-bold"><span class="text-slate-500">Movable Box:</span> X: {Math.round(testMovable.x)}, Y: {Math.round(testMovable.y)}</p>
        </div>
        <p class="text-[10px] text-slate-500 mt-2 italic">Click anywhere on the grid to change indicator position</p>
    </div>

    <div 
        class="absolute inset-0 grid w-full h-full bg-slate-950/20 z-0"
        style="
            grid-template-columns: repeat({gridCount}, minmax(0, 1fr));
            grid-template-rows: repeat({gridCount}, minmax(0, 1fr));
        "
    >
        {#each gridCells as cell}
            {@const cellVirtualX = cell.col * stepX}
            {@const cellVirtualY = cell.row * stepY}
            
            <div class="group relative border border-slate-800/40 hover:border-blue-500/40 hover:bg-slate-800/20 transition-colors duration-150 flex flex-col box-border p-1">
                <span class="text-[9px] font-mono text-slate-600 group-hover:text-blue-400 transition-colors pointer-events-none">
                    {cellVirtualX},{cellVirtualY}
                </span>
            </div>
        {/each}
    </div>

    <ProjectedElement model={targetElement} class="z-40 pointer-events-none will-change-transform">
        <div class="relative flex items-center justify-center">
            <div class="absolute h-8 w-8 rounded-full border-2 border-indigo-500 animate-ping opacity-40"></div>
            <div class="absolute h-4 w-4 rounded-full border border-indigo-400 bg-indigo-500/30 backdrop-blur-xs shadow-lg shadow-indigo-500/50"></div>
            <div class="absolute h-1 w-1 rounded-full bg-white"></div>
            
            <div class="absolute left-6 top-0 -translate-y-1/2 whitespace-nowrap rounded-md bg-indigo-600 px-2 py-1 font-mono text-[10px] font-bold text-white shadow-md border border-indigo-400">
                LOCKED @ ({targetElement.x}, {targetElement.y})
            </div>
        </div>
    </ProjectedElement>

    <MovableElementFrame movableElementFrameModel={testMovable} {projector} class="z-30 bg-slate-800/90 border border-slate-700 rounded-lg p-4 shadow-xl flex flex-col justify-between">
        <div class="pointer-events-none">
            <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Virtual Node</h3>
            <p class="text-[11px] font-mono text-slate-400 mt-1">
                Size: {testMovable.width} × {testMovable.height}
            </p>
        </div>
        <div class="text-[10px] bg-slate-900/50 rounded p-1 text-slate-400 font-mono text-center pointer-events-none select-none">
            Drag Me Around
        </div>
    </MovableElementFrame>

</main>