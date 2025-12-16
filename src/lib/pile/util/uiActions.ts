/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
import {
	pileState,
	uploadData,
	BASE_TRANSFORM,
	getNewID,
	type PileDataPayload,
	type Transform3D,
	pileModelInventory
} from '..';
import { PileObject } from '../models/model';

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataPayload }) {
	const positions: PileDataPayload = pileSceneRef.getPositions();
	uploadData(positions);
}


/**
 * Creates a new PileObject and adds it to pileModels[]. 
 * @param modelName A valid model name with corresponding .glb file
 */
export function addNewModel(modelName: string) {
	const baseTrandform: Transform3D = BASE_TRANSFORM;
	const path = pileModelInventory.get(modelName)?.path ?? ''
	const model = new PileObject({
		name: modelName, 
		id: getNewID(), 
		modelPath: path, 
		transform3D: baseTrandform
	});
	pileState.pileModels.push(model);
}


export function deleteSelectedModel() {
	for (let i = pileState.pileModels.length - 1; i >= 0; i--) {
		if (pileState.pileModels[i].id != pileState.selectedObjectID) continue;
		const model = pileState.pileModels[i];
		const tfrom = model.ref?.children[0]
		const mesh = model.ref?.children[0].children[0] as Mesh;

		model.shown = false
		if (mesh.isMesh) { mesh.geometry.dispose();}
		tfrom?.clear()
		tfrom?.remove()
		console.log(model.ref);
	}
	pileState.showTransformControls = false
}
