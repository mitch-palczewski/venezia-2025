/*
Maintains Model -> Path
 */

import type { Transform } from "../types";

export type ModelName =  'BurntBoy_01' | 'Misc_01' | 'Zardoz_01' | 'Arch_01';
export const MODEL_PATHS: Record<string, string> = {
  BurntBoy_01: '/models/undertow/BurntBoy_01.glb',
  Misc_01: '/models/undertow/Misc_01.glb',
  Zardoz_01: '/models/undertow/Zardoz_01.glb',
  Arch_01: '/models/undertow/Arch_01.glb'
};
export const BASE_TRANSFORM: Transform = {translate:{x:0,y:0,z:0}, rotation:{x:0,y:0,z:0,w:0}, scale:{x:1,y:1,z:1}}



export function getModelPath(name: string): string {
  return MODEL_PATHS[name];
}
export function isModelName(x: string): x is ModelName {
  return Object.prototype.hasOwnProperty.call(MODEL_PATHS, x);
}
