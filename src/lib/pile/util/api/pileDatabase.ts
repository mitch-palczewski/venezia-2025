import { supabase } from '$lib/api/supabaseClient.svelte';
import { PileObject2D, PileObject3D } from '../pileObject.svelte';
import { DatabaseMap } from '$lib/api/databaseMap';
import { SupabaseNetworkManager } from '$lib/api/networkManager.svelte';
import { EnvironmentPayload } from '../assetInventory/environmentMap';

import { toDatabaseObj, toPileObj } from './pileMapper';

export type AcceptedDbTypes = 'object2D' | 'object3D' | 'environment';
export type AcceptedPileObjects = PileObject2D | PileObject3D | EnvironmentPayload;

export interface PileDatabaseObj {
	id: string;
	name: string;
	type: AcceptedDbTypes;
	animation: string | null;
	pos_x: number;
	pos_y: number;
	pos_z: number;
	rot_x: number;
	rot_y: number;
	rot_z: number;
	rot_w: number;
	scale_x: number;
	scale_y: number;
	scale_z: number;
	updated_at: string;
	last_edited_by: string | null;
}

export class PileDatabase {
	public databaseName: string;
	public networkManager: SupabaseNetworkManager<PileDatabaseObj>;
	public database: DatabaseMap<PileDatabaseObj, AcceptedPileObjects>;

	constructor(databaseName?: string) {
		this.databaseName = databaseName ?? 'pile_objects';
		this.networkManager = new SupabaseNetworkManager<PileDatabaseObj>(supabase, this.databaseName);
		this.database = new DatabaseMap<PileDatabaseObj, AcceptedPileObjects>(
			this.networkManager,
			toPileObj,
			toDatabaseObj,
			'last_edited_by'
		);
		this.database.compareObjs = this.databaseObjsMatch;
	}

	public destroy() {
		this.networkManager.destroy();
	}

	public add(obj: AcceptedPileObjects) {
		if (!this.isShown(obj)) {
			console.warn('Object is not shown. Skipping adding to database', obj);
			return;
		}
		this.database.addObject(obj);
	}
	public update(obj: AcceptedPileObjects) {
		if (!this.isShown(obj)) return;
		console.log('Updating Obj (sending to db): ', obj);
		this.database.updateObject(obj);
	}
	public delete(id: AcceptedPileObjects['id']) {
		this.database.deleteObject(id);
	}

	private isShown(obj: AcceptedPileObjects): boolean {
		if (obj.shown) return true;
		this.database.deleteObject(obj.id);
		return false;
	}

	/**
	 * Compares two database objects
	 * @param obj1
	 * @param obj1Text
	 * @param obj2
	 * @param obj2Text
	 * @returns true if the objects match else false
	 */
	private databaseObjsMatch = (
		obj1: Partial<PileDatabaseObj>,
		obj1Text: string,
		obj2: Partial<PileDatabaseObj>,
		obj2Text: string
	): boolean => {
		let result = true;
		if (obj1.pos_x != obj2.pos_x || obj1.pos_y != obj2.pos_y || obj1.pos_z != obj2.pos_z) {
			console.error(`Position does not match`, obj1Text, obj1, obj2Text, obj2);
			result = false;
		}
		if (
			obj1.rot_x != obj2.rot_x ||
			obj1.rot_y != obj2.rot_y ||
			obj1.rot_z != obj2.rot_z ||
			obj1.rot_w != obj2.rot_w
		) {
			console.error(`Rotation does not match`, obj1Text, obj1, obj2Text, obj2);
			result = false;
		}
		if (
			obj1.scale_x != obj2.scale_x ||
			obj1.scale_y != obj2.scale_y ||
			obj1.scale_z != obj2.scale_z
		) {
			console.error(`Scale does not match`, obj1Text, obj1, obj2Text, obj2);
			result = false;
		}
		if (obj1.id != obj2.id) {
			console.error("Id's do not Match");
			result = false;
		}
		if (obj1.name != obj2.name) {
			console.error('Names do not match');
			result = false;
		}
		if (obj1.type != obj2.type) {
			console.error('Type Does not match');
			result = false;
		}
		return result;
	};
}
