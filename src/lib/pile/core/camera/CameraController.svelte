<script lang="ts">
	import type { PileApp } from '$lib/pile/util/pileApp.svelte';
	import type { UiState } from '$lib/pile/util/ui/uiState.svelte';
	import { createIdleTimer } from './idleManager.svelte';
	import OrbitCamera from './OrbitCamera.svelte';
	import FlyCamera from './FlyCamera.svelte';
	import { useInput } from '$lib/3d/core/inputs/useInputs';
	import {
		moveCamera,
		moveOrbitControls,
		useKeyboardMovement
	} from '$lib/3d/core/controls/keyboardMovement';
	import {
		rotateCamera,
		rotateOrbitControls,
		useKeyboardRotation
	} from '$lib/3d/core/controls/keyboardRotation';
	import FirstPersonCamera from './FirstPersonCamera.svelte';
	import { useThrelte } from '@threlte/core';

	const IDLE_SEC = 60;

	export type CameraTypes = 'orbit' | 'fly' | 'first_person';

	type Props = {
		cameraType?: CameraTypes;
		app: PileApp;
		uiState: UiState;
	};
	let { cameraType, app, uiState }: Props = $props();

	const { camera } = useThrelte();
	const idleTimer = createIdleTimer(IDLE_SEC, () => uiState.isIdleEnabled);
	const inputs = useInput();

	const movementSpeed = () => {
		if (app.controlsRef) {
			return uiState.movementSpeed * (app.controlsRef?.getDistance() ?? 1) * 0.005 + 50;
		} else {
			return uiState.movementSpeed;
		}
	};

	useKeyboardMovement(
		movementSpeed,
		(step) => {
			if (cameraType === 'orbit' && app.controlsRef) {
				moveOrbitControls(app.controlsRef, step);
			} else {
				moveCamera(camera.current, step);
			}
		},
		{
			afterMove: () => {
				idleTimer.reset();
			}
		}
	);

	useKeyboardRotation(
		() => 0.4,
		(yaw, pitch) => {
			if (cameraType === 'orbit' && app.controlsRef) {
				rotateOrbitControls(app.controlsRef, camera.current, yaw, pitch);
			} else {
				rotateCamera(camera.current, yaw, pitch);
			}
		},
		{
			afterRotate: () => {
				idleTimer.reset()
			}
		}
	);

	const performanceTier = app.deviceContext.performance.performanceTier;

	let cameraControls = $derived.by(() => {
		if (cameraType) return cameraType;
		if (performanceTier <= 1) return 'fly';
		return app.state.cameraControls;
	});

	const far = $derived.by(() => {
		const performanceTier = app.deviceContext.performance.performanceTier;
		switch (performanceTier) {
			case 0:
				return 9000;
			case 1:
				return 10000;
			case 2:
				return 110000;
			case 3:
				return 120000;
			case 4:
				return 130000;
		}
	});
</script>

{#if cameraControls === 'orbit'}
	<OrbitCamera {app} {idleTimer} {far} lockableObj={app.state} />
{:else if cameraControls === 'fly' && inputs.pointer}
	<FlyCamera
		{app}
		{idleTimer}
		{far}
		pointer={inputs.pointer}
		lockableObj={app.state}
		{movementSpeed}
	/>
{:else if cameraControls === 'first_person'}
	<FirstPersonCamera
		{app}
		{idleTimer}
		{far}
		pointer={inputs.pointer}
		lockableObj={app.state}
		{movementSpeed}
	/>
{/if}
