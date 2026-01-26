<script lang="ts">
	import { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";

    interface Props {
        settingState: SettingsState 
    }
    let {settingState}:Props = $props()

	function handleKeydown(event: { key: string; }) {
		if (event.key === 'p' || event.key === 'P') {
			settingState.presentationMode = !settingState.presentationMode
		}
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
	}

	
</script>

<svelte:window onkeydown={handleKeydown} />

