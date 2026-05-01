import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { AcceptedPileObjects, PileDatabase } from './api/pileDatabase';
import type { Transform3D } from '../types';
import { Matrix4, Quaternion, Vector3, type Object3D } from 'three';
import type { PileApp } from './pileApp.svelte';
import type { SettingsState } from './ui/settingsState.svelte';
import { playAddObject } from '$lib/audio/audio.svelte';

export type UploadStatus = 'Idle' | 'Saved' | 'Saving' | 'Unsaved Changes';

export class PileState {
	#selectedObjectID = $state<string | null>(null);
	selectedObjectUploaded = $state(true);
	objects2D = $state(new SvelteMap<string, PileObject2D>());
	objects3D = $state(new SvelteMap<string, PileObject3D>());
	#showTransformControls = $state(false);
	pileDatabase: PileDatabase;
	uiSettings: SettingsState | undefined;
	app: PileApp | undefined;

	constructor(database: PileDatabase) {
		this.pileDatabase = database;
		this.pileDatabase.database.onAppObjInserted = this.addObject;
		this.pileDatabase.database.onAppObjUpdated = this.updateObject;
		this.pileDatabase.database.onAppObjDeleted = this.deleteObject;
	}

	get selectedObjectID() {
		return this.#selectedObjectID;
	}

	set selectedObjectID(value) {
		if (value === this.#selectedObjectID) return;
		if (!this.selectedObjectUploaded && this.showTransformControls) {
			//If moving from a selected object to a new object
			this.updateSelectedObject();
		}
		this.#selectedObjectID = value;
		this.selectedObjectUploaded = false;
	}

	get showTransformControls() {
		return this.#showTransformControls;
	}

	set showTransformControls(value) {
		if (value === this.#showTransformControls) return;
		if (value !== this.#showTransformControls) {
			this.#showTransformControls = value;
		}
		if (value === false) {
			this.updateSelectedObject();
		}
	}

	private updateSelectedObject() {
		const selectedObject = this.getSelectedObject();
		if (selectedObject) {
			this.pileDatabase.update(selectedObject);
			this.selectedObjectUploaded = true;
		} else {
			console.error('Could not get selected Model');
		}
	}

	public overrideShowTransformControls(value: boolean) {
		if (value === false) {
			this.selectedObjectID = null;
		}
		this.#showTransformControls = value;
	}

	public isSelectedObject(id: string) {
		return this.selectedObjectID === id;
	}

	public addObject = (obj: AcceptedPileObjects, suppressSound = false) => {
		if(!suppressSound) playAddObject();
		console.log(`Adding Object`, obj);
		if (obj.objectType === 'object2D') {
			this.objects2D.set(obj.id, obj as PileObject2D);
			return;
		}
		if (obj.objectType === 'object3D') {
			this.objects3D.set(obj.id, obj as PileObject3D);
			console.log(this.objects3D)
			return;
		}
		console.error(obj);
		throw Error(`Object must be object2D or object3D. This object type is ${obj.objectType}`);
	};

	public updateObject = (newObj: AcceptedPileObjects) => {
		if (this.selectedObjectID === newObj.id) {
			console.warn('Skipping object update. Object is selected.');
			console.log('should i return here i am not currently');
		}
		if (newObj.objectType === 'object2D') {
			this.update2DObject(newObj as PileObject2D);
			return;
		}
		if (newObj.objectType === 'object3D') {
			this.update3DObject(newObj as PileObject3D);
			return;
		}
		if (newObj.objectType === 'environment' && this.app) {
			const environmentMap = this.app.environmentInventory.get(newObj.name);
			if (environmentMap) this.app.environment.setEnvironement(environmentMap);
		}
	};

	private update2DObject(newObj: PileObject2D) {
		const newTransform = newObj.transform3D;
		if (newObj.isObject2D() && this.objects2D.has(newObj.id)) {
			const oldObj = this.objects2D.get(newObj.id);
			if (!oldObj) throw Error(`Could not find obj ${newObj}`);
			if (!oldObj?.ref) throw Error(`Could not find ref on object ${oldObj}`);
			oldObj.uniformScale =
				(newTransform.scale.x + newTransform.scale.y + newTransform.scale.z) / 3;
			PileState.setObjectsTransform(oldObj?.ref, newTransform);
		}
	}

	private update3DObject(newObj: PileObject3D) {
		if (newObj.transform3D.translate.x === 0 && newObj.transform3D.translate.y === 0) {
			console.warn(`Object ${newObj.id} is reporting origin position. Source:`, newObj);
		}
		const newTransform = newObj.transform3D;
		if (newObj.isObject3D() && this.objects3D.has(newObj.id)) {
			const oldObj = this.objects3D.get(newObj.id);
			if (!oldObj) throw Error(`Could not find obj ${newObj}`);
			if (!oldObj?.ref) throw Error(`Could not find ref on object ${oldObj}`);
			if (!oldObj?.ref.children[0]) throw Error(`Could not find ref on object ${oldObj}`);

			oldObj.uniformScale =
				(newTransform.scale.x + newTransform.scale.y + newTransform.scale.z) / 3;
			if (oldObj.moveTo) {
				const targetMatrix = new Matrix4().compose(
					new Vector3(newTransform.translate.x, newTransform.translate.y, newTransform.translate.z),
					new Quaternion(
						newTransform.rotation.x,
						newTransform.rotation.y,
						newTransform.rotation.z,
						newTransform.rotation.w
					),
					new Vector3(newTransform.scale.x, newTransform.scale.y, newTransform.scale.z)
				);
				const transformControls = oldObj.ref.children[0];

				const transformControlsMatrixInverse = transformControls.matrix.clone().invert();
				const parentTargetMatrix = new Matrix4().multiplyMatrices(
					targetMatrix,
					transformControlsMatrixInverse
				);

				const finalPos = new Vector3();
				const finalQuat = new Quaternion();
				const finalScale = new Vector3();
				parentTargetMatrix.decompose(finalPos, finalQuat, finalScale);
				oldObj.moveTo(
					{ x: finalPos.x, y: finalPos.y, z: finalPos.z },
					{ x: finalQuat.x, y: finalQuat.y, z: finalQuat.z, w: finalQuat.w },
					{ x: finalScale.x, y: finalScale.y, z: finalScale.z }
				);
			} else {
				console.warn('moveTo is undefined');
			}
		}
	}

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
		const roundedScale = Math.round(newScale * 10000) / 10000;

		const parentWorldScale = new Vector3();
		objectRef.getWorldScale(parentWorldScale);

		const localX = parentWorldScale.x !== 0 ? roundedScale / parentWorldScale.x : 0;
		const localY = parentWorldScale.y !== 0 ? roundedScale / parentWorldScale.y : 0;
		const localZ = parentWorldScale.z !== 0 ? roundedScale / parentWorldScale.z : 0;
		target.scale.set(localX, localY, localZ);
		target.updateMatrixWorld(true);
	}
	public static getObjScale(objectRef: Object3D): Vector3 {
		const target = objectRef.children[0];
		if (!target) return new Vector3(1, 1, 1);
		target.updateWorldMatrix(true, false);
		const worldScale = new Vector3();
		target.getWorldScale(worldScale);

		return worldScale;
	}
}
