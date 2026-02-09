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

	useTask(
		() => {
			const ref = getRef();
			if (!ref || !isAnimating || isUserInteracting) return;

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
            console.log(
					'update3DObject Position',
					{ ...ref.position },
					{ ...ref.children[0].position },
					{ ...ref.children[0].children[0].position },
					ref.getWorldPosition(new Vector3())
				);
				console.log(
					'update3DObject',
					{ ...ref.quaternion },
					{ ...ref.children[0].quaternion },
					{ ...ref.children[0].children[0].quaternion },
					ref.getWorldQuaternion(new Quaternion())
				);
		},
		{ autoStart: true }
	);

	return {
		moveTo(
			pos?: { x?: number; y?: number; z?: number },
			quat?: { x?: number; y?: number; z?: number; w?: number },
			scale?: number | { x?: number; y?: number; z?: number },
			speed: number = 0.1
		) {
			const ref = getRef();
			if (!ref) return;

			if (pos) {
				targetPosition.set(
					pos.x ?? ref.position.x,
					pos.y ?? ref.position.y,
					pos.z ?? ref.position.z
				);
			} else {
				targetPosition.copy(ref.position);
			}

			if (quat) {
				targetQuaternion.set(quat.x ?? 0, quat.y ?? 0, quat.z ?? 0, quat.w ?? 1);
			} else {
				targetQuaternion.copy(ref.quaternion);
			}

			if (typeof scale === 'number') {
				targetScale.set(scale, scale, scale);
			} else if (scale) {
				targetScale.set(scale.x ?? ref.scale.x, scale.y ?? ref.scale.y, scale.z ?? ref.scale.z);
			} else {
				targetScale.copy(ref.scale);
			}

			lerpFactor = speed;
			isAnimating = true;
		},
		pause: () => (isUserInteracting = true),
		resume: () => {
			isUserInteracting = false;
			const ref = getRef();
			if (ref) {
				targetPosition.copy(ref.position);
				targetQuaternion.copy(ref.quaternion);
				targetScale.copy(ref.scale);
			}
		}
	};
}
