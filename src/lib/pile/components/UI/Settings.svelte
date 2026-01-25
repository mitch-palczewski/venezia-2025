<script lang="ts">
	import { SettingsState } from "$lib/pile/util/ui/settingsState.svelte";

    interface Props {
        settingState: SettingsState 
    }
    let {settingState}:Props = $props()

	function handleKeydown(event: { key: string; }) {
		if (event.key === 'p') {
			settingState.presentationMode = !settingState.presentationMode
		}
		if (event.key === 'g') {
			settingState.showGrid = !settingState.showGrid
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />