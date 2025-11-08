export type ModelName =  'BurntBoy_01' | 'Misc_01' | 'Zardoz_01' | 'Arch_01';
export const MODEL_PATHS: Record<ModelName, string> = {
  BurntBoy_01: '/models/undertow/BurntBoy_01.glb',
  Misc_01: '/models/undertow/Misc_01.glb',
  Zardoz_01: '/models/undertow/Zardoz_01.glb',
  Arch_01: '/models/undertow/Arch_01.glb'
};
export function getModelPath(name: ModelName): string {
  return MODEL_PATHS[name];
}
export function isModelName(x: string): x is ModelName {
  return Object.prototype.hasOwnProperty.call(MODEL_PATHS, x);
}
