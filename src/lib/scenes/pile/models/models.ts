/*
Maintains Model -> Path
 */

import type { Transform } from '../types';

export type ModelName = UndertowModel;

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

export const MODEL_PATHS: Record<string, string> = {
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
	Zardoz_01: '/models/undertow/Zardoz_01.glb'
};
export const BASE_TRANSFORM: Transform = {
	translate: { x: 0, y: 0, z: 0 },
	rotation: { x: 0, y: 0, z: 0, w: 0 },
	scale: { x: 1, y: 1, z: 1 }
};

export function getModelPath(name: string): string {
	return MODEL_PATHS[name];
}
export function isModelName(x: string): x is ModelName {
	return Object.prototype.hasOwnProperty.call(MODEL_PATHS, x);
}
