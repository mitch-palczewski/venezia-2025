<script lang="ts">
    import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
    import { fade } from 'svelte/transition';

    let { settingsState }: { settingsState: UiState } = $props();
</script>

{#if settingsState.tooltipText && settingsState.showTooltip}
    <div 
        transition:fade={{ duration: 100 }} 
        class="pointer-events-none fixed top-4 left-4 z-100 hidden sm:block"
    >
        <div
            class="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-2 shadow-2xl backdrop-blur-md"
        >
            <span class="whitespace-nowrap text-xs font-bold tracking-wider text-zinc-100 ">
                {settingsState.tooltipText}
            </span>
        </div>
    </div>
{/if}