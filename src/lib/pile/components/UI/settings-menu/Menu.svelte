<script lang="ts">
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import Controls from './Controls.svelte';
	import Settings from './Settings.svelte';

	let { uiSettings }: { uiSettings: UiState } = $props();
	let state = $state<'settings' | 'controls' >('settings');

	const tabs = ['settings', 'controls'] as const;
</script>

<div class="fixed inset-0 z-50 flex items-start justify-center bg-black/20 p-3 sm:p-8 backdrop-blur-xs">
	<div
		class="relative w-full h-full border border-white/10 bg-black/40 p-2 shadow-2xl "
	>
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-3xl font-semibold text-zinc-100">Pile Configuration</h2>
			<button
				onclick={() => (uiSettings.showSettingsMenu = false)}
				class="text-zinc-500 transition-colors font-extrabold bg-white hover:bg-gray-200 hover:text-black flex items-center px-2 pt-1">✕</button
			>
		</div>

		<div class="flex rounded-lg bg-black/40 p-1 ring-1 ring-white/10">
			{#each tabs as tab}
				<button
					onclick={() => (state = tab)}
					class="flex-1 rounded-md py-1.5 text-xl font-medium capitalize transition-all
					{state === tab ? 'bg-zinc-700 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}"
				>
					{tab}
				</button>
			{/each}
		</div>

		<div class="mt-6 max-h-[70vh] overflow-y-auto pr-2">
			{#if state === 'settings'}
				<Settings {uiSettings} />
			{:else if state === 'controls'}
				<Controls/>
			{/if}
		</div>
	</div>
</div>
