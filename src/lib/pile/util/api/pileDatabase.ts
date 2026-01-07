/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupabaseNetworkManager } from '$lib/api/networkManager.svelte';
import { supabase } from '$lib/api/supabaseClient.svelte';
import { Group, Quaternion, Vector3, type Object3DEventMap } from 'three';

import type { PileObject2D, PileObject3D } from '../pileObject.svelte';
import type Pile from '$lib/pile/pile.svelte';

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

export class PileDatabase {
	networkManager = new SupabaseNetworkManager<PileDatabaseObject>(
		supabase,
		'pile_objects',
		this.onPileObjectInserted,
		this.onPileObjectUpdate,
		this.onPileObjectDelete
	);
	private sessionID = crypto.randomUUID();

	constructor() {
		this.networkManager.subscribe();
	}

	public addObject(obj: PileObject3D | PileObject2D) {
		const dbObject = this.getDatabaseObjectFromPileObject(obj, this.sessionID);
		if (!dbObject) return;
		this.networkManager.insert(dbObject);
	}
	public async updateObject(obj: PileObject3D | PileObject2D) {
		const dbObject = this.getDatabaseObjectFromPileObject(obj, this.sessionID);
		if (!dbObject) {
            console.error("Could Not Create Database Object From Pile Object")
            return
        };
	    this.networkManager.update(PileDatabase.validateID(obj.id), dbObject);
	}
	public deleteObject(id: PileDatabaseObject['id']) {
		this.networkManager.delete(id);
	}

	private onPileObjectInserted(obj: PileDatabaseObject) {}
	private onPileObjectUpdate(obj: PileDatabaseObject) {}
	private onPileObjectDelete() {}

	public getDatabaseObjectFromPileObject(obj: PileObject3D | PileObject2D, sessionID: string) {
		if (!obj.shown) {
			this.deleteObject(obj.id);
			return;
		}
		if (!obj.ref) {
			console.warn(`Did not find a ref for ${obj.objectType} ${obj.name}`);
		}
		const t = PileDatabase.getTransfrom(obj.ref!);
        const id = PileDatabase.validateID(obj.id)

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
			scale_z: t.scale.z,
			last_edited_by: sessionID
		};
		return dbObject;
	}

	public static getTransfrom(ref?: Group<Object3DEventMap>) {
		const _pos = new Vector3();
		const _quat = new Quaternion();
		const _scale = new Vector3(1,1,1);
		const mesh = ref?.children[0];
		mesh?.getWorldPosition(_pos);
		mesh?.getWorldQuaternion(_quat);
		mesh?.getWorldScale(_scale);
		return { pos: _pos, rot: _quat, scale: _scale };
	}

    public static validateID(id: string){
        if (PileDatabase.isValidUUID(id)){
            return id
        }
            return crypto.randomUUID();
        
    }

	public static isValidUUID(input: string): boolean {
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(input)
	}
}
