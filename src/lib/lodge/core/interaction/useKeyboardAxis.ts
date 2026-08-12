import { useTask } from '@threlte/core';
import { onDestroy, onMount } from 'svelte';
import { Object3D, type Object3DEventMap } from 'three';

type KeyState = {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

interface RotationOptions {
  speed?: number
}

export function useKeyboardAxis(
    getTarget: () => Object3D | undefined | null,
    options: RotationOptions = {}
) {
    const { speed = Math.PI } = options

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

    const step = speed * delta
    target.rotation.y += dirX * step 
    target.rotation.x += dirY * step 
  })
}
