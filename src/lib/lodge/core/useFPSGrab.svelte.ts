import { useTask, useThrelte } from '@threlte/core';
import { Camera, Object3D, Raycaster, Vector2, Vector3 } from 'three';

const center = new Vector2(0, 0);
const raycaster = new Raycaster();
const targetPosition = new Vector3();
const cameraDirection = new Vector3();

export interface GrabMoveContext {
    grabbedObject: Object3D;
    targetPosition: Vector3;
    cameraDirection: Vector3;
    camera: Camera;
    delta: number;
    holdDistance: number;
    lerpSpeed: number;
}

export interface UseFPSGrabOptions {
    lerpSpeed?: number;
    holdDistance?: number;
}

export function useFPSGrab(
    onMove: (context: GrabMoveContext) => void,
    options: UseFPSGrabOptions = {}
) {
    const { lerpSpeed = 15, holdDistance } = options;
    const { camera } = useThrelte();

    let grabbedObject = $state<Object3D | null>(null);
    let currentHoldDistance = $state<number>(0);

    function raycastCenter(interactiveObjects: Object3D[]) {
        const activeCamera = camera.current;
        if (!activeCamera) return null;

        raycaster.setFromCamera(center, activeCamera);
        const intersects = raycaster.intersectObjects(interactiveObjects, true);
        
        return intersects.length > 0 ? intersects[0] : null;
    }

    function handleInteract(interactiveObjects: Object3D[]) {
        if (grabbedObject) {
            grabbedObject = null;
            return;
        }

        const hit = raycastCenter(interactiveObjects);
        if (hit) {
            grabbedObject = hit.object;
            currentHoldDistance = hit.distance; 
        }
    }

    useTask((delta) => {
        const activeCamera = camera.current;
        if (!activeCamera || !grabbedObject) return;

        const effectiveDistance = holdDistance ?? currentHoldDistance;

        activeCamera.getWorldDirection(cameraDirection);
        targetPosition
            .copy(activeCamera.position)
            .addScaledVector(cameraDirection, effectiveDistance);

        onMove({
            grabbedObject,
            targetPosition,
            cameraDirection,
            camera: activeCamera,
            delta,
            holdDistance: effectiveDistance,
            lerpSpeed
        });
    });

    return {
        get grabbedObject() {
            return grabbedObject;
        },
        handleInteract,
        checkCenterRaycast: (interactiveObjects: Object3D[]) => 
            raycastCenter(interactiveObjects)?.object ?? null
    };
}