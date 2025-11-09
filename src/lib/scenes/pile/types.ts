import { BufferGeometry, Material } from "three";



//Data Transform Object -- For upload and download to the cloud
export type RawDataDTO = {
	data: PileDataDTO
}
export type PileDataDTO = {
	pile_position_data: ObjectPositionsDTO;
};
export type ObjectPositionsDTO = Record<string, Transform>;


//Transform types 
export type Vec3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number } 
export type Transform = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};

export type PlacedModel = {name: string, modelPath: string, transform: Transform}
export type Models = Array<PlacedModel>

export type GltfNode = {
	geometry?: BufferGeometry;
    material?: Material;
};