/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vector3, Quaternion } from 'three';
import { useTask } from '@threlte/core';

export type MoveTo = (
	pos?:
		| {
				x?: number | undefined;
				y?: number | undefined;
				z?: number | undefined;
		  }
		| undefined,
	quat?:
		| {
				x?: number | undefined;
				y?: number | undefined;
				z?: number | undefined;
				w?: number | undefined;
		  }
		| undefined,
	scale?:
		| number
		| {
				x?: number | undefined;
				y?: number | undefined;
				z?: number | undefined;
		  }
		| undefined,
	speed?: number
) => void;

export function createMover(getRef: () => any) {
	const targetPosition = new Vector3();
	const targetScale = new Vector3(1, 1, 1);
	const targetQuaternion = new Quaternion();

	let isAnimating = $state(false);
	let lerpFactor = 0.1;
	let isUserInteracting = $state(false);
	let initialized = $state(false);

	const syncToCurrent = (ref: any) => {
		targetPosition.copy(ref.position);
		targetQuaternion.copy(ref.quaternion);
		targetScale.copy(ref.scale);
		initialized = true;
	};

	useTask(
		() => {
			const ref = getRef();
			if (!ref) return;
			if (!initialized) {
				syncToCurrent(ref);
			}
			if (!isAnimating || isUserInteracting) return;

			ref.position.lerp(targetPosition, lerpFactor);
			ref.scale.lerp(targetScale, lerpFactor);
			ref.quaternion.slerp(targetQuaternion, lerpFactor);

			const posDist = ref.position.distanceTo(targetPosition);
			const rotDist = ref.quaternion.angleTo(targetQuaternion);
			const scaleDist = ref.scale.distanceTo(targetScale);

			if (posDist < 0.001 && rotDist < 0.001 && scaleDist < 0.001) {
				ref.position.copy(targetPosition);
				ref.scale.copy(targetScale);
				ref.quaternion.copy(targetQuaternion);
				isAnimating = false;
			}
		},
		{ autoStart: true }
	);

	return {
		get initialized() { return initialized; },
		moveTo(
			pos?: { x?: number; y?: number; z?: number },
			quat?: { x?: number; y?: number; z?: number; w?: number },
			scale?: number | { x?: number; y?: number; z?: number },
			speed: number = 0.1
		) {
			const ref = getRef();
			if (!ref) return;
			if (!initialized) {
				syncToCurrent(ref);
			}

			if (pos) {
				targetPosition.set(
					pos.x ?? ref.position.x,
					pos.y ?? ref.position.y,
					pos.z ?? ref.position.z
				);
			}

			if (quat) {
				targetQuaternion.set(quat.x ?? ref.quaternion.x, quat.y ?? ref.quaternion.y, quat.z ?? ref.quaternion.z, quat.w ?? ref.quaternion.w);
			}

			if (typeof scale === 'number') {
				targetScale.set(scale, scale, scale);
			} else if (scale) {
				targetScale.set(scale.x ?? ref.scale.x, scale.y ?? ref.scale.y, scale.z ?? ref.scale.z);
			}

			lerpFactor = speed;
			isAnimating = true;
		},
		pause: () => (isUserInteracting = true),
		resume: () => {
			isUserInteracting = false;
			const ref = getRef();
			if (ref) syncToCurrent(ref)
		}
	};
}
