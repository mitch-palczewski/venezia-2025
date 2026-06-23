<script lang="ts">
    import { onDestroy } from 'svelte';
    import { DeviceContext } from '$lib/core';

    // Initialize the engine
    const deviceContext = new DeviceContext();
    const viewport = deviceContext.viewport;

    // Ensure pristine memory management by cleaning up listeners when the demo unmounts
    onDestroy(() => {
        viewport.destroy();
    });

    // Helper to generate a visual indicator array for the 5 tiers (0-4)
    const tiers = [0, 1, 2, 3, 4] as const;
</script>

<div class="p-6 max-w-6xl mx-auto space-y-6 bg-slate-50 text-slate-800 rounded-xl shadow-sm border border-slate-200">
    
    <header class="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-slate-900">Viewport Engine Monitor</h1>
            <p class="text-xs text-slate-500 font-mono">Svelte 5 Runes + Real-time Window Resize Observer Telemetry</p>
        </div>
        
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <section class="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between min-h-80">
            <div>
                <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">Spatial Mapping</h2>
                <h3 class="text-base font-bold text-slate-800">Dynamic Aspect Canvas</h3>
                <p class="text-xs text-slate-500 mt-1">A live bounding box tracking and adjusting to match your physical device aspect parameters.</p>
            </div>

            <div class="my-6 flex items-center justify-center bg-slate-100 rounded border border-dashed border-slate-300 p-4 h-40">
                <div 
                    class="bg-indigo-600/10 border-2 border-indigo-600 rounded-md flex flex-col items-center justify-center p-2 shadow-inner transition-all duration-150 ease-out max-w-full max-h-full"
                    style="aspect-ratio: {viewport.rawRatio}; width: {viewport.orientation === 'tall' ? 'auto' : '100%'}; height: {viewport.orientation === 'tall' ? '100%' : 'auto'};"
                >
                    <span class="text-xs font-mono font-bold text-indigo-700 capitalize">{viewport.orientation}</span>
                    <span class="text-[10px] font-mono text-indigo-500 mt-0.5">{viewport.closestCommonRatio}</span>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-1 text-center text-xs font-mono">
                <div class="py-1 rounded border {viewport.orientation === 'tall' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-slate-50 text-slate-400 border-slate-200'}">Tall</div>
                <div class="py-1 rounded border {viewport.orientation === 'square' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-slate-50 text-slate-400 border-slate-200'}">Square</div>
                <div class="py-1 rounded border {viewport.orientation === 'wide' ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-slate-50 text-slate-400 border-slate-200'}">Wide</div>
            </div>
        </section>

        <div class="md:col-span-2 space-y-6">
            
            <section class="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-lg border border-slate-200">
                <div class="space-y-1">
                    <span class="text-[11px] font-medium uppercase tracking-wider text-slate-400">Width</span>
                    <p class="text-2xl font-mono font-bold text-slate-900">{viewport.width}<span class="text-xs text-slate-400 ml-0.5">px</span></p>
                </div>
                <div class="space-y-1">
                    <span class="text-[11px] font-medium uppercase tracking-wider text-slate-400">Height</span>
                    <p class="text-2xl font-mono font-bold text-slate-900">{viewport.height}<span class="text-xs text-slate-400 ml-0.5">px</span></p>
                </div>
                <div class="space-y-1">
                    <span class="text-[11px] font-medium uppercase tracking-wider text-slate-400">Shortest Edge</span>
                    <p class="text-2xl font-mono font-bold text-slate-900">{viewport.shortestEdge}<span class="text-xs text-slate-400 ml-0.5">px</span></p>
                </div>
                <div class="space-y-1">
                    <span class="text-[11px] font-medium uppercase tracking-wider text-slate-400">Total Spatial Volume</span>
                    <p class="text-2xl font-mono font-bold text-slate-900">{viewport.area.toLocaleString()}<span class="text-xs text-slate-400 ml-0.5">px²</span></p>
                </div>
            </section>

            <section class="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Mathematical Snapping Engine</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                    <div class="bg-slate-50 p-3 rounded border border-slate-200">
                        <span class="text-[10px] text-slate-400 block uppercase font-sans font-medium">Raw Decimal Value</span>
                        <span class="text-sm font-bold text-slate-800">{viewport.rawRatio.toFixed(5)}</span>
                    </div>
                    <div class="bg-slate-50 p-3 rounded border border-slate-200">
                        <span class="text-[10px] text-slate-400 block uppercase font-sans font-medium">Target Snapped Token</span>
                        <span class="text-sm font-bold text-indigo-600">{viewport.closestCommonRatio}</span>
                    </div>
                    <div class="bg-slate-50 p-3 rounded border border-slate-200">
                        <span class="text-[10px] text-slate-400 block uppercase font-sans font-medium">Target Floating Index</span>
                        <span class="text-sm font-bold text-slate-800">{viewport.closestCommonRatioValue.toFixed(5)}</span>
                    </div>
                </div>
            </section>

            <section class="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Multi-Axis Tier System Matrix</h3>

                <div class="space-y-3">
                    {#snippet tierVisualizer(title: string, activeIndex: number, readableText: string)}
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-xs">
                            <div class="w-32 shrink-0">
                                <span class="font-medium text-slate-700 block">{title}</span>
                                <span class="text-[11px] text-indigo-600 font-mono">{readableText}</span>
                            </div>
                            <div class="grid grid-cols-5 gap-1.5 grow font-mono text-[10px] text-center">
                                {#each tiers as tierIndex}
                                    <div class="py-1.5 rounded transition-all duration-150 border 
                                        {activeIndex === tierIndex 
                                            ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-sm scale-[1.02]' 
                                            : 'bg-slate-50 border-slate-200 text-slate-400'}"
                                    >
                                        T{tierIndex}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/snippet}

                    {@render tierVisualizer('Traditional Width Query', viewport.widthTier, viewport.widthTierText)}
                    <div class="h-px bg-slate-100 my-1"></div>
                    {@render tierVisualizer('Shortest Edge Scaler', viewport.shortestEdgeTier, viewport.shortestEdgeTierText)}
                    <div class="h-px bg-slate-100 my-1"></div>
                    {@render tierVisualizer('Spatial Area Engine', viewport.areaTier, viewport.areaTierText)}
                </div>
            </section>

        </div>
    </div>
</div>