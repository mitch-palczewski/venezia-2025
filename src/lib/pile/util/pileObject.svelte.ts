import { type Group, type Object3DEventMap } from 'three';
import type { Transform3D} from '..';


interface PileObject3DOptions {
	name: string,
	id: string,
	modelPath: string,
	transform3D: Transform3D,
	uniformScale: number
}

export class PileObject3D {
	name: string;
	id: string;
	modelPath: string;
	transform3D: Transform3D;
	ref: Group<Object3DEventMap> | null = null; 
	shown: boolean = true;
	uniformScale: number | null = $state(null);
	
	constructor(
        {name, id, modelPath, transform3D, uniformScale = 1}: PileObject3DOptions
    ) {
		this.name = name;
		this.id = id;
		this.modelPath = modelPath;
		this.transform3D = transform3D;
		this.uniformScale = uniformScale
	}
}


