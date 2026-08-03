import { useTask, useThrelte } from '@threlte/core';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box3, Camera, Object3D, Vector3 } from 'three';
import { onMount, onDestroy } from 'svelte';

const forward = new Vector3();
const side = new Vector3();
const direction = new Vector3();
const moveStep = new Vector3();
const candidatePos = new Vector3();

type InternalKeyState = {
	forward: boolean;
	left: boolean;
	backward: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

export function moveCamera(
    camera: Camera | undefined, 
    movement: Vector3, 
    bounds?: Box3
) {
    if (!camera) return;

    if (bounds) {
        candidatePos.copy(camera.position).add(movement);
        bounds.clampPoint(candidatePos, candidatePos);
        camera.position.copy(candidatePos);
    } else {
        camera.position.add(movement);
    }

    camera.updateMatrixWorld();
}


export function moveOrbitControls(controls: ThreeOrbitControls | undefined, movement: Vector3) {
  if (!controls) return;
  controls.object.position.add(movement);
  controls.target.add(movement);
  controls.update();
}

export function moveObject3D(object: Object3D | undefined, movement: Vector3) {
  if (!object) return;
  object.position.add(movement);
  object.updateMatrixWorld();
}

export interface KeyboardMovementOptions {
	afterMove?: () => void,
	lockYMovement?: boolean 
}


export function useKeyboardMovement(
	getMovementSpeed: number | (() => number),
	moveStep: (movement: Vector3) => void,
	options: KeyboardMovementOptions = {}
) {
	const { camera } = useThrelte();

	const keys: InternalKeyState = {
		forward: false,
		left: false,
		backward: false,
		right: false,
		up: false,
		down: false
	};

	const handleKey = (e: KeyboardEvent, isDown: boolean) => {
		const target = e.target as HTMLElement;
		if (
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
		) {
			return;
		}

		switch (e.code) {
			case 'KeyW':
				keys.forward = isDown;
				break;
			case 'KeyS':
				keys.backward = isDown;
				break;
			case 'KeyA':
				keys.left = isDown;
				break;
			case 'KeyD':
				keys.right = isDown;
				break;
			case 'Space':
				keys.up = isDown;
				if (isDown) e.preventDefault();
				break;
			case 'ShiftLeft':
				keys.down = isDown;
				break;
		}
	};

	const onKeyDown = (e: KeyboardEvent) => handleKey(e, true);
	const onKeyUp = (e: KeyboardEvent) => handleKey(e, false);

	const onBlur = () => {
		keys.forward = false;
		keys.left = false;
		keys.backward = false;
		keys.right = false;
		keys.up = false;
		keys.down = false;
	};

	onMount(() => {
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		window.addEventListener('blur', onBlur);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown);
		window.removeEventListener('keyup', onKeyUp);
		window.removeEventListener('blur', onBlur);
	});

	useTask((delta) => {
		const activeCamera = camera.current;
		if (!activeCamera) return;

		const speed = typeof getMovementSpeed === 'function' ? getMovementSpeed() : getMovementSpeed;

		const movement = calculateMovement(activeCamera, keys, speed, delta, options.lockYMovement);

		if (movement) {
			moveStep(movement)
			options.afterMove?.()
		}
	});
}



function calculateMovement(
	camera: Camera,
	keys: InternalKeyState,
	speed: number,
	delta: number,
	lockYMovement?: boolean
): Vector3 | null {
	direction.set(0, 0, 0);

	camera.getWorldDirection(forward);
	if(lockYMovement){
		forward.y = 0;
	}
	forward.normalize();

	side.crossVectors(camera.up, forward).normalize();

	if (keys.forward) direction.add(forward);
	if (keys.backward) direction.sub(forward);
	if (keys.left) direction.add(side);
	if (keys.right) direction.sub(side);

	if (keys.up) direction.y += 1;
	if (keys.down) direction.y -= 1;

	if (direction.lengthSq() > 0) {
		moveStep.copy(direction.normalize()).multiplyScalar(speed * delta);
		return moveStep;
	}
	return null;
}
