import { supabase } from '$lib/api/supabaseClient.svelte';
import { Group, Quaternion, Vector3, type Object3DEventMap } from 'three';
import { PileObject2D, PileObject3D } from '../pileObject.svelte';
import { DatabaseMap } from '$lib/api/databaseMap';
import { SupabaseNetworkManager } from '$lib/api/networkManager.svelte';

export interface PileDatabaseObj {
	id: string;
	name: string;
	type: 'object2D' | 'object3D';
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

export type AcceptedPileObjects = PileObject2D | PileObject3D;

export class PileDatabase {
	public networkManager = new SupabaseNetworkManager<PileDatabaseObj>(supabase, 'pile_objects');
	public database = new DatabaseMap<PileDatabaseObj, AcceptedPileObjects>(
		this.networkManager,
		PileDatabase.convertDatabaseObjToPileObj,
		PileDatabase.convertPileObjToDatabaseObj,
		'last_edited_by'
	);

	constructor() {
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

	private isShown(obj: PileObject2D | PileObject3D): boolean {
		if (obj.shown) return true;
		this.database.deleteObject(obj.id);
		return false;
	}

	public static convertPileObjToDatabaseObj(obj: AcceptedPileObjects): Partial<PileDatabaseObj> {
		let t = null;
		if (!obj.ref) {
			console.log(
				`Did not find a ref for ${obj.objectType} ${obj.name}. Objects Transform will be defaulted.`
			);
			t = {
				pos: {x: 0, y: 0, z: 0},
				rot: {x: 0, y: 0, z: 0, w: 1},
				scale: {x: 1, y: 1, z: 1}
			};
		} else {
			t = PileDatabase.getTransfrom(obj.ref!);
		}

		//const id = PileDatabase.validateID(obj.id);

		const dbObject: Partial<PileDatabaseObj> = {
			id: obj.id,
			name: obj.name,
			type: obj.objectType as 'object2D' | 'object3D',
			pos_x: t.pos.x,
			pos_y: t.pos.y,
			pos_z: t.pos.z,
			rot_x: t.rot.x,
			rot_y: t.rot.y,
			rot_z: t.rot.z,
			rot_w: t.rot.w,
			scale_x: t.scale.x,
			scale_y: t.scale.y,
			scale_z: t.scale.z
		};
		return dbObject;
	}

	public static convertDatabaseObjToPileObj(obj: PileDatabaseObj): AcceptedPileObjects {
		const config = {
			name: obj.name,
			id: obj.id,
			objectMap: undefined,
			transform3D: {
				translate: { x: obj.pos_x, y: obj.pos_y, z: obj.pos_z },
				rotation: { x: obj.rot_x, y: obj.rot_y, z: obj.rot_z, w: obj.rot_w },
				scale: { x: obj.scale_x, y: obj.scale_y, z: obj.scale_z }
			},
			uniformScale: (obj.scale_x + obj.scale_y + obj.scale_z) / 3
		};
		if (obj.type === 'object2D') return new PileObject2D(config);
		if (obj.type === 'object3D') return new PileObject3D(config);

		throw Error(`Invalid obj ${obj.name} type: ${obj.type}`);
	}

	public static getTransfrom(ref?: Group<Object3DEventMap>) {
		const _pos = new Vector3();
		const _quat = new Quaternion();
		const _scale = new Vector3(1, 1, 1);
		_quat.normalize();
		//SLOPPY
		const mesh = ref?.children[0].children[0];
		console.log('Getting Objects Transform', mesh);
		if (!mesh) console.warn(`Could not find Mesh at Ref`);

		mesh?.updateWorldMatrix(true, false);
		mesh?.getWorldPosition(_pos);
		mesh?.getWorldQuaternion(_quat);
		mesh?.getWorldScale(_scale);
		return {
			pos: {
				x: roundTo(_pos.x),
				y: roundTo(_pos.y),
				z: roundTo(_pos.z)
			},
			rot: {
				x: roundTo(_quat.x),
				y: roundTo(_quat.y),
				z: roundTo(_quat.z),
				w: roundTo(_quat.w)
			},
			scale: {
				x: roundTo(_scale.x),
				y: roundTo(_scale.y),
				z: roundTo(_scale.z)
			}
		};
	}

	public static validateID(id: string) {
		if (PileDatabase.isValidUUID(id)) {
			return id;
		}
		return crypto.randomUUID();
	}

	public static isValidUUID(input: string): boolean {
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(input);
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
	) => {
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

function roundTo(num: number, places: number = 4) {
	const factor = Math.pow(10, places);
	return Math.round(num * factor) / factor;
}
