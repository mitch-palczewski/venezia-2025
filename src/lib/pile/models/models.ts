/*
Maintains Model -> Path
 */

import type { Transform } from '../types';

export type ModelName = UndertowModel | Various;

export type UndertowModel =
	| 'Arch_01'
	| 'Bull_01'
	| 'Bull_02'
	| 'BurntBoy_01'
	| 'Cavallo_01'
	| 'Crocodile_01'
	| 'Gargoyle_01'
	| 'Gargoyle_02'
	| 'Gargoyle_03'
	| 'Gargoyle_04'
	| 'Gargoyle_05'
	| 'Leone_01'
	| 'Misc_01'
	| 'Misc_02'
	| 'Misc_05'
	| 'Zardoz_01';

export type Various = 'Archway_Multiple_01';

export const MODEL_PATHS: Record<string, string> = {
	//Undertow
	Arch_01: '/models/undertow/Arch_01.glb',
	Bull_01: '/models/undertow/Bull_01.glb',
	Bull_02: '/models/undertow/Bull_02.glb',
	BurntBoy_01: '/models/undertow/BurntBoy_01.glb',
	Cavallo_01: '/models/undertow/Cavallo_01.glb',
	Crocodile_01: '/models/undertow/Crocodile_01.glb',
	Gargoyle_01: '/models/undertow/Gargoyle_01.glb',
	Gargoyle_02: '/models/undertow/Gargoyle_02.glb',
	Gargoyle_04: '/models/undertow/Gargoyle_04.glb',
	Gargoyle_05: '/models/undertow/Gargoyle_05.glb',
	Leone_01: '/models/undertow/Leone_01.glb',
	Misc_01: '/models/undertow/Misc_01.glb',
	Misc_02: '/models/undertow/Misc_02.glb',
	Misc_05: '/models/undertow/Misc_05.glb',
	Zardoz_01: '/models/undertow/Zardoz_01.glb',
	//Various
	//Arch_01_m: '/models/various/Arch_01-m.glb'
	//Acquarossa: '/models/various/Acquarossa.glb',
	Archway_Multiple_01: '/models/various/Archway_Multiple_01.glb'
	//BrickWall_Stock: '/models/various/BrickWall_Stock.glb'
};
export const BASE_TRANSFORM: Transform = {
	translate: { x: 0, y: 0, z: 0 },
	rotation: { x: 0, y: 0, z: 0, w: 0 },
	scale: { x: 1, y: 1, z: 1 }
};



/**
 * Gets the model path associated to the model name
 * @param modelName like Zardoz_01
 * @returns .glb path like /models/undertow/Zardoz_01.glb
 */
export function getModelPath(modelName: string): string {
	if (modelName.endsWith(".glb")){
		console.log("WARNING: file model name should not end with '.glb'")
	}
	const path = MODEL_PATHS[modelName];
	if (!path) {
		const err = new Error(
			`Model not found path not found: ${modelName}. Check make sure models name and path is properly added to models.ts`
		);
		err.name = 'ModelNotFoundError';
		throw err;
	}
	return path;
}



/**
 * Checks if a string is a modelname
 * @param x checked string
 * @returns object as typed ModelName
 */
export function isModelName(x: string): x is ModelName {
	return Object.prototype.hasOwnProperty.call(MODEL_PATHS, x);
}
