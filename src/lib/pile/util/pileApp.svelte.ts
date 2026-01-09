/* eslint-disable @typescript-eslint/no-explicit-any */
import { Quaternion, Vector3 } from 'three';
import type {Transform3D } from '../types';
import {
	undertowModels,
	variousModels,
	potFace,
	architectureModels,
	test2D
} from './assetInventory/assetsMap';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { MAX_OBJECT_DISTANCE, PILE_PAYLOAD_NAME } from '$lib/constants';
import { type PileObjectPayload } from './api/pilePayload';
import { uploadData } from './api/uploadPositions';
import { SvelteDate, SvelteMap } from 'svelte/reactivity';
import { EnvironmentMapInventory, testEnvironments } from './assetInventory/environmentMap';
import { PileEnvironment } from './pileEnvironment.svelte';
import { useThrelte } from '@threlte/core';
import { Object3DMapInventory } from './assetInventory/object3DMap';
import { Object2DMapInventory } from './assetInventory/object2DMap';
import { PileDatabase, type PileDatabaseObject } from './api/pileDatabase';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	imageInventory = new Object2DMapInventory();
	environmentInventory = new EnvironmentMapInventory();
	environment: PileEnvironment;
	database = new PileDatabase();
	state = new PileState(this.database);
	autosave = true;
	isActivlyWatching: () => boolean;

	constructor(isActivlyWatching: () => boolean, initalDatabaseObjects?: any) {
		this.isActivlyWatching = isActivlyWatching;
		this.initInventories();
		if (initalDatabaseObjects) {
			this.initObjectPositions(initalDatabaseObjects);
		}
		const { scene, renderer } = useThrelte();
		this.environment = new PileEnvironment(
			scene,
			renderer,
			
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
			uploadData(this.getPilePayload(), this.state.uploadStatus);
			this.state.setAsSaved();
			this.state.uploadStatus = 'Saved';
			//TODO: Add seperate upload of DateTime and a SessionID  (Would this be better to add as meta data. That depends on the size of fileIO)
		} catch (e) {
			console.error('Auto-save failed', e, now);
		}
	};

	public initObjectPositions(rawPositionData: any) {
		console.log(rawPositionData)
		const pileDatabaseObjects  = rawPositionData.pileObjects as PileDatabaseObject[]
		pileDatabaseObjects.forEach((object) => {
			const pileObject = PileDatabase.convertDatabaseObjToPileObj(object)
			console.log(pileObject)
			if(pileObject.objectType === 'object2D') this.state.objects2D.set(pileObject.id, pileObject as PileObject2D)
			if(pileObject.objectType === 'object3D') this.state.objects3D.set(pileObject.id, pileObject as PileObject3D)
		})

	}

	public getPilePayload() {
		const objects3D: Record<string, PileObjectPayload> = getObjectsPayload(this.state.objects3D);
		const objects2D: Record<string, PileObjectPayload> = getObjectsPayload(this.state.objects2D);
		const pilePayload = {
			[PILE_PAYLOAD_NAME]: { objects3D, objects2D, sky: this.environment.selectedEnvironment.name }
		};
		if (!isPayloadValid(pilePayload)) {
			throw Error('Data Invalid Stopping Upload');
		}
		console.log('Payload built: ', pilePayload);
		return pilePayload;
	}

	public addSupabaseObject(object: PileDatabaseObject) {
		if (object.type === 'object2D') {
			initSupabaseObject(
				object,
				this.imageInventory,
				(obj) => {
					this.state.objects2D.set(obj.id, new PileObject2D(obj));
				},
				'2D Model'
			);
		}
		if (object.type === 'object3D') {
			initSupabaseObject(
				object,
				this.modelInventory,
				(obj) => {
					this.state.objects3D.set(obj.id, new PileObject3D(obj));
				},
				'3D Model'
			);
		}
	}
}

function initSupabaseObject(
	i: PileDatabaseObject,
	inventory: Object2DMapInventory | Object3DMapInventory,
	onCreated: (params: any) => void,
	context: string
) {
	const objectMap = inventory.get(i.name);
	if (!objectMap) {
		console.warn(`[${context} Inventory] Missing item: ${i.name}`);
		return null;
	}
	const transform: Transform3D = {
		translate: { x: i.pos_x, y: i.pos_y, z: i.pos_z },
		rotation: { x: i.rot_x, y: i.rot_y, z: i.rot_z, w: i.rot_w },
		scale: { x: i.scale_x, y: i.scale_y, z: i.scale_z }
	};
	onCreated({
		name: i.name,
		id: i.id,
		objectMap: objectMap,
		transform3D: transform,
		uniformScale: (i.scale_x + i.scale_y + i.scale_z) / 3
	});
}


function getObjectsPayload(
	objects: SvelteMap<string, PileObject2D> | SvelteMap<string, PileObject3D>
) {
	const objectsTransform: Record<string, PileObjectPayload> = {};
	const _pos = new Vector3();
	const _quat = new Quaternion();
	const _scale = new Vector3();
	objects.forEach((object) => {
		if (!object.shown || !isInBounds(object)) return;
		const mesh = object.ref?.children[0];
		if (!mesh) {
			throw Error(`Object ${object.name} has no Mesh`);
		}
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

function isPayloadValid(data: any) {
	if (!data || typeof data !== 'object') return false;
	if (!isTransformPayloadValid(data.objects2D)) return false;
	if (!isTransformPayloadValid(data.objects3D)) return false;
	return true;
}

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
