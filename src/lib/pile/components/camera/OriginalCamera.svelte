<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import type { UiState } from '../../util/ui/uiState.svelte';
	import type { PileApp } from '../../util/pileApp.svelte';
	import { calculateMovement } from './movement';
	import type { IdleTimer } from './idleManager.svelte';

	const AUTO_ROTATE_SPEED = 0.5;
	const CAMERA_POS: [x: number, y: number, z: number] = [20, 20, 20];
	const CAMERA_LOOK_AT_POS: [x: number, y: number, z: number] = [0, 3, 0];
	const MAX_CAMERA_DISTANCE = 30000;
	const ROT_SPEED = 0.4;
	const DAMPING = 0.1;
	const PAN_SPEED = 0.8;

	interface Props {
		uiState: UiState;
		app: PileApp;
		idleTimer: IdleTimer
		far:number
	}

	let { uiState: uiState, app, idleTimer, far }: Props = $props();
	let screenWidth: number = $state(0);
	let screenHeight: number = $state(0);

	

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
		const speed = uiState.movementSpeed * app.controlsRef.getDistance() * 0.001;
		const moveStep = calculateMovement(app.cameraRef, keys, speed, delta);

		if (moveStep && moveStep.lengthSq() > 0) {
			idleTimer.reset();
			app.cameraRef.position.add(moveStep);
			app.controlsRef.target.add(moveStep);
			app.controlsRef.update();
		}
	});
</script>

<svelte:window
	onkeydown={(e) => onKey(e, true)}
	onkeyup={(e) => onKey(e, false)}
	bind:innerWidth={screenWidth}
	bind:innerHeight={screenHeight}
/>

<T.PerspectiveCamera
	bind:ref={app.cameraRef}
	makeDefault
	far={far}
	near={15}
	position={CAMERA_POS}
	oncreate={(ref) => ref.lookAt(...CAMERA_LOOK_AT_POS)}
	zoom={0.7}
>
	<OrbitControls
		bind:ref={app.controlsRef}
		enableDamping
		dampingFactor={DAMPING}
		rotateSpeed={ROT_SPEED}
		autoRotate={idleTimer.isIdle}
		autoRotateSpeed={AUTO_ROTATE_SPEED}
		zoomSpeed={0.4}
		maxDistance={MAX_CAMERA_DISTANCE}
		panSpeed={PAN_SPEED}
		onstart={idleTimer.stop}
		onend={idleTimer.reset}
	/>
</T.PerspectiveCamera>
