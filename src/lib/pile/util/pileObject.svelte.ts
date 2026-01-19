import { type Group, type Object3DEventMap } from 'three';
import type { Transform3D } from '..';
import type { Object3DMap } from './assetInventory/object3DMap';
import type { Object2DMap } from './assetInventory/object2DMap';

interface BasePileObjectOptions<T> {
	name: string;
	id: string;
	objectMap: T | undefined;
	transform3D: Transform3D;
	uniformScale?: number;
}
abstract class BasePileObject<T> {
	name: string;
	id: string;
	objectMap: T | undefined;
	transform3D: Transform3D;
	ref: Group<Object3DEventMap> | null = null;
	shown: boolean = true;
	uniformScale: number = $state(1);
	objectType: string = '';

	constructor(options: BasePileObjectOptions<T>) {
		this.name = options.name;
		this.id = options.id;
		this.objectMap = options.objectMap!;
		this.transform3D = options.transform3D;
		this.uniformScale = options.uniformScale ?? 1;
	}
	public isObject2D = () => {
		return false;
	};
	public isObject3D = () => {
		return false;
	};
}

export class PileObject3D extends BasePileObject<Object3DMap> {
	objectType: string = 'object3D';
	constructor(options: BasePileObjectOptions<Object3DMap>) {
		super(options);
	}

	public isObject3D = () => {
		return true;
	}
}

interface PileObject2DOptions extends BasePileObjectOptions<Object2DMap> {
	billboard?: boolean;
}

export class PileObject2D extends BasePileObject<Object2DMap> {
	billboard: boolean = $state(false);
	objectType: string = 'object2D';

	constructor(options: PileObject2DOptions) {
		super(options);
		this.billboard = options.billboard ?? false;
	}

	public isObject2D = () => {
		return true;
	}
}
