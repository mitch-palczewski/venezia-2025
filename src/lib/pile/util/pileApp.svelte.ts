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
import { SvelteDate, SvelteMap } from 'svelte/reactivity';
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
		const objects3D: Record<string, PileObjectJson> = getPileObjectJson(this.state.objects3D);
		const objects2D: Record<string, PileObjectJson> = getPileObjectJson(this.state.objects2D);
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

function getPileObjectJson(objects: SvelteMap<string, PileObject2D> | PileObject3D[]) {
	const objectsTransform: Record<string, PileObjectJson> = {};
	const _pos = new Vector3();
	const _quat = new Quaternion();
	const _scale = new Vector3();
	objects.forEach((object) => {
		if (!object.shown || !isInBounds(object)) return;
		const mesh = object.ref?.children[0];
		if(!mesh) {
			throw Error(`Object ${object.name} has no Mesh`)
		};
		mesh?.getWorldPosition(_pos);
		mesh?.getWorldQuaternion(_quat);
		mesh?.getWorldScale(_scale);
		const transform: Transform3D = {
			translate: { x: _pos.x, y: _pos.y, z: _pos.z },
			rotation: {
				x: _quat.x,
				y: _quat.y,
				z: _quat.z,
				w: _quat.w
			},
			scale: { x: _scale.x, y: _scale.y, z: _scale.z }
		};
		objectsTransform[object.id] = { transform: transform, name: object.name, animation: null };
	});
	return objectsTransform;
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

function isInBounds(model: PileObject3D | PileObject2D): boolean {
	//Consider Making This based on Scale to Distance Ration instead of just distance
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
		console.log('TODO: Notify the user model is out of bounds.');
		return false;
	}
	return true;
}
