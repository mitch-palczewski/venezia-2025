/*
Defines Types used in Pile
 */


//Data Transform Object -- For upload and download to the cloud
export type RawDataDTO = {
	data: PileDataDTO;
};
export type PileDataDTO = {
	pile_position_data: ObjectPositionsDTO;
};
export type ObjectPositionsDTO = Record<string, {transform: Transform, name: string}>;

//Transform types
export type Vec3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number };
export type Transform = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};

//Active Model Types
export type PlacedModel = { name: string; modelPath: string; transform: Transform };
export type Models = Array<PlacedModel>;
