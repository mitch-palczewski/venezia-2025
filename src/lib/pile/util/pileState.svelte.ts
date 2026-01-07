import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { PileDatabase } from './api/pileDatabase';

export type UploadStatus = 'Idle' | 'Saved' | 'Saving' | 'Unsaved Changes';

export class PileState {
	selectedObjectID = $state<string | null>(null);
	objects2D = $state(new SvelteMap<string, PileObject2D>());
	objects3D = $state(new SvelteMap<string, PileObject3D>());
	#showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	database: PileDatabase;

	//need to fix
	maxID = $state(1000);
	uploadStatus: UploadStatus = $state('Idle');
	#changeCount = $state(0);
	#lastSavedCount = $state(0);
	hasChanges = $derived(this.#changeCount !== this.#lastSavedCount);

	get showTransformControls() {
		return this.#showTransformControls;
	}

	set showTransformControls(value) {
		if (value !== this.#showTransformControls) {
			this.#showTransformControls = value;
			this.#changeCount++;
		}
		//Updates Database When transformcontrols are turned off
		if (value === false) {
			const selectedObject = this.getSelectedModelObject();
			if (selectedObject) {
				this.database.updateObject(selectedObject);
			}else{
				console.error("Could not get selected Model")
			}
		}
	}

	constructor(database: PileDatabase) {
		this.database = database;
		$effect.root(() => {
			$effect(() => {
				if (this.hasChanges) {
					this.uploadStatus = 'Unsaved Changes';
				}
			});
		});
	}

	/**
	 * For Checking if changes have been made to the Pile.
	 *
	 * Sets the Last Saved Snapshot to the current snapshot
	 */
	public setAsSaved() {
		this.#lastSavedCount = this.#changeCount;
	}

	public isSelected(id: string) {
		return this.selectedObjectID === id;
	}

	public add3DModel(model: PileObject3D) {
		this.maxID += 1;
		this.objects3D.set(model.id, model);
	}

	public add2DImage(image: PileObject2D) {
		this.maxID += 1;
		this.objects2D?.set(image.id, image);
	}

	public getUniqueID() {
		this.objects3D?.forEach((model, id) => {
			const idNum = parseInt(id, 10);
			if (idNum > this.maxID) {
				this.maxID = idNum + 1;
			}
		});
		this.objects2D?.forEach((image, id) => {
			const idNum = parseInt(id, 10);
			if (idNum > this.maxID) {
				this.maxID = idNum + 1;
			}
		});
		this.maxID += 1;
		return this.maxID.toString();
	}

	public clearAllModels() {
		console.log('state.clearAllModels()');
		this.objects3D?.clear();
		this.objects2D?.clear();
	}

	public getSelectedModelObject(): PileObject3D | PileObject2D | null {
		if (!this.selectedObjectID) {
			console.log('WARNING: selectedObjectID is null');
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
