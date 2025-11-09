import { uploadData, type ModelName, type PileDataDTO } from "..";

export async function uploadDataFactory(pileSceneRef: { getPositions: () => PileDataDTO; }) {
		const positions: PileDataDTO = pileSceneRef.getPositions();
		uploadData(positions);
	}

export function addNewModel(modelName: ModelName){
    console.log(modelName)
}