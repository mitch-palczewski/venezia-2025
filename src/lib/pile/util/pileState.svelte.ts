import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { AcceptedPileObjects, PileDatabase } from './api/pileDatabase';

export type UploadStatus = 'Idle' | 'Saved' | 'Saving' | 'Unsaved Changes';

export class PileState {
	selectedObjectID = $state<string | null>(null);
	objects2D = $state(new SvelteMap<string, PileObject2D>());
	objects3D = $state(new SvelteMap<string, PileObject3D>());
	#showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	pileDatabase: PileDatabase;

	//DELETE
	uploadStatus: UploadStatus = $state('Idle');
	#changeCount = $state(0);
	#lastSavedCount = $state(0);
	hasChanges = $derived(this.#changeCount !== this.#lastSavedCount);

	constructor(database: PileDatabase) {
		this.pileDatabase = database;
		this.pileDatabase.database.onAppObjInserted = this.addObject
		this.pileDatabase.database.onAppObjUpdated = this.updateObject
		this.pileDatabase.database.onAppObjDeleted = this.deleteObject

		$effect.root(() => {
			$effect(() => {
				if (this.hasChanges) {
					this.uploadStatus = 'Unsaved Changes';
				}
			});
		});
	}

	get showTransformControls() {
		return this.#showTransformControls;
	}

	set showTransformControls(value) {
		//DELETE
		if (value !== this.#showTransformControls) {
			this.#showTransformControls = value;
			this.#changeCount++;
		}
		//Updates Database When transformcontrols are turned off
		if (value === false) {
			const selectedObject = this.getSelectedObject();
			if (selectedObject) {
				this.pileDatabase.update(selectedObject);
			} else {
				console.error('Could not get selected Model');
			}
		}
	}

	//DELETE
	public setAsSaved() {
		this.#lastSavedCount = this.#changeCount;
	}

	public isSelected(id: string) {
		return this.selectedObjectID === id;
	}

	public addObject = (obj: AcceptedPileObjects) => {
		console.log(obj)
		if (obj.isObject2D()) {
			this.objects2D.set(obj.id, obj as PileObject2D);
		}
		if (obj.isObject3D()) {
			this.objects3D.set(obj.id, obj as PileObject3D);
		}
		console.error(obj);
		throw Error(`Object must be object2D or object3D. This object type is ${obj.objectType}`);
	}

	public updateObject = (newObj: PileObject2D | PileObject3D) => {
		if (newObj.isObject2D() && this.objects2D.has(newObj.id)) {
			this.objects2D.set(newObj.id, newObj as PileObject2D);
		}
		if (newObj.isObject3D() && this.objects3D.has(newObj.id)) {
			this.objects3D.set(newObj.id, newObj as PileObject3D);
		}
	}

	public deleteObject = (id: string) => {
		this.objects2D.delete(id);
		this.objects3D.delete(id);
	}

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
}
