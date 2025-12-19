import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import type { ID, PileModels } from '../types';
import type { PileObject } from './pileObject';

export class PileState {
	selectedObjectID = $state<string | null>(null);
	pileModels = $state<PileObject[]>([]);
	showTransformControls = $state(false);
	transformControlsMode = $state<TransformControlsMode>('translate');
	maxID = $state(1000);

	public isSelected(id: string) {
		return this.selectedObjectID === id
	}

	addModel(pileModel: PileObject) {
        this.maxID += 1;
        this.pileModels.push(pileModel);
    }
}

export const pileState: {
	selectedObjectID: null | ID;
	pileModels: PileModels;
	showTransformControls: boolean;
	transformControlsMode: TransformControlsMode;
	maxID: number;
} = $state({
	selectedObjectID: null,
	pileModels: [],
	showTransformControls: false,
	transformControlsMode: 'translate',
	newModels: [],
	maxID: 1000
});

export function isSelectedObject(id: string) {
	if (pileState.selectedObjectID && pileState.selectedObjectID === id) {
		return true;
	}
	return false;
}

export function getNewID() {
	let maxID = 1000;
	for (const model of pileState.pileModels) {
		const idNum = parseInt(model.id, 10);
		if (idNum > maxID) {
			maxID = idNum + 1;
		}
	}
	maxID += 1;
	return maxID.toString();
}
