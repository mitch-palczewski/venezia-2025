import { useTask, useThrelte } from '@threlte/core';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Camera, Vector3 } from 'three';
import type { KeyState } from '../inputs/keyboardInputs.svelte';

const forward = new Vector3();
const side = new Vector3();
const direction = new Vector3();
const moveStep = new Vector3();

export function useKeyboardMovement(
	keys: KeyState,
	getMovementSpeed: () => number,
	getControls?: () => ThreeOrbitControls | undefined,
	getCustomCamera?: () => Camera | undefined,
	onMove?: () => void
) {
	const { camera } = useThrelte();

	useTask((delta) => {
		const activeCamera = getCustomCamera?.() ?? camera.current;
		if (!activeCamera) return;

		const movementSpeed = getMovementSpeed();
		const controls = getControls?.();

		const hasMoved = calculateMovement(activeCamera, keys, movementSpeed, delta);

		if (hasMoved) {
			activeCamera.position.add(moveStep);

			if (controls) {
				controls.target.add(moveStep);
				controls.update();
			}else{
				activeCamera.updateMatrixWorld()
			}
			onMove?.();
		}
	});
}

function calculateMovement(
	camera: Camera,
	keys: KeyState,
	speed: number,
	delta: number
): Vector3 | null {
	direction.set(0, 0, 0);

	camera.getWorldDirection(forward);
	forward.y = 0;
	forward.normalize();

	side.crossVectors(camera.up, forward).normalize();

	if (keys.w) direction.add(forward);
	if (keys.s) direction.sub(forward);
	if (keys.a) direction.add(side);
	if (keys.d) direction.sub(side);

	if (keys.space) direction.y += 1;
	if (keys.shift) direction.y -= 1;

	if (direction.lengthSq() > 0) {
		moveStep.copy(direction.normalize()).multiplyScalar(speed * delta);

		return moveStep;
	}
	return null;
}
