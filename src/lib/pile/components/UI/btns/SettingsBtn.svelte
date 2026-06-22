<script lang="ts">
    import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
    import GeneralButton from './GeneralButton.svelte'; // Adjust path as needed

    let { uiSettings }: { uiSettings: UiState } = $props();
</script>

{#if !uiSettings.showAddMenu}
    <GeneralButton
        onclick={() => (uiSettings.showSettingsMenu = !uiSettings.showSettingsMenu)}
        active={uiSettings.showSettingsMenu}
        tooltip={uiSettings.hudTooltip}
        tooltipText="h : Setting Menu"
        class="h-10 w-10 rounded-md border border-white/10 backdrop-blur-md px-2"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor" 
            class="h-6 w-6 transition-transform duration-700 group-hover:rotate-90"
        >
            <path d="M22 10.5V13.5H19.2C18.9 14.5 18.5 15.5 17.8 16.3L19.8 18.3L17.7 20.4L15.7 18.4C14.8 19 13.9 19.5 12.8 19.7V22.5H9.8V19.7C8.8 19.5 7.8 19.1 7 18.4L5 20.4L2.9 18.3L4.9 16.3C4.2 15.5 3.8 14.5 3.5 13.5H0.6V10.5H3.5C3.8 9.5 4.2 8.5 4.9 7.6L2.9 5.6L5 3.5L7 5.5C7.8 4.8 8.8 4.4 9.8 4.2V1.5H12.8V4.2C13.8 4.4 14.8 4.8 15.6 5.5L17.6 3.5L19.7 5.6L17.7 7.6C18.4 8.5 18.8 9.5 19.1 10.5H22Z" />
            
            <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8ZM12 14.5C10.6 14.5 9.5 13.4 9.5 12C9.5 10.6 10.6 9.5 12 9.5C13.4 9.5 14.5 10.6 14.5 12C14.5 13.4 13.4 14.5 12 14.5Z" 
                class="fill-black/50 transition-colors group-hover:fill-zinc-800"
            />
        </svg>
    </GeneralButton>
{/if}