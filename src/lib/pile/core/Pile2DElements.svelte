<script lang="ts">
	import AsciiArtIntro from '$lib/dom/components/layouts/AsciiArtIntro.svelte';
	import InitializingScreen from '$lib/dom/components/layouts/InitializingScreen.svelte';


    import SettingsMenu from '$lib/pile/components/UI/settings-menu/Menu.svelte';
	import PileUI from '../components/UI/pileUI.svelte';


    let {pileSceneRef, uiState} = $props()
    
</script>

{#if pileSceneRef}
	<PileUI {pileSceneRef} uiSettings={uiState} />
{:else}
	<InitializingScreen/>
{/if}

{#if uiState.showSettingsMenu }
	<AsciiArtIntro/>
	<SettingsMenu uiSettings={uiState} />
{/if}

