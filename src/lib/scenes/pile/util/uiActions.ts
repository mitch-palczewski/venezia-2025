/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
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
		ref: null,
		shown:true
	};
	pileState.pileModels.push(model);
}

export function deleteSelectedModel() {
	const selectedId = pileState.selectedObjectID;
	for (let i = pileState.pileModels.length -1; i >= 0; i--) {
		if (pileState.pileModels[i].id === selectedId) {
			const model = pileState.pileModels[i]
			console.log(model)
			console.log(model.ref)
			const mesh = model.ref?.children[0].children[0] as Mesh
			if (mesh.isMesh){
				console.log("mesh!!")
				pileState.showTransformControls = false
				mesh.geometry.dispose()
				model.ref?.clear()
			}
			console.log(model.ref)


			//pileState.pileModels.splice(i, 1);
		}
	}
}


