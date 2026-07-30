import { useTask, useThrelte } from '@threlte/core';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Camera, MathUtils, Spherical, Vector3 } from 'three';
import { onMount, onDestroy } from 'svelte';

const WORLD_UP = new Vector3(0, 1, 0);
const offset = new Vector3();
const spherical = new Spherical();

type RotationKeyState = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
};

export interface KeyboardRotationOptions {
  invertPitch?: boolean | (() => boolean);
  afterRotate?: () => void;
}

export function rotateCamera(
  camera: Camera | undefined,
  yaw: number,
  pitch: number
) {
  if (!camera) return;

  if (yaw !== 0) camera.rotateOnWorldAxis(WORLD_UP, yaw);
  if (pitch !== 0) camera.rotateX(pitch);

  camera.updateMatrixWorld();
}

export function rotateOrbitControls(
  controls: ThreeOrbitControls | undefined,
  camera: Camera | undefined,
  yaw: number,
  pitch: number
) {
  if (!controls || !camera) return;

  offset.copy(camera.position).sub(controls.target);
  spherical.setFromVector3(offset);

  spherical.theta += yaw;
  spherical.phi -= pitch;

  const minPolar = controls.minPolarAngle ?? 0.0001;
  const maxPolar = controls.maxPolarAngle ?? Math.PI - 0.0001;
  spherical.phi = MathUtils.clamp(spherical.phi, minPolar, maxPolar);

  spherical.makeSafe();

  offset.setFromSpherical(spherical);
  camera.position.copy(controls.target).add(offset);
  camera.lookAt(controls.target);
  controls.update();
}


export function useKeyboardRotation(
  getRotationSpeed: number | (() => number),
  onRotate: (yaw: number, pitch: number) => void,
  options: KeyboardRotationOptions = {}
) {
  const { camera } = useThrelte();

  const keys: RotationKeyState = {
    left: false,
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
      case 'ArrowLeft':
        keys.left = isDown;
        e.preventDefault();
        break;
      case 'ArrowRight':
        keys.right = isDown;
        e.preventDefault();
        break;
      case 'ArrowUp':
        keys.up = isDown;
        e.preventDefault();
        break;
      case 'ArrowDown':
        keys.down = isDown;
        e.preventDefault();
        break;
    }
  };

  const onKeyDown = (e: KeyboardEvent) => handleKey(e, true);
  const onKeyUp = (e: KeyboardEvent) => handleKey(e, false);

  const onBlur = () => {
    keys.left = false;
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

    let yawInput = 0;
    let pitchInput = 0;

    if (keys.left) yawInput += 1;
    if (keys.right) yawInput -= 1;

    const invert =
      typeof options.invertPitch === 'function'
        ? options.invertPitch()
        : options.invertPitch ?? false;

    if (invert) {
      if (keys.up) pitchInput += 1;
      if (keys.down) pitchInput -= 1;
    } else {
      if (keys.up) pitchInput -= 1;
      if (keys.down) pitchInput += 1;
    }

    if (yawInput === 0 && pitchInput === 0) return;

    const speed =
      typeof getRotationSpeed === 'function' ? getRotationSpeed() : getRotationSpeed;

    const angleStep = speed * delta;
    const yawStep = yawInput * angleStep;
    const pitchStep = pitchInput * angleStep;

    onRotate(yawStep, pitchStep);
    options.afterRotate?.()
  });
}