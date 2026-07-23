/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThrelte } from '@threlte/core';
import { Vector3, type Object3D, type Camera } from 'three';

export interface CameraLaunchOptions {
  distance?: number; // How far forward to propel the object (world units)
  duration?: number; // Launch animation duration in seconds
  onLaunchStart?: (object: Object3D) => void;
  onLaunchComplete?: (object: Object3D) => void;
}

export function useCameraLaunch({
  distance = 15,
  duration = 0.6,
  onLaunchStart,
  onLaunchComplete
}: CameraLaunchOptions = {}) {
  const { camera } = useThrelte();

  // Map to track active requestAnimationFrame IDs per object so rapid clicks cancel old runs
  const activeAnimations = new Map<Object3D, number>();

  const math = {
    camDir: new Vector3(),
    startWorldPos: new Vector3(),
    targetWorldPos: new Vector3(),
    currentWorldPos: new Vector3(),
    localPos: new Vector3()
  };

  const getCurrentCamera = (): Camera | null => {
    return (camera as any)?.current ?? camera;
  };

  const launch = (object: Object3D) => {
    const currentCamera = getCurrentCamera();
    if (!currentCamera || !object) return;

    // Cancel any ongoing launch animation on this object
    if (activeAnimations.has(object)) {
      cancelAnimationFrame(activeAnimations.get(object)!);
      activeAnimations.delete(object);
    }

    onLaunchStart?.(object);

    // 1. Get current forward-facing direction of camera
    currentCamera.getWorldDirection(math.camDir);

    // 2. Capture starting world position of object
    object.getWorldPosition(math.startWorldPos);

    // 3. Compute target world position (Start Position + Camera Direction * Distance)
    math.targetWorldPos.copy(math.startWorldPos).addScaledVector(math.camDir, distance);

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Cubic Ease-Out curve for an initial punchy thrust that smoothly decelerates
      const easeOut = 1 - Math.pow(1 - progress, 3);

      // Interpolate world position
      math.currentWorldPos.lerpVectors(math.startWorldPos, math.targetWorldPos, easeOut);

      // Account for local coordinate space if object is nested inside parent Groups
      if (object.parent) {
        math.localPos.copy(math.currentWorldPos);
        object.parent.worldToLocal(math.localPos);
        object.position.copy(math.localPos);
      } else {
        object.position.copy(math.currentWorldPos);
      }

      if (progress < 1) {
        const animId = requestAnimationFrame(animate);
        activeAnimations.set(object, animId);
      } else {
        activeAnimations.delete(object);
        onLaunchComplete?.(object);
      }
    };

    const animId = requestAnimationFrame(animate);
    activeAnimations.set(object, animId);
  };

  const onDblClick = (event: any, object: Object3D) => {
    event?.stopPropagation?.();
    const nativeEv = event.nativeEvent || event;

    // Only respond to main left double-clicks
    if (nativeEv.button !== undefined && nativeEv.button !== 0) return;

    launch(object);
  };

  return { launch, onDblClick };
}