<script lang="ts">
	import AsciiArtIntro from "$lib/components/layouts/AsciiArtIntro.svelte";
	import InitializingScreen from "$lib/components/layouts/InitializingScreen.svelte";
	import PileUI from "./UI/pileUI.svelte";
    import SettingsMenu from '$lib/pile/components/UI/settings-menu/Menu.svelte';


    let {pileSceneRef, uiState} = $props()
    
</script>

{#if pileSceneRef}
	<PileUI {pileSceneRef} uiSettings={uiState} />
{:else}
	<InitializingScreen/>
{/if}

{#if uiState.showSettingsMenu }
	<AsciiArtIntro/>
{/if}

{#if uiState.showSettingsMenu}
	<SettingsMenu uiSettings={uiState} />
{/if}