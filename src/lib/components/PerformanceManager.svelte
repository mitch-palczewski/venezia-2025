<script lang="ts">
	import type { PileApp } from '../pile/util/pileApp.svelte';
	import { onMount } from 'svelte';

	let { app }: { app: PileApp } = $props();

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const RAM = (navigator as any).deviceMemory || 4;
		const cores = navigator.hardwareConcurrency || 4;

		const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

		const isIPad =
			(navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1) ||
			/iPad/i.test(navigator.userAgent);

		if (isIPad) {
			if (RAM >= 8 && cores >= 8) {
				app.quality = 'high';
			} else {
				app.quality = 'medium';
			}
		} else if (isMobile) {
			app.quality = RAM >= 6 && cores >= 8 ? 'medium' : 'low';
		} else {
			if (RAM >= 16 && cores >= 8) app.quality = 'high';
			else if (RAM >= 8) app.quality = 'medium';
			else app.quality = 'low';
		}

		console.log(
			`Device: ${isIPad ? 'iPad' : isMobile ? 'Mobile' : 'Desktop'} | Quality: ${app.quality}`
		);
	});
</script>
