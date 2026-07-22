import { useTask, useThrelte } from '@threlte/core';
import { Camera, Euler, MathUtils } from 'three';
import type { PointerState } from './inputs/mouseInputs.svelte';

export function useFlyControls(
    pointer: PointerState,
    getRotationSpeed: () => number,
    getCustomCamera?: () => Camera | undefined,
    onRotate?: () => void
) {
    const { camera } = useThrelte();

    let pitch = 0;
    let yaw = 0;   
    let isInitialized = false;

    useTask((delta) => {
        const activeCamera = getCustomCamera?.() ?? camera.current;
        if (!activeCamera) return;

        if (!isInitialized) {
            const euler = new Euler().copy(activeCamera.rotation);
            euler.reorder('YXZ');
            pitch = euler.x;
            yaw = euler.y;
            isInitialized = true;
        }

        if (!pointer.isDragging) return;

        const rotationSpeed = getRotationSpeed();

        yaw -= pointer.x * rotationSpeed * delta;
        pitch += pointer.y * rotationSpeed * delta;

        const maxPitch = Math.PI / 2 - 0.05;
        pitch = MathUtils.clamp(pitch, -maxPitch, maxPitch);

        activeCamera.rotation.set(pitch, yaw, 0, 'YXZ');

        onRotate?.();
    });
}