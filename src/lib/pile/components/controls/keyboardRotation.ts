import { useTask, useThrelte } from '@threlte/core';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Camera, MathUtils, Spherical, Vector3 } from 'three';
import type { KeyState } from './inputs.svelte';

const WORLD_UP = new Vector3(0, 1, 0);
const offset = new Vector3();
const spherical = new Spherical();

export function useKeyboardRotation(
	keys: KeyState,
    getSpeed?: () => number,
	getControls?: () => ThreeOrbitControls | undefined,
	getCustomCamera?: () => Camera | undefined,
	getInvertPitch?: () => boolean,
	onRotate?: () => void
) {
	const { camera } = useThrelte();

	useTask((delta) => {
		const activeCamera = getCustomCamera?.() ?? camera.current;
		if (!activeCamera) return;

		const RotationSpeed = getSpeed?.() ?? 0.5;
		const controls = getControls?.();
		const invertPitch = getInvertPitch?.();

		const hasRotated = applyRotation(
			activeCamera,
			keys,
			RotationSpeed,
			delta,
			controls,
			invertPitch
		);

		if (hasRotated) {
			if (controls) {
				controls.update();
			}
			onRotate?.();
		}
	});
}

export function applyRotation(
	camera: Camera,
	keys: KeyState,
	rotSpeed: number,
	delta: number,
	controls?: ThreeOrbitControls,
	invertPitch: boolean = false
): boolean {
	let yaw = 0;
	let pitch = 0;

	if (keys.arrowLeft) yaw += 1;
	if (keys.arrowRight) yaw -= 1;

	if (invertPitch) {
		if (keys.arrowUp) pitch += 1;
		if (keys.arrowDown) pitch -= 1;
	} else {
		if (keys.arrowUp) pitch -= 1;
		if (keys.arrowDown) pitch += 1;
	}

	if (yaw === 0 && pitch === 0) return false;

	const angle = rotSpeed * delta;

	if (controls) {
		offset.copy(camera.position).sub(controls.target);
		spherical.setFromVector3(offset);

		spherical.theta += yaw * angle;
		spherical.phi -= pitch * angle;

		const minPolar = controls.minPolarAngle ?? 0.0001;
		const maxPolar = controls.maxPolarAngle ?? Math.PI - 0.0001;
		spherical.phi = MathUtils.clamp(spherical.phi, minPolar, maxPolar);

		spherical.makeSafe();

		offset.setFromSpherical(spherical);
		camera.position.copy(controls.target).add(offset);
		camera.lookAt(controls.target);
	} else {
		if (yaw !== 0) camera.rotateOnWorldAxis(WORLD_UP, yaw * angle);
		if (pitch !== 0) camera.rotateX(pitch * angle);
	}

	return true;
}
