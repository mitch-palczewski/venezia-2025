<script lang="ts">
	import type { PileApp } from "$lib/pile/util/pileApp.svelte";
    import type { PileState } from "$lib/pile/util/pileState.svelte";
    import type { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";
    import { duplicateSelectedModel } from "$lib/pile/util/ui/uiActions";
    import GeneralButton from './GeneralButton.svelte'; 

    let { pileState, uiSettings, pileApp }: { pileState: PileState, uiSettings: SettingsState, pileApp: PileApp } = $props();

    const duplicateItem = () => {
        duplicateSelectedModel(pileState, pileApp)
    };
</script>

<GeneralButton
    onclick={duplicateItem}
    tooltip={uiSettings.hudTooltip}
    tooltipText="Duplicate an object"
    class="h-10 px-3 text-lg font-extrabold"
>
    <span class="hidden lg:block">
        Duplicate
    </span>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:stroke-[3px]"
    >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
</GeneralButton>