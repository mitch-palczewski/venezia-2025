<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { Vector3 } from 'three';
	import type { SettingsState } from '../util/ui/settingsState.svelte';
	import type { PileApp } from '../util/pileApp.svelte';
	import { onDestroy } from 'svelte';

	const IDLE_SEC = 60;
	const AUTO_ROTATE_SPEED = 0.5;
	const CAMERA_FAR_BOUND = 100000;
	const CAMERA_POS: [x: number, y: number, z: number] = [5, 5, 10];
	const CAMERA_LOOK_AT_POS: [x: number, y: number, z: number] = [0, 3, 0];

	interface Props {
		uiSettings: SettingsState;
		app: PileApp;
	}
	let { uiSettings, app }: Props = $props();

	let autoRotate = $state(false);
	let idleTimer: ReturnType<typeof setTimeout>;
	const resetIdleTimer = () => {
		stopAutoRotate();
		if (uiSettings.isIdleEnabled) {
			idleTimer = setTimeout(() => {
				autoRotate = true;
			}, 1000 * IDLE_SEC);
		}
	};
	const stopAutoRotate = () => {
		autoRotate = false;
		if (idleTimer) clearTimeout(idleTimer);
	};

	resetIdleTimer();

	onDestroy(() => {
		if (idleTimer) clearTimeout(idleTimer);
	});

  $effect(() => {
    if(!uiSettings.isIdleEnabled){
      stopAutoRotate();
    }else{
      resetIdleTimer();
    }
  })

	const keys = $state({
		w: false,
		a: false,
		s: false,
		d: false,
		space: false,
		shift: false
	});

	const direction = new Vector3();
	const forward = new Vector3();
	const side = new Vector3();

	const onKey = (e: KeyboardEvent, isPressed: boolean) => {
		const key = e.key.toLowerCase();
		const keyMap = e.code === 'Space' ? 'space' : key;
		if (keyMap in keys) keys[keyMap as keyof typeof keys] = isPressed;
	};

	useTask((delta) => {
		if (!app.cameraRef || !app.controlsRef) return;

		direction.set(0, 0, 0);
		app.cameraRef.getWorldDirection(forward);
		forward.y = 0;
		forward.normalize();

		side.crossVectors(app.cameraRef.up, forward).normalize();

		if (keys.w) direction.add(forward);
		if (keys.s) direction.sub(forward);
		if (keys.a) direction.add(side);
		if (keys.d) direction.sub(side);

		if (direction.length() > 0) direction.normalize();

		if (keys.space) direction.y += 1;
		if (keys.shift) direction.y -= 1;

		if (direction.length() > 0) {
			resetIdleTimer();
			const moveStep = direction.multiplyScalar(uiSettings.movementSpeed * delta);
			app.cameraRef.position.add(moveStep);
			app.controlsRef.target.add(moveStep);
			app.controlsRef.update();
		}
	});
</script>

<svelte:window onkeydown={(e) => onKey(e, true)} onkeyup={(e) => onKey(e, false)} />

<T.PerspectiveCamera
	bind:ref={app.cameraRef}
	makeDefault
	far={CAMERA_FAR_BOUND}
	position={CAMERA_POS}
	oncreate={(ref) =>
		ref.lookAt(CAMERA_LOOK_AT_POS[0], CAMERA_LOOK_AT_POS[1], CAMERA_LOOK_AT_POS[2])}
>
	<OrbitControls
		bind:ref={app.controlsRef}
		enableDamping
		{autoRotate}
		autoRotateSpeed={AUTO_ROTATE_SPEED}
		onstart={stopAutoRotate}
		onend={resetIdleTimer}
	/>
</T.PerspectiveCamera>
