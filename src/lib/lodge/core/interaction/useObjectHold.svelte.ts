import { useTask, useThrelte } from '@threlte/core';
import { onDestroy, onMount } from 'svelte';
import { Box3, Camera, Object3D, Quaternion, Vector3, type Object3DEventMap } from 'three';

type Bounds = Box3 | (() => Box3 | null | undefined);

interface HoldOptions {
	orientToCamera?: () => boolean;
	lockPitch?: () => boolean;
	rotateSpeed?: number;
	lerpSpeed?: number;
	scrollSpeed?: number;
	minDistance?: number;
	maxDistance?: number;
	resetDistance?: number;
	bounds?: Bounds;
}

const _targetPosition = new Vector3();
const _cameraDirection = new Vector3();
const _cameraPosition = new Vector3();
const _lookAtPosition = new Vector3();
const _originalQuaternion = new Quaternion();
const _targetQuaternion = new Quaternion();
const _dummyObject = new Object3D();

export function useObjectHold(
	getGrabbedObject: () => Object3D | null,
	getInitialDistance: () => number,
	options: HoldOptions = {}
) {
	const {
		orientToCamera = () => false,
		lockPitch = () => false,
		rotateSpeed = 12,
		lerpSpeed = 15,
		scrollSpeed = 0.005,
		minDistance = 0.5,
		maxDistance = 50,
		resetDistance = 2.5,
		bounds
	} = options;

	const { camera } = useThrelte();

	let holdDistance = 3;
	let lastGrabbedObject: Object3D | null = null;
	let wasFacingCamera = false;

	const onMouseDown = (e: MouseEvent) => {
		if (e.button !== 2) return;
		const grabbedObject = getGrabbedObject();
		if (!grabbedObject) return;

		const targetEl = e.target as HTMLElement;
		if (
			targetEl &&
			(targetEl.tagName === 'INPUT' ||
				targetEl.tagName === 'TEXTAREA' ||
				targetEl.isContentEditable)
		) {
			return;
		}

		e.preventDefault();

		const targetDist = resetDistance ?? getInitialDistance();
		holdDistance = Math.max(minDistance, Math.min(maxDistance, targetDist));
	};

	const onWheel = (e: WheelEvent) => {
		const grabbedObject = getGrabbedObject();
		if (!grabbedObject) return;

		const targetEl = e.target as HTMLElement;
		if (
			targetEl &&
			(targetEl.tagName === 'INPUT' ||
				targetEl.tagName === 'TEXTAREA' ||
				targetEl.isContentEditable)
		) {
			return;
		}

		holdDistance -= e.deltaY * scrollSpeed;
		holdDistance = Math.max(minDistance, Math.min(maxDistance, holdDistance));
	};

	onMount(() => {
		window.addEventListener('wheel', onWheel, { passive: true });
		window.addEventListener('mousedown', onMouseDown);
	});

	onDestroy(() => {
		window.removeEventListener('wheel', onWheel);
		window.removeEventListener('mousedown', onMouseDown);
	});

	useTask((delta) => {
		const grabbedObject = getGrabbedObject();
		const activeCamera = camera.current;
		if (!grabbedObject) return;

		if (grabbedObject !== lastGrabbedObject) {
			if (grabbedObject) {
				holdDistance = getInitialDistance();
				_originalQuaternion.copy(grabbedObject.quaternion);
				wasFacingCamera = false;
			}
			lastGrabbedObject = grabbedObject;
		}

		if (!activeCamera || !grabbedObject) return;

		updatePosition(activeCamera, holdDistance, bounds, grabbedObject, delta, lerpSpeed);
		wasFacingCamera = updateOrientation(
			orientToCamera,
			grabbedObject,
			lockPitch,
			delta,
			rotateSpeed,
			wasFacingCamera
		);
	});

	return {
		getHoldDistance: () => holdDistance,
		setHoldDistance: (val: number) => {
			holdDistance = val;
		}
	};
}

function updateOrientation(
	orientToCamera: () => boolean,
	grabbedObject: Object3D<Object3DEventMap>,
	lockPitch: () => boolean,
	delta: number,
	rotateSpeed: number,
	wasFacingCamera: boolean
) {
	if (orientToCamera()) {
		_dummyObject.position.copy(grabbedObject.position);

		if (lockPitch()) {
			_lookAtPosition.set(_cameraPosition.x, grabbedObject.position.y, _cameraPosition.z);
			_dummyObject.lookAt(_lookAtPosition);
		} else {
			_dummyObject.lookAt(_cameraPosition);
		}

		_targetQuaternion.copy(_dummyObject.quaternion);
		grabbedObject.quaternion.slerp(_targetQuaternion, delta * rotateSpeed);
		_originalQuaternion.copy(grabbedObject.quaternion);
		wasFacingCamera = true;
	} else if (wasFacingCamera) {
		_originalQuaternion.copy(grabbedObject.quaternion);
        wasFacingCamera = false;
	}
	return wasFacingCamera;
}

function updatePosition(
	activeCamera: Camera,
	holdDistance: number,
	bounds: Bounds | undefined,
	grabbedObject: Object3D<Object3DEventMap>,
	delta: number,
	lerpSpeed: number
) {
	activeCamera.getWorldDirection(_cameraDirection);
	activeCamera.getWorldPosition(_cameraPosition);

	_targetPosition.copy(_cameraPosition).addScaledVector(_cameraDirection, holdDistance);

	const activeBounds = typeof bounds === 'function' ? bounds() : bounds;
	if (activeBounds) {
		activeBounds.clampPoint(_targetPosition, _targetPosition);
	}

	grabbedObject.position.lerp(_targetPosition, delta * lerpSpeed);
}
