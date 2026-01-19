/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import type { Mesh } from 'three';
import { uploadData, type Transform3D, PileState } from '..';
import { PileObject2D, PileObject3D } from './pileObject.svelte';
import type { PileApp } from './pileApp.svelte';
import { BASE_TRANSFORM } from './transform';
import type { Object2DMap } from './assetInventory/object2DMap';
import type { Object3DMap } from './assetInventory/object3DMap';
import type { SvelteMap } from 'svelte/reactivity';

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
		const object3D = new PileObject3D({
			name: modelMap.name,
			id: crypto.randomUUID(),
			objectMap: modelMap,
			transform3D: baseTrandform,
			uniformScale: 1
		});
		pileApp.state.addObject(object3D);
		pileApp.database.add(object3D)
	}
	if (modelMap.objectType === '2D') {
		const object2D = new PileObject2D({
			name: modelMap.name,
			id: crypto.randomUUID(),
			objectMap: modelMap,
			transform3D: baseTrandform,
			uniformScale: 1
		});
		pileApp.state.addObject(object2D);
		//pileApp.database.add(object2D);
	}

}

export function deleteSelectedModel(pileState: PileState) {
	pileState.pileDatabase.delete(pileState.selectedObjectID!)
	deleteObject(pileState.objects3D, pileState.selectedObjectID)
	deleteObject(pileState.objects2D, pileState.selectedObjectID)
	pileState.showTransformControls = false;

}

function deleteObject(inventory: SvelteMap<string, PileObject3D | PileObject2D>, selectedObjectID: string | null){
	inventory.forEach((object, id) => {
		if(id != selectedObjectID) return;
		const tform = object.ref?.children[0]; 
		const mesh = object.ref?.children[0].children[0] as Mesh
		object.shown = false
		if(mesh.isMesh){
			mesh.geometry.dispose();
		}
		tform?.clear();
		tform?.remove();
		console.log(`Reomved Object ${object.name}`)
	})
}