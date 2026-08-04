import { useTask, useThrelte } from "@threlte/core";
import { Object3D, Raycaster, Vector2, Vector3 } from "three";

const center = new Vector2(0, 0); 
const raycaster = new Raycaster();
const targetPosition = new Vector3();
const cameraDirection = new Vector3();

export function useFPSGrab(holdDistance = 2.5, lerpSpeed = 15){
    const { camera, scene } = useThrelte();

    let grabbedObject = $state<Object3D | null>(null);
    //let hoveredObject = $state<Object3D | null>(null);

    //is there a better name for this?
    function checkCenterRaycast(interactiveObjects: Object3D[]){
        const activeCamera = camera.current;
        if (!activeCamera) return null;
        raycaster.setFromCamera(center, activeCamera)
        //why is this not .intersectObject ? 
        const intersects = raycaster.intersectObjects(interactiveObjects, true)
        if (intersects.length > 0) {
            return intersects[0].object;
        }
        return null
    }

    function handleInteract(interactiveObjects: Object3D[]){
        if (grabbedObject) {
            grabbedObject = null;
            return;
        }
        const hit = checkCenterRaycast(interactiveObjects);
        if (hit) {
            grabbedObject = hit;
        }
    }

    useTask((delta) => {
        const activeCamera = camera.current;
        if (!activeCamera || !grabbedObject) return;
        activeCamera.getWorldDirection(cameraDirection);
        targetPosition
            .copy(activeCamera.position)
            .addScaledVector(cameraDirection, holdDistance);
        grabbedObject.position.lerp(targetPosition, delta * lerpSpeed);
    })

    return {
        get grabbedObject() { return grabbedObject; },
        handleInteract,
        checkCenterRaycast
    };
}