import { Quaternion, Vector3 } from "three";
import type { GrabMoveContext } from "./useFPSGrab.svelte";

// Reusable scratch variables to avoid GC stutter during frame updates
const tempQuaternion = new Quaternion();
const velocity = new Vector3();

export const grabPresets = {
    /** 
     * 1. Smooth Positional Follow (Default)
     * Object floats to position smoothly; rotation remains untouched.
     */
    smoothLerp: ({ grabbedObject, targetPosition, delta, lerpSpeed }: GrabMoveContext) => {
        grabbedObject.position.lerp(targetPosition, delta * lerpSpeed);
    },

    /** 
     * 2. Lock Orientation to Camera
     * Object smoothly moves AND rotates to face whichever direction the camera looks.
     */
    orientToCamera: ({ grabbedObject, targetPosition, camera, delta, lerpSpeed }: GrabMoveContext) => {
        grabbedObject.position.lerp(targetPosition, delta * lerpSpeed);
        grabbedObject.quaternion.slerp(camera.quaternion, delta * lerpSpeed);
    },

    /** 
     * 3. Heavy / Inertial Weight (Physics feel)
     * Adds momentum and overshoot so objects feel heavier to carry around.
     */
    heavyInertia: ({ grabbedObject, targetPosition, delta }: GrabMoveContext) => {
        // Accelerate toward target position
        const force = targetPosition.clone().sub(grabbedObject.position).multiplyScalar(12);
        velocity.addScaledVector(force, delta);
        
        // Apply friction/damping
        velocity.multiplyScalar(Math.pow(0.001, delta)); 
        
        grabbedObject.position.addScaledVector(velocity, delta);
    },

    /** 
     * 4. Upright Ground Align (Y-Axis Yaw Only)
     * Object rotates horizontally with camera pan, but stays strictly level/upright.
     */
    keepUpright: ({ grabbedObject, targetPosition, cameraDirection, delta, lerpSpeed }: GrabMoveContext) => {
        grabbedObject.position.lerp(targetPosition, delta * lerpSpeed);

        // Project camera direction onto XZ floor plane
        const flatDir = cameraDirection.clone();
        flatDir.y = 0;
        flatDir.normalize();

        if (flatDir.lengthSq() > 0.001) {
            // Point object forward along ground plane
            tempQuaternion.setFromUnitVectors(new Vector3(0, 0, -1), flatDir);
            grabbedObject.quaternion.slerp(tempQuaternion, delta * lerpSpeed);
        }
    },

    /** 
     * 5. Rigid Rigid Snapping
     * Snaps instantly to target position without any smoothing delay.
     */
    rigidSnap: ({ grabbedObject, targetPosition }: GrabMoveContext) => {
        grabbedObject.position.copy(targetPosition);
    }
};