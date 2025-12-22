/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
import {
	
	uploadData,
	BASE_TRANSFORM,
	type PileDataPayload,
	type Transform3D,
	PileState
} from '..';
import { PileObject } from './pileObject.svelte';
import type { PileApp } from './pileApp';

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataPayload }) {
	const positions: PileDataPayload = pileSceneRef.getPositions();
	uploadData(positions);
}


/**
 * Creates a new PileObject and adds it to pileModels[]. 
 * @param modelName A valid model name with corresponding .glb file
 */
export function addNewModel(modelName: string, pileApp: PileApp) {
	const baseTrandform: Transform3D = BASE_TRANSFORM;
	const modelData = pileApp.modelInventory.get(modelName)
	const model = new PileObject({
		name: modelName, 
		id: pileApp.state.getUniqueID(), 
		modelPath: modelData?.path ?? '', 
		transform3D: baseTrandform
	});
	pileApp.state.models.push(model);
}


export function deleteSelectedModel(pileState: PileState) {
	for (let i = pileState.models.length - 1; i >= 0; i--) {
		if (pileState.models[i].id != pileState.selectedObjectID) continue;
		const model = pileState.models[i];
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
