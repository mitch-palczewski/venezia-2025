/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import {
	getModelPath,
	pileState,
	uploadData,
	type ModelName,
	type PileDataPayload,
	type Model,
	type Transform,
	BASE_TRANSFORM,
	getNewID
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
		ref: null
	};
	pileState.pileModels.push(model);
}

export function deleteSelectedModel() {
	const selectedId = pileState.selectedObject?.id;
	for (let i = pileState.pileModels.length -1; i >= 0; i--) {
		if (pileState.pileModels[i].id === selectedId) {
			pileState.pileModels.splice(i, 1);
		}
	}
}
