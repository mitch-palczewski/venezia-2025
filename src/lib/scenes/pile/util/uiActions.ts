/**
 * Functions for UI Actions 
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 * addNewModel: addes a Model of Model Name to newModels 
 */

import { getModelPath, pileState, uploadData, type ModelName, type PileDataPayload, type Model, type Transform, BASE_TRANSFORM } from "..";

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataPayload; }) {
		const positions: PileDataPayload = pileSceneRef.getPositions();
		uploadData(positions);
	}

export function addNewModel(modelName: ModelName){
	const baseTrandform:Transform = BASE_TRANSFORM
	const path = getModelPath(modelName)
	const model: Model = {name:modelName, modelPath:path, id:pileState.maxID.toString(), transform:baseTrandform, ref: null}
	pileState.newModels?.push(model)
}

export function deleteSelectedModel(){

}