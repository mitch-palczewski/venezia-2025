<script lang="ts">
    import type { PileState } from "$lib/pile/util/pileState.svelte";
    import type { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";
    import { deleteSelectedModel } from "$lib/pile/util/ui/uiActions";
    import GeneralButton from './GeneralButton.svelte'; 

    let { pileState, uiSettings }: { pileState: PileState, uiSettings: SettingsState } = $props();

    const deleteItem = () => {
        deleteSelectedModel(pileState)
    };
</script>

<GeneralButton
    onclick={deleteItem}
    tooltip={uiSettings.hudTooltip}
    tooltipText="delete : Delete Object"
    class="h-10 px-3 text-lg font-extrabold"
>    
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
    >
        <path d="M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
</GeneralButton>