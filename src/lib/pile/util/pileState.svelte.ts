import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { AcceptedPileObjects, PileDatabase } from './api/pileDatabase';
import type { Transform3D } from '../types';
import { Matrix4, Quaternion, Vector3, type Object3D } from 'three';

export type UploadStatus = 'Idle' | 'Saved' | 'Saving' | 'Unsaved Changes';

export class PileState {
	selectedObjectID = $state<string | null>(null);
	objects2D = $state(new SvelteMap<string, PileObject2D>());
	objects3D = $state(new SvelteMap<string, PileObject3D>());
	#showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	pileDatabase: PileDatabase;

	constructor(database: PileDatabase) {
		this.pileDatabase = database;
		this.pileDatabase.database.onAppObjInserted = this.addObject;
		this.pileDatabase.database.onAppObjUpdated = this.updateObject;
		this.pileDatabase.database.onAppObjDeleted = this.deleteObject;
	}

	get showTransformControls() {
		return this.#showTransformControls;
	}

	set showTransformControls(value) {
		if (value !== this.#showTransformControls) {
			this.#showTransformControls = value;
		}
		//Updates Database When transformcontrols are turned off
		if (value === false) {
			const selectedObject = this.getSelectedObject();
			//console.log(selectedObject);
			if (selectedObject) {
				this.pileDatabase.update(selectedObject);
			} else {
				console.error('Could not get selected Model');
			}
		}
	}

	public overrideShowTransformControls(value:boolean){
		if(value === false){
			this.selectedObjectID = null
		}
		this.#showTransformControls = value

	}

	public isSelectedObject(id: string) {
		return this.selectedObjectID === id;
	}

	public addObject = (obj: AcceptedPileObjects) => {
		if (obj.isObject2D()) {
			this.objects2D.set(obj.id, obj as PileObject2D);
			this.pileDatabase.add(obj);
			return;
		}
		if (obj.isObject3D()) {
			this.objects3D.set(obj.id, obj as PileObject3D);
			this.pileDatabase.add(obj);
			return;
		}
		console.error(obj);
		throw Error(`Object must be object2D or object3D. This object type is ${obj.objectType}`);
	};

	public updateObject = (newObj: PileObject2D | PileObject3D) => {
		if (this.selectedObjectID === newObj.id)
			console.warn('Skipping object update. Object is selected.');
		const newTransform = newObj.transform3D;
		if (newObj.isObject2D() && this.objects2D.has(newObj.id)) {
			const oldObj = this.objects2D.get(newObj.id);
			if (!oldObj) throw Error(`Could not find obj ${newObj}`);
			if (!oldObj?.ref) throw Error(`Could not find ref on object ${oldObj}`);
			oldObj.uniformScale =
				(newTransform.scale.x + newTransform.scale.y + newTransform.scale.z) / 3;
			PileState.setObjectsTransform(oldObj?.ref, newTransform);
		}
		if (newObj.isObject3D() && this.objects3D.has(newObj.id)) {
			const oldObj = this.objects3D.get(newObj.id);
			if (!oldObj) throw Error(`Could not find obj ${newObj}`);
			if (!oldObj?.ref) throw Error(`Could not find ref on object ${oldObj}`);
			oldObj.uniformScale =
				(newTransform.scale.x + newTransform.scale.y + newTransform.scale.z) / 3;
			PileState.setObjectsTransform(oldObj?.ref, newTransform);
		}
	};

	public deleteObject = (id: string) => {
		this.objects2D.delete(id);
		this.objects3D.delete(id);
	};

	public clearAllModels() {
		console.log('state.clearAllModels()');
		this.objects3D?.clear();
		this.objects2D?.clear();
	}

	public getSelectedObject(): PileObject3D | PileObject2D | null {
		if (!this.selectedObjectID) {
			console.warn('WARNING: selectedObjectID is null');
			return null;
		}
		const model = this.objects3D.get(this.selectedObjectID);
		if (model) return model;
		const image = this.objects2D.get(this.selectedObjectID);
		if (image) return image;

		throw Error(
			`Could not find selectedObjectID ${this.selectedObjectID} in objects3D or objects2D`
		);
	}

	public static setObjectsTransform(objectRef: Object3D, newTransform: Transform3D) {
		const target = objectRef.children[0];
		if (!target) return;

		const worldMatrix = new Matrix4().compose(
			new Vector3(newTransform.translate.x, newTransform.translate.y, newTransform.translate.z),
			new Quaternion(
				newTransform.rotation.x,
				newTransform.rotation.y,
				newTransform.rotation.z,
				newTransform.rotation.w
			).normalize(),
			new Vector3(newTransform.scale.x, newTransform.scale.y, newTransform.scale.z)
		);

		objectRef.updateMatrixWorld(true);
		const parentInverse = new Matrix4().copy(objectRef.matrixWorld).invert();
		const localMatrix = new Matrix4().multiplyMatrices(parentInverse, worldMatrix);
		localMatrix.decompose(target.position, target.quaternion, target.scale);
		target.updateMatrixWorld(true);
	}

	public static setScale(objectRef: Object3D, newScale: number) {
		const target = objectRef.children[0];
		if (!target) return;
		target.scale.set(newScale, newScale, newScale);
		target.updateMatrixWorld(true);
	}
	public static getObjScale(objectRef: Object3D): Vector3 {
		const target = objectRef.children[0];
		if (!target) return new Vector3(1, 1, 1);

		// Ensure the world matrix is updated so the scale is accurate
		target.updateWorldMatrix(true, false);

		const worldScale = new Vector3();
		target.getWorldScale(worldScale);

		return worldScale;
	}
}
