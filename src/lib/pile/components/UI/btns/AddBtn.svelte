<script lang="ts">
    import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
    import GeneralButton from './GeneralButton.svelte';

    let { uiSettings }: { uiSettings: SettingsState } = $props();
</script>

<GeneralButton
    onclick={() => (uiSettings.showAddMenu = !uiSettings.showAddMenu)}
    active={uiSettings.showAddMenu}
    tooltip={uiSettings.hudTooltip}
    tooltipText={uiSettings.showAddMenu ? '' : 'Add Element to Pile'}
    class="h-10 px-1 sm:px-2" 
>
    <div class="flex items-center">
   
             <span class="hidden sm:block px-2">
            Pile
        </span>
   
       

        <span
            class=" inline-flex h-7.5 w-7.5 items-center justify-center rounded-lg font-mono text-2xl font-bold transition-colors
            {uiSettings.showAddMenu 
                ? 'bg-stone-800 text-white' 
                : 'bg-white/70 text-stone-900 group-hover:bg-white'}"
        >
            {uiSettings.showAddMenu ? '-' : '+'}
        </span>
    </div>
</GeneralButton>