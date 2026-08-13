import { Object3D, type Intersection } from 'three';
import { useFPSRaycast } from './useFPSRaycast.svelte';
import { getInteractiveEntity } from './util/interaction';

export function useObjectGrab(getInteractiveObjects: () => Object3D[]) {
  const raycast = useFPSRaycast(getInteractiveObjects);

  const entity = $derived(
    getInteractiveEntity(raycast.hoveredObject, getInteractiveObjects())
  );

  let grabbedObject = $state<Object3D | null>(null);
  let grabIntersection = $state<Intersection | null>(null);
  let initialDistance = $state<number>(3);

  function toggleGrab() {
    if (grabbedObject) {
      release();
      return;
    }

    if (entity && raycast.intersection) {
      grabbedObject = entity;
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
    get hoveredObject() { return entity; },
    get intersection() { return grabIntersection || raycast.intersection; },
    get initialDistance() { return initialDistance; },
    get isGrabbing() { return grabbedObject !== null; },
    toggleGrab,
    release
  };
}
