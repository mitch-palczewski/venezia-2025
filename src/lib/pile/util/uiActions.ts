/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
import { uploadData, type Transform3D, PileState, Object2DMap, Object3DMap } from '..';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import type { PileApp } from './pileApp.svelte';
import { BASE_TRANSFORM } from './transform';

export async function uploadDataFactory(pileSceneRef: { getPositions: () => object }) {
	const positions: object = pileSceneRef.getPositions();
	uploadData(positions);
}

/**
 * Creates a new PileObject and adds it to pileModels[].
 * @param modelName A valid model name with corresponding .glb file
 */
export function addNewModel(modelMap: Object2DMap | Object3DMap, pileApp: PileApp) {
	const baseTrandform: Transform3D = BASE_TRANSFORM;
	if (modelMap.objectType === '3D') {
		const model = new PileObject3D({
			name: modelMap.name,
			id: pileApp.state.getUniqueID(),
			modelPath: modelMap?.path ?? '',
			transform3D: baseTrandform,
			uniformScale: 1
		});
		pileApp.state.objects3D.push(model);
	}
	if (modelMap.objectType === '2D') {
		const image = new PileObject2D({
			name: modelMap.name,
			id: pileApp.state.getUniqueID(),
			modelPath: modelMap?.path ?? '',
			transform3D: baseTrandform,
			uniformScale: 1
		});
		pileApp.state.add2DImage(image);
	}

}

export function deleteSelectedModel(pileState: PileState) {
	for (let i = pileState.objects3D.length - 1; i >= 0; i--) {
		if (pileState.objects3D[i].id != pileState.selectedObjectID) continue;
		const model = pileState.objects3D[i];
		const tfrom = model.ref?.children[0];
		const mesh = model.ref?.children[0].children[0] as Mesh;

		model.shown = false;
		if (mesh.isMesh) {
			mesh.geometry.dispose();
		}
		tfrom?.clear();
		tfrom?.remove();
		console.log(model.ref);
	}
	pileState.showTransformControls = false;
}
