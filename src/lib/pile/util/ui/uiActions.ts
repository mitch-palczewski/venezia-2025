/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import { Vector3, type Mesh } from 'three';
import type { Object2DMap } from '../assetInventory/object2DMap';
import type { Object3DMap } from '../assetInventory/object3DMap';
import type { PileApp } from '../pileApp.svelte';
import type { Transform3D } from '$lib/pile/types';
import { PileObject2D, PileObject3D } from '../pileObject.svelte';
import type { PileState } from '../pileState.svelte';
import type { SvelteMap } from 'svelte/reactivity';
import type { EnvironmentMap } from '../assetInventory/environmentMap';
import { roundTo } from '../api/pileMapper';

/**
 * Creates a new PileObject and adds it to pileModels[].
 * @param modelName A valid model name with corresponding .glb file
 */
export function addNewModel(modelMap: Object2DMap | Object3DMap, pileApp: PileApp) {
	pileApp.state.showTransformControls = false;
	const baseTransform: Transform3D = JSON.parse(
		JSON.stringify({
			translate: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0, w: 1 },
			scale: {
				x: pileApp.uiSettings.defaultModelSize,
				y: pileApp.uiSettings.defaultModelSize,
				z: pileApp.uiSettings.defaultModelSize
			}
		})
	);
	const camera = pileApp.controlsRef?.target;
	if (camera) {
		const spawnPos = new Vector3().copy(camera);

		baseTransform.translate = {
			x: roundTo(spawnPos.x),
			y: roundTo(spawnPos.y),
			z: roundTo(spawnPos.z)
		};
	} else {
		baseTransform.translate = { x: 0, y: 0, z: 0 };
	}
	console.log(baseTransform);
	if (modelMap.objectType === '3D') {
		const object3D = new PileObject3D({
			name: modelMap.name,
			id: crypto.randomUUID(),
			objectMap: modelMap,
			transform3D: baseTransform,
			uniformScale: pileApp.uiSettings.defaultModelSize
		});
		object3D.newObject = true;
		pileApp.state.addObject(object3D);
		pileApp.database.add(object3D);
	}
	if (modelMap.objectType === '2D') {
		const object2D = new PileObject2D({
			name: modelMap.name,
			id: crypto.randomUUID(),
			objectMap: modelMap,
			transform3D: baseTransform,
			uniformScale: 1
		});
		object2D.newObject = true;
		pileApp.state.addObject(object2D);
		pileApp.database.add(object2D);
	}
}

export function deleteSelectedModel(pileState: PileState) {
	const id = pileState.selectedObjectID!;
	pileState.pileDatabase.delete(id);
	deleteObject(pileState.objects3D, id);
	deleteObject(pileState.objects2D, id);
	pileState.overrideShowTransformControls(false);
}

function deleteObject(
	inventory: SvelteMap<string, PileObject3D | PileObject2D>,
	selectedObjectID: string | null
) {
	inventory.forEach((object, id) => {
		if (id != selectedObjectID) return;
		const tform = object.ref?.children[0];
		const mesh = object.ref?.children[0].children[0] as Mesh;
		object.shown = false;
		if (mesh.isMesh) {
			mesh.geometry.dispose();
		}
		tform?.clear();
		tform?.remove();
		console.log(`Reomved Object ${object.name}`);
	});
}

export function changeEnvironment(selectedEnvironment: EnvironmentMap, pileApp: PileApp) {
	pileApp.environment.selectedEnvironment = selectedEnvironment;
	pileApp.environment.uploadEnvironment();
}
