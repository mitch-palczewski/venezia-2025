import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import type { PileObject3D } from './pileObject.svelte';

export class PileState {
	selectedObjectID = $state<string | null>(null);

	//consider making this a <Map<string, PileObject3D>> where the string is the ID
	models = $state<PileObject3D[]>([]);
	showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	maxID = $state(1000);

	public isSelected(id: string) {
		return this.selectedObjectID === id
	}

	public addModel(pileModel: PileObject3D) {
        this.maxID += 1;
        this.models.push(pileModel);
    }

	public getUniqueID(){
		for (const model of this.models) {
		const idNum = parseInt(model.id, 10);
		if (idNum > this.maxID) {
			this.maxID = idNum + 1;
		}
	}
	this.maxID += 1;
	return this.maxID.toString();
	}

	public clearAllModels(){
		this.models = [];
	}

	public getSelectedModelObject(): PileObject3D |  null{
		for (const model of this.models){
			if (model.id === this.selectedObjectID){
				return model
			}
		}
		return null
	}
}
