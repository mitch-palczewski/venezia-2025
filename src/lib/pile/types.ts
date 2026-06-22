import type { PileDatabaseObj } from './util/api/pileDatabase';
import type { PileObject3D } from './util/pileObject.svelte';

export type PileData = {
	pileObjects: PileDatabaseObj[];
};
export type ID = string

export type PileModels = Array<PileObject3D>;


export type Vec3 = { x: number; y: number; z: number };
export type Vec2 = { x:number; y: number }
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number };
export type Transform3D = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};

