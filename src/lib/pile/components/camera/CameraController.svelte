<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import { createIdleTimer } from './idleManager.svelte';
	import { useKeyboardMovement } from '../controls/keyboardMovement';
	import OrbitCamera from './OrbitCamera.svelte';
	import { useKeyboardInput } from '../controls/inputs/keyboardInputs.svelte';
	import { useKeyboardRotation } from '../controls/keyboardRotation';
	import FlyCamera from './FlyCamera.svelte';
	import { usePointerInput } from '../controls/inputs/mouseInputs.svelte';

	const IDLE_SEC = 60;

	type Props = {
		cameraType: 'orbit' | 'fly';
		app: PileApp;
		uiState: UiState;
	};
	let { cameraType, app, uiState }: Props = $props();

	const idleTimer = createIdleTimer(IDLE_SEC, () => uiState.isIdleEnabled);
	const keys = useKeyboardInput(() => idleTimer.reset(), true);
	const pointer = usePointerInput();

	const movementSpeed = () => uiState.movementSpeed * (app.controlsRef?.getDistance() ?? 1) * 0.001;
	useKeyboardMovement(keys, ()=>10, () => app.controlsRef);
	useKeyboardRotation(keys, () => 1, () => app.controlsRef);

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

{#if cameraType === 'orbit'}
	<OrbitCamera {app} {idleTimer} {far} />
{:else if cameraType === 'fly' && pointer}
	<FlyCamera {app} {idleTimer} {far} {pointer} />
{/if}
