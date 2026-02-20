<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import GeneralButton from './GeneralButton.svelte';


	let { uiSettings }: { uiSettings: SettingsState } = $props();

	// Add the shortcut key to your array
	const modes = [
		{ id: 'translate', label: 'Translate', shortcut: 't' },
		{ id: 'rotate', label: 'Rotate', shortcut: 'r' }
	] as const;
</script>

<div class="flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-1 h-10 backdrop-blur-sm">
	{#each modes as { id, label, shortcut }}
		{@const isActive = uiSettings.transformControlsMode === id}
		
		<GeneralButton
			onclick={() => (uiSettings.transformControlsMode = id)}
			active={isActive}
			tooltip={uiSettings.hudTooltip}
			tooltipText={`${shortcut} : ${label} Mode`}
			class="px-3 h-7 "
		>
		 <span class="hidden sm:block">
            {label}
        </span>


			{#if id === 'translate'}
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" />
					<polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" />
					<line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
				</svg>
			{:else}
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
					<polyline points="21 3 21 8 16 8" />
				</svg>
			{/if}
		</GeneralButton>
	{/each}
</div>