import { useTask } from '@threlte/core';
import { Object3D, MathUtils } from 'three';
import { useKeyHold } from '../key-listeners/useKeyHold';

interface ScaleOptions {
  scaleSpeed?: number;
  minScale?: number;
  maxScale?: number;
  pivotName?: string;
  increaseKey?: string;
  decreaseKey?: string;
}

export function usePivotScale(
  getTarget: () => Object3D | undefined | null,
  options: ScaleOptions = {}
) {
  const {
    scaleSpeed = .8,
    minScale = 0.3,
    maxScale = 5.0,
    pivotName = 'pivot',
    increaseKey = 'Equal',
    decreaseKey = 'Minus'
  } = options;

  const isIncreaseHeld = useKeyHold(increaseKey);
  const isIncreaseNumpadHeld = useKeyHold('NumpadAdd');
  const isDecreaseHeld = useKeyHold(decreaseKey);
  const isDecreaseNumpadHeld = useKeyHold('NumpadSubtract');

  useTask((delta) => {
    const target = getTarget();
    if (!target) return;

    const growing = isIncreaseHeld() || isIncreaseNumpadHeld();
    const shrinking = isDecreaseHeld() || isDecreaseNumpadHeld();

    if (!growing && !shrinking) return;

    const pivot = target.getObjectByName(pivotName) ?? target;

    const dir = (growing ? 1 : 0) - (shrinking ? 1 : 0);
    if (dir === 0) return;

    const factor = Math.exp(dir * scaleSpeed * delta);
    
    const newScaleX = MathUtils.clamp(pivot.scale.x * factor, minScale, maxScale);
    const newScaleY = MathUtils.clamp(pivot.scale.y * factor, minScale, maxScale);
    const newScaleZ = MathUtils.clamp(pivot.scale.z * factor, minScale, maxScale);

    pivot.scale.set(newScaleX, newScaleY, newScaleZ);
  });

  return {
    resetScale: () => {
      const target = getTarget();
      if (!target) return;
      const pivot = target.getObjectByName(pivotName) ?? target;
      pivot.scale.set(1, 1, 1);
    }
  };
}