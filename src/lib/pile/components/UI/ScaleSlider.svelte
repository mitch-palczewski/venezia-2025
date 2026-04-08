<script lang="ts">
    import { PileState } from '$lib/pile/util/pileState.svelte';
    import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

    interface Props {
        pileState: PileState;
        uiSettings: SettingsState;
        vertical?: boolean;
    }

    let { pileState, uiSettings, vertical = false }: Props = $props();
    let localScale = $state(1);
    let baseScale = $state(1);
    let currentObjectId = $state<string | null>(null);

    $effect(() => {
        const selectedObj = pileState.getSelectedObject();
        if (selectedObj?.ref) {
            const scale = PileState.getObjScale(selectedObj.ref);
            const currentVal = Math.round(scale.x * 1000) / 1000;

            if(selectedObj.id !== currentObjectId) {
                currentObjectId = selectedObj.id
                baseScale = currentVal
            }
            localScale = Math.round(scale.x * 1000) / 1000;

        } else {
            currentObjectId = null
        }
    });

    const maxScale = $derived(baseScale + 100)

    function applyScale(val: number) {
        const sanitized = Math.max(0.01, val);
        const selectedObj = pileState.getSelectedObject();
        if (selectedObj?.ref) {
            PileState.setScale(selectedObj.ref, sanitized);
            localScale = sanitized;
        }
    }
</script>

<div
    class="touch-none flex items-center rounded-xl border border-white/10 bg-stone-900/50 backdrop-blur-sm transition-all
    {vertical 
        ? 'h-[400px] w-10 flex-col py-4 justify-center' 
        : 'h-10 w-full flex-row px-3 gap-4'}"
>
    {#if !vertical}
        <span class="text-md font-bold hidden lg:block text-stone-200 ">Scale</span>
    {/if}

    <div class="flex items-center justify-center {vertical ? 'h-full w-full' : 'flex-1 gap-3'}">
        <input
            type="range"
            min="0.01"
            max={maxScale}
            step="0.01"
            bind:value={localScale}
            oninput={() => applyScale(localScale)}
            class="gothic-slider cursor-pointer appearance-none rounded-full bg-white/10 
            {vertical ? ' absolute h-1 w-[360px] -rotate-90' : 'h-1 sm:w-xs md:w-xs lg:w-sm xl:w-lg flex-1'}"
        />

        {#if !vertical}
            <div class="relative items-center hidden md:flex">
                <input
                    type="number"
                    bind:value={localScale}
                    oninput={(e) => applyScale(parseFloat(e.currentTarget.value))}
                    min="0.01"
                    step="0.1"
                    class="w-10 rounded border border-white/10 bg-black/40 py-0.5 px-1 font-mono text-[11px] font-bold text-white transition-all focus:border-white/40 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
            </div>
        {/if}
    </div>
</div>

<style>

    @media (pointer: coarse) {
    .gothic-slider::-webkit-slider-thumb {
        height: 24px; /* Double the size for touch */
        width: 24px;
        border-radius: 50%; /* Circles are easier to target */
    }
}
    .gothic-slider::-webkit-slider-thumb {
        appearance: none;
        height: 12px;
        width: 12px;
        background: #ffffff;
        border: 2px solid #18181b;
        border-radius: 2px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .gothic-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
        background: #c5c3c1;
    }

    .gothic-slider::-moz-range-thumb {
        height: 30px;
        width: 15px;
        background: #ffffff;
        border: 2px solid #18181b;
        border-radius: 2px;
        cursor: pointer;
    }
</style>