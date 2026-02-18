<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();
</script>

<button
	onclick={() => (uiSettings.showAddMenu = !uiSettings.showAddMenu)}
	use:uiSettings.hudTooltip={uiSettings.showAddMenu ? 'Close Menu' : 'Open Add Element Menu'}
	class="group flex h-10 w-30 items-center justify-center rounded-lg border shadow-2xl backdrop-blur-md transition-all active:scale-95
    {uiSettings.showAddMenu
		? 'border-white bg-zinc-100 font-bold text-zinc-900'
		: 'border-white/10 bg-black/50 text-white hover:border-white/20 hover:bg-zinc-800 hover:text-white'}"
	aria-label="Toggle Add Menu"
>
	{#if uiSettings.showAddMenu}
		Close Menu
	{:else}
		Add To Pile
	{/if}
</button>
