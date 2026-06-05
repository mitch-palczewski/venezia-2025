/**
 * Functions for UI Actions
 * uploadDataFactory: gets position data to be uploaded to the Blob Storage
 */

import { Object3D, Quaternion, Vector3, type Mesh } from 'three';
import type { Object2DMap } from '../assetInventory/object2DMap';
import type { Object3DMap } from '../assetInventory/object3DMap';
import type { PileApp } from '../pileApp.svelte';
import type { Transform3D } from '$lib/pile/types';
import { PileObject2D, PileObject3D } from '../pileObject.svelte';
import type { PileState } from '../pileState.svelte';
import type { SvelteMap } from 'svelte/reactivity';
import type { EnvironmentMap } from '../assetInventory/environmentMap';
import { roundTo } from '../api/pileMapper';
import { playAddObject, playDuplicteObject, playSound } from '$lib/audio/audio.svelte';

const FALLBACK_SCALE = 15;
const ZOOM_SCALE_MULTIPLY = 0.12;

/**
 * Creates a new PileObject and adds it to pileModels[].
 * @param modelName A valid model name with corresponding .glb file
 */
export function addNewModel(modelMap: Object2DMap | Object3DMap, pileApp: PileApp) {
	if(modelMap.name == "3D"){
		console.log("THIS IS NOT GOOD")
		console.log(modelMap)
	}
	pileApp.state.showTransformControls = false;
	const zoomDistance = pileApp.controlsRef?.getDistance();
	const defaultScale = zoomDistance ? zoomDistance * ZOOM_SCALE_MULTIPLY : FALLBACK_SCALE;
	console.log('Zoom Distance:', zoomDistance, 'Default Scale:', defaultScale);
	const baseTransform: Transform3D = JSON.parse(
		JSON.stringify({
			translate: { x: 0, y: 0, z: 0 },
			rotation: { x: 0, y: 0, z: 0, w: 1 },
			scale: {
				x: defaultScale,
				y: defaultScale,
				z: defaultScale
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
			uniformScale: defaultScale
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
			uniformScale: defaultScale
		});
		object2D.newObject = true;
		pileApp.state.addObject(object2D);
		pileApp.database.add(object2D);
	}
}

export function duplicateSelectedModel(pileState: PileState, pileApp: PileApp) {
	const id = pileState.selectedObjectID;
	if (!id) throw Error('selectedObjectID = null. Cannot duplicate a null object');
	const original = pileState.objects3D.get(id);

	if (original) {
		const pos = new Vector3();
		const quat = new Quaternion();
		const scale = new Vector3();
		const originalMatrix = original.ref?.children[0].matrixWorld;
		originalMatrix?.decompose(pos, quat, scale);
		console.log('Matrix World', originalMatrix);

		const newTransform: Transform3D = {
			translate: { x: pos.x + scale.x * 0.8, y: pos.y, z: pos.z },
			rotation: { x: quat.x, y: quat.y, z: quat.z, w: quat.w },
			scale: {
				x: scale.x,
				y: scale.y,
				z: scale.z
			}
		};

		const newObj = new PileObject3D({
			name: original.name,
			id: crypto.randomUUID(),
			objectMap: original.objectMap,
			transform3D: newTransform
		});
		newObj.newObject = true;
		pileApp.state.addObject(newObj, true);
		pileApp.database.add(newObj);
		pileState.selectedObjectID = newObj.id;
	}
	playDuplicteObject();
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

export function focusOnObject(pileState: PileState) {
	const obj = pileState.getSelectedObject();
	const camera = pileState.app?.cameraRef
	const controls = pileState.app?.controlsRef
	if (!obj || !camera || !controls) return;
	const pos = new Vector3();
	const quat = new Quaternion();
	const scale = new Vector3();
	const originalMatrix = obj.ref?.children[0].matrixWorld;
	originalMatrix?.decompose(pos, quat, scale);
	controls.target.copy(pos)
	const offset = new Vector3(0, 2 * scale.x *.9, 5*scale.x*.9); 
    camera.position.copy(pos).add(offset);
	camera.lookAt(pos);
}
