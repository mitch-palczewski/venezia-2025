<script lang="ts">
	import type { PileScene } from '$lib/pile';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';

	import type { PileState } from '$lib/pile/util/pileState.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';

	import AddNewModel from './AddNewModel.svelte';
	import DeleteBtn from './btns/DeleteBtn.svelte';
	import SettingsBtn from './btns/SettingsBtn.svelte';
	import TransformModeBtn from './btns/TransformModeBtn.svelte';
	import ChooseEnvironment from './ChooseEnvironment.svelte';
	import ScaleSlider from './ScaleSlider.svelte';
	import Settings from './SettingsKeyBind.svelte';
	import Tooltip from './Tooltip.svelte';


	interface Props {
		pileSceneRef: PileScene;
		uiSettings: SettingsState;
	}
	let { pileSceneRef, uiSettings }: Props = $props();
	const pileApp: PileApp = $derived(pileSceneRef?.pileApp);
	const pileState: PileState = $derived(pileSceneRef?.pileApp?.state);
</script>

{#if pileApp && pileState}
	<Settings settingState={uiSettings} />

	{#if uiSettings.showUI}
		<Tooltip settingsState  = {uiSettings}/>
		<div class="absolute top-3 right-3">
			<div class="flex flex-row gap-3">
				{#if pileState.selectedObjectID}
					<TransformModeBtn {uiSettings} />
					<DeleteBtn {pileState}/>
				{/if}
				<SettingsBtn {uiSettings} />
			</div>
		</div>
		<div class="absolute top-[90vh] left-[3vw]">
			<div class="grid grid-cols-8 gap-3">
				{#if pileState.selectedObjectID}
					<ScaleSlider pileState={pileApp.state} />
				
				{/if}
				<ChooseEnvironment {pileApp} inventory={pileApp.environmentInventory} />
				<AddNewModel {pileApp} inventory={pileApp.modelInventory} />
				<AddNewModel {pileApp} inventory={pileApp.imageInventory} />
			</div>
		</div>
	{/if}
{/if}
