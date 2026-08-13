import type { Intersection, Object3D } from 'three';
import { useFPSRaycast, type RaycastHitContext } from './useFPSRaycast.svelte';
import { getInteractiveEntity, type InteractionType } from './util/interaction';

export function usePlayerInteraction(getInteractiveGroup: () => Object3D[]) {
	const raycast = useFPSRaycast(getInteractiveGroup, (context: RaycastHitContext) => {
		const entity = getInteractiveEntity(context.hoveredObject, getInteractiveGroup());
		entity?.userData.onHover?.(entity, context);
	});
	const hoverEntity = $derived(getInteractiveEntity(raycast.hoveredObject, getInteractiveGroup()));
	const interactionType = $derived<InteractionType | null>(
		hoverEntity?.userData?.interactionType ?? null
	);

	let grabbedObject = $state<Object3D | null>(null);
	let grabIntersection = $state<Intersection | null>(null);
	let initialDistance = $state<number>(3);

	function handleAction(): boolean {
		// A. If already holding an object, release it
		if (grabbedObject) {
			release();
			return true;
		}

		if (!hoverEntity || !raycast.intersection) return false;

		// B. If object is grabbable -> Grab it
		if (interactionType === 'grab') {
			grabbedObject = hoverEntity;
			grabIntersection = raycast.intersection;
			initialDistance = raycast.intersection.distance;
			return true;
		}

		// C. If object is custom interactable -> Trigger its handler
		if (interactionType === 'interact') {
			hoverEntity.userData.onInteract?.(hoverEntity);
			return true;
		}

		return false;
	}

	function release() {
		grabbedObject = null;
		grabIntersection = null;
	}

	return {
		// Hover State
		get hoverEntity() {
			return hoverEntity;
		},
		get interactionType() {
			return interactionType;
		},
		get intersection() {
			return grabIntersection || raycast.intersection;
		},

		// Grab State
		get grabbedObject() {
			return grabbedObject;
		},
		get initialDistance() {
			return initialDistance;
		},
		get isGrabbing() {
			return grabbedObject !== null;
		},

		// Actions
		handleAction,
		release
	};
}
