import { getModelPath, pileState, uploadData, type ModelName, type PileDataDTO, type PlacedModel, type Transform } from "..";

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataDTO; }) {
		const positions: PileDataDTO = pileSceneRef.getPositions();
		uploadData(positions);
	}

export function addNewModel(modelName: ModelName){
	const baseTrandform:Transform = {translate:{x:0,y:0,z:0}, rotation:{x:0,y:0,z:0,w:0}, scale:{x:0,y:0,z:0}}
	const path = getModelPath(modelName)
	const model: PlacedModel = {name:modelName, modelPath:path, transform:baseTrandform}
	pileState.newModels?.push(model)
}

export function deleteSelectedModel(){

}