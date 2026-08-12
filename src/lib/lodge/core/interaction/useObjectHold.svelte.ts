import { useTask, useThrelte } from '@threlte/core';
import { onDestroy, onMount } from 'svelte';
import { Object3D, Quaternion, Vector3 } from 'three';

interface HoldOptions {
  orientToCamera?: () => boolean;
  lockPitch?: () => boolean;
  rotateSpeed?: number;
  lerpSpeed?: number;
  scrollSpeed?: number;
  minDistance?: number;
  maxDistance?: number;
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
    maxDistance = 50
  } = options;

  const { camera } = useThrelte();

  let holdDistance = 3;
  let lastGrabbedObject: Object3D | null = null;
  let wasFacingCamera = false;

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

    holdDistance += e.deltaY * scrollSpeed;
    holdDistance = Math.max(minDistance, Math.min(maxDistance, holdDistance));
  };

  onMount(() => {
    window.addEventListener('wheel', onWheel, { passive: true });
  });

  onDestroy(() => {
    window.removeEventListener('wheel', onWheel);
  });

  useTask((delta) => {
    const grabbedObject = getGrabbedObject();
    const activeCamera = camera.current;

    if (grabbedObject !== lastGrabbedObject) {
      if (grabbedObject) {
        holdDistance = getInitialDistance();
        _originalQuaternion.copy(grabbedObject.quaternion);
        wasFacingCamera = false;
      }
      lastGrabbedObject = grabbedObject;
    }

    if (!activeCamera || !grabbedObject) return;

    // --- Position Update ---
    activeCamera.getWorldDirection(_cameraDirection);
    activeCamera.getWorldPosition(_cameraPosition);

    _targetPosition.copy(_cameraPosition).addScaledVector(_cameraDirection, holdDistance);
    grabbedObject.position.lerp(_targetPosition, delta * lerpSpeed);

    // --- Orientation Update ---
    if (orientToCamera()) {
      _dummyObject.position.copy(grabbedObject.position);

      if (lockPitch()) {
        // Flatten Y-coordinate so the target point is level with the object
        _lookAtPosition.set(_cameraPosition.x, grabbedObject.position.y, _cameraPosition.z);
        _dummyObject.lookAt(_lookAtPosition);
      } else {
        // Look directly at camera position in 3D space
        _dummyObject.lookAt(_cameraPosition);
      }

      _targetQuaternion.copy(_dummyObject.quaternion);
      grabbedObject.quaternion.slerp(_targetQuaternion, delta * rotateSpeed);
      wasFacingCamera = true;
    } else if (wasFacingCamera) {
      grabbedObject.quaternion.slerp(_originalQuaternion, delta * rotateSpeed);

      if (grabbedObject.quaternion.angleTo(_originalQuaternion) < 0.001) {
        grabbedObject.quaternion.copy(_originalQuaternion);
        wasFacingCamera = false;
      }
    }
  });

  return {
    getHoldDistance: () => holdDistance,
    setHoldDistance: (val: number) => {
      holdDistance = val;
    }
  };
}