/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vector3 } from 'three';
import type { Transform3D } from '../types';
import {
	undertowModels,
	variousModels,
	potFace,
	architectureModels,
	test2D
} from './assetInventory/assetsMap';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { PileState } from './pileState.svelte';
import { MAX_OBJECT_DISTANCE } from '$lib/constants';
import { EnvironmentMapInventory, testEnvironments } from './assetInventory/environmentMap';
import { PileEnvironment } from './pileEnvironment.svelte';
import { useThrelte } from '@threlte/core';
import { Object3DMapInventory } from './assetInventory/object3DMap';
import { Object2DMapInventory } from './assetInventory/object2DMap';
import { PileDatabase, type PileDatabaseObj } from './api/pileDatabase';
import { toPileObj } from './api/pileMapper';

export class PileApp {
	modelInventory = new Object3DMapInventory();
	imageInventory = new Object2DMapInventory();
	environmentInventory = new EnvironmentMapInventory();
	database = new PileDatabase();
	state = new PileState(this.database);
	environment: PileEnvironment;
	autosave = true;
	isActivlyWatching: () => boolean;

	constructor(isActivlyWatching: () => boolean, initalDatabaseObjects?: any) {
		this.isActivlyWatching = isActivlyWatching;
		this.initInventories();
		if (initalDatabaseObjects) {
			this.initPileObjects(initalDatabaseObjects);
		}
		const { scene, renderer } = useThrelte();
		this.environment = new PileEnvironment(scene, renderer, this.environmentInventory,undefined, this.database);
	}

	private initInventories() {
		this.imageInventory.add(test2D);
		this.modelInventory.add(undertowModels);
		this.modelInventory.add(variousModels);
		this.modelInventory.add(potFace);
		this.modelInventory.add(architectureModels);
		this.environmentInventory.add(testEnvironments);
	}

	public initPileObjects(rawPositionData: any) {
		const pileDatabaseObjects = rawPositionData.pileObjects as PileDatabaseObj[];
		pileDatabaseObjects.forEach((object) => {
			const pileObject = toPileObj(object);
			if(!pileObject){
				return
			}
			if (object.type === 'object2D') {
				this.state.objects2D.set(pileObject.id, pileObject as PileObject2D);
			}
			if (object.type === 'object3D') {
				this.state.objects3D.set(pileObject.id, pileObject as PileObject3D);
			}
		});
	}

	public addSupabaseObject(object: PileDatabaseObj) {
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
	i: PileDatabaseObj,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
