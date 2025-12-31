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
} from './assetInventory/assetsMap';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { MAX_OBJECT_DISTANCE } from '$lib/constants';
import { type PileDataSchema, type PileObjectJson } from './api/pilePayload';
import { uploadData } from './api/uploadPositions';
import { SvelteDate } from 'svelte/reactivity';
import { EnvironmentMapInventory, testEnvironments } from './assetInventory/environmentMap';
import { PileEnvironment } from './pileEnvironment.svelte';
import { useThrelte } from '@threlte/core';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	imageInventory = new Object2DMapInventory();
	environmentInventory = new EnvironmentMapInventory();
	state = new PileState();
	environment: PileEnvironment;
	autosave = true;
	isActivlyWatching: () => boolean;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(isActivlyWatching: () => boolean, rawPositionData?: any) {
		this.isActivlyWatching = isActivlyWatching;
		this.initInventories();
		if (rawPositionData) {
			this.initObjectPositions(rawPositionData);
		}
		const { scene, renderer } = useThrelte();
		this.environment = new PileEnvironment(
			scene,
			renderer,
			this.environmentInventory.get(rawPositionData?.data.pile_position_data.sky)
		);
	}

	private initInventories() {
		this.imageInventory.add(test2D);
		this.modelInventory.add(undertowModels);
		this.modelInventory.add(variousModels);
		this.modelInventory.add(potFace);
		this.modelInventory.add(architectureModels);
		this.environmentInventory.add(testEnvironments);
	}

	public attemptSave = () => {
		this.state.uploadStatus = 'Saving';
		const now = new SvelteDate();
		if (!this.state.hasChanges) {
			console.log(`No changes detected, skipping save.\n${now}`);
			this.state.uploadStatus = 'Saved';
			return;
		}
		console.log(`Autosaving ... \n${now}`);
		try {
			uploadData(this.getPileObjectPositions(), this.state.uploadStatus);
			this.state.setAsSaved();
			this.state.uploadStatus = 'Saved';
		} catch (e) {
			console.error('Auto-save failed', e, now);
		}
	};

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
		});

		this.state.objects3D.forEach((model) => {
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
		});
		const pilePositionObject = {
			pile_position_data: { objects3D, objects2D, sky: this.environment.selectedEnvironment.name }
		};
		if (!isPayloadValid(pilePositionObject)) {
			throw Error('Data Invalid Stopping Upload');
		}
		console.log('Payload built: ', pilePositionObject);
		return pilePositionObject;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPayloadValid(data: any) {
	if (!data || typeof data !== 'object') return false;
	if (!isTransformPayloadValid(data.objects2D)) return false;
	if (!isTransformPayloadValid(data.objects3D)) return false;
	return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTransformPayloadValid(data: any): boolean {
	const keys = ['position', 'rotation', 'scale'];
	const axes = ['x', 'y', 'z'];
	for (const objId in data) {
		const transform = data[objId].transform;
		const name = data[objId].name;
		if (!transform || !name) return false;
		for (const key of keys) {
			if (!transform[key]) return false;
			for (const axis of axes) {
				const value = transform[key][axis];
				if (typeof value !== 'number' || isNaN(value)) {
					console.error(`Invalid data at ${objId}.${key}.${axis}:`, value);
					return false;
				}
			}
		}
	}
	return true;
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
