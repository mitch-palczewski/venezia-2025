<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import Controls from './Controls.svelte';
	import Settings from './Settings.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();
	let state = $state<'settings' | 'controls'>('settings');

	const tabs = ['settings', 'controls'] as const;
</script>

<div class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-12 backdrop-blur-sm">
	<div
		class="relative w-full max-w-2xl rounded-xl border border-white/10 bg-zinc-900/40 p-6 shadow-2xl h-full"
	>
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-lg font-semibold text-zinc-100">Pile Configuration</h2>
			<button
				onclick={() => (uiSettings.showSettingsMenu = false)}
				class="text-zinc-500 transition-colors hover:text-white">✕</button
			>
		</div>

		<div class="flex rounded-lg bg-black/40 p-1 ring-1 ring-white/10">
			{#each tabs as tab}
				<button
					onclick={() => (state = tab)}
					class="flex-1 rounded-md py-1.5 text-sm font-medium capitalize transition-all
					{state === tab ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}"
				>
					{tab}
				</button>
			{/each}
		</div>

		<div class="mt-6 max-h-[70vh] overflow-y-auto pr-2">
			{#if state === 'settings'}
				<Settings {uiSettings} />
			{:else}
				<Controls />
			{/if}
		</div>
	</div>
</div>
