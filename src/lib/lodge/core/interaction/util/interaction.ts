import type { Object3D } from 'three';
import type { RaycastHitContext } from '../useFPSRaycast.svelte';

export type InteractionType = 'grab' | 'interact';

declare module 'three' {
  interface Object3DUserData {
    interactionType?: InteractionType;
    onInteract?: (entity: Object3D, context: RaycastHitContext) => void;
    onHover?: (entity: Object3D, context: RaycastHitContext) => void;
  }
}

/**
 * Traverses up the parent hierarchy from a raycast hit sub-mesh
 * to find the root interactive object in candidate list.
 */
export function getInteractiveEntity(
	hitObject: Object3D | null,
	targets: Object3D[]
): Object3D | null {
	if (!hitObject || targets.length === 0) return null;

	let current: Object3D | null = hitObject;

	while (current) {
		if (targets.includes(current)) {
			return current;
		}
		current = current.parent;
	}

	return null;
}
