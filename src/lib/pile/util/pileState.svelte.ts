import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import { PileObject2D, type PileObject3D } from './pileObject.svelte';
import { SvelteMap } from 'svelte/reactivity';

export class PileState {
	selectedObjectID = $state<string | null>(null);

	//consider making this a <Map<string, PileObject3D>> where the string is the ID
	objects3D = $state<PileObject3D[]>([]);
	objects2D = $state(new SvelteMap<string, PileObject2D>());
	showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	maxID = $state(1000);

	public isSelected(id: string) {
		return this.selectedObjectID === id;
	}

	public add3DModel(model: PileObject3D) {
		this.maxID += 1;
		this.objects3D.push(model);
	}

	public add2DImage(image: PileObject2D) {
		this.maxID += 1;
		this.objects2D?.set(image.id, image);
	}

	public getUniqueID() {
		for (const model of this.objects3D) {
			const idNum = parseInt(model.id, 10);
			if (idNum > this.maxID) {
				this.maxID = idNum + 1;
			}
		}
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
		this.objects3D = [];
		this.objects2D?.clear();
	}

	public getSelectedModelObject(): PileObject3D | PileObject2D | null{
		if (!this.selectedObjectID){
			console.log("WARNING: selectedObjectID is null")
			return null
		}
		for (const model of this.objects3D) {
			if (model.id === this.selectedObjectID) {
				return model;
			}
		}
		const image = this.objects2D.get(this.selectedObjectID);
		if (image) return image;
		
		throw Error(
			`Could not find selectedObjectID ${this.selectedObjectID} in objects3D or objects2D`
		);
	}
}
