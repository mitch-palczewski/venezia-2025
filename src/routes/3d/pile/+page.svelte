<script lang="ts">
	import CanvasPortal from '$lib/components/3d-canvas/CanvasPortal.svelte';
	import AsciiArtIntro from '$lib/components/layouts/AsciiArtIntro.svelte';
	import InitializingScreen from '$lib/components/layouts/InitializingScreen.svelte';
	import { PileScene } from '$lib/pile';
	import PileUI from '$lib/pile/components/UI/pileUI.svelte';
	import SettingsMenu from '$lib/pile/components/UI/settings-menu/Menu.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte.js';
	import { onDestroy } from 'svelte';

	let { data } = $props();
	let pileSceneRef = $state<PileScene>();
	let canvasContainer = $state<HTMLDivElement>();
	const uiSettings = new SettingsState({ showGrid: false });

	$effect(() => {
		if (canvasContainer) {
			uiSettings.canvasContainer = canvasContainer;
		}
	});

	onDestroy(() => {
		uiSettings.showCursor = true;
	});
</script>

<div bind:this={canvasContainer}>
	<CanvasPortal>
		<PileScene bind:this={pileSceneRef} {data} {uiSettings} />
	</CanvasPortal>
</div>

{#if pileSceneRef}
	<PileUI {pileSceneRef} {uiSettings} />
{:else}
	<InitializingScreen/>
{/if}

{#if uiSettings.showSettingsMenu }
	<AsciiArtIntro/>
{/if}


{#if uiSettings.showSettingsMenu}
	<SettingsMenu {uiSettings} />
{/if}



<style>
	:global(body.no-cursor) {
		cursor: none !important;
	}
	:global(body.no-cursor *) {
		cursor: none !important;
	}
</style>
