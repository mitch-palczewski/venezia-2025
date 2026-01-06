import type { PileObject3D } from './util/pileObject.svelte';


export interface PilePayloadObject {
  id: string;
  name: string;
  type: string;
  animation: string | null;
  // Position
  pos_x: number;
  pos_y: number;
  pos_z: number;
  // Rotation (Quaternion)
  rot_x: number;
  rot_y: number;
  rot_z: number;
  rot_w: number;
  // Scale
  scale_x: number;
  scale_y: number;
  scale_z: number;
  // Metadata
  updated_at: string;
  last_edited_by: string | null;
}

//Active Model Type
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

