/** 
Defines Types used in Pile
 */

import type { Group, Object3DEventMap } from 'three';


/** For Construction and Parsing of Json Data (to be sent to cloud storage) */
export type RawDataPayload = {
	data: PileDataPayload;
};

export type PileDataPayload = {
	pile_position_data: ObjectPositionPayload;
};

/** Defines a Record of a Models made unique by their ID. @remark [x: string] should be the models id */
export type ObjectPositionPayload = Record<string, { transform: Transform; name: string }>;

//Active Model Type
export type ID = string
export type Model = {
	name: string;
	id: ID;
	modelPath: string;
	transform: Transform | null;
	ref: Group<Object3DEventMap> | null;
	shown: boolean; 
};
export type PileModels = Array<Model>;


export type Vec3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number };
export type Transform = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};
