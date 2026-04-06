<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import type { SettingsState } from '../../util/ui/settingsState.svelte';
	import type { PileApp } from '../../util/pileApp.svelte';
	import { createIdleManage } from './idleManager.svelte';
	import { calculateMovement } from './movement';

	const IDLE_SEC = 60;
	const AUTO_ROTATE_SPEED = 0.5;
	const CAMERA_FAR_BOUND = 100000;
	const CAMERA_POS: [x: number, y: number, z: number] = [5, 5, 10];
	const CAMERA_LOOK_AT_POS: [x: number, y: number, z: number] = [0, 3, 0];
	const MAX_CAMERA_DISTANCE = 3000
	const SM_SCREEN_ROT_SPEED = .1
	const ROT_SPEED = .4
	const SM_SCREEN_DAMPING = 1
	const DAMPING = .1
	const SM_SCRREN_PAN_SPEED = .5
	const PAN_SPEED = .8

	interface Props {
		uiSettings: SettingsState;
		app: PileApp;
	}
	let { uiSettings, app }: Props = $props();
	let screenWidth: number = $state(0);
	let screenHeight: number = $state(0);

	const idleManager = createIdleManage(IDLE_SEC, () => uiSettings.isIdleEnabled);
	const smScreen = $derived(screenWidth  < 700 || screenHeight < 700 )

	$effect(() => {
		if (uiSettings.isIdleEnabled) {
			idleManager.reset();
		} else {
			idleManager.stop();
		}
	});

	const keys = $state({
		w: false,
		a: false,
		s: false,
		d: false,
		space: false,
		shift: false
	});

	const onKey = (e: KeyboardEvent, isPressed: boolean) => {
		const key = e.key.toLowerCase();
		const keyMap = e.code === 'Space' ? 'space' : key;
		if (keyMap in keys) keys[keyMap as keyof typeof keys] = isPressed;
	};

	useTask((delta) => {
		if (!app.cameraRef || !app.controlsRef) return;
		const moveStep = calculateMovement(app.cameraRef, keys, uiSettings.movementSpeed, delta);

		if (moveStep && moveStep.lengthSq() > 0) {
			idleManager.reset();
			app.cameraRef.position.add(moveStep);
			app.controlsRef.target.add(moveStep);
			app.controlsRef.update();
		}
	});
</script>

<svelte:window onkeydown={(e) => onKey(e, true)} onkeyup={(e) => onKey(e, false)} bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<T.PerspectiveCamera
	bind:ref={app.cameraRef}
	makeDefault
	far={CAMERA_FAR_BOUND}
	near={10}
	position={CAMERA_POS}
	oncreate={(ref) => ref.lookAt(...CAMERA_LOOK_AT_POS)}
>
	<OrbitControls
		bind:ref={app.controlsRef}
		enableDamping
		dampingFactor={smScreen ? SM_SCREEN_DAMPING : DAMPING}
		rotateSpeed={smScreen ? SM_SCREEN_ROT_SPEED : ROT_SPEED}
		autoRotate={idleManager.autoRotate}
		autoRotateSpeed={AUTO_ROTATE_SPEED}
		maxDistance={uiSettings.lockMaxZoom ? MAX_CAMERA_DISTANCE : Infinity}
		panSpeed={smScreen ? SM_SCRREN_PAN_SPEED : PAN_SPEED}
		onstart={idleManager.stop}
		onend={idleManager.reset}
	/>
</T.PerspectiveCamera>
