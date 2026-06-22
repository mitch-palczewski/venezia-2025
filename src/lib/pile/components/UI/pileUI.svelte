<script lang="ts">
	import type { PileScene } from '$lib/pile';
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';

	import type { PileState } from '$lib/pile/util/pileState.svelte';
	import { UiState } from '$lib/pile/util/ui/uiState.svelte';
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
	import Banner from './Banner.svelte';

	interface Props {
		pileSceneRef: PileScene;
		uiSettings: UiState;
	}
	let { pileSceneRef, uiSettings }: Props = $props();

	let windowWidth = $state(0);
	const isVertical = $derived(windowWidth < 800);
	const pileApp: PileApp = $derived(pileSceneRef?.pileApp);
	const pileState: PileState = $derived(pileSceneRef?.pileApp?.state);

	let isMd = $state(false);
	let showBanner = $state(true)

	onMount(() => {
		const watch = window.matchMedia('(min-width: 768px)');
		isMd = watch.matches;

		const listener = (e: MediaQueryListEvent) => (isMd = e.matches);
		watch.addEventListener('change', listener);

		const timer = setTimeout(() => {
            showBanner = false;
        }, 7000);
		return () => {
			clearTimeout(timer);
			watch.removeEventListener('change', listener);
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#snippet bannerMessage()}
	<p><span class="font-bold">Left Click</span> on objects to move, rotate, and scale them. </p>
	<p>Use the <span class="font-bold">[ + ]</span> button to add objects </p>
	<p><span class="font-bold">Right Click</span> to pan or use <span class="font-bold">WASD</span> buttons to move around.</p>
{/snippet}
{#snippet phoneBannerMessage()}
	<p><span class="font-bold">Tap</span> on objects to move, rotate, and scale them. </p>
	<p>Use the <span class="font-bold">[+]</span> button to add objects </p>
	<p>Use <span class="font-bold">Two Fingers</span> to pan.</p>
{/snippet}

{#snippet banner()}
	{#if showBanner}
        <Banner 
            children={isMd? bannerMessage : phoneBannerMessage}
            onClose={() => showBanner = false} 
        />
    {/if}
{/snippet}


{#if uiSettings.showUI && pileApp.isReady}
	<div
		class="flex w-full justify-end overflow-hidden pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] z-10"
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
						{#if (!uiSettings.showAddMenu && isVertical) || (!isVertical)}
							<TransformModeBtn {uiSettings} />
							<DuplicateBtn {pileState} {uiSettings} {pileApp}/>
						 	{#if !uiSettings.showAddMenu}
							<FocusBtn {pileState}{uiSettings}/>
							<DeleteBtn {pileState} {uiSettings} />
							{/if}
							
						{/if}
					</div>
				{/if}

				<AddBtn {uiSettings} />
				
				{#if isMd}
					{#if uiSettings.showScreenshotBtn && !uiSettings.showAddMenu && pileApp.isReady}
						<ScreenshotBtn app={pileApp} {uiSettings} />
					{/if}
					<FullscreenBtn {uiSettings} />
				{:else if !uiSettings.app?.state.showTransformControls}
					{#if uiSettings.showScreenshotBtn && !uiSettings.showAddMenu && pileApp.isReady}
						<ScreenshotBtn app={pileApp} {uiSettings} />
					{/if}
					{#if !uiSettings.isFullscreen && !uiSettings.showAddMenu}
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
			<AddMenu {uiSettings} />
		{/if}
	</div>

	{@render banner()}
{/if}



