<script lang="ts">
    import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
    import { PileScene } from '$lib/pile';
    import PileUI from '$lib/pile/components/UI/pileUI.svelte';
	import { SettingsState } from '$lib/pile/util/ui/settingsState.svelte.js';

    let { data } = $props(); // Using Svelte 5 props syntax
    let pileSceneRef = $state<PileScene>(); 
	const uiSettings = new SettingsState({ showGrid: true });
</script>

<CanvasPortal>
    <PileScene bind:this={pileSceneRef} {data} {uiSettings} />
</CanvasPortal>

{#if pileSceneRef}
    <PileUI {pileSceneRef} {uiSettings} />
{:else}
	<p class="absolute">Initializing Scene ...</p>
{/if}