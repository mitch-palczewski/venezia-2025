
import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';
import type { ID,  PileModels } from '../types';

export const pileState: {
	selectedObjectID: null | ID;
	pileModels: PileModels;
	showTransformControls: boolean;
	transformControlsMode: TransformControlsMode;
	newModels: PileModels;
	maxID: number;
} = $state({
	selectedObjectID: null,
	pileModels: [],
	showTransformControls: false,
	transformControlsMode: 'translate',
	newModels: [],
	maxID: 1000
});


export function isSelectedObject( id: string) {
	if (
		pileState.selectedObjectID &&
		pileState.selectedObjectID === id
	) {
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
