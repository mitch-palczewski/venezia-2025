/*
Defines Types used in Pile
 */

import type { Group, Object3DEventMap } from 'three';

//For construction and parsing of Json data (to be sent to cloud storage)
export type RawDataPayload = {
	data: PileDataPayload;
};
export type PileDataPayload = {
	pile_position_data: ObjectPositionsPayload;
};
export type ObjectPositionsPayload = Record<string, { transform: Transform; name: string }>;

//Active Model Type
export type Model = {
	name: string;
	id: string;
	modelPath: string;
	transform: Transform | null;
	ref: Group<Object3DEventMap> | null;
};
export type PileModels = Array<Model>;

//Transform types
export type Vec3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number };
export type Transform = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};
