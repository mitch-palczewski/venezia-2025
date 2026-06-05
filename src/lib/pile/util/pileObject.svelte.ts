import { type Group } from 'three';
import type { Transform3D } from '..';
import type { Object3DMap } from './assetInventory/object3DMap';
import type { Object2DMap } from './assetInventory/object2DMap';
import type { PileApp } from './pileApp.svelte';
import type { MoveTo } from './animator.svelte';
import { playModelClicked, playModelUnclicked} from '$lib/audio/audio.svelte';

export const object2DType = 'object2D';
export const object3DType = 'object3D';

export interface BasePileObjectOptions<T> {
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
	ref = $state<Group | undefined>(undefined);
	shown: boolean = true;
	uniformScale: number = $state(1);
	objectType: string = '';
	newObject: boolean = false;
	moveTo?: MoveTo 
	onLoad?: () => void;

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
	objectType: string = object3DType;
	constructor(options: BasePileObjectOptions<Object3DMap>) {
		super(options);
	}

	public isObject3D = () => {
		if (this.objectType !== object3DType) {
			console.warn("Object Type missmatch. Should have objectType = 'object3D'", this);
		}
		return true;
	};
}

interface PileObject2DOptions extends BasePileObjectOptions<Object2DMap> {
	billboard?: boolean;
}

export class PileObject2D extends BasePileObject<Object2DMap> {
	billboard: boolean = $state(false);
	objectType: string = object2DType;

	constructor(options: PileObject2DOptions) {
		super(options);
		this.billboard = options.billboard ?? false;
	}

	public isObject2D = () => {
		if (this.objectType !== object2DType) {
			console.warn("Object Type missmatch. Should have objectType = 'object2D'", this);
		}
		return true;
	};
}

export function setObjectMapIfNull(app: PileApp, pileObject: PileObject2D | PileObject3D) {
	if (!pileObject.objectMap) {
		if (pileObject.objectType == 'object2D') {
			pileObject.objectMap = app.imageInventory.get(pileObject.name);
		}
		if (pileObject.objectType == 'object3D') {
			pileObject.objectMap = app.modelInventory.get(pileObject.name);
		}
	}
}

export function handleModelClick(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	e: any,
	app: PileApp,
	pileObject: PileObject2D | PileObject3D
) {
	//console.log(`Raycast Hits:`, e.intersections);
   // console.log('Face Index:', e.faceIndex); 
   // console.log('Distance:', e.distance);
	e.cancelBubble = true;
	e.stopPropagation();
	//console.log(`Selecting ${pileObject.name}`)
	if (app.uiSettings.presentationMode) return;
	//if object is all ready selected ...
	if (app.state.isSelectedObject(pileObject.id)) {
		app.state.showTransformControls = false;
		app.state.selectedObjectID = null;
		playModelUnclicked()
	} else {
		app.state.selectedObjectID = pileObject.id;
		app.state.showTransformControls = true;
		playModelClicked()
	}
	
}
