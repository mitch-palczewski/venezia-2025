import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { AcceptedPileObjects, PileDatabase } from './api/pileDatabase';
import type { Transform3D } from '../types';
import { Quaternion, Vector3, type Object3D } from 'three';

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

	public isSelectedObject(id: string) {
		return this.selectedObjectID === id;
	}

	public addObject = (obj: AcceptedPileObjects) => {
		if (obj.isObject2D()) {
			this.objects2D.set(obj.id, obj as PileObject2D);
		}
		if (obj.isObject3D()) {
			this.objects3D.set(obj.id, obj as PileObject3D);
		}
		console.error(obj);
		throw Error(`Object must be object2D or object3D. This object type is ${obj.objectType}`);
	};

	public updateObject = (newObj: PileObject2D | PileObject3D) => {
		if (this.selectedObjectID === newObj.id) return;

		const map = newObj.isObject2D() ? this.objects2D : this.objects3D;
		const oldObj = map.get(newObj.id);

		if (!oldObj || !oldObj.ref) {
			console.warn(`Update ignored: Could not find object or ref for ${newObj.id}`);
			return;
		}
		const newTransform = newObj.transform3D;
		oldObj.uniformScale = (newTransform.scale.x + newTransform.scale.y + newTransform.scale.z) / 3;
		PileState.setObjectsTransform(oldObj.ref, newTransform);
		console.log('Updating Obj from realtime: ', newObj);
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
		const worldPos = new Vector3(
			newTransform.translate.x,
			newTransform.translate.y,
			newTransform.translate.z
		);
		const worldQuat = new Quaternion(
			newTransform.rotation.x,
			newTransform.rotation.y,
			newTransform.rotation.z,
			newTransform.rotation.w
		);
		const worldScale = new Vector3(
			newTransform.scale.x,
			newTransform.scale.y,
			newTransform.scale.z
		);

		worldQuat.normalize();

		if (objectRef.parent) {
			objectRef.parent.worldToLocal(worldPos);

			const parentWorldQuat = new Quaternion();
			objectRef.parent.getWorldQuaternion(parentWorldQuat);
			worldQuat.premultiply(parentWorldQuat.invert());

			const parentWorldScale = new Vector3();
			objectRef.parent.getWorldScale(parentWorldScale);
			worldScale.divide(parentWorldScale);
		}

		objectRef.position.copy(worldPos);
		objectRef.quaternion.copy(worldQuat);
		objectRef.scale.copy(worldScale);

		objectRef.updateMatrixWorld(true);
	}
}
