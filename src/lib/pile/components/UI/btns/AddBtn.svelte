<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();
</script>

<button
	onclick={() => (uiSettings.showAddMenu = !uiSettings.showAddMenu)}
	use:uiSettings.hudTooltip={
         uiSettings.showAddMenu ? "Close Menu" : "Open Add Element Menu" 
    }
	class="group flex h-10 w-12 items-center justify-center rounded-lg border transition-all active:scale-95 backdrop-blur-md shadow-2xl
    {uiSettings.showAddMenu 
        ? 'bg-zinc-100 border-white text-zinc-900 font-bold' 
        : 'bg-black/50 border-white/10 text-zinc-400 hover:border-white/20 hover:bg-zinc-800 hover:text-white'}"
	aria-label="Toggle Add Menu"
>
	Pile
</button>