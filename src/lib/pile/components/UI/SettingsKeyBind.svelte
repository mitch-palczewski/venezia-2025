<script lang="ts">
	import { ambientManager } from "$lib/audio/ambient.svelte";
	import { audioSettings } from "$lib/audio/audio.svelte";
	import { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";
	import { deleteSelectedModel } from "$lib/pile/util/ui/uiActions";

	

    interface Props {
        settingState: SettingsState 
    }
    let {settingState}:Props = $props()


	async function toggleFullscreen() {
		if (!document.fullscreenElement) {
			try {
				await document.documentElement.requestFullscreen();
				settingState.isFullscreen = true;
			} catch (err) {
				console.error(`Error attempting to enable fullscreen: ${err}`);
			}
		} else {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
				settingState.isFullscreen = false;
			}
		}
	}

	function handleKeydown(event: { key: string; }) {
		if (event.key === 'g' || event.key === 'G') {
			settingState.showGrid = !settingState.showGrid
		}
		if (event.key === 'h' || event.key === 'H'
		){
			settingState.showSettingsMenu = !settingState.showSettingsMenu
		}
		if(event.key === 'Escape'){
			settingState.escape()
		}
		if(event.key === 'r' || event.key === 'R'){
			settingState.transformControlsMode = 'rotate'
		}
		if(event.key === 't' || event.key === 'T'){
			settingState.transformControlsMode = 'translate'
		}
		if(event.key === 'Delete' && settingState.app?.state){
			deleteSelectedModel(settingState.app.state)
		}
		if(event.key === 'p' || event.key === 'P'){
			audioSettings.SFXIsMuted = !audioSettings.SFXIsMuted
		}
		if(event.key === 'o' || event.key === 'O'){
			audioSettings.ambientIsMuted = !audioSettings.ambientIsMuted
			ambientManager.setMute(audioSettings.ambientIsMuted)
		}
		if(event.key === 'f' || event.key === 'F'){
			toggleFullscreen()
		}
		if(event.key === '+' || event.key === '='){
			settingState.showAddMenu = !settingState.showAddMenu		
		}
		if(event.key === '-' || event.key === '_'){
			settingState.showAddMenu = false	
		}
		
	}

	
</script>

<svelte:window onkeydown={handleKeydown} />

