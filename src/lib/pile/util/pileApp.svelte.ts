import { Quaternion, Vector3 } from 'three';
import type { Transform3D } from '../types';
import {
	Object3DMapInventory,
	undertowModels,
	variousModels,
	potFace,
	architectureModels,
	Object2DMapInventory,
	test2D
} from './assetsMap';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { MAX_OBJECT_DISTANCE } from '$lib/constants';
import { type PileDataSchema, type PileObjectJson } from './api/pilePayload';
import { uploadData } from './api/uploadPositions';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	imageInventory = new Object2DMapInventory();
	state = new PileState();
	lastUploadStatus = $state('Idle');
	autosave = false;

	constructor(rawPositionData?: object) {
		this.initPileApp();
		if (rawPositionData) {
			this.initObjectPositions(rawPositionData);
		}
		if (this.autosave) {
			this.startAutoSave();
			console.log("Autosave Activated")
		}else{
			console.log("Autosave Deactiviated")
		}
	}

	private initPileApp() {
		this.imageInventory.add(test2D);
		this.modelInventory.add(undertowModels);
		this.modelInventory.add(variousModels);
		this.modelInventory.add(potFace);
		this.modelInventory.add(architectureModels);
	}

	public startAutoSave() {
		const interval = setInterval(async () => {
			this.attemptSave();
		}, 60000);
		return () => clearInterval(interval);
	}

	private async attemptSave() {
		if (this.state.hasChanges) {
			try {
				await uploadData(this.getPileObjectPositions());
				this.state.setAsSaved()
			} catch (e) {
				console.error('Auto-save failed', e);
			}
		} else {
			console.log("No changes detected, skipping save.")
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public initObjectPositions(rawPositionData: any) {
		const position3DData: PileDataSchema = rawPositionData.data.pile_position_data.objects3D;
		const position2DData: PileDataSchema = rawPositionData.data.pile_position_data.objects2D;
		for (const [id, model] of Object.entries(position3DData)) {
			const inventoryObject = this.modelInventory.get(model.name);
			if (!inventoryObject) {
				console.log(`ERROR: ${model.name} does not exist in 3D Model Inventory.`);
				continue;
			}
			const downloadedModel2 = new PileObject3D({
				name: model.name,
				id: id,
				modelPath: inventoryObject.path,
				transform3D: model.transform,
				uniformScale:
					(model.transform.scale.x + model.transform.scale.y + model.transform.scale.z) / 3
			});
			this.state.objects3D.push(downloadedModel2);
		}
		for (const [id, image] of Object.entries(position2DData)) {
			const inventoryObject = this.imageInventory.get(image.name);
			if (!inventoryObject) {
				console.log(`ERROR: ${image.name} does not exist in 2D Model Inventory.`);
				continue;
			}
			const downloadedImage = new PileObject2D({
				name: image.name,
				id: id,
				modelPath: inventoryObject.path,
				transform3D: image.transform,
				uniformScale:
					(image.transform.scale.x + image.transform.scale.y + image.transform.scale.z) / 3
			});
			this.state.objects2D.set(id, downloadedImage);
		}
	}

	public getPileObjectPositions() {
		const objects3D: Record<string, PileObjectJson> = {};
		const objects2D: Record<string, PileObjectJson> = {};
		let id = 1001;
		this.state.objects2D.forEach((image) => {
			try {
				if (!image.shown) {
					return;
				}
				if (!isInBounds(image)) {
					return;
				}
				const v3Position = new Vector3(0, 0, 0);
				const quatRotation = new Quaternion(0, 0, 0, 0);
				const v3Scale = new Vector3(0, 0, 0);
				image.ref?.children[0].getWorldPosition(v3Position);
				image.ref?.children[0].getWorldQuaternion(quatRotation);
				image.ref?.children[0].getWorldScale(v3Scale);

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
				objects2D[id] = { transform: transform, name: image.name, animation: null };
				id += 1;
			} catch (e) {
				console.log(e);
			} 
		});

		this.state.objects3D.forEach((model) => {
			try {
				if (!model.shown) {
					return;
				}
				if (!isInBounds(model)) {
					return;
				}
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
				objects3D[id] = { transform: transform, name: model.name, animation: null };
				id += 1;
			} catch (e) {
				console.log(e);
			}
		});
		const pilePositionObject = { pile_position_data: { objects3D, objects2D, sky: null } }
		console.log('Payload built: ',pilePositionObject)
		return pilePositionObject;
	}
}

/**
 *
 * @param model
 * @returns true if within MAX_OBJECT_DISTANCE from the origin
 */
function isInBounds(model: PileObject3D | PileObject2D): boolean {
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
