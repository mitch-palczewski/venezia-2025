


//Data Transform Object -- For upload and download to the cloud
export type RawDataDTO = {
	data: PileDataDTO
}
export type PileDataDTO = {
	pile_position_data: ObjectPositionsDTO;
};
export type ObjectPositionsDTO = Record<string, TransformDTO>;
export type TransformDTO = {
	translate: Vec3;
	rotation: Quaternion;
	scale: Vec3;
};


//Transform types 
export type Vec3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Scale = { s: number } 
 

export type ModelKey = 'BurntBoy_01' | 'Misc_01' | 'Zardoz_01';
export type PlacedModel = {name: string, modelPath: string, transform: TransformDTO}