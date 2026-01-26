<script lang="ts">
	import type { PileScene } from '$lib/pile';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';

	import type { PileState } from '$lib/pile/util/pileState.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import { deleteSelectedModel } from '$lib/pile/util/ui/uiActions';

	import AddNewModel from './AddNewModel.svelte';
	import ChooseEnvironment from './ChooseEnvironment.svelte';
	import ScaleSlider from './ScaleSlider.svelte';
	import Settings from './SettingsKeyBind.svelte';

	interface Props {
		pileSceneRef: PileScene;
		uiSettings: SettingsState;
	}
	let { pileSceneRef, uiSettings}: Props = $props();
	const pileApp: PileApp = $derived(pileSceneRef?.pileApp);
	const pileState: PileState = $derived(pileSceneRef?.pileApp?.state);
</script>

{#if pileApp && pileState}
	<Settings settingState={uiSettings} />
	{#if uiSettings.showUI}
		<div class="absolute top-[90vh] left-[3vw]">
			<div class="grid grid-cols-8 gap-3">
				{#if pileState.selectedObjectID}
					<button
						onclick={() => (pileApp.uiSettings.transformControlsMode = 'translate')}
						class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
						>Translate</button
					>
					<button
						onclick={() => (pileApp.uiSettings.transformControlsMode = 'rotate')}
						class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
						>Rotate</button
					>
					<ScaleSlider pileState={pileApp.state} />
					<button
						onclick={() => deleteSelectedModel(pileApp.state)}
						class="relative h-auto w-auto rounded bg-red-600 px-4 py-2 text-white hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
						>Delete</button
					>
				{/if}
				<ChooseEnvironment {pileApp} inventory={pileApp.environmentInventory} />
				<AddNewModel {pileApp} inventory={pileApp.modelInventory} />
				<AddNewModel {pileApp} inventory={pileApp.imageInventory} />
			</div>
		</div>
	{/if}
{/if}
