<script lang="ts">
    import type { PileApp } from '$lib/pile/util/pileApp.svelte';
    import type { SettingsState } from '$lib/pile/util/ui/settingsState.svelte';
    import GeneralButton from './GeneralButton.svelte';

    let { app, uiSettings }: { app: PileApp; uiSettings: SettingsState } = $props();

    // Svelte 5 state for tracking the upload/capture progress
    let isLoading = $state(false);

    const handleScreenshotBtnPress = async () => {
        if (isLoading) return;
        
        isLoading = true;
        try {
            // We await the process (make sure initCaptureScreenshot returns the Promise)
            await app.initCaptureScreenshot();
        } catch (error) {
            console.error("Screenshot failed:", error);
        } finally {
            isLoading = false;
        }
    };
</script>

<GeneralButton
    onclick={handleScreenshotBtnPress}
    tooltip={uiSettings.hudTooltip}
    tooltipText={isLoading ? "Saving..." : "Capture Screenshot"}
    class="h-10 px-3 text-lg font-extrabold"
    disabled={isLoading}
>
    {#if isLoading}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 animate-spin"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    {:else}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    {/if}
</GeneralButton>