<script lang="ts">
	import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
	import GeneralButton from './GeneralButton.svelte'; 

	let { uiSettings }: { uiSettings: SettingsState } = $props();

	async function toggleFullscreen() {
		if (!document.fullscreenElement) {
			try {
				await document.documentElement.requestFullscreen();
				uiSettings.isFullscreen = true;
			} catch (err) {
				console.error(`Error attempting to enable fullscreen: ${err}`);
			}
		} else {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
				uiSettings.isFullscreen = false;
			}
		}
	}
</script>

{#if !uiSettings.showAddMenu}
	<GeneralButton
		onclick={toggleFullscreen}
		active={uiSettings.showSettingsMenu}
		tooltip={uiSettings.hudTooltip}
		tooltipText="Fullscreen"
		class="h-10 w-10 rounded-md border border-white/10 px-2 backdrop-blur-md"
	>
		<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5 transition-all duration-300 group-hover:scale-110"
        >
            {#if !uiSettings.isFullscreen}
                <path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6" />
            {:else}
                <path d="M4 14h6v6M20 10h-6V4M14 20v-6h6M10 4v6H4" />
            {/if}
        </svg>
	</GeneralButton>
{/if}
