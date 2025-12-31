import { type Group, type Object3DEventMap } from 'three';
import type {Transform3D} from '..';
import type { Object3DMap } from './assetInventory/object3DMap';
import type { Object2DMap } from './assetInventory/object2DMap';


interface BasePileObjectOptions<T>{
	name:string;
	id: string;
	objectMap: T;
	transform3D: Transform3D;
	uniformScale?: number;
}
abstract class BasePileObject<T> {
	name: string;
    id: string;
    objectMap: T;
    transform3D: Transform3D;
    ref: Group<Object3DEventMap> | null = null;
    shown: boolean = true;
    uniformScale: number = $state(1);

	constructor(options: BasePileObjectOptions<T>){
		this.name = options.name
		this.id = options.id
		this.objectMap = options.objectMap
		this.transform3D = options.transform3D
		this.uniformScale = options.uniformScale ?? 1;
	}
}

export class PileObject3D extends BasePileObject<Object3DMap> {
	constructor(options: BasePileObjectOptions<Object3DMap>){
		super(options)
	}
}

interface PileObject2DOptions extends BasePileObjectOptions<Object2DMap> {
	billboard?: boolean;
}

export class PileObject2D extends BasePileObject<Object2DMap> {
	billboard: boolean = $state(false);

	constructor(options: PileObject2DOptions){
		super(options);
		this.billboard = options.billboard ?? false;
	}
}

