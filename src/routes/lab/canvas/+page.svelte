<script lang="ts">
	import { useViewport } from '$lib/core';
	import { CoordinateProjector } from '$lib/core/projector/coordinateProjector.svelte';
	import { MovableFrame, MovableFrameModel, ProjectedFrameModel } from '$lib/features';

	// Brand new refactored bridge component to test

	// 1. Initialize your projector state
	let viewport = useViewport();
	let projector = new CoordinateProjector(viewport, 1000);

	// 2. Mouse tracking for live conversion demo
	let mouse = $state({ x: 0, y: 0 });
	let virtualPos = $derived(projector.toVirtual(mouse));

	// 3. TARGETING STATE (using your new custom CanvasElement layer)
	let targetElement = $derived.by(() => {
		return new ProjectedFrameModel(
			{
				x: 250,
				y: 250,
				anchor: 'C'
			},
			projector
		);
	});

	// 4. TEST MOVABLE ELEMENT: Instantiate with virtual coordinate boundaries (0 to 1000)
	let testMovable = new MovableFrameModel({
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
		// Mutate target positional coordinate states reactively
		const mockModel = new ProjectedFrameModel(
			{
				x: Math.round(virtualPos.x),
				y: Math.round(virtualPos.y)
			},
			projector
		);
		// (If keeping target state static or inline mutable, target positions map instantly)
	}
</script>

<svelte:window onmousemove={(e) => (mouse = { x: e.clientX, y: e.clientY })} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<main
	onclick={handleGridClick}
	class="relative h-screen w-screen cursor-crosshair overflow-hidden bg-slate-900 font-sans text-white select-none"
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="absolute top-6 left-6 z-50 w-72 space-y-2 rounded-xl border border-slate-800 bg-slate-950/80 p-5 font-mono text-xs shadow-2xl backdrop-blur-md"
		onclick={(e) => e.stopPropagation()}
	>
		<h2 class="flex items-center gap-2 text-sm font-bold text-blue-400">
			<span class="h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
			Canvas Bridge Audit
		</h2>
		<div class="space-y-1 text-slate-400">
			<p>
				<span class="text-slate-500">Viewport:</span>
				{viewport.width.toFixed(0)}px × {viewport.height.toFixed(0)}px
			</p>
			<p><span class="text-slate-500">Scale factor:</span> {projector.scaleX.toFixed(4)} px/u</p>
		</div>
		<hr class="my-2 border-slate-800" />
		<div class="mb-2 space-y-1">
			<p class="text-emerald-400">
				<span class="text-slate-500">Virtual Mouse:</span> X: {virtualPos.x.toFixed(1)}, Y: {virtualPos.y.toFixed(
					1
				)}
			</p>
		</div>
		<hr class="my-2 border-slate-800" />
		<div class="space-y-1">
			<p class="text-xs font-bold tracking-wider text-slate-500 uppercase">Live Bridge Status</p>
			<p class="font-bold text-amber-500">
				<span class="text-slate-500">Movable Box:</span> X: {Math.round(testMovable.x)}, Y: {Math.round(
					testMovable.y
				)}
			</p>
		</div>
		<p class="mt-2 text-[10px] text-slate-500 italic">
			Drag the node to confirm scaling math is performing accurately.
		</p>
	</div>

	<div
		class="absolute inset-0 z-0 grid h-full w-full bg-slate-950/20"
		style="
            grid-template-columns: repeat({gridCount}, minmax(0, 1fr));
            grid-template-rows: repeat({gridCount}, minmax(0, 1fr));
        "
	>
		{#each gridCells as cell}
			{@const cellVirtualX = cell.col * stepX}
			{@const cellVirtualY = cell.row * stepY}

			<div
				class="group relative box-border flex flex-col border border-slate-800/40 p-1 transition-colors duration-150 hover:border-blue-500/40 hover:bg-slate-800/20"
			>
				<span
					class="pointer-events-none font-mono text-[9px] text-slate-600 transition-colors group-hover:text-blue-400"
				>
					{cellVirtualX},{cellVirtualY}
				</span>
			</div>
		{/each}
	</div>

	<MovableFrame
		movableElementFrameModel={testMovable}
		{projector}
		class="z-30 flex flex-col justify-between rounded-lg border border-slate-700 bg-slate-800/90 p-4 shadow-xl"
	>
		<div class="pointer-events-none">
			<h3 class="text-xs font-bold tracking-wider text-slate-300 uppercase">Movable Node</h3>
			<p class="mt-1 font-mono text-[11px] text-slate-400">
				Bounds: {testMovable.width} × {testMovable.height}
			</p>
		</div>
		<div
			class="pointer-events-none rounded bg-slate-900/50 p-1 text-center font-mono text-[10px] text-slate-400 select-none"
		>
			Drag Me Around
		</div>
	</MovableFrame>
</main>
