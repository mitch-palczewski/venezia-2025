import { useTask } from '@threlte/core';
import { onDestroy, onMount } from 'svelte';
import { Object3D, Quaternion, Vector3, type Object3DEventMap } from 'three';

type KeyState = {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

interface RotationOptions {
  speed?: number
  pivotName?: string;
  invertPitch?: boolean;
}

const _vUp = new Vector3(0, 1, 0);
const _vRight = new Vector3(1, 0, 0);
const _qStep = new Quaternion();

export function usePivotRotation(
    getTarget: () => Object3D | undefined | null,
    options: RotationOptions = {}
) {
    const { speed = Math.PI, pivotName = 'pivot', invertPitch = false } = options

	const keys: KeyState = {
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
				break;
			case 'ArrowRight':
				keys.right = isDown;
				break;
			case 'ArrowUp':
				keys.up = isDown;
				break;
			case 'ArrowDown':
				keys.down = isDown;
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
    const target = getTarget()
    if (!target) return

    const dirX = (keys.right ? 1 : 0) - (keys.left ? 1 : 0)
    const dirY = (keys.up ? 1 : 0) - (keys.down ? 1 : 0)

    if (dirX === 0 && dirY === 0) return

	const pivot = target.getObjectByName(pivotName) ?? target
    const step = speed * delta
	
    if (dirX !== 0) {
      _qStep.setFromAxisAngle(_vUp, -dirX * step);
      pivot.quaternion.premultiply(_qStep);
    }


    if (dirY !== 0) {
      const pitchSign = invertPitch ? 1 : -1;
      _qStep.setFromAxisAngle(_vRight, dirY * pitchSign * step);
      pivot.quaternion.premultiply(_qStep);
    }

  })
}
