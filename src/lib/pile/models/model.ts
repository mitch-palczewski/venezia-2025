import { type Group, type Object3DEventMap } from 'three';
import type { Transform3D, Vec3 } from '..';


interface PileObjectOptions {
	name: string,
	id: string,
	modelPath: string,
	transform3D: Transform3D,
}

export class PileObject {
	name: string;
	id: string;
	modelPath: string;
    ref: Group<Object3DEventMap> | null = null; 
	shown: boolean = true;
	transform3D: Transform3D;
	
	constructor(
        {name, id, modelPath, transform3D}: PileObjectOptions
    ) {
		this.name = name;
		this.id = id;
		this.modelPath = modelPath;
		this.transform3D = transform3D;
	}
}




export function isVec3(value: unknown): value is Vec3{
    return (
        typeof value === 'object' && 
        value != null &&
        typeof (value as Vec3).x === 'number' &&
        typeof (value as Vec3).y === 'number' &&
        typeof (value as Vec3).z === 'number' 
    );
}
