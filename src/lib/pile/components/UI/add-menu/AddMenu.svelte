<script lang="ts">
	import type { EnvironmentMap } from '$lib/pile/util/assetInventory/environmentMap';
	import type { Object2DMap } from '$lib/pile/util/assetInventory/object2DMap';
	import { Object3DMap } from '$lib/pile/util/assetInventory/object3DMap';
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import { addNewModel, changeEnvironment } from '$lib/pile/util/ui/uiActions';
	import { fade, scale } from 'svelte/transition';
	import ElementBtn from './ElementBtn.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();

	export type AddMenuState = 'object3D' | 'object2D' | 'environment';
	let selectedElement: Object2DMap | Object3DMap | EnvironmentMap | null = $state(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let hoveredElement: any = $state(null);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		uiSettings.addMenuState;
		selectedElement = null;
		hoveredElement = null;
	});

	const previewImage = $derived(() => {
        const active = hoveredElement || selectedElement;
        if (!active) return null;

        if (uiSettings.addMenuState === 'environment') {
            return active.fileType === 'jpg' || active.fileType === 'png' ? active.path : null;
        }
        return active.preview; // Returns item.preview for 3D objects
    });

	const categories = [
		{ id: 'object3D', label: '3D', hint: 'Add 3D Meshes' },
		//{ id: 'object2D', label: '2D', hint: 'Add Sprites & UI' },      REMOVING 2D for now
		{ id: 'environment', label: 'Env', hint: 'World Settings' }
	] as const;

	function handleAddToScene() {
		if (!selectedElement) return;
		if (uiSettings.addMenuState === 'object3D') {
			addNewModel(selectedElement as Object3DMap, uiSettings.app!);
		}
		if (uiSettings.addMenuState === 'object2D') {
			addNewModel(selectedElement as Object2DMap, uiSettings.app!);
		}
		if (uiSettings.addMenuState === 'environment') {
			changeEnvironment(selectedElement as EnvironmentMap, uiSettings.app!);
		}
		selectedElement = null;
		uiSettings.showAddMenu = false;
	}
</script>

<div
	class="flex h-screen w-52 flex-col border-r border-white/10 bg-zinc-900/70 p-3 shadow-2xl backdrop-blur-md z-50"
>
	<h1 class="mb-4 text-center text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">
		Add To Pile
	</h1>

	<div class="mb-4 flex gap-1 rounded-lg bg-black/40 p-1 ring-1 ring-white/5">
		{#each categories as { id, label, hint }}
			<button
				onclick={() => (uiSettings.addMenuState = id)}
				use:uiSettings.hudTooltip={`${hint}`}
				class="flex-1 rounded py-1.5 text-[10px] font-bold uppercase transition-all
                {uiSettings.addMenuState === id
					? 'bg-orange-800/60 text-white shadow'
					: 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}"
			>
				{label}
			</button>
		{/each}
	</div>
	{#if selectedElement}
    <button onclick={() => handleAddToScene()} class="w-full" transition:scale={{ duration: 250, start: 0.8 }}>
        <div class="mb-4 w-full rounded-lg bg-orange-600 p-2 text-center text-white transition-all duration-200
                    hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98]
                    ring-4 ring-amber-600-500/50 animate-pulse">
            <p class="text-center text-xs opacity-80 uppercase tracking-wider">{selectedElement.displayName}</p>
            <p class="font-black text-xl">
                {#if uiSettings.addMenuState === 'object2D' || uiSettings.addMenuState === 'object3D'}
                    Add to Pile
                {:else}
                    Change Environment
                {/if}
            </p>
        </div>
    </button>
{/if}

	<div
		class="custom-scrollbar flex-1 overflow-y-auto rounded-lg bg-black/20 p-2 ring-1 ring-white/5"
	>
	
		<div class="grid grid-cols-2 gap-2">
			{#if uiSettings.addMenuState === 'object3D'}
				{#each uiSettings.app?.modelInventory.getAll() as item}
					<ElementBtn
						{item}
						isSelected={selectedElement?.name === item.name}
						onclick={() => (selectedElement = item)}
						image={item.preview}
					/>
				{/each}
				<!--
			{:else if addMenuState === 'object2D'}
				{#each uiSettings.app?.imageInventory.getAll() as item}
					<ElementBtn
						{item}
						isSelected={selectedElement?.name === item.name}
						onclick={() => (selectedElement = item)}
					/>
				{/each}
			-->
			{:else if uiSettings.addMenuState === 'environment'}
				{#each uiSettings.app?.environmentInventory.getAll() as item}
					<ElementBtn
						{item}
						isSelected={selectedElement?.name === item.name}
						onclick={() => (selectedElement = item)}
						image={item.fileType === 'jpg' || item.fileType === 'png' ? item.path : undefined}
					/>
				{/each}
			{/if}
		</div>
	</div>
	
</div>

{#if previewImage()}
    <div 
        transition:fade={{ duration: 150 }}
        class="fixed top-20 right-60 z-40 pointer-events-none mt-[env(safe-area-inset-top)] mr-[env(safe-area-inset-right)]"
    >
        <div 
            transition:scale={{ start: 0.95, duration: 200 }}
            class=" border border-white/10 p-1 rounded-sm shadow-2xl  w-20 sm:w-25 md:w-50 h-50 flex flex-col items-center justify-center aspect-square"
        >
            <img 
                src={previewImage()} 
                alt="Asset preview" 
                class="w-full h-full object-contain rounded-lg select-none"
            />
        </div>
    </div>
{/if}

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
