import { useThrelte } from '@threlte/core';
import { Euler, MathUtils } from 'three';
import { onMount, onDestroy } from 'svelte';

export function useFirstPersonControls(rotationSpeed = 0.002) {
	const { camera, renderer } = useThrelte();

	let pitch = 0;
	let yaw = 0;
	const maxPitch = Math.PI / 2 - 0.05;

	const onMouseMove = (event: MouseEvent) => {
		if (document.pointerLockElement !== renderer.domElement) return;

		const activeCamera = camera.current;
		if (!activeCamera) return;

		yaw -= event.movementX * rotationSpeed;
		pitch -= event.movementY * rotationSpeed;
		pitch = MathUtils.clamp(pitch, -maxPitch, maxPitch);

		activeCamera.rotation.set(pitch, yaw, 0, 'YXZ');
	};

	const onPointerLockChange = () => {
		if (document.pointerLockElement !== renderer.domElement || !camera.current) return;
		const euler = new Euler().copy(camera.current.rotation).reorder('YXZ');
		pitch = euler.x;
		yaw = euler.y;
	};

	const requestLock = () => {
		renderer.domElement.requestPointerLock();
	};

	onMount(() => {
		const dom = renderer.domElement;
		dom.addEventListener('click', requestLock);
		document.addEventListener('pointerlockchange', onPointerLockChange);
		document.addEventListener('mousemove', onMouseMove);
	});

	onDestroy(() => {
		const dom = renderer.domElement;
		dom.removeEventListener('click', requestLock);
		document.removeEventListener('pointerlockchange', onPointerLockChange);
		document.removeEventListener('mousemove', onMouseMove);
	});
}
