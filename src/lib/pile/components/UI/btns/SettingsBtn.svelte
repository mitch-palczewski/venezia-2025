<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	
	let { uiSettings }: { uiSettings: SettingsState } = $props();
</script>

<button
	onclick={() => (uiSettings.showSettingsMenu = !uiSettings.showSettingsMenu)}
	use:uiSettings.hudTooltip={`h : Setting Menu` }
	class="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white active:scale-95"
	aria-label="Toggle Settings"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="h-5 w-5 transition-transform duration-500 group-hover:rotate-90"
	>
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2a2 2 0 0 1-2 2a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2a2 2 0 0 1 2 2a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2a2 2 0 0 1 2-2a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2a2 2 0 0 1-2-2a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
</button>