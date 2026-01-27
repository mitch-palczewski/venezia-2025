<script lang="ts">
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	import { PileScene } from '$lib/pile';
	import PileUI from '$lib/pile/components/UI/pileUI.svelte';
	import SettingsMenu from '$lib/pile/components/UI/settings-menu/Menu.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte.js';
	import { onDestroy } from 'svelte';

	let { data } = $props();
	let pileSceneRef = $state<PileScene>();
	let canvasContainer = $state<HTMLDivElement>();
	const uiSettings = new SettingsState({ showGrid: true });
		


	$effect(() => {
		if (canvasContainer) {
			uiSettings.canvasContainer = canvasContainer;
		}
	});

	onDestroy(() => {
		uiSettings.showCursor = true
	})
</script>



<div bind:this={canvasContainer}>
	<CanvasPortal>
		<PileScene bind:this={pileSceneRef} {data} {uiSettings} />
	</CanvasPortal>
</div>

{#if pileSceneRef}
	<PileUI {pileSceneRef} {uiSettings} />
{:else}
	<p class="absolute">Initializing Scene ...</p>
{/if}

{#if uiSettings.showSettingsMenu}
	<SettingsMenu {uiSettings}/>
{/if}

<style>
	:global(body.no-cursor) {
        cursor: none !important;
    }
    :global(body.no-cursor *) {
        cursor: none !important;
    }
</style>
