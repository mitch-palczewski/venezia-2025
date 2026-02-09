import { Quaternion, Vector3 } from 'three';
import {  PileObject2D, PileObject3D, type BasePileObjectOptions} from '../pileObject.svelte';
import type { AcceptedDbTypes, AcceptedPileObjects, PileDatabaseObj } from './pileDatabase';
import { PileEnvironmentID, PileEnvironmentType } from '../pileEnvironment.svelte';
import { EnvironmentPayload } from '../assetInventory/environmentMap';
import type { Object2DMap } from '../assetInventory/object2DMap';
import type { Object3DMap } from '../assetInventory/object3DMap';

export type DbTransform3D = {
	pos: {
		x: number;
		y: number;
		z: number;
	};
	rot: {
		x: number;
		y: number;
		z: number;
		w: number;
	};
	scale: {
		x: number;
		y: number;
		z: number;
	};
};

export const toPileObj = (dbObj: PileDatabaseObj): AcceptedPileObjects | undefined => {
	if (dbObj.type === 'object2D') {
		return new PileObject2D(constructPileObj(dbObj) as BasePileObjectOptions<Object2DMap>);
	}
	if (dbObj.type === 'object3D') {
		return new PileObject3D(constructPileObj(dbObj) as BasePileObjectOptions<Object3DMap>);
	}
    if (dbObj.type === PileEnvironmentType){
        return new EnvironmentPayload(undefined, dbObj.name)
    }
    console.warn(
        "Mapping Db Obj to Pile Obj",
        `Could not map ${dbObj.name} (Type: ${dbObj.type}) to an AcceptedDbType`,
        dbObj
    )
};

export const toDatabaseObj = (pileObj: AcceptedPileObjects): Partial<PileDatabaseObj> | undefined => {
	if (pileObj.objectType === 'object2D') {
		return map2DToDb(pileObj as PileObject2D);
	}
	if (pileObj.objectType === 'object3D') {
		return map3DToDb(pileObj as PileObject3D);
	}
	if (pileObj.objectType === PileEnvironmentType) {
		return mapEnvironmentToDb(pileObj.name);
	}
    console.warn(
        "Mapping Pile Obj to Db Obj",
        `Could not map ${pileObj.name} (Type: ${pileObj.objectType}) to an AcceptedDbTypes`,
        pileObj
    )
};

function map3DToDb(obj: PileObject3D): Partial<PileDatabaseObj> {
	return constructDbObj(obj.id, obj.name, obj.objectType as AcceptedDbTypes, getTransfrom(obj));
}

function map2DToDb(obj: PileObject2D): Partial<PileDatabaseObj> {
	return constructDbObj(obj.id, obj.name, obj.objectType as AcceptedDbTypes, getTransfrom(obj));
}

function mapEnvironmentToDb(environmentName: string): Partial<PileDatabaseObj> {
	const dbObject: Partial<PileDatabaseObj> = {
		id: PileEnvironmentID,
		name: environmentName,
		type: PileEnvironmentType,
		pos_x: 0,
		pos_y: 0,
		pos_z: 0,
		rot_x: 0,
		rot_y: 0,
		rot_z: 0,
		rot_w: 0,
		scale_x: 0,
		scale_y: 0,
		scale_z: 0
	};
	return dbObject;
}

function constructPileObj(obj: PileDatabaseObj): BasePileObjectOptions<Object2DMap | Object3DMap>{
	console.log(`Uploading ${obj.name} from database`, obj)
	return {
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
}

function constructDbObj(
	id: string,
	name: string,
	type: AcceptedDbTypes,
	transform: DbTransform3D
): Partial<PileDatabaseObj> {
	const dbObject: Partial<PileDatabaseObj> = {
		id: id,
		name: name,
		type: type,
		pos_x: transform.pos.x,
		pos_y: transform.pos.y,
		pos_z: transform.pos.z,
		rot_x: transform.rot.x,
		rot_y: transform.rot.y,
		rot_z: transform.rot.z,
		rot_w: transform.rot.w,
		scale_x: transform.scale.x,
		scale_y: transform.scale.y,
		scale_z: transform.scale.z
	};
	return dbObject;
}

function getTransfrom(obj: PileObject2D | PileObject3D): DbTransform3D {
	if (!obj.ref) {
		console.warn(
			`${obj.name} (Type: ${obj.objectType}) ref is null.`,
			'Objects transform will be defaulted.'
		);
		const result = getDefaultTransform();
		logUpload(obj.name, obj.objectType, result.pos, result.rot, result.scale);
		return result;
	}
	const _pos = new Vector3();
	const _quat = new Quaternion();
	const _scale = new Vector3(1, 1, 1);
	_quat.normalize();
	const mesh = obj.ref.children[0];
	if (!mesh) {
		console.warn(
			`${obj.name} (Type: ${obj.objectType}) mesh is null. Could not access obj.ref.children[0].`,
			'Objects transform will be defaulted.',
			obj.ref
		);
		const result = getDefaultTransform();
		logUpload(obj.name, obj.objectType, result.pos, result.rot, result.scale);
		return result;
	}
	mesh.updateWorldMatrix(true, false);
	mesh.getWorldPosition(_pos);
	mesh.getWorldQuaternion(_quat);
	mesh.getWorldScale(_scale);
	const result = {
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
	logUpload(obj.name, obj.objectType, result.pos, result.rot, result.scale);
	return result;
}

function logUpload(name: string, type: string, pos: object, rot: object, scale: object) {
	console.log(`Uploading ${name} (Type: ${type}): `, pos, rot, scale);
}

function roundTo(num: number, places: number = 4) {
	const factor = Math.pow(10, places);
	return Math.round(num * factor) / factor;
}

function getDefaultTransform(): DbTransform3D {
	return {
		pos: { x: 0, y: 0, z: 0 },
		rot: { x: 0, y: 0, z: 0, w: 1 },
		scale: { x: 1, y: 1, z: 1 }
	};
}
