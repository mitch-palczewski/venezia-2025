import { Quaternion, Vector3 } from 'three';
import type { ObjectPositionPayload, RawDataPayload, Transform3D } from '../types';
import {
	Object3DMapInventory,
	undertowModels,
	variousModels,
	potFace,
	architectureModels
} from './assetsMap';
import { PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { MAX_OBJECT_DISTANCE } from '$lib/constants';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	state = new PileState();

	constructor(rawPositionData?: RawDataPayload) {
		this.initPileApp();
		if (rawPositionData) {
			this.initObjectPositions(rawPositionData);
		}
	}

	private initPileApp() {
		this.modelInventory.add(undertowModels);
		this.modelInventory.add(variousModels);
		this.modelInventory.add(potFace);
		this.modelInventory.add(architectureModels);
	}

	public initObjectPositions(rawPositionData: RawDataPayload) {
		const positionData: ObjectPositionPayload = rawPositionData.data.pile_position_data;
		for (const [key, value] of Object.entries(positionData)) {
			const downloadedModel2 = new PileObject3D({
				name: value.name,
				id: key,
				modelPath: this.modelInventory.get(value.name)?.path ?? '',
				transform3D: value.transform,
				uniformScale:
					(value.transform.scale.x + value.transform.scale.y + value.transform.scale.z) / 3
			});
			this.state.models.push(downloadedModel2);
		}
	}

	public getPileObjectPositions() {
		const objectPositionsPayload: ObjectPositionPayload = {};
		let id = 1001;
		this.state.models.forEach((model) => {
			try {
				if (!model.shown) {
					return;
				}
				if (!isInBounds(model)) {
					return;
				}
				console.log(model.ref);
				const v3Position = new Vector3(0, 0, 0);
				const quatRotation = new Quaternion(0, 0, 0, 0);
				const v3Scale = new Vector3(0, 0, 0);
				model.ref?.children[0].getWorldPosition(v3Position);
				model.ref?.children[0].getWorldQuaternion(quatRotation);
				model.ref?.children[0].getWorldScale(v3Scale);

				const transform: Transform3D = {
					translate: { x: v3Position.x, y: v3Position.y, z: v3Position.z },
					rotation: {
						x: quatRotation.x,
						y: quatRotation.y,
						z: quatRotation.z,
						w: quatRotation.w
					},
					scale: { x: v3Scale.x, y: v3Scale.y, z: v3Scale.z }
				};
				objectPositionsPayload[id] = { transform: transform, name: model.name };
				id += 1;
			} catch (e) {
				console.log(e);
			}
		});

		return { pile_position_data: objectPositionsPayload };
	}
}

/**
 *
 * @param model
 * @returns true if within MAX_OBJECT_DISTANCE from the origin
 */
function isInBounds(model: PileObject3D): boolean {
	const position = new Vector3(0, 0, 0);
	model.ref?.children[0].getWorldPosition(position);
	if (
		position.x >= MAX_OBJECT_DISTANCE ||
		position.x <= -MAX_OBJECT_DISTANCE ||
		position.y >= MAX_OBJECT_DISTANCE ||
		position.y <= -MAX_OBJECT_DISTANCE ||
		position.z >= MAX_OBJECT_DISTANCE ||
		position.z <= -MAX_OBJECT_DISTANCE
	) {
		console.log(
			`Warning: Model ${model.name} is out of bounds. Model Cords ... x: ${position.x}, y: ${position.y}, z: ${position.z}. The maximum distance from origin is ${MAX_OBJECT_DISTANCE}`
		);
		return false;
	}
	return true;
}
