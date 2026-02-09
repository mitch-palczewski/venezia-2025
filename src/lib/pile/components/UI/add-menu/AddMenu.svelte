<script lang="ts">
	import type { EnvironmentMap } from '$lib/pile/util/assetInventory/environmentMap';
	import type { Object2DMap } from '$lib/pile/util/assetInventory/object2DMap';
	import { Object3DMap } from '$lib/pile/util/assetInventory/object3DMap';
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import { addNewModel, changeEnvironment } from '$lib/pile/util/ui/uiActions';
	import ElementBtn from './ElementBtn.svelte';

	let { uiSettings }: { uiSettings: SettingsState } = $props();

	type AddMenuState = 'object3D' | 'object2D' | 'environment';
	let addMenuState = $state<AddMenuState>('object3D');
	let selectedElement: Object2DMap | Object3DMap | EnvironmentMap | null = $state(null);

	$effect(() => {
		addMenuState;
		selectedElement = null;
	});

	const categories = [
		{ id: 'object3D', label: '3D', hint: 'Add 3D Meshes' },
		//{ id: 'object2D', label: '2D', hint: 'Add Sprites & UI' },      REMOVING 2D for now
		{ id: 'environment', label: 'Env', hint: 'World Settings' }
	] as const;

	function handleAddToScene() {
		if (!selectedElement) return;
		if (addMenuState === 'object3D') {
			addNewModel(selectedElement as Object3DMap, uiSettings.app!);
		}
		if (addMenuState === 'object2D') {
			addNewModel(selectedElement as Object2DMap, uiSettings.app!);
		}
		if (addMenuState === 'environment') {
			changeEnvironment(selectedElement as EnvironmentMap, uiSettings.app!);
		}
		selectedElement = null;
		uiSettings.showAddMenu = false;
	}
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
					<ElementBtn
						{item}
						isSelected={selectedElement?.name === item.name}
						onclick={() => (selectedElement = item)}
						image = {item.preview}
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
			{:else if addMenuState === 'environment'}
				{#each uiSettings.app?.environmentInventory.getAll() as item}
					<ElementBtn
						{item}
						isSelected={selectedElement?.name === item.name}
						onclick={() => (selectedElement = item)}
					/>
				{/each}
			{/if}
		</div>
	</div>
	{#if selectedElement}
		<div class="mt-4 w-full rounded bg-black/30 p-2 text-center text-white hover:bg-white/40">
			<button onclick={() => handleAddToScene()}>
				<p class="text-center">{selectedElement.displayName}</p>
				{#if addMenuState === "object2D" || addMenuState === "object3D"}
					Add to Scene
				{:else if addMenuState === "environment"}
					Change Environment
				{/if}
				
			</button>
		</div>
	{/if}
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
