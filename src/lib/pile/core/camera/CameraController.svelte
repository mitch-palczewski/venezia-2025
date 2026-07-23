<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import { createIdleTimer } from './idleManager.svelte';
	import OrbitCamera from './OrbitCamera.svelte';
	import FlyCamera from './FlyCamera.svelte';
	import { useInput } from '$lib/3d/core/inputs/useInputs';
	import { useKeyboardMovement } from '$lib/3d/core/controls/keyboardMovement';
	import { useKeyboardRotation } from '$lib/3d/core/controls/keyboardRotation';

	const IDLE_SEC = 60;

	export type CameraTypes = 'orbit' | 'fly'

	type Props = {
		cameraType?: CameraTypes;
		app: PileApp;
		uiState: UiState;
	};
	let { cameraType, app, uiState }: Props = $props();

	const idleTimer = createIdleTimer(IDLE_SEC, () => uiState.isIdleEnabled);
	const inputs = useInput()

	const movementSpeed = () => {
		if(app.controlsRef){
			return uiState.movementSpeed * (app.controlsRef?.getDistance() ?? 1)* 0.001 + 40 ;
		}else {
			return 10
		}
	}
	useKeyboardMovement(inputs.keys, movementSpeed, () => app.controlsRef);
	useKeyboardRotation(inputs.keys, () => 1, () => app.controlsRef);
			
	
	const performanceTier = app.deviceContext.performance.performanceTier;


	let cameraControls = $derived.by(()=>{
		if(cameraType) return cameraType
		if(performanceTier <=1) return 'fly'
		return app.state.cameraControls
	})

	const far = $derived.by(() => {
		const performanceTier = app.deviceContext.performance.performanceTier;
		switch (performanceTier) {
			case 0:
				return 50000;
			case 1:
				return 80000;
			case 2:
				return 90000;
			case 3:
				return 100000;
			case 4:
				return 110000;
		}
	});

	
</script>

{#if cameraControls === 'orbit'}
	<OrbitCamera {app} {idleTimer} {far} lockableObj={app.state}/>
{:else if cameraControls === 'fly' && inputs.pointer}
	<FlyCamera {app} {idleTimer} {far} pointer ={inputs.pointer} lockableObj={app.state} {movementSpeed}/>
{/if}
