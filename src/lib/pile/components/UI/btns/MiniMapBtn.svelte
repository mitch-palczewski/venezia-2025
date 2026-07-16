<script lang="ts">
    import type { PileState } from "$lib/pile/util/pileState.svelte";
    import type { UiState } from "$lib/pile/util/ui/uiState.svelte";
    import GeneralButton from './GeneralButton.svelte'; 

    let { uiSettings }: { uiSettings: UiState } = $props();

    // Renamed for clarity since we are toggling the map, not deleting items
    const toggleMinimap = () => {
        uiSettings.showMiniMap = !uiSettings.showMiniMap;
    };
</script>

<GeneralButton
    onclick={toggleMinimap}
    class="h-10 px-3 text-lg font-extrabold"
>    
    <!-- Minimap SVG -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
    >
        <!-- The folded map panels -->
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <!-- Inner fold lines -->
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
</GeneralButton>