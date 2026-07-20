<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import { createIdleTimer  } from './idleManager.svelte';
	import OriginalCamera from './OriginalCamera.svelte';

	const IDLE_SEC = 60;

	type Props = {
		cameraType: 'orbit' | 'fly' | 'original';
		app: PileApp;
		uiState: UiState;
	};
	let { cameraType, app, uiState }: Props = $props();

	const idleTimer = createIdleTimer(IDLE_SEC, () => uiState.isIdleEnabled);

	const far = $derived.by(() => {
		const performanceTier = app.deviceContext.performance.performanceTier;
		switch (performanceTier) {
			case 0:
				return 50000;
			case 1:
				return 60000;
			case 2:
				return 70000;
			case 3:
				return 90000;
			case 4:
				return 110000;
		}
	});
</script>

{#if cameraType === 'original'}
	<OriginalCamera {app} {uiState} {idleTimer} {far} />
{/if}
