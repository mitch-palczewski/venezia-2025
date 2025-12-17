/** 
Defines Types used in Pile
 */


import type { PileObject } from './util/pileObject';


/** For Construction and Parsing of Json Data (to be sent to cloud storage) */
export type RawDataPayload = {
	data: PileDataPayload;
};

export type PileDataPayload = {
	pile_position_data: ObjectPositionPayload;
};

/** Defines a Record of a Models made unique by their ID. @remark [x: string] should be the models id */
export type ObjectPositionPayload = Record<string, { transform: Transform3D; name: string }>;

//Active Model Type
export type ID = string

export type PileModels = Array<PileObject>;


export type Vec3 = { x: number; y: number; z: number };
export type Vec2 = { x:number; y: number }
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number };
export type Transform3D = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};

