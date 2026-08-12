import { useTask } from '@threlte/core';
import { onDestroy, onMount } from 'svelte';
import type { Object3D } from 'three';

interface ScrollDistanceOptions {
  speed?: number;
  resetDistance?: number;
  minDistance?: number;
  maxDistance?: number;
  damping?: number;
}

export function useScrollDistance(
  getTarget: () => Object3D | undefined | null,
  options: ScrollDistanceOptions = {}
) {
  const {
    speed = 0.005,
    resetDistance = -2,
    minDistance = -20,
    maxDistance = -0.5,
    damping = 12
  } = options;

  let targetZ = resetDistance;
  let isInitialized = false;

  const onWheel = (e: WheelEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable)
    ) {
      return;
    }
    targetZ -= e.deltaY * speed;
    targetZ = Math.max(minDistance, Math.min(maxDistance, targetZ));
  };

  const onMouseDown = (e: MouseEvent) => {
    if (e.button === 1) {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl &&
        (targetEl.tagName === 'INPUT' ||
          targetEl.tagName === 'TEXTAREA' ||
          targetEl.isContentEditable)
      ) {
        return;
      }
      targetZ = resetDistance;
    }
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
    const target = getTarget();
    if (!target) return;

    if (!isInitialized) {
      targetZ = target.position.z;
      isInitialized = true;
    }

    if (damping > 0) {
      target.position.z += (targetZ - target.position.z) * Math.min(1, delta * damping);
    } else {
      target.position.z = targetZ;
    }
  });
}