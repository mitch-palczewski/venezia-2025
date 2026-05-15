<script lang="ts">
	import type { PileScene } from '$lib/pile';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';

	import type { PileState } from '$lib/pile/util/pileState.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import { fly } from 'svelte/transition';
	import AddMenu from './add-menu/AddMenu.svelte';

	import AddBtn from './btns/AddBtn.svelte';
	import DeleteBtn from './btns/DeleteBtn.svelte';
	import SettingsBtn from './btns/SettingsBtn.svelte';
	import TransformModeBtn from './btns/TransformModeBtn.svelte';
	import ScaleSlider from './ScaleSlider.svelte';
	import Tooltip from './Tooltip.svelte';
	import ScreenshotBtn from './btns/ScreenshotBtn.svelte';
	import FullscreenBtn from './btns/FullscreenBtn.svelte';
	import { onMount } from 'svelte';
	import DuplicateBtn from './btns/DuplicateBtn.svelte';
	import FocusBtn from './btns/FocusBtn.svelte';

	interface Props {
		pileSceneRef: PileScene;
		uiSettings: SettingsState;
	}
	let { pileSceneRef, uiSettings }: Props = $props();

	let windowWidth = $state(0);
	const isVertical = $derived(windowWidth < 800);
	const pileApp: PileApp = $derived(pileSceneRef?.pileApp);
	const pileState: PileState = $derived(pileSceneRef?.pileApp?.state);

	let isMd = $state(false); // Svelte 5 syntax

	onMount(() => {
		const watch = window.matchMedia('(min-width: 768px)');
		isMd = watch.matches;

		const listener = (e: MediaQueryListEvent) => (isMd = e.matches);
		watch.addEventListener('change', listener);
		return () => watch.removeEventListener('change', listener);
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />
{#if uiSettings.showUI}
	<div
		class="flex w-full justify-end overflow-hidden pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]"
	>
		<div class="P-3 mx-2 mt-2 flex flex-col items-end gap-3">
			<Tooltip settingsState={uiSettings} />

			<div class="flex flex-row items-start gap-3">
				{#if pileState.selectedObjectID}
					<div
						class="flex flex-row items-center gap-3 overflow-hidden"
						transition:fly={{ x: 20, duration: 200, opacity: 0 }}
					>
						{#if !isVertical}
							<ScaleSlider pileState={pileApp.state} {uiSettings} vertical={false} />
						{/if}
						{#if (!uiSettings.showAddMenu && isVertical) || !isVertical}
							<TransformModeBtn {uiSettings} />
							<DuplicateBtn {pileState} {uiSettings} {pileApp}/>
							<FocusBtn {pileState}{uiSettings}/>
							<DeleteBtn {pileState} {uiSettings} />
						{/if}
					</div>
				{/if}

				<AddBtn {uiSettings} />
				
				{#if isMd}
					{#if uiSettings.showScreenshotBtn}
						<ScreenshotBtn app={pileApp} {uiSettings} />
					{/if}
					<FullscreenBtn {uiSettings} />
				{:else if !uiSettings.app?.state.showTransformControls}
					{#if uiSettings.showScreenshotBtn}
						<ScreenshotBtn app={pileApp} {uiSettings} />
					{/if}
					{#if !uiSettings.isFullscreen}
						<FullscreenBtn {uiSettings} />
					{/if}
				{/if}

				<div class="flex flex-col items-center gap-3">
					<SettingsBtn {uiSettings} />

					{#if isVertical && pileState.selectedObjectID && !uiSettings.showAddMenu}
						<div class="overflow-hidden" transition:fly={{ x: 20, duration: 200, opacity: 0 }}>
							<ScaleSlider pileState={pileApp.state} {uiSettings} vertical={true} />
						</div>
					{/if}
				</div>
			</div>
		</div>
		{#if uiSettings.showAddMenu}
			<div class="">
				<AddMenu {uiSettings} />
			</div>
		{/if}
	</div>
{/if}
