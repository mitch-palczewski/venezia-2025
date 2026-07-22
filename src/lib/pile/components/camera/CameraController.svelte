<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import { createIdleTimer } from './idleManager.svelte';
	import { useKeyboardMovement } from '../controls/keyboardMovement';
	import OrbitCamera from './OrbitCamera.svelte';
	import { useKeyboardRotation } from '../controls/keyboardRotation';
	import FlyCamera from './FlyCamera.svelte';
	import { useInput } from '../controls/inputs/useInputs';

	const IDLE_SEC = 60;

	type Props = {
		cameraType?: 'orbit' | 'fly';
		app: PileApp;
		uiState: UiState;
	};
	let { cameraType, app, uiState }: Props = $props();

	const idleTimer = createIdleTimer(IDLE_SEC, () => uiState.isIdleEnabled);
	const inputs = useInput()

	const movementSpeed = () => uiState.movementSpeed * (app.controlsRef?.getDistance() ?? 1) * 0.001;
	useKeyboardMovement(inputs.keys, ()=>10, () => app.controlsRef);
	useKeyboardRotation(inputs.keys, () => 1, () => app.controlsRef);

	getCameraType()

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

	function getCameraType(){
		if(cameraType) return 
		const performanceTier = app.deviceContext.performance.performanceTier;
		if(performanceTier <= 1){
			cameraType = 'fly'
		}else{
			cameraType ='orbit'
		}
		
	}
</script>

{#if cameraType === 'orbit'}
	<OrbitCamera {app} {idleTimer} {far} />
{:else if cameraType === 'fly' && inputs.pointer}
	<FlyCamera {app} {idleTimer} {far} pointer ={inputs.pointer} />
{/if}
