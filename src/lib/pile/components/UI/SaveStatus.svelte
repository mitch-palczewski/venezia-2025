<script lang="ts">
	import type { PileState, UploadStatus } from '$lib/pile/util/pileState.svelte';
	import { fade, slide } from 'svelte/transition';
	// Props using runes
	let { status, onSave}: { status: UploadStatus; onSave: () => void} = $props();

	// Map statuses to visual properties
	const config = $derived.by(() => {
		switch (status) {
			case 'Saving':
				return {
					color: 'text-blue-600 bg-blue-50 border-blue-200',
					label: 'Saving...',
					icon: '⏳'
				};
			case 'Saved':
				return {
					color: 'text-green-600 bg-green-50 border-green-200',
					label: 'Saved',
					icon: '✅'
				};
			case 'Unsaved Changes':
				return {
					color: 'text-amber-700 bg-amber-50 border-amber-300 shadow-sm hover:bg-amber-100',
					label: 'Save Changes',
					icon: '💾'
				};
			default: // Idle
				return {
					color: 'text-gray-400 bg-transparent border-transparent',
					label: 'Changes synced',
					icon: '●'
				};
		}
	});
</script>

<div class="flex h-8 items-center font-medium text-sm transition-all duration-300">
	{#if status === 'Unsaved Changes'}
		<button
			onclick={onSave}
			in:slide={{ axis: 'x', duration: 200 }}
			out:fade={{ duration: 100 }}
			class="flex items-center gap-2 px-3 py-1 rounded-md border transition-colors {config.color}"
		>
			<span>{config.icon}</span>
			{config.label}
		</button>
	{:else}
		<div 
            class="flex items-center gap-2 px-2 py-1 transition-opacity duration-500 {config.color}"
            class:opacity-0={status === 'Idle'}
        >
			{#if status === 'Saving'}
				<span class="inline-block">⏳</span>
			{:else}
				<span>{config.icon}</span>
			{/if}
			<span>{config.label}</span>
		</div>
	{/if}
</div>