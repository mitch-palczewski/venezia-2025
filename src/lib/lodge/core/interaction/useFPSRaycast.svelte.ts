import { useTask, useThrelte } from '@threlte/core';
import { Camera, Object3D, Raycaster, Vector2, Vector3, type Intersection } from 'three';

const center = new Vector2(0, 0);
const raycaster = new Raycaster();
const cameraDirection = new Vector3();
const cameraPosition = new Vector3();
const targetPosition = new Vector3();

export interface RaycastHitContext {
    hoveredObject: Object3D;
    intersection: Intersection;
    targetPosition: Vector3;
    cameraDirection: Vector3;
    camera: Camera;
    delta: number;
}

export function useFPSRaycast(
    getObjects: () => Object3D[],
    onHit?: (context: RaycastHitContext) => void
) {
    const { camera } = useThrelte();

    let intersection = $state<Intersection | null>(null);
    let hoveredObject = $state<Object3D | null>(null);

    useTask((delta) => {
        const activeCamera = camera.current;
        const objects = getObjects();

        if (!activeCamera || objects.length === 0) {
            intersection = null;
            hoveredObject = null;
            return;
        }

        raycaster.setFromCamera(center, activeCamera);
        const intersects = raycaster.intersectObjects(objects, true);

        if (intersects.length > 0) {
            const hit = intersects[0];
            intersection = hit;
            hoveredObject = hit.object;

            activeCamera.getWorldDirection(cameraDirection);
            activeCamera.getWorldPosition(cameraPosition);

            targetPosition
                .copy(cameraPosition)
                .addScaledVector(cameraDirection, hit.distance);

            onHit?.({
                hoveredObject: hit.object,
                intersection: hit,
                targetPosition,
                cameraDirection,
                camera: activeCamera,
                delta
            });
        } else {
            intersection = null;
            hoveredObject = null;
        }
    });

    return {
        get hoveredObject() { return hoveredObject; },
        get intersection() { return intersection; }
    };
}