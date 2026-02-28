<script lang="ts">
	import type { PileApp } from '../pile/util/pileApp.svelte';
	import { onMount } from 'svelte';

    let {app}: {app:PileApp} = $props();

    onMount(() => {
    const actualRAM = (navigator as any).deviceMemory
    const RAM = actualRAM || 4;
    const actualCores = navigator.hardwareConcurrency
    const cores = actualCores || 4;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isHighEndMobile = isMobile && cores >= 8 && RAM >= 4;

    if (isMobile && !isHighEndMobile) {
        app.quality = 'low';
    } else if (RAM < 4 || cores < 4) {
        app.quality = 'low';
    } else if (RAM < 8 || cores < 6) {
        app.quality = 'medium';
    } else {
        app.quality = 'high';
    }

    console.log(`Quality: ${app.quality} | Mobile: ${isMobile} | Cores: ${actualCores} | Ram: ${actualRAM}`);
});
</script>