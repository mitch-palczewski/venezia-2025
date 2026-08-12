import { Object3D, type Intersection } from 'three';
import { useFPSRaycast } from './useFPSRaycast.svelte';

export function useObjectGrab(getInteractiveObjects: () => Object3D[]) {
  const raycast = useFPSRaycast(getInteractiveObjects);

  let grabbedObject = $state<Object3D | null>(null);
  let grabIntersection = $state<Intersection | null>(null);
  let initialDistance = $state<number>(3);

  function toggleGrab() {
    if (grabbedObject) {
      release();
      return;
    }

    if (raycast.hoveredObject && raycast.intersection) {
      grabbedObject = raycast.hoveredObject;
      grabIntersection = raycast.intersection;
      initialDistance = raycast.intersection.distance;
    }
  }

  function release() {
    grabbedObject = null;
    grabIntersection = null;
  }

  return {
    get grabbedObject() { return grabbedObject; },
    get hoveredObject() { return raycast.hoveredObject; },
    get intersection() { return grabIntersection || raycast.intersection; },
    get initialDistance() { return initialDistance; },
    get isGrabbing() { return grabbedObject !== null; },
    toggleGrab,
    release
  };
}