/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
import {
	getModelPath,
	pileState,
	uploadData,
	BASE_TRANSFORM,
	getNewID,
	type ModelName,
	type PileDataPayload,
	type Model,
	type Transform
} from '..';

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataPayload }) {
	const positions: PileDataPayload = pileSceneRef.getPositions();
	uploadData(positions);
}

export function addNewModel(modelName: ModelName) {
	const baseTrandform: Transform = BASE_TRANSFORM;
	const path = getModelPath(modelName);
	const model: Model = {
		name: modelName,
		modelPath: path,
		id: getNewID(),
		transform: baseTrandform,
		ref: null,
		shown: true
	};
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
