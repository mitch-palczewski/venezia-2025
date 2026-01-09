import { supabase } from '$lib/api/supabaseClient.svelte';
import { Group, Quaternion, Vector3, type Object3DEventMap } from 'three';
import { PileObject2D, PileObject3D } from '../pileObject.svelte';
import { DatabaseMap } from '$lib/api/databaseMap';
import { SupabaseNetworkManager } from '$lib/api/networkManager.svelte';

export interface PileDatabaseObject {
	id: string;
	name: string;
	type: string;
	animation: string | null;
	// Position
	pos_x: number;
	pos_y: number;
	pos_z: number;
	// Rotation (Quaternion)
	rot_x: number;
	rot_y: number;
	rot_z: number;
	rot_w: number;
	// Scale
	scale_x: number;
	scale_y: number;
	scale_z: number;
	// Metadata
	updated_at: string;
	last_edited_by: string | null;
}

export type AcceptedPileObjects = PileObject2D | PileObject3D;

export class PileDatabase {
	public networkManager = new SupabaseNetworkManager<PileDatabaseObject>(supabase, 'pile_objects');
	private database = new DatabaseMap<PileDatabaseObject, AcceptedPileObjects>(
		this.networkManager,
		PileDatabase.convertDatabaseObjToPileObj,
		PileDatabase.convertPileObjToDatabaseObj,
		'last_edited_by'
	);

	public add(obj: AcceptedPileObjects) {
		if (!this.isShown(obj)) return;
		this.database.addObject(obj);
	}
	public update(obj: AcceptedPileObjects) {
		if (!this.isShown(obj)) return;
		this.database.updateObject(obj);
	}
	public delete(id: AcceptedPileObjects['id']) {
		this.database.deleteObject(id);
	}
	public destroy() {
		this.networkManager.destroy();
	}

	private isShown(obj: PileObject2D | PileObject3D): boolean {
		if (obj.shown) return true;
		this.database.deleteObject(obj.id);
		return false;
	}

	/**
	 * Transforms a Pile Object into Database Object
	 * @param obj A Pile Object
	 * @returns
	 */
	public static convertPileObjToDatabaseObj(obj: AcceptedPileObjects): Partial<PileDatabaseObject> {
		if (!obj.ref) {
			console.warn(
				`Did not find a ref for ${obj.objectType} ${obj.name}. Objects Transform will be defaulted.`
			);
		}
		const t = PileDatabase.getTransfrom(obj.ref!);
		const id = PileDatabase.validateID(obj.id);

		const dbObject: Partial<PileDatabaseObject> = {
			id: id,
			name: obj.name,
			type: obj.objectType,
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

	/**
	 * Transforms a Database Object into a Pile Object
	 * @param obj
	 * @returns
	 */
	public static convertDatabaseObjToPileObj(obj: PileDatabaseObject): AcceptedPileObjects {
		if (obj.type === 'object2D') {
			const obj2D = new PileObject2D({
				name: obj.name,
				id: obj.id,
				objectMap: undefined,
				transform3D: {
					translate: { x: obj.pos_x, y: obj.pos_y, z: obj.pos_z },
					rotation: { x: obj.rot_x, y: obj.rot_y, z: obj.rot_z, w: obj.rot_w },
					scale: { x: obj.scale_x, y: obj.scale_y, z: obj.scale_z }
				},
				uniformScale: (obj.scale_x + obj.scale_y + obj.scale_z) / 3
			});
			return obj2D;
		}
		if (obj.type === 'object3D') {
			const obj3D = new PileObject3D({
				name: obj.name,
				id: obj.id,
				objectMap: undefined,
				transform3D: {
					translate: { x: obj.pos_x, y: obj.pos_y, z: obj.pos_z },
					rotation: { x: obj.rot_x, y: obj.rot_y, z: obj.rot_z, w: obj.rot_w },
					scale: { x: obj.scale_x, y: obj.scale_y, z: obj.scale_z }
				},
				uniformScale: (obj.scale_x + obj.scale_y + obj.scale_z) / 3
			});
			return obj3D;
		}
		throw Error(`Invalid obj ${obj.name} type: ${obj.type}, ${obj}`);
	}

	public static getTransfrom(ref?: Group<Object3DEventMap>) {
		const _pos = new Vector3();
		const _quat = new Quaternion();
		const _scale = new Vector3(1, 1, 1);
		const mesh = ref?.children[0];
		mesh?.getWorldPosition(_pos);
		mesh?.getWorldQuaternion(_quat);
		mesh?.getWorldScale(_scale);
		return { pos: _pos, rot: _quat, scale: _scale };
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
}
