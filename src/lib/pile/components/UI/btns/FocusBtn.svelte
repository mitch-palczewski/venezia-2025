<script lang="ts">
    import type { PileState } from "$lib/pile/util/pileState.svelte";
    import type { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";
    import { focusOnObject } from "$lib/pile/util/ui/uiActions";
    import GeneralButton from './GeneralButton.svelte'; 

    let { pileState, uiSettings }: { pileState: PileState, uiSettings: SettingsState } = $props();

    const focus = () => {
        focusOnObject(pileState)
    };
</script>

<GeneralButton
    onclick={focus}
    tooltip={uiSettings.hudTooltip}
    tooltipText="Focus on an object"
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
        <!-- Outer Eye Shape -->
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <!-- Inner Pupil -->
        <circle cx="12" cy="12" r="3" />
    </svg>
</GeneralButton>