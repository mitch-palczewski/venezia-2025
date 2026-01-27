<script lang="ts">
	import type { EnvironmentMap } from '$lib/pile/util/assetInventory/environmentMap';
	import type { Object2DMap } from '$lib/pile/util/assetInventory/object2DMap';
	import { Object3DMap } from '$lib/pile/util/assetInventory/object3DMap';
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import ElementBtn from './ElementBtn.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();

	type AddMenuState = 'object3D' | 'object2D' | 'environment';
	let addMenuState = $state<AddMenuState>('object3D');
	let selectedElement: Object2DMap | Object3DMap | EnvironmentMap | null = $state(null);

	const categories = [
		{ id: 'object3D', label: '3D', hint: 'Add 3D Meshes' },
		{ id: 'object2D', label: '2D', hint: 'Add Sprites & UI' },
		{ id: 'environment', label: 'Env', hint: 'World Settings' }
	] as const;
</script>

<div
	class="flex h-screen w-52 flex-col border-r border-white/10 bg-zinc-900/70 p-3 shadow-2xl backdrop-blur-md"
>
	<h1 class="mb-4 text-center text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">
		Add To Pile
	</h1>

	<div class="mb-4 flex gap-1 rounded-lg bg-black/40 p-1 ring-1 ring-white/5">
		{#each categories as { id, label, hint }}
			<button
				onclick={() => (addMenuState = id)}
				use:uiSettings.hudTooltip={`${addMenuState} ${hint}`}
				class="flex-1 rounded py-1.5 text-[10px] font-bold uppercase transition-all
                {addMenuState === id
					? 'bg-zinc-700 text-white shadow'
					: 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}"
			>
				{label}
			</button>
		{/each}
	</div>

	<div
		class="custom-scrollbar flex-1 overflow-y-auto rounded-lg bg-black/20 p-2 ring-1 ring-white/5"
	>
		<div class="grid grid-cols-2 gap-2">
			{#if addMenuState === 'object3D'}
				{#each uiSettings.app?.modelInventory.getAll() as item}
					{@const isSelected = item.name === selectedElement?.name}
                    
					<button
						onclick={() => (selectedElement = item)}
						class="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border transition-all duration-200
                        {isSelected
							? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
							: 'border-white/5 bg-zinc-800/50 hover:border-white/20 hover:bg-zinc-800'}"
					>
						{#if isSelected}
							<div
								class="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
							></div>
						{/if}

						<div
							class="mb-1 text-lg opacity-50 transition-transform group-hover:scale-110 group-hover:opacity-100"
						>
							📦
						</div>

						<span
							class="px-2 text-center text-[9px] leading-tight font-bold tracking-tight uppercase
                            {isSelected
								? 'text-blue-400'
								: 'text-zinc-500 group-hover:text-zinc-300'}"
						>
							{item.displayName}
						</span>

						<div
							class="absolute inset-0 bg-white/0 transition-colors group-active:bg-white/5"
						></div>
					</button>
				{/each}
			{:else if addMenuState === 'object2D'}
				<div class="col-span-2 py-10 text-center text-[10px] text-zinc-600 uppercase italic">
					No 2D Assets
				</div>
			{:else}
				<div class="col-span-2 py-10 text-center text-[10px] text-zinc-600 uppercase italic">
					Environment Settings
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Clean scrollbar for the library */
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
</style>
